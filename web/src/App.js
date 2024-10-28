import SignUp from "./components/mainPage/SignUp";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/mainPage/SignIn";
import Home from "./components/userPage/Home";
import MainPage from "./components/mainPage/MainPage";
import AuthProvider from "./components/mainPage/context/AuthContext";
import TemplateProvider from "./components/userPage/contexts/TemplateContext";
import SelectedTemplate from "./components/mainPage/body/SelectedTemplate";

function App() {
  return (
<AuthProvider>
    <TemplateProvider>
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/templates/:id" element={<SelectedTemplate/>} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    </TemplateProvider>
</AuthProvider>
  );
}

export default App;
