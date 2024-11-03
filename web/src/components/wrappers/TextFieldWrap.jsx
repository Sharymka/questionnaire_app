import React, {useRef} from 'react';

function TextFieldWrap({children}) {

  const parentBlockRef = useRef(null);

  return (
      <div className="flex-grow-1" ref={parentBlockRef}>
          {React.cloneElement(children, { parentRef: parentBlockRef })}
      </div>
  );
}

export default TextFieldWrap;