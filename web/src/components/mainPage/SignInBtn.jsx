import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function SignInBtn(props) {

  const navigate = useNavigate();
    const { isDarkMode } = props;
  const onSignIn = () => {
    navigate("/signIn");
  }

  return (
      <Button
          color="inherit"
          onClick={onSignIn}
          sx={{
              bgcolor: isDarkMode ? '#A0AEC0' : '#e7f6fa',
              color: isDarkMode ? '#2D3748' : '#4b525d',
              '&:hover': { bgcolor: isDarkMode ? '#718096' : '#a2dbfe' },
              fontWeight: 'bold',
              borderRadius: 1,
              px: 2,
              mx: 1
          }}
      >
          Sign In
      </Button>
  );
}

export default SignInBtn;