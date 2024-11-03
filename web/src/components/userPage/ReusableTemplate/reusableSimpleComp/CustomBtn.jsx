import React, {forwardRef} from 'react';
import {Button} from "@mui/material";

const CustomBtn = forwardRef((props, ref) => {
	const { btnName, onClick } = props;

  return (
	  <Button
		  ref={ref}
		  onClick={onClick}
		  className='p-3 btn-primary btn-block'
		  variant="contained"
	  >
		  {btnName}
	  </Button>
  );
})

export default CustomBtn;