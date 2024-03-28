import Navbar from "./components/navbar.component";
import {Routes, Route} from 'react-router-dom'
import UserAuthForm from "./pages/userAuthForm.page";

const App = () => {
    return (
            <Routes>
                < Route path='/' element={<Navbar />}>
                    <Route path='signin' element={<UserAuthForm type={"Sign-In"}/>} />
                    <Route path='signup' element={<UserAuthForm type={"Sign-Up"} />}/>
                </Route>
                
           
            </Routes>
        );
}

export default App;