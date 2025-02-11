import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {filledForms} from "../../../const/forms";
import {transformForm} from "../../../utilits/transformForm";

const useGetFormById =  (filledFormId) => {

	const [form, setForm] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const matchedForm = filledForms.find((form) => form.id === filledFormId);
		const transformedForm = transformForm(matchedForm);
		setForm(transformedForm);
	}, []);

	useEffect(()=>{
		const fetchData = async () => {
			try {
				const response = await getData(`api/form/${filledFormId}`);

				const formsData = await response.json();

				if (response.ok) {
					// const matchedForm =  formsData.find((form) => form.id === filledFormId);
					const transformedForm = transformForm(formsData);
					setForm(transformedForm);
				} else {
					const errorText = await response.text();
					console.log(`HTTP error! status: ${response.status}, message: ${errorText}`);
				}
			} catch (error) {
				console.log({'error': error.message});
			}finally {
				setLoading(false);
			}
		}
		fetchData();

	}, []);

	return { form, loading, setLoading }
}

export default useGetFormById;