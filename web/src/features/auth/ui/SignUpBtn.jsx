import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function SignUpBtn(props) {
    const navigate = useNavigate();

    const { isDarkMode } = props;
  const onSignUp = () => {
    navigate('/signUp');
  }

  return (
      <Button
          color="inherit"
          onClick={onSignUp}
          sx={{
              color: isDarkMode ? '#fdfdfe' : '#4b525d',
              '&:hover': { bgcolor: isDarkMode ? '#a2dbfe' : '#b8dcfe' },
              fontWeight: 'bold',
              px: 2
          }}
      >
          Sign Out
      </Button>
  );
}

export default SignUpBtn;