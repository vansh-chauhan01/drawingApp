import { BrowserRouter , Route , Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/AuthPage"


function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
