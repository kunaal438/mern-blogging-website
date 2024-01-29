import {Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";


export const UserContext = createContext({})


const App = () => {
    const [userAuth, setUserAuth]=useState({})
    useEffect(()=>{
        let userInSession = lookInSession("user")
        userInSession? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token:null})
    },[])
    return (
        <UserContext.Provider value={{userAuth,setUserAuth}}>
        <Routes>
       <Route path="/" element={<NavBar/>}>
       <Route path="/signin" element={<UserAuthForm type='sign-in'/>}/>
       <Route path="/signup" element={<UserAuthForm type='sign-up'/>}/>
       </Route>
       
        </Routes>
        </UserContext.Provider>
 
    );
}

export default App;