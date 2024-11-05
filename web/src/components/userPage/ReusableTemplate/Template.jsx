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
import withDataAttributes from "../../hocs/withDataAttributes";

function Template(props) {

  const {
      headerName,
      btnName,
      data,
      actions,
      url,
      selectedTemplate,
      // showFormsTableAnchor,
      setEditorAnchor,
      // setShowFormsTableAnchor,
      showFilledFormAnchor
  } = props;

    const {
        questions,
        setQuestions,
        saveTemplate,
        handleAddQuestion,
        // questionTemplateAnchor,
        // setQuestionTemplateAnchor,
        imgUrl,
        message
    } = useContext(TemplateContext);

  const [showModalAnchor, setShowModalAnchor] = useState(false);
  const [questionTemplateAnchor, setQuestionTemplateAnchor ] = useState(false);

  const renderImageUploadModal = () => (
        showModalAnchor && <ImageUploadModal open={showModalAnchor} handleClose={setShowModalAnchor} />
  );

  const renderImageCard = () => (
        imgUrl && <div className="card mb-2 card-background" style={{ backgroundImage: `url(${imgUrl})` }}></div>
  );

  const renderQuestionTemplate = () => (
      questionTemplateAnchor ? (
              <div className="card d-flex flex-column p-4 gap-5 mt-3 relativePosition">
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
      ): null

  );


    return (
        <div>
            <SidePanel
                showImgModalOnClick={setShowModalAnchor}
                setQuestionTemplateAnchor={setQuestionTemplateAnchor}
                questionTemplateAnchor={questionTemplateAnchor}
                // selectedTemplate={selectedTemplate}
                // setShowFormsTableAnchor={setShowFormsTableAnchor}
                // showFormsTableAnchor={showFormsTableAnchor}
            />
            <>
              {renderImageUploadModal()}
              {renderImageCard()}
          </>
          <TemplateHeader
              headerName={headerName}
              data={data}
              actions={actions}
              // filledForm
              // showFilledFormAnchor={showFilledFormAnchor}
          />
          <QuestionList setQuestions={setQuestions} questions={questions}/>
          {renderQuestionTemplate()}
          <div  className="card p-4 mt-3">
              <div className="d-flex justify-content-end">
                  <Button className='p-3 btn-primary'
                          variant="contained"
                          onClick={() => {
                              setEditorAnchor && setEditorAnchor(false)
                              saveTemplate(`${url}${selectedTemplate ? `/${selectedTemplate.id}` : ''}`)
                          }
                          }
                  >
                      {btnName}
                  </Button>
              </div>
          </div>
          <MessageBlock message={message}/>
      </div>
  );
}

Template.displayName = "Template";
export default withDataAttributes(Template);