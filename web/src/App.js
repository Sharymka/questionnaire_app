import SignUp from "./components/mainPage/SignUp";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/mainPage/SignIn";
import Home from "./components/userPage/Home";
import MainPage from "./components/mainPage/MainPage";
import AuthProvider from "./components/mainPage/context/AuthContext";
import TemplateProvider from "./components/contexts/TemplateContext";
import SelectedTemplate from './components/userPage/SelectedTemplate'
import LayoutWithHeader from "./components/layouts/LayoutWithHeader";
import HistoryProvider from "./components/contexts/HistoryContext";


function App() {
  return (
<AuthProvider>
    <TemplateProvider>
        <Routes>
            <Route path="/" element={
                <LayoutWithHeader>
                    <MainPage/>
                </LayoutWithHeader>
                } />
            <Route path="/templates/:id" element={
                <LayoutWithHeader>
                    <SelectedTemplate/>
                </LayoutWithHeader>
            } />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/home" element={
                <LayoutWithHeader>
                    <HistoryProvider>
                        <Home/>
                    </HistoryProvider>
                </LayoutWithHeader>
            } />
        </Routes>
    </TemplateProvider>
</AuthProvider>
  );
}

export default App;
