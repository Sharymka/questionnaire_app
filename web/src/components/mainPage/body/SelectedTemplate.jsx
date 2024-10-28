import React, {useContext, useEffect, useMemo, useState} from 'react';
import Header from "../head/Header";
import TemplateHeader from "../../userPage/ReusableTemplate/head/TemplateHeader";
import {useParams} from "react-router-dom";
import {TemplateContext} from "../../userPage/contexts/TemplateContext";
import {Typography} from "@mui/material";
import AnswerTextField from "../../userPage/ReusableTemplate/body/realQuestions/AnswerTextField";
import AnswerField from "../../userPage/ReusableTemplate/body/realQuestions/AnswerField";

function SelectedTemplate(prop) {

  const { id } = useParams();
  const { temp } = useContext(TemplateContext);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
	  console.log("id" + id);
	  setSelectedTemplate(temp.find((template) => template.id === parseInt(id)));
  }, [])


  return (
	  <>
		  <Header/>
		  <div className="h-100 appBackground" data-context="AllTemplatesBlock">
			  <div className=" p-5 container container_min_1200">
				  <div className=" screen_max_425 screen_min_425 ">
					  <div className=" overflow-hidden card mb-2 card-background"
					       style={{maxWidth: '1152px', backgroundImage: `url(${selectedTemplate?.img})`}}>
					  </div>
					  <TemplateHeader headerName="Шаблон" selectedTemplate={selectedTemplate}/>
					  <div  style={{maxWidth: '1152px'}} className=" w-100 d-flex flex-column gap-1">
						  {
							  selectedTemplate?.questions.map((question, index) => (
								  <>
									  <div className="card p-3">
										  <Typography
											  component="h6"
											  variant="h6"
											  className="mb-4"
										  >
											  <span>{index + 1}.</span> {' '}
											  {question?.name || "Неизвестное имя"}
										  </Typography>
										  <div className="width-50 separator">
										  </div>
										  <AnswerField questions={selectedTemplate}/>
									  </div>

								  </>

							  ))
						  }
					  </div>
				  </div>
			  </div>
		  </div>
	  </>
  );
}

export default SelectedTemplate;