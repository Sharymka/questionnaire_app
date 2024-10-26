import React from 'react';

function MessageBlock (props) {

	const { message } = props;

  return (
	  <div className={`mt-2 message ${message ? (message.success ? 'success' : 'error') : 'hidden'}`}>
		  {message?.success || message?.error}
	  </div>

  );
}

export default MessageBlock;