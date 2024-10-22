import React, {useContext, useState} from 'react';
import TemplateHeader from "./head/TemplateHeader";
import QuestionList from "./body/realQuestions/QuestionList";
import SidePanel from "./head/SidePanel";
import QuestionTemplateBlock from "./body/questionTemplate/QuestionTemplateBlock";
import {Alert, Box, Button, IconButton, Snackbar} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {TemplateContext} from "../contexts/TemplateContext";
import ImageUploadModal from "./head/ImageUploadModal";

function CustomTemplateEditor(props) {

  const { message } = useContext(TemplateContext);
  const {selectedTemplate, url, btnName, headerName } = props;
  const [showModalAnchor, setShowModalAnchor] = useState(false);

  const {
      questions,
      setQuestions,
      saveTemplate,
      handleAddQuestion,
      questionTemplateAnchor,
      setQuestionTemplateAnchor,
      imgUrl
  } = useContext(TemplateContext);

    const styles = {
        success: {
            backgroundColor: '#dff0d8', // светло-зеленый фон
            color: '#3c763d', // темно-зеленый текст
            border: '1px solid #d6e9c6', // граница
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            display: message ? 'block' : 'none', // Показывать или скрывать в зависимости от наличия сообщения
        },
        error: {
            backgroundColor: '#f2dede', // светло-красный фон
            color: '#a94442', // темно-красный текст
            border: '1px solid #ebccd1', // граница
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            display: message ? 'block' : 'none',
        },
    };

  return (
      <div>
          <SidePanel setShowModalAnchor={setShowModalAnchor} handleAddQuestion={setQuestionTemplateAnchor}/>
          {
              showModalAnchor && (
                  <ImageUploadModal open={showModalAnchor} handleClose={setShowModalAnchor}/>
              )
          }
          {
              imgUrl && (
                  <div className="card mb-2" style={{
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'bottom',
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      minHeight: '150px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      overflow: 'hidden',
                  }}>
                  </div>
              )
          }
          <TemplateHeader headerName={headerName}/>
          <QuestionList setQuestions={setQuestions} questions={questions}/>
          <div className="card d-flex p-4 mt-3 flex-column">
              {
                  questionTemplateAnchor && (
                      <div className="p-4 d-flex flex-column gap-5 mt-3 relativePosition">
                          <div className="absolute_right_corner_pos">
                              <Box>
                                  <IconButton
                                      onClick={handleAddQuestion}
                                  >
                                      <AddIcon/>
                                  </IconButton>
                              </Box>
                          </div>
                          <QuestionTemplateBlock/>
                      </div>
                  )
              }
              <div className="align-self-end">
                  <Button className='p-3 btn-primary btn-block'
                          variant="contained"
                          onClick={() => saveTemplate(`${url}${selectedTemplate ? `/${selectedTemplate.id}` : ''}`)}>
                      {btnName}
                  </Button>
              </div>
          </div>
          <div className="mt-2">
              {message && message.success && (
                  <div style={styles.success}>
                      {message.success}
                  </div>
              )}
              {message && message.error && (
                  <div style={styles.error}>
                      {message.error}
                  </div>
              )}
          </div>

      </div>
  );
}

export default CustomTemplateEditor;