import { BrowserRouter , Route , Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/AuthPage"
import Canvas from "./pages/Canvas"
import RoomPage from "./pages/RoomPage"


function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/auth/" element={<AuthPage/>}/>
          <Route path="/canvas/:roomId" element={<Canvas/>}/>
          <Route path="/enterRoom" element={<RoomPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
