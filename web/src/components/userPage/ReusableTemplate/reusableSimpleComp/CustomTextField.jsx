import React, {useContext, useEffect, useRef} from 'react';
import {Box, TextField} from "@mui/material";
import CustomMarkDown from "../CustomMarkDown";
import {TemplateContext} from "../../contexts/TemplateContext";
import ReactMarkdown from 'react-markdown';
import withTextFieldWrap from "../../../hocs/withTextFieldWrap";
import {textFieldNames} from "../../../../const/const";
import {getFieldValue} from "../../../../utilits/getFieldValue";


function CustomTextField(props) {

    // const { markdownHover, handleHoverMarkdown } = useContext(TemplateContext);

    const {
        value, //приходит объект типа {title: value}
        onChange,//приходит обычная функция типа setTitle
        classes,
        placeholder="Введите текст",
        variant = 'standard',
        textFieldOptions ={},
        // btnRef,
        optionId = null,
    } = props;

    const {
        multiline = false,
        minRows = '',
        maxRows = '',
        rows = '',
    } = textFieldOptions;

    const firstKey = value && Object.keys(value)[0];
    const label  = firstKey && firstKey in textFieldNames ? textFieldNames[firstKey] : 'Неизвестное поле';
    const fieldValue = getFieldValue(value, firstKey);

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
        if (typeof onChange === 'function') {
            if (optionId !== null) {
                onChange(event.target.value, optionId);
            } else {
                onChange(event.target.value);
            }
        } else {
            console.error('onChange is not a function:', onChange);
        }
    };


    return (
        <TextField
            value={fieldValue}
            onChange={handleChange}
            ref={textFieldRef}
            className={`fullWidth ${classes}`}
            label={label}
            placeholder={placeholder}
            fullWidth
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

export default withTextFieldWrap(CustomTextField);