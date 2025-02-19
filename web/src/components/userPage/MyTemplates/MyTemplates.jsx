import React, {useContext, useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomToolBlock from "../Template/CustomToolBlock";
import Template from "../Template/Template";
import {questionTopics} from "../../../const/const";
import FormsTable from "./FormsTable";
import FilledForm from "./FilledForm";
import {TemplateContext} from "../../contexts/TemplateContext";
import {HistoryContext} from "../../contexts/HistoryContext";
import useActionsTemplates from "../../hooks/useActionsTemplates";
import SidePanel from "../Template/SidePanel";

function MyTemplates(props) {

	const { forms } = props;
	const { config, currentView, setSelectedTempId, setQuestionStatus, templates } = useContext(TemplateContext);
	const { pushView } = useContext(HistoryContext);
	const user = JSON.parse(localStorage.getItem('user')) ?? { id:1 };

	const [myTemplates, setMyTemplates] = useState([]);

	useEffect(() => {
		if (templates) {
			setMyTemplates(templates.filter((template) => template.userId === user.id));
		}
	}, [templates]);

	const handleEditOnClick = (id, newView) => {
		setSelectedTempId(id);
		pushView(newView);
	}

	const handleShowForms = (id, newView, questionState) => {
		pushView(newView);
		setQuestionStatus(questionState);
		setSelectedTempId(id);
	}

	const {
		deleteTemplate
	} = useActionsTemplates();

	const {
		showModalAnchor,
		setShowModalAnchor,
		loading
	      } = props;


  return (<div>
	  {
		  <div class="relativePosition">
			  {
				  loading && myTemplates.length === 0 ? (
					  <div>Loading...</div>
				  ) : (
					  <>
						  {currentView === 'templatesTable' && (
							  <TableContainer key="TableContainer" data-context="TableContainer" component={Paper}>
								  <Table sx={{minWidth: 650}} aria-label="border-radius-8 forms table">
									  <TableHead>
										  <TableRow>
											  <TableCell>
												  <Typography variant="h6">Название</Typography>
											  </TableCell>
											  <TableCell align="center">
												  <Typography variant="h6">Тема</Typography>
											  </TableCell>
											  <TableCell align="center">
												  <Typography variant="h6">Описание</Typography>
											  </TableCell>
											  <TableCell align="center">
												  <Typography variant="h6">Количество вопросов</Typography>
											  </TableCell>
											  <TableCell></TableCell>
										  </TableRow>
									  </TableHead>
									  <TableBody>
										  {myTemplates?.map(
											  (template) =>
												  !template.disabled && (
													  <TableRow className="table-row" key={template.id}>
														  <TableCell component="th" scope="row">
															  {template.title}
														  </TableCell>
														  <TableCell
															  align="center">{questionTopics[template.topic]}</TableCell>
														  <TableCell align="center">
															  {template.description.split(' ').slice(0, 5).join(' ') +
																  (template.description.split(' ').length > 5 ? '...' : '')}
														  </TableCell>
														  <TableCell align="center">{template.questions.length}</TableCell>
														  <TableCell component="th" scope="row">
															  <CustomToolBlock
																  showForms={true}
																  handleEditOnClick={() => handleEditOnClick(template.id, 'templateEditor')}
																  handleDeleteOnClick={() => deleteTemplate(template.id)}
																  handleShowForms={() => handleShowForms(template.id, 'filledFormsTable', 'readOnly')}
															  />
														  </TableCell>
													  </TableRow>
												  )
										  )}
									  </TableBody>
								  </Table>
							  </TableContainer>
						  )}
						  {currentView === 'templateEditor' &&
							  <Template
								  headerName="Моя форма"
								  btnName="Сохранить изменения"
								  config={config}
								  showModalAnchor={showModalAnchor}
								  setShowModalAnchor={setShowModalAnchor}
							  />
						  }
						  {
							  currentView === 'filledFormsTable' &&
							  <FormsTable
								  forms={forms}
							  />
						  }
						  {
							  currentView === 'filledForm' &&
							  <FilledForm
							  />
						  }
						  <SidePanel
						  />
					  </>
				  )
			  }
		  </div>
	  }
  </div>);
}

export default MyTemplates;