import React, {useContext} from "react";
import { UserContext } from "./contextApi/userContext";
import { Login } from "./components/login/login";
import { Posts } from "./components/posts/posts"
import { Profile } from "./components/profile/profile";

function App() {
  const { currentState } = useContext(UserContext);
  return (
    <div className="app">
        {currentState === 0 && <Login/>}
        {currentState === 1 && <Posts/>}
        {currentState === 2 && <Profile/>}
    </div>
  );
}

export default App
