import './App.css'
import Chat from './Components/Chat'

function App() {

  return (
    <>
      <div className="app">
        <header className="flex">
          <h1 className="flex">Bienvenido a Proceso de Seleccion "Puesto DEV001"</h1>
        </header>
        <main className="flex">
          <Chat />
        </main>
      </div>
    </>
  )
}

export default App
