import React, {useRef} from 'react';
import {styled, TextField} from "@mui/material";
import withTextFieldWrap from "../../hocs/withTextFieldWrap";
import {textFieldNames} from "../../../const/const";
import {getFieldValue} from "../../../utilits/getFieldValue";
import withAddParamForTextField from "../../hocs/withAddParamForTextField";
import {getAnswerTypeName} from "../../../utilits/getAnswerTypeName";


function CustomTextField(props) {

    // const { markdownHover, handleHoverMarkdown } = useContext(TemplateContext);

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

    // const foundItem = markdownHover?.find((item) => item.id === optionId);

    // const applyFormat = (format) => {
    //     const input = textFieldRef.current?.querySelector('textarea') || textFieldRef.current?.querySelector('input');
    //     const selectionStart = input.selectionStart;
    //     const selectionEnd = input.selectionEnd;
    //     const selectedText = value.substring(selectionStart, selectionEnd);
    //
    //     if (!selectedText) return;
    //
    //     let formattedText = '';
    //
    //     switch (format) {
    //         case 'bold':
    //             formattedText = `**${selectedText}**`;
    //             break;
    //         case 'italic':
    //             formattedText = `*${selectedText}*`;
    //             break;
    //         case 'underline':
    //             formattedText = `__${selectedText}__`;
    //             break;
    //         case 'clear':
    //             formattedText = selectedText.replace(/(\*\*|\*|__|_)/g, '');
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     const newDescription =
    //         value.slice(0, selectionStart) +
    //         formattedText +
    //         value.slice(selectionEnd);
    //
    //     onChange(newDescription);
    //
    //     setTimeout(() => {
    //         input.setSelectionRange(selectionStart + formattedText.length, selectionStart + formattedText.length);
    //         input.focus();
    //     }, 0);
    // };

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //
    //         if (!parentBlockRef.current && !parentBlockRef.current.contains(event.target) && btnRef?.current === event.target){
    //             handleHoverMarkdown();
    //         }
    //     };
    //
    //     document.addEventListener('mousedown', handleClickOutside);
    //
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

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
            // onClick={() => handleHoverMarkdown(optionId)}
        />
        // {/*{*/}
        // {/*    <div className={`custom-markdown ${foundItem?.value === true ? 'show' : ''}`}>*/}
        // {/*        {foundItem?.value === true ? (*/}
        // {/*            <>*/}
        // {/*                <CustomMarkDown applyFormat={applyFormat}/>*/}
        // {/*            </>*/}
        // {/*        ) : (*/}
        // {/*            <>*/}
        // {/*                <ReactMarkdown>{value}</ReactMarkdown>*/}
        // {/*            </>*/}
        // {/*        )}*/}
        // {/*    </div>*/}
        // {/*}*/}
    );
}

export default withAddParamForTextField(withTextFieldWrap(CustomTextField));