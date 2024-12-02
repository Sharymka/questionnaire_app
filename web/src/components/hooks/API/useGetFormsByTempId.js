import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {filledForms} from "../../../const/forms";

const useGetFormsByTempId = (templateId) => {

	const [forms, setForms] = useState(filledForms.filter((form) => form.idTemplate === templateId));

	useEffect(()=>{
		const fetchData = async () => {
			try {
				const response = await getData('api/form');

				const formsData = await response.json();

				if (response.ok) {
					setForms(formsData.filter((form) => form.idTemplate === templateId));
					console.log("forms were fetched successfully");
				} else {
					const errorText = await response.text(); // Читаем ответ как текст
					console.log(`HTTP error! status: ${response.status}, message: ${errorText}`);
				}
			} catch (error) {
				console.log({'error': error.message});
			}
		}
		fetchData();

	}, []);

	return { forms, setForms }
}

export default useGetFormsByTempId;