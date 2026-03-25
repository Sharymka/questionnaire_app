import React from 'react';
import {IconButton, Tooltip} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatClearIcon from "@mui/icons-material/FormatClear";

function CustomMarkDown(props) {

    const { applyFormat } =props;
  return (
      <>
        <Tooltip title="Жирный шрифт">
          <IconButton
              onClick={() => applyFormat('bold')}
          >
            <FormatBoldIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Курсив">
          <IconButton
              onClick={() => applyFormat('italic')}
          >
            <FormatItalicIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Подчёркивание">
          <IconButton
              onClick={() => applyFormat('underline')}
          >
            <FormatUnderlinedIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить форматирование">
          <IconButton
              onClick={() => applyFormat('clear')}
          >
            <FormatClearIcon/>
          </IconButton>
        </Tooltip>
      </>
  );
}

export default CustomMarkDown;