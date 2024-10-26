import React, {useContext, useEffect, useRef} from 'react';
import {Box, TextField} from "@mui/material";
import CustomMarkDown from "../CustomMarkDown";
import {TemplateContext} from "../../contexts/TemplateContext";


function CustomTextField(props) {

    const { markdownHover, handleHoverMarkdown } = useContext(TemplateContext);

    const {
        label='',
        classes,
        value,
        placeholder,
        onChange,
        btnRef,
        optionId = null,
        variant,
        multiline =false,
        minRows='',
        maxRows='',
        rows='',
    } = props;
    const [hover, setHover] = React.useState(false);
    const textFieldRef = useRef(null);
    const parentBlockRef = useRef(null);

    const foundItem = markdownHover?.find((item) => item.id === optionId);

    const applyFormat = (format) => {

        const input = textFieldRef.current?.querySelector('textarea') || textFieldRef.current?.querySelector('input');
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;
        const selectedText = value.substring(selectionStart, selectionEnd);

        if (!selectedText) return;

        let formattedText = '';

        switch (format) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `__${selectedText}__`;
                break;
            case 'clear':
                formattedText = selectedText.replace(/(\*\*|\*|__|_)/g, '');
                break;
            default:
                break;
        }

        const newDescription =
            value.slice(0, selectionStart) +
            formattedText +
            value.slice(selectionEnd);

        onChange(newDescription);

        setTimeout(() => {
            input.setSelectionRange(selectionStart + formattedText.length, selectionStart + formattedText.length);
            input.focus();
        }, 0);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (!parentBlockRef.current && !parentBlockRef.current.contains(event.target) && btnRef?.current === event.target){
                handleHoverMarkdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (event) => {
        if (typeof onChange === 'function') {
            onChange(event.target.value, optionId);
        } else {
            console.error('onChange is not a function:', onChange);
        }
    };

  return (
    <div  className="flex-grow-1" ref={parentBlockRef}>
        <TextField
            ref={textFieldRef}
            className={classes + "w-100"}
            label={label}
            placeholder={placeholder}
            fullWidth
            margin="normal"
            variant={variant}
            value={value}
            onChange={handleChange}
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            rows={rows}
            onClick={() => handleHoverMarkdown(optionId)}
        />
        {
            <div className={`custom-markdown ${foundItem?.value === true ? 'show' : ''}`}>
                {foundItem?.value === true ? (
                    <>
                        <CustomMarkDown applyFormat={applyFormat}/>
                    </>
                ) : (
                    <>
                        {/*<ReactMarkdown>{value}</ReactMarkdown>*/}
                    </>
                )}
            </div>
        }

    </div>);
}

export default CustomTextField;