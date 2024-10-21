import React, {useContext, useState} from 'react';
import TemplateHeader from "./head/TemplateHeader";
import QuestionList from "./body/realQuestions/QuestionList";
import SidePanel from "./head/SidePanel";
import QuestionTemplateBlock from "./body/questionTemplate/QuestionTemplateBlock";
import {Box, Button, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {TemplateContext} from "../contexts/TemplateContext";
import ImageUploadModal from "./head/ImageUploadModal";

function CustomTemplateEditor(props) {

  const {selectedTemplate, url, btnName, headerName } = props;

  const [showModalAnchor, setShowModalAnchor] = useState(false);

  const {
      questions,
      setQuestions,
      saveTemplate,
      handleAddQuestion,
      questionTemplateAnchor,
      setQuestionTemplateAnchor
  } = useContext(TemplateContext);


  return (
      <div>
          <SidePanel setShowModalAnchor={setShowModalAnchor} handleAddQuestion={setQuestionTemplateAnchor}/>
          {
              showModalAnchor && (
                  <ImageUploadModal open={showModalAnchor} handleClose={setShowModalAnchor}/>
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

      </div>
  );
}

export default CustomTemplateEditor;