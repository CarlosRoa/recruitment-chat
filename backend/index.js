const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Carga las variables de entorno
dotenv.config();

// Crea una instancia de express
const app = express();

// Define el puerto que utilizará el servidor
const port = 3000;

//configura cors origins
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
    }

//add CORS a express app
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Crea el endpoint /api/v1/threads con POST
app.post('/api/v1/threads', async (req, res) => {

  //try catch 
  try {
    //Crea una instancia de OpenAI
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    const content = req.body.message;
    const threadID = req.body.threadID;
    console.log(content)
    console.log(threadID)
    //if a threadID is provided, use it
    const thread = threadID ? {id: threadID} : await openai.beta.threads.create();

    await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: content,
          file_ids: [process.env.OPENAI_FILE_ID]
        }
      );

      const run = await openai.beta.threads.runs.create(
        thread.id,
        { 
          assistant_id: process.env.ASSISTANT_ID,
        }
      );

      const runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );

      //If run.status is not completed, wait 1 second and check again
     async function checkStatus(runStatus) {
       if (runStatus.status === 'completed') {

            const messages = await openai.beta.threads.messages.list(
                thread.id
              );

            return messages;
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000)) 
   
          return checkStatus(await openai.beta.threads.runs.retrieve(
             thread.id,
             run.id
           ));
        }
      }

      const response = await checkStatus(runStatus);

      //if response.data[0].content[0].text.value starts with ```json, parse it
      if (response.data[0].content[0].text.value.startsWith('```json')) {
        //remove ```json at the beginning and ``` at the end
        const jsonResp = JSON.parse(response.data[0].content[0].text.value.slice(7, -3))
        console.log(jsonResp)
        res.send(jsonResp)
      } else {
        //check if response.data[0].content[0].text.value is a valid json
        const isJson = (str) => {
          try{
             JSON.parse(str);
          }catch (e){
             return false;
          }
        
         return true;
       }

        if (isJson(response.data[0].content[0].text.value)) {
          let jsonResp = JSON.parse(response.data[0].content[0].text.value)
          jsonResp.threadID = thread.id
          res.send(jsonResp)
        } else {
          let jsonResp = {data: {summary: response.data[0].content[0].text.value}}
          jsonResp.threadID = thread.id
          res.send(jsonResp)
        }

      }

  } catch (error) {
      console.log(error)
      res.send({data: {summary: "Error. Intentelo nuevamente"}})
  }

    
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`El servidor está corriendo en http://localhost:${port}`);
});
