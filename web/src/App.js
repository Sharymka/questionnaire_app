import SignUp from "./components/SignUp";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

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
