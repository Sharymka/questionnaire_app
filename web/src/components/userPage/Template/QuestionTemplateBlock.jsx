import React, {useRef, useState} from 'react';
import NameOrEmailSorter from "./NameOrEmailSorter";
import CustomBtn from "./CustomBtn";
import CustomCheckBoxes from "./CustomCheckBoxes";
import useActionsCheckboxes from "../../hooks/useActionsCheckboxes";
import CustomFormControlSelect from "./CustomFormControlSelect";
import {accessOptions, answerTypeName, LABEL_USERS} from "../../../const/const";
import CustomTextField from "./CustomTextField";
import useActionsQuestion from "../../hooks/useActionsQuestion";
import CustomAutoComplete from "./CustomAutoComplete";
import useActionsSelectPrivateUsers from "../../hooks/useActionsSelectPrivateUsers";
import useGetUsers from "../../hooks/API/useGetUsers";

function QuestionTemplateBlock(props) {

  const { targetQuestion } = props;
  const { usersData, loading, error } = useGetUsers({ fields: ['id', 'first_name', 'last_name', 'email'] });
  const btnRef = useRef(null);
  const [sortBy, setSortBy ] = useState('name');


    const {
        handleTextFieldOnChange
    } = useActionsQuestion(targetQuestion);

    const {
      checkboxOnChange,
      addOptionOnClick,
      deleteOptionOnClick,
      textFieldOnChange
  } = useActionsCheckboxes(targetQuestion);

  const {
      addTags,
      deleteSelectedUser,
      getOptionLabel,
      getTagLabel,
  } = useActionsSelectPrivateUsers(targetQuestion.id, sortBy);

  const renderCheckboxes = () => (
      targetQuestion.answerType === 'checkboxes' &&
      <div className="width-50">
          <div className="width-100">
              <CustomCheckBoxes
                  // btnRef={btnRef}
                  options={targetQuestion.checkboxes}
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
      targetQuestion.accessLevel === 'restricted' &&
          <>
              <NameOrEmailSorter
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  selectedUsers={targetQuestion.selectedUsers || [] }
              />
              <CustomAutoComplete
                  value={targetQuestion.selectedUsers}
                  options={usersData}
                  label={LABEL_USERS}
                  getOptionLabel={getOptionLabel}
                  getTagChipLabel={getTagLabel}
                  addTags={addTags}
                  deleteTag={deleteSelectedUser}
                  placeholder=''
                  sortBy={sortBy}
              />

          </>
  )

  return (
      <>
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center gap-3">
                <div className="flex-grow-08">
                    <CustomTextField
                        value={{ question: targetQuestion.name || '' }}
                        onChange={handleTextFieldOnChange}
                        placeholder={targetQuestion?.name || 'Введите вопрос'}
                        field='name'
                    />
                </div>
                <div className="flex-grow-07 margin-right-70">
                    <CustomFormControlSelect
                        value={targetQuestion.answerType}
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
                  value={targetQuestion.accessLevel || ''}
                  onChange={handleTextFieldOnChange}
                  options={accessOptions}
                  field='accessLevel'
                  label='Уровень доступа'
              />
              {renderUsers()}
        </div>
      </>
  );
}

export default QuestionTemplateBlock;