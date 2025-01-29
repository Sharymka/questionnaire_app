import {useContext, useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {temp} from "../../../const/temp";
import {TemplateContext} from "../../contexts/TemplateContext";
const useGetTemplateById = () => {

	const { selectedTempId } = useContext(TemplateContext)
	const [template, setTemplate] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (selectedTempId) {
			const matchedTemplate = temp.find(template => template.id === Number(selectedTempId));
			setTemplate(matchedTemplate);
			setLoading(false);
		}
	}, [selectedTempId]);
	

	useEffect(() => {

		const fetchData = async () => {
			try {
				const response = await getData(`/api/template/${selectedTempId}`);
				const data = await response.json();

				if(response.ok) {
					setTemplate(data);
				} else {
					console.log(data.error);
					console.log("template getting failed");
				}
			} catch (error) {
				console.error('Error fetching template data:', error);
			}finally {
				setLoading(false);
			}
		};

		if(selectedTempId) {
			fetchData();
		}

	}, []);

	return { template, setTemplate, loading }
}

export default useGetTemplateById;