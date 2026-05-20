import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Transaction } from "./pages/Transaction"
import { SidebarProvider } from "./context/sidebarContext"
import { BottomListProvider } from "./context/createcontext"
import { ToggleProvider } from "./context/toggle"



function App() {

  return (
    <div>
      <ToggleProvider>
      <SidebarProvider>
        <BottomListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/transaction" element={<Transaction />}></Route>
          </Routes>
        </BrowserRouter>
          </BottomListProvider>
      </SidebarProvider>
      </ToggleProvider>
    </div>
  )
}

export default App
