import React, {useContext, useEffect, useRef} from 'react';
import {TextField} from "@mui/material";
import CustomMarkDown from "../CustomMarkDown";
import {TemplateContext} from "../../contexts/TemplateContext";
import ReactMarkdown from 'react-markdown';

function CustomTextField(props) {

    const { setDescription, description } =useContext(TemplateContext);

    const [hover, setHover] = React.useState(false);
    const textFieldRef = useRef(null);
    const parentBlockRef = useRef(null);

    const applyFormat = (format) => {

        const input = textFieldRef.current?.querySelector('textarea') || textFieldRef.current?.querySelector('input');

        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;
        const selectedText = description.substring(selectionStart, selectionEnd);

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
                formattedText = selectedText.replace(/[*_]/g, '');
                break;
            default:
                break;
        }

        const newDescription =
            description.slice(0, selectionStart) +
            formattedText +
            description.slice(selectionEnd);

        setDescription(newDescription);


        setTimeout(() => {
            input.setSelectionRange(selectionStart + formattedText.length, selectionStart + formattedText.length);
            input.focus(); // Устанавливаем фокус обратно на текстовое поле
        }, 0);
    };

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
      <div
          ref={parentBlockRef}
      >
          <TextField
              ref={textFieldRef}
              className={classes}
              label={label}
              placeholder={placeholder}
              fullWidth
              margin="normal"
              variant={variant}
              value={value}
              onChange={onChange}
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
                          <ReactMarkdown>{description}</ReactMarkdown>
                      </>
                  }

              </div>
          }

      </div>

  );
}

export default CustomTextField;