import React, {useContext, useRef, useState} from 'react';
import {TemplateContext} from "../../../contexts/TemplateContext";
import NameOrEmailSorter from "../NameOrEmailSorter";
import AutocompletePrivateUsers from "./AutocompletePrivateUsers";
import CustomBtn from "../../reusableSimpleComp/CustomBtn";
import CustomCheckBoxes from "../../reusableSimpleComp/CustomCheckBoxes";
import useActionsCheckboxes from "../../../../hooks/useActionsCheckboxes";
import CustomFormControlSelect from "../../reusableSimpleComp/CustomFormControlSelect";
import {accessOptions, answerTypeName} from "../../../../../const/const";
import useActionsAccessLevel from "../../../../hooks/useActionsAccessLevel";
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import useActionsQuestion from "../../../../hooks/useActionsQuestion";

function QuestionTemplateBlock() {

  const btnRef = useRef(null);
  const [ sortBy, setSortBy ] = useState('name');
  const [showUsers , setShowUsers] = React.useState(false);

  const {
      checkboxes,
      answerType,
      selectedUsers,
      setQuestion,
      // question,
      questions,
      setQuestions,
      // handleAddCheckboxOption,
      accessLevel,
      // handleAccessLevel
  } = useContext(TemplateContext);

  const {
      checkboxOnChange,
      addOptionOnClick,
      deleteOptionOnClick,
      textFieldOnChange
  } = useActionsCheckboxes();

  const {
      handleAccessLevel
  } = useActionsAccessLevel(setShowUsers);

  const {
      handleTextFieldOnChange
  } = useActionsQuestion();

  const renderCheckboxes = () => (
      questions[questions.length - 1].answerType === 'checkboxes' &&
      <div className="width-50">
          <div className="width-100">
              <CustomCheckBoxes
                  // btnRef={btnRef}
                  options={ questions[questions.length - 1].checkboxes}
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

  const renderUsers = () => (
          showUsers &&
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

  return (
      <>
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center gap-3">
                <div className="flex-grow-08">
                    <CustomTextField
                        value={{ question: questions[questions.length - 1].name || '' }}
                        onChange={handleTextFieldOnChange}
                        placeholder={questions[questions.length - 1].question || 'Введите вопрос'}
                        field='name'
                    />
                </div>
                <div className="flex-grow-07 margin-right-70">
                    <CustomFormControlSelect
                        value={questions[questions.length - 1].answerType}
                        onChange={handleTextFieldOnChange}
                        options={answerTypeName}
                        field='answerType'
                        label="Ответы"
                    />
                </div>
            </div>
            {renderCheckboxes()}
        </div>
          <div className='width-50'>
              <CustomFormControlSelect
                  value={accessLevel}
                  onChange={handleAccessLevel}
                  options={accessOptions}
                  label='Уровень доступа'
              />
              {renderUsers()}
        </div>
      </>
  );
}

export default QuestionTemplateBlock;