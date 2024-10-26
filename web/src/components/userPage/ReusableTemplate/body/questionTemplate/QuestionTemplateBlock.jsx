import React, {useContext, useRef, useState} from 'react';
import CheckBoxes from "./CheckBoxes";
import AccessLevelSelector from "../AccessLevelSelector";
import {TemplateContext} from "../../../contexts/TemplateContext";
import QuestionTemplateTextField from "./QuestionTemplateTextField";
import AnswerTypeSelector from "./AnswerTypeSelector";
import NameOrEmailSorter from "../NameOrEmailSorter";
import AutocompletePrivateUsers from "./AutocompletePrivateUsers";
import CustomBtn from "../../reusableSimpleComp/CustomBtn";

function QuestionTemplateBlock() {

    const { accessLevel, handleAccessLevel } = useContext(TemplateContext);
  const btnRef = useRef(null);
  const { answerType, showUsers, selectedUsers, handleAddCheckboxOption } = useContext(TemplateContext);
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
                        <div className="width-100">
                            <CheckBoxes btnRef={btnRef} />
                        </div>
                        <CustomBtn ref={btnRef} btnName="Добавить вариант" onClick={handleAddCheckboxOption}/>
                    </div>

                )
            }
        </div>
          <div className='width-50'>
              <AccessLevelSelector handleAccessLevel={handleAccessLevel} accessLevel={accessLevel}/>
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