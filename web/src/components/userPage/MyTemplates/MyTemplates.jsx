import React, {useContext, useEffect, useState} from 'react';
import {deleteData, getData} from "../../../Requests";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import CustomToolBlock from "../ReusableTemplate/body/realQuestions/CustomToolBlock";
import {templates} from "../../../const/templates";
import {SAVE_EDITED_TEMPLATE_URL} from "../../../url/url";
import Template from "../ReusableTemplate/Template";
import FormsTable from "./FormsTable";
import {filledForms} from "../../../const/forms";
import FilledForm from "./FilledForm";
import {questionTopics} from "../../../const/const";
import {TemplateContext} from "../contexts/TemplateContext";

function MyTemplates(props) {

	const { refresh } = useContext(TemplateContext);
	const {
		editorAnchor,
		setEditorAnchor,
		showFormsTableAnchor,
		setShowFormsTableAnchor,
		setShowFilledFormAnchor,
		showFilledFormAnchor
	} = props;

	const [temp, setTemp] = useState(templates);
	const [selectedTemplate, setSelectedTemplate] = useState({});
	const [forms, setForms] = useState(filledForms);
	const [filledForm,setFilledForm] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getData("api/template");
				const data = await response.json();
				if(response.ok) {
					setTemp(data);
					console.log("templates were fetched successfully");
				} else {
					console.log(data.error);
					console.log("template getting failed");
				}
			}catch(error) {
				console.log("template getting failed" + error.message);
			}
		}
		fetchData();
	}, [refresh]);

	const handleDeleteTemplate = async(id) => {
		try {
			const response = await deleteData(`api/template/${id}`);
			const data = await response.json();
			if(response.ok) {
				setTemp(prevState =>
					prevState.filter((item) => item.id !== id) );
				console.log("template was deleted successfully");
			}else{
				console.log("template deleting failed");
			}
		}catch (error) {
			console.log(error);
		}
	}

	const handleEditorAnchor = (templateId) => {
		console.log('templateId - ' + templateId);
		setSelectedTemplate(temp.find((item, index) => item.id ===templateId));
		setEditorAnchor(true);
	};

	const handleFilledForm = (idTemplate, idUser) => {
		 setFilledForm(forms.find((item, index) => item.idTemplate === idTemplate && item.idUser === idUser));
		 setShowFormsTableAnchor(false);
		 setEditorAnchor(false);
		 setShowFilledFormAnchor(true);
	}

  return (<div>
	  {
		  showFormsTableAnchor ? (
			  <FormsTable
				  data-content="FormsTable"
				  forms={forms}
			      setForms={setForms}
			      id={selectedTemplate.id}
			      handleFilledForm={handleFilledForm}
			  />
		  ):showFilledFormAnchor && filledForm ?(
			  <FilledForm filledForm={filledForm} showFilledFormAnchor={showFilledFormAnchor}/>
		  ): (
			  editorAnchor ? (
				  <Template
					  data-content="Template"
					  selectedTemplate={selectedTemplate}
					  showFormsTableAnchor={showFormsTableAnchor}
					  showFilledFormAnchor={showFilledFormAnchor}
					  setShowFormsTableAnchor={setShowFormsTableAnchor}
					  url={SAVE_EDITED_TEMPLATE_URL}
					  btnName={"Сохранить изменения"}
					  headerName={"Шаблон"}
				  />
			  ): (
				  <TableContainer data-context="TableContainer" component={Paper}>
					  <Table sx={{ minWidth: 650 }} aria-label=" border-radius-8 forms table">
						  <TableHead>
							  <TableRow>
								  <TableCell><Typography variant="h6">Название</Typography></TableCell>
								  <TableCell align="center"><Typography variant="h6">Тема</Typography></TableCell>
								  <TableCell align="center"><Typography variant="h6">Описание</Typography></TableCell>
								  <TableCell align="center"><Typography variant="h6">Количество вопросов</Typography></TableCell>
								  <TableCell></TableCell>
							  </TableRow>
						  </TableHead>
						  <TableBody>
							  {temp?.map((template, index) => (
								  <TableRow   className="table-row" key={template.title}>
									  <TableCell  component="th" scope="row">
										  {template.title}
									  </TableCell>
									  <TableCell  align="center">{questionTopics[template.topic]}</TableCell>
									  <TableCell align="center">
										  {template.description.split(' ').slice(0, 5).join(' ') + (template.description.split(' ').length > 5 ? '...' : '')}
									  </TableCell>
									  <TableCell  align="center">{template.questions.length}</TableCell>
									  <TableCell  component="th" scope="row">
										  <CustomToolBlock
											  valueIndex={template.id}
											  onDeleteClick={handleDeleteTemplate}
											  onEditOrSaveOnClick={handleEditorAnchor}
										  />
									  </TableCell>
								  </TableRow>
							  ))}
						  </TableBody>
					  </Table>
				  </TableContainer>
			  )

		  )
	  }


  </div>);
}

export default MyTemplates;