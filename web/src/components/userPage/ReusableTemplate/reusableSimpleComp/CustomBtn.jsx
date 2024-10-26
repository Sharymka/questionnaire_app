import React, {forwardRef} from 'react';
import {Button} from "@mui/material";

const CustomBtn = forwardRef((props, ref) => {
	const { btnName, onClick } = props;

  return (
	  <Button
		  ref={ref}
		  className='p-3 btn-primary btn-block'
		  onClick={onClick}
		  variant="contained"
	  >
		  {btnName}
	  </Button>
  );
})

export default CustomBtn;