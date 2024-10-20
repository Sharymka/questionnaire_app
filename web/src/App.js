import SignUp from "./components/user/SignUp";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/user/SignIn";
import Home from "./components/user/Home";

function App() {
  return (
      <div>
          <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn/>} />
              <Route path="/home" element={<Home/>} />
          </Routes>
      </div>
  );
}

export default App;
