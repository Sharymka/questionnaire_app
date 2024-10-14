import React, {useContext} from 'react';
import CustomTextField from "../ReusableComponents/CustomTextField";
import {TemplateContext} from "../TemplateContext";

function QuestionTextField(props) {

    const { question, indexValue, editorAnchor } = props;
    const { handleEditQuestion } = useContext(TemplateContext);
    const underlineNone = 'block-width-50 text-field-underline-none'
    const underlineSolid = 'text-field-underline-solid';
    const variant="standard";
    const name = "name";


  return (
      <div className='flex-grow-1'>
          <CustomTextField
              classes={editorAnchor? underlineSolid : underlineNone }
              variant={variant}
              label= ''
              value={question}
              onChange={editorAnchor? (event) => handleEditQuestion(event.target.value, indexValue, name): null}

          />
      </div>

  );
}

export default QuestionTextField;