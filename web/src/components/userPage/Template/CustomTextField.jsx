import React, {useRef} from 'react';
import {TextField} from "@mui/material";
import withTextFieldWrap from "../../hocs/withTextFieldWrap";
import {textFieldNames} from "../../../const/const";
import {getFieldValue} from "../../../utilits/getFieldValue";
import withAddParamForTextField from "../../hocs/withAddParamForTextField";
import {getAnswerTypeName} from "../../../utilits/getAnswerTypeName";


function CustomTextField(props) {

    const {
        value, //приходит объект типа {title: value}
        onChange,//приходит обычная функция типа setTitle
        classes,
        placeholder,
        variant,
        textFieldOptions,
        // btnRef,
        checkboxId = null, // это id checkbox, например
        questionId = null, // id вопроса
        field = ''
    } = props;

    const {
        multiline = false,
        minRows = '',
        maxRows = '',
        rows = '',
    } = textFieldOptions;

    const firstKey = value && Object.keys(value)[0];
    const label  = firstKey && firstKey in textFieldNames ? textFieldNames[firstKey] : 'Неизвестное поле';
    let fieldValue = getFieldValue(value, firstKey);

    if (firstKey === 'answerType') {
        fieldValue =  getAnswerTypeName(value, firstKey);
    }

    const textFieldRef = useRef(null);

    const handleChange = (event) => {
        const value = event.target.value;

        if (typeof onChange !== 'function') {
            console.error('onChange is not a function:', onChange);
            return;
        }

        const args = [value];

        if (checkboxId !== null) {
            args.push(checkboxId);
        } else if (questionId !== null) {
            args.push(checkboxId, questionId);
        } else if (field) {
            args.push(field);
        }

        onChange(...args);
    };


    return (
        <TextField
            value={fieldValue ?? ''}
            onChange={handleChange}
            ref={textFieldRef}
            className={`fullWidth ${classes}`}
            label={label}
            placeholder={placeholder}
            // fullWidth
            variant={variant}
            margin="normal"
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            rows={rows}
        />

    );
}

export default withAddParamForTextField(CustomTextField);