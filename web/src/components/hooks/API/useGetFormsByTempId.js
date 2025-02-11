import {useContext, useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {filledForms} from "../../../const/forms";
import {TemplateContext} from "../../contexts/TemplateContext";

const useGetFormsByTempId = () => {

	const { selectedTempId } = useContext(TemplateContext);
	const [forms, setForms] = useState(filledForms.filter((form) => form.idTemplate === selectedTempId));

	useEffect(()=>{

		if (!selectedTempId) return;

		const fetchData = async () => {
			try {
				const response = await getData('api/form');

				const formsData = await response.json();

				if (response.ok) {
					setForms(formsData.filter((form) => form.idTemplate === selectedTempId));
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

	}, [selectedTempId]);

	return { forms, setForms }
}

export default useGetFormsByTempId;