import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function SignInBtn(props) {

  const navigate = useNavigate();
  const onSignIn = () => {
      console.log("on signIn page");
    navigate("/signIn");
  }

  return (
      <Button
          color="inherit"
          onClick={onSignIn}
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            '&:hover': { bgcolor: 'success.dark' },
            fontWeight: 'bold',
            borderRadius: 2,
            px: 2,
            mx: 1
          }}
      >
        Вход
      </Button>
  );
}

export default SignInBtn;