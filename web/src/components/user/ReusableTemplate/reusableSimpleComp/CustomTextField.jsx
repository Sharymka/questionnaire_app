import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, TextField} from "@mui/material";
import CustomMarkDown from "../CustomMarkDown";
import {TemplateContext} from "../../contexts/TemplateContext";
import ReactMarkdown from 'react-markdown';


function CustomTextField(props) {

    const {
        label,
        classes,
        value,
        placeholder,
        onChange,
        variant,
        multiline =false,
        minRows='',
        maxRows='',
        rows='',

    } = props;

    const [hover, setHover] = React.useState(false);
    const textFieldRef = useRef(null);
    const parentBlockRef = useRef(null);
    const reactQuillRef = useRef(null);
    const [formattedDescription, setFormattedDescription] = useState("");

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

        console.log(newDescription);

        onChange(newDescription);

        setTimeout(() => {
            input.setSelectionRange(selectionStart + formattedText.length, selectionStart + formattedText.length);
            input.focus(); // Устанавливаем фокус обратно на текстовое поле
        }, 0);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (parentBlockRef.current && !parentBlockRef.current.contains(event.target)) {
                setHover(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


  return (
    <div ref={parentBlockRef}>
        <TextField
            ref={textFieldRef}
            className={classes}
            label={label}
            placeholder={placeholder}
            fullWidth
            margin="normal"
            variant={variant}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            rows={rows}
            onClick={() => setHover(true)}
        />
        {
            <div className={`custom-markdown ${hover ? 'show' : ''}`}>
                {hover &&
                    <>
                        <CustomMarkDown applyFormat={applyFormat}/>
                        <ReactMarkdown>{value}</ReactMarkdown>
                    </>
                }

            </div>
        }

    </div>);
}

export default CustomTextField;