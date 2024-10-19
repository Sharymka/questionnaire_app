import React, {useContext} from 'react';
import QuestionTemplate from "../QuestionTemplate";
import CheckBoxes from "../CheckBoxes";
import AccessLevelSelector from "../FormControlSelectors/AccessLevelSelector";
import AutocompletePrivateUsers from "../AutocompletePrivateUsers";
import {TemplateContext} from "../TemplateContext";
import AddIcon from "@mui/icons-material/Add";
import {Box, IconButton} from "@mui/material";

function QuestionTemplateBlock() {

  const { answerType, showUsers } = useContext(TemplateContext);
  return (
      <>
        <div>

          <QuestionTemplate/>
          {
              answerType === 'checkboxes' && (
                  <div className="width-50">
                    <CheckBoxes/>
                  </div>

              )
          }
        </div>
        <div className='width-50'>
          <AccessLevelSelector/>
          {
              showUsers && (
                  <AutocompletePrivateUsers/>
              )
          }
        </div>
      </>
  );
}

export default QuestionTemplateBlock;