import React, {useContext, useEffect, useState} from 'react';
import {deleteData, getData} from "../../../Requests";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomToolBlock from "../ReusableTemplate/body/realQuestions/CustomToolBlock";
import {SAVE_EDITED_TEMPLATE_URL} from "../../../url/url";
import Template from "../ReusableTemplate/Template";
import FormsTable from "./FormsTable";
import {filledForms} from "../../../const/forms";
import FilledForm from "./FilledForm";
import {questionTopics} from "../../../const/const";
import useGetTemplates from "../../hooks/API/useGetTemplates";

function MyTemplates(props) {


	const [selectedTempId, setSelectedTempId] = useState(null);
	const [forms, setForms] = useState(filledForms);
	const [filledForm,setFilledForm] = useState({});
	const { myTemplates, setMyTemplates } = useGetTemplates();
	const [view, setView] = useState('table');

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

	const handleFilledForm = (idTemplate, idUser) => {
		 setFilledForm(forms.find((item, index) => item.idTemplate === idTemplate && item.idUser === idUser));
		 // setShowFormsTableAnchor(false);
		 // setEditorAnchor(false);
		 // setShowFilledFormAnchor(true);
	}

  return (<div>
	  {
		  // showFormsTableAnchor ? (
		  //   <FormsTable
		  // 	  key="FormsTable"
		  // 	  data-content="FormsTable"
		  // 	  forms={forms}
		  //       setForms={setForms}
		  //       id={selectedTemplate.id}
		  //       handleFilledForm={handleFilledForm}
		  //   />
		  // ):showFilledFormAnchor && filledForm ?(
		  //   <FilledForm  key="FilledForm" filledForm={filledForm} showFilledFormAnchor={showFilledFormAnchor}/>
		  // ): (
		  //   editorAnchor ? (
		  //   isLoading? (
		  // 		  <p>Loading templates...</p>
		  // 	  ): (
		  // 	  <Template
		  // 		  data-content="Template"
		  // 		  key="Template"
		  // 		  editorAnchor={editorAnchor}
		  // 		  setEditorAnchor={setEditorAnchor}
		  // 		  selectedTemplate={selectedTemplate}
		  // 		  showFormsTableAnchor={showFormsTableAnchor}
		  // 		  showFilledFormAnchor={showFilledFormAnchor}
		  // 		  setShowFormsTableAnchor={setShowFormsTableAnchor}
		  // 		  url={SAVE_EDITED_TEMPLATE_URL}
		  // 		  btnName={"Сохранить изменения"}
		  // 		  headerName={"Шаблон"}
		  // 	  />
		  // 	  )
		  //
		  //   ):
		  // 	  isLoading? (
		  // 		  <p>Loading templates...</p>
		  // 	  ):
		  // 	  (

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
																  value={template}
																  handleDeleteOnClick={() => handleDeleteTemplate(template.id)}
																  handleEditOnClick={() => {
																	  setView('editor');
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
						  {view === 'editor' && <Template templateId={selectedTempId}/>}
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