import React, {useState} from 'react';
import {deleteData} from "../../../Requests";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomToolBlock from "../ReusableTemplate/body/realQuestions/CustomToolBlock";
import Template from "../ReusableTemplate/Template";
import {questionTopics} from "../../../const/const";
import useGetTemplates from "../../hooks/API/useGetTemplates";
import FormsTable from "./FormsTable";
import FilledForm from "./FilledForm";

function MyTemplates(props) {

	const [view, setView] = useState('table');
	const { myTemplates, setMyTemplates } = useGetTemplates();
	const [selectedTempId, setSelectedTempId] = useState(null);
	const [filledFormId, setFilledFormId] = useState(null);

	const handleDeleteTemplate = async(id) => {
		try {
			const response = await deleteData(`api/template/${id}`);
			const data = await response.json();
			if(response.ok) {
				setMyTemplates(prevState =>
					prevState.filter((item) => item.id !== id) );
				console.log("template was deleted successfully");
			}else{
				console.log("template deleting failed");
			}
		}catch (error) {
			console.log(error);
		}
	}

  return (<div>
	  {
		  <div>
			  {
				  props.loading ? (
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
																  value={template}
																  handleDeleteOnClick={() => handleDeleteTemplate(template.id)}
																  handleEditOnClick={() => {
																	  setView('editor');
																	  setSelectedTempId(template.id);
																  }}
																  handleShowForms={()=> {
																	  setView('showFormsTable');
																	  setSelectedTempId(template.id);
																  }}
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