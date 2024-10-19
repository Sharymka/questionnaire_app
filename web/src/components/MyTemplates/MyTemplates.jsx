import React, {useContext, useEffect, useState} from 'react';
import {getData, postData} from "../../Requests";
import {TemplateContext} from "../Template/TemplateContext";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import CustomToolBlock from "../ReusableComponents/CustomToolBlock";
import TemplateEditor from "./TemplateEditor";
import {templates} from "../../const/templates";

function MyTemplates(props) {

	const [editorAnchor, setEditorAnchor] = useState(false);
	const [temp, setTemp] = useState(templates);
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getData("api/template");
				const data = await response.json();
				if(response.ok) {
					console.log(data);
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
	}, []);
	const handleDeleteTemplate = async(id) => {
		try {
			const response = await postData(`api/template/${id}`, 'DELETE');
			const data = await response.json();
			if(response.ok) {
				console.log("template was deleted successfully");
			}else{
				console.log("template deleting failed");
			}
		}catch (error) {
			console.log(error);
		}
	}

	const handleEditorAnchor = (templateId) => {
		setSelectedTemplate(templates.find((item, index) => item.id === templateId));
		console.log("handleEditorAnchor", selectedTemplate);
		setEditorAnchor(true);
	};

  return (<div>
	  {
		  editorAnchor? (
			  <TemplateEditor setSelectedTemplate={setSelectedTemplate} selectedTemplate={selectedTemplate}/>
		  ): (
		  <TableContainer component={Paper}>
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
				  {temp.map((template, index) => (
					  <TableRow   className="table-row" key={template.title}>
						  <TableCell  component="th" scope="row">
							  {template.title}
						  </TableCell>
						  <TableCell  align="center">{template.topic}</TableCell>
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
	  }

  </div>);
}

export default MyTemplates;