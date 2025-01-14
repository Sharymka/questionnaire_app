import React, {useContext} from 'react';
import Paper from "@mui/material/Paper";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import { READ_ICON_URL} from "../../../url/url";
import useGetFormsByTempId from "../../hooks/API/useGetFormsByTempId";
import {HistoryContext} from "../../contexts/HistoryContext";
import {TemplateContext} from "../../contexts/TemplateContext";
function FormsTable(props) {

	const { pushView } = useContext(HistoryContext);
	const { templateId, setFilledFormId } = props;
	const { forms } = useGetFormsByTempId(templateId);

	const handleReadFormIconOnClick = (formId) => {
		setFilledFormId(formId);
		pushView('filledForm');
	}

    return (
	  <TableContainer component={Paper}>
		   <Table sx={{ minWidth: 650 }} aria-label=" border-radius-8 forms table">
		 	  <TableHead>
		 		  <TableRow>
					  <TableCell><Typography variant="h6">Название</Typography></TableCell>
		 			  <TableCell align="center"><Typography variant="h6">Тема</Typography></TableCell>
		 			  <TableCell align="center"><Typography variant="h6">Автор</Typography></TableCell>
		 			  <TableCell align="center"><Typography variant="h6">Количество вопросов</Typography></TableCell>
		 			  <TableCell></TableCell>
		 		  </TableRow>
		 	  </TableHead>
		 	  <TableBody>
		 		  {
				  forms.map((form, index) => (
						  <TableRow className="table-row" key={form.id}>
							  <TableCell align="center">{form.template.title}</TableCell>
							  <TableCell align="center">{form.template.topic}</TableCell>
							  <TableCell align="center">{form.user.first_name + " " + form.user.last_name}</TableCell>
							  <TableCell  align="center">{form.questions.length}</TableCell>
							  <TableCell component="th" scope="row">
								  <div className={`d-flex justify-content-center`}>
									  <IconButton
										  className="p-1"
										  onClick={() => handleReadFormIconOnClick(form.id)}
										  aria-label="edit"
									  >
										  <img style={{maxWidth: '22px', maxHeight: '25px'}}
										       src={READ_ICON_URL}
										       alt="Save icon"
										  />
									  </IconButton>
								  </div>
							  </TableCell>
						  </TableRow>
				      ))
			      }
		      </TableBody>
		   </Table>
	  </TableContainer>
);
}

export default FormsTable;