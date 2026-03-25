import React, {useContext, useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomToolBlock from "@/features/template-editor/ui/template/CustomToolBlock";
import Template from "@/features/template-editor/ui/template/Template";
import {questionTopics} from "@/shared/config/const";
import FormsTable from "./FormsTable";
import {TemplateContext} from "@/features/template-editor/model/TemplateContext";
import {HistoryContext} from "@/features/history-navigation/model/HistoryContext";
import useActionsTemplates from "@/features/template-editor/model/hooks/useActionsTemplates";
import useGetFormsByTempId from "@/features/template-editor/model/hooks/API/useGetFormsByTempId";

function MyTemplates() {

	const { forms, loading } = useGetFormsByTempId();
	const { currentView, setSelectedTempId, setQuestionStatus, templates } = useContext(TemplateContext);
	const { pushView } = useContext(HistoryContext);
	const authUserData = JSON.parse(localStorage.getItem('user')) ?? { user: {id: 1} };

	const [myTemplates, setMyTemplates] = useState([]);

	useEffect(() => {
		if (templates) {
			setMyTemplates(templates.filter((template) => template.userId === authUserData.user.id));
		}
	}, [templates]);

	const handleEditOnClick = (id, newView) => {
		setSelectedTempId(id);
		localStorage.setItem('tempId',  JSON.stringify(id));
		pushView(newView);
	}

	const handleShowForms = (id, newView, questionState) => {
		setSelectedTempId(id);
		localStorage.setItem('tempId',  JSON.stringify(id));
		pushView(newView);
		setQuestionStatus(questionState);
	}

	const {
		deleteTemplate
	} = useActionsTemplates();

  return (<div>
	  {
		  <div className="relativePosition">
			  {
				   myTemplates.length === 0 ? (
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
							  />
						  }
						  {
							  currentView === 'filledFormsTable' &&
							  <FormsTable
								  forms={forms}
								  loading={loading}
							  />
						  }
						  {
							  currentView === 'filledForm' &&
							  <Template/>
						  }
					  </>
				  )
			  }
		  </div>
	  }
  </div>);
}

export default MyTemplates;