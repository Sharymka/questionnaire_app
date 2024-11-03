import React, {useContext, useRef, useState} from 'react';
import CheckBoxes from "./CheckBoxes";
import AccessLevelSelector from "../AccessLevelSelector";
import {TemplateContext} from "../../../contexts/TemplateContext";
import QuestionTemplateTextField from "./QuestionTemplateTextField";
import AnswerTypeSelector from "./AnswerTypeSelector";
import NameOrEmailSorter from "../NameOrEmailSorter";
import AutocompletePrivateUsers from "./AutocompletePrivateUsers";
import CustomBtn from "../../reusableSimpleComp/CustomBtn";
import CustomCheckBoxes from "../../reusableSimpleComp/CustomCheckBoxes";
import useActionsCheckboxes from "../../../../hooks/useActionsCheckboxes";

function QuestionTemplateBlock() {

  const btnRef = useRef(null);
  const [ sortBy, setSortBy ] = useState('name');
  const {
      checkboxes,
      answerType,
      showUsers,
      selectedUsers,
      handleAddCheckboxOption,
      accessLevel,
      handleAccessLevel
  } = useContext(TemplateContext);

  const {
      checkboxOnChange,
      addOptionOnClick,
      deleteOptionOnClick,
      textFieldOnChange
  } = useActionsCheckboxes();

  const renderCheckboxes = () => (
      answerType === 'checkboxes' &&
      <div className="width-50">
          <div className="width-100">
              <CustomCheckBoxes
                  // btnRef={btnRef}
                  options={checkboxes}
                  actions={{
                      checkboxOnChange: checkboxOnChange,
                      deleteOptionOnClick: deleteOptionOnClick,
                      textFieldOnChange: textFieldOnChange
                  }}
              />
          </div>
          <CustomBtn
              ref={btnRef}
              btnName="Добавить вариант"
              onClick={addOptionOnClick}
          />
      </div>

  )

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
            {renderCheckboxes()}
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