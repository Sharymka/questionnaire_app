import SignUp from "./components/mainPage/SignUp";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/mainPage/SignIn";
import Home from "./components/userPage/Home";
import MainPage from "./components/mainPage/MainPage";
import AuthProvider from "./components/mainPage/context/AuthContext";

function App() {
  return (
<AuthProvider>
    <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/home" element={<Home/>} />
    </Routes>
</AuthProvider>
  );
}

export default App;
