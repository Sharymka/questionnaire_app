import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function SignUpBtn(props) {
    const navigate = useNavigate();
  const onSignUp = () => {
    navigate('/signUp');
  }

  return (
      <Button
          color="inherit"
          onClick={onSignUp}
          sx={{
            bgcolor: 'info.main',
            color: 'white',
            '&:hover': { bgcolor: 'info.dark' },
            fontWeight: 'bold',
            borderRadius: 2,
            px: 2
          }}
      >
        Sign Up
      </Button>
  );
}

export default SignUpBtn;