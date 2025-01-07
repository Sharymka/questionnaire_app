import React, {useContext, useEffect, useState} from 'react';
import {deleteData} from "../../../Requests";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomToolBlock from "../Template/CustomToolBlock";
import Template from "../Template/Template";
import {questionTopics} from "../../../const/const";
import useGetTemplates from "../../hooks/API/useGetTemplates";
import FormsTable from "./FormsTable";
import FilledForm from "./FilledForm";
import {TemplateContext} from "../../contexts/TemplateContext";
import useActionsTemplates from "../../hooks/useActionsTemplates";

function MyTemplates(props) {

	const { view, setView } = props;
	const { config } = useContext(TemplateContext);
	const [filledFormId, setFilledFormId] = useState(null);

	const {
		myTemplates,
		selectedTempId,
		handleEditOnClick,
		handleDeleteTemplate,
		handleShowForms,
		loading
	      } = useActionsTemplates(setView);

  return (<div>
	  {
		  <div>
			  {
				  loading && myTemplates.length === 0 ? (
					  <div>Loading...</div>
				  ) : (
					  <>
						  {view === 'table' && (
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
																  handleDeleteOnClick={() => handleDeleteTemplate(template.id)}
																  handleEditOnClick={() => handleEditOnClick(template.id)}
																  // handleShowForms={()=> {
																	//   setView('showFormsTable');
																	//   setSelectedTempId(template.id);
																  // }}
															  />
														  </TableCell>
													  </TableRow>
												  )
										  )}
									  </TableBody>
								  </Table>
							  </TableContainer>
						  )}
						  {view === 'editor' &&
							  <Template
								  headerName="Моя форма"
								  btnName="Сохранить изменения"
								  templateId={selectedTempId}
								  config={config}
							  />
						  }
						  {
							  view === 'showFormsTable' &&
							  <FormsTable
								  templateId={selectedTempId}
								  setView={setView}
								  view='showForm'
								  setFilledFormId={setFilledFormId}
							  />
						  }
						  {
							  view === 'showForm' &&
							  <FilledForm
								  filledFormId={filledFormId}
							  />
						  }
					  </>
				  )
			  }
		  </div>

		  // )
		  // )
	  }


  </div>);
}

export default MyTemplates;