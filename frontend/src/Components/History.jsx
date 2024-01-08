import { List, ListItem, ListItemText, Box, Button, Divider} from '@mui/material';
import app from '../firebase';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

function ChatHistory() {

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Refresh the page to clear the state of the app
            window.location.reload();
          }).catch((error) => {
            console.log(error);
          });
    }



    return (
        <>
            <Box height="100vh" sx={{display: "flex", flexDirection: "column"}}>
                <List sx={{height: "85vh", display: 'flex', flexDirection: "column"}}>
                {['Proceso DEV002', 'Proceso DEV003', 'Proceso DEV004'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <Box sx={{display:"flex", flexDirection: "column"}}>
                    <Button onClick={handleLogout} >Logout</Button>
                </Box>
            </Box>
        </>
    );

}

export default ChatHistory;