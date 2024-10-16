import React from 'react';
import AnswerTypeSelector from "./FormControlSelectors/AnswerTypeSelector";
import QuestionTemplateTextField from "./TextFields/QuestionTemplateTextField";

function QuestionTemplate() {
  return (
      <div className="d-flex flex-row justify-content-between align-items-center gap-3">
          <div className="flex-grow-08">
              <QuestionTemplateTextField/>
          </div>
          <div className="flex-grow-07 margin-right-70">
              <AnswerTypeSelector/>
          </div>

      </div>
  );
}

export default QuestionTemplate;