import React, {useContext, useEffect, useState} from 'react';
import TemplateHeader from "./TemplateHeader";
import {TemplateContext} from "../Template/TemplateContext";
import QuestionList from "../Template/QuestionBlock/QuestionList";
import {templates} from "../../const/templates";
import SidePanel from "../Template/SidePanel";
import QuestionTemplateBlock from "../Template/QuestionBlock/QuestionTemplateBlock";
import {Box, IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TemplateEditor(props) {

  const { selectedTemplate, setSelectedTemplate } = props;
  const { questions, setQuestions, setTitle, setTopic, setDescription, setSelectedTags, handleAddQuestion } = useContext(TemplateContext);
  const [ questionTemplateAnchor, setQuestionTemplateAnchor ] = useState(false);

  const handleQuestionTemplateAnchor = () => {
    setQuestionTemplateAnchor(true);
  }

  useEffect(() => {
    setTitle(selectedTemplate.title);
    setTopic(selectedTemplate.topic);
    setDescription(selectedTemplate.description);
    console.log(selectedTemplate.selectedTags);
    setSelectedTags(selectedTemplate.selectedTags);
    setQuestions(templates[selectedTemplate.id - 1].questions);
  }, [])

  return (
      <div>
          <SidePanel handleAddQuestion={handleQuestionTemplateAnchor}/>
          <TemplateHeader/>
          <QuestionList questions={questions}/>
          {
            questionTemplateAnchor && (
                  <div className="p-4 card d-flex flex-column gap-5 mt-3 relativePosition">
                      <div  className="absolute_right_corner_pos">
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
     </div>
  );
}

export default TemplateEditor;