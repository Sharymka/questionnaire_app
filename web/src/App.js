import SignUp from "./components/SignUp";
import {Route, Routes} from "react-router-dom";
import SignIn from "./components/SignIn";

function App() {
  return (
      <>
          <Routes>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn/>} />
          </Routes>
      </>
  );
}

export default App;
