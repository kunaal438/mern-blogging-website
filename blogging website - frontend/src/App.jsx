import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
                <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
            </Route>
        </Routes>
    );

}

export default App;