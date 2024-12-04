import React, {forwardRef} from 'react';
import {Button} from "@mui/material";

const CustomBtn = forwardRef((props, ref) => {
	const { btnName, onClick, questionId = null } = props;

	const handleClick = (event) => {
		// Вызываем onClick, передавая event и questionId
		if (onClick) {
			onClick(event, questionId);
		}
	};
  return (
	  <Button
		  ref={ref}
		  onClick={handleClick}
		  className='p-3 btn-primary btn-block'
		  variant="contained"
	  >
		  {btnName}
	  </Button>
  );
})

export default CustomBtn;