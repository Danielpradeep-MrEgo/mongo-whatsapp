import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { auth, provider } from "./firebase";

function Login() {
  const [{ user }, dispatch] = useStateValue();
  const userFire = auth.currentUser;

  const signIn = () => {
    auth.signInWithPopup(provider).then(() => {
      dispatch({
        type: actionTypes.SET_USER,
        user: userFire,
      });
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
    });
  }, [user]);

  return (
    <div className="login">
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
