import React, {useEffect} from 'react';
import Paper from "@mui/material/Paper";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {getData} from "../../../Requests";
import { READ_ICON_URL} from "../../../url/url";
function FormsTable(props) {

	const { id, handleFilledForm, forms, setForms } = props;



	useEffect(()=>{
		const fetchData = async () => {
			try {
				const response = await getData('api/form');

				const formsData = await response.json();

				if (response.ok) {
					setForms(formsData.filter((form) => form.idTemplate === id));
					console.log("forms were fetched successfully");
				} else {
					const errorText = await response.text(); // Читаем ответ как текст
					console.log(`HTTP ошибка! статус: ${response.status}, сообщение: ${errorText}`);
				}
			} catch (error) {
				console.log({'error': error.message});
			}
		}
		fetchData();

	}, [id]);

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
										  onClick={() => handleFilledForm(form.idTemplate, form.idUser)}
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