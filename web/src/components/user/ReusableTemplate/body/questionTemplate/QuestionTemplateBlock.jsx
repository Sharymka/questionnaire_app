import React, {useContext, useState} from 'react';
import CheckBoxes from "./CheckBoxes";
import AccessLevelSelector from "../AccessLevelSelector";
import {TemplateContext} from "../../../contexts/TemplateContext";
import QuestionTemplateTextField from "./QuestionTemplateTextField";
import AnswerTypeSelector from "./AnswerTypeSelector";
import NameOrEmailSorter from "../NameOrEmailSorter";
import AutocompletePrivateUsers from "./AutocompletePrivateUsers";

function QuestionTemplateBlock() {

  const { answerType, showUsers, selectedUsers } = useContext(TemplateContext);
    const [ sortBy, setSortBy ] = useState('name');
  return (
      <>
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center gap-3">
                <div className="flex-grow-08">
                    <QuestionTemplateTextField/>
                </div>
                <div className="flex-grow-07 margin-right-70">
                    <AnswerTypeSelector/>
                </div>
            </div>
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
                      <>
                          <NameOrEmailSorter
                              sortBy={sortBy}
                              setSortBy={setSortBy}
                              selectedUsers={selectedUsers}
                          />
                          <AutocompletePrivateUsers
                              sortBy={sortBy}
                              setSortBy={setSortBy}
                              selectedUsers={selectedUsers}
                          />
                      </>
                  )
              }
        </div>
      </>
  );
}

export default QuestionTemplateBlock;