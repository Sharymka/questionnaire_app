import React, {useContext, useState} from 'react';
import TemplateHeader from "./head/TemplateHeader";
import QuestionList from "./body/realQuestions/QuestionList";
import SidePanel from "./head/SidePanel";
import QuestionTemplateBlock from "./body/questionTemplate/QuestionTemplateBlock";
import {Box, Button, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {TemplateContext} from "../contexts/TemplateContext";
import ImageUploadModal from "./head/ImageUploadModal";
import MessageBlock from "./reusableSimpleComp/MessageBlock";

function CustomTemplateEditor(props) {

  const {
      selectedTemplate,
      url,
      btnName,
      headerName,
      showFormsTableAnchor,
      setShowFormsTableAnchor,
      showFilledFormAnchor
  } = props;

    const {
        questions,
        setQuestions,
        saveTemplate,
        handleAddQuestion,
        questionTemplateAnchor,
        setQuestionTemplateAnchor,
        imgUrl,
        message
    } = useContext(TemplateContext);

  const [showModalAnchor, setShowModalAnchor] = useState(false);

  return (
      <div>
          <SidePanel
              questionTemplateAnchor={questionTemplateAnchor}
              setShowModalAnchor={setShowModalAnchor}
              setQuestionTemplateAnchor={setQuestionTemplateAnchor}
              selectedTemplate={selectedTemplate}
              setShowFormsTableAnchor={setShowFormsTableAnchor}
              showFormsTableAnchor={showFormsTableAnchor}
          />
          {
              showModalAnchor && (
                  <ImageUploadModal open={showModalAnchor} handleClose={setShowModalAnchor}/>
              )
          }
          {
              imgUrl && (
                  <div className="card mb-2 card-background" style={{backgroundImage: `url(${imgUrl})`}}></div>
              )
          }
          <TemplateHeader headerName={headerName} showFilledFormAnchor={showFilledFormAnchor}/>
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
          <MessageBlock message={message} />
      </div>
  );
}

export default CustomTemplateEditor;