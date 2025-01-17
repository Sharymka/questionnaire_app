import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {temp} from "../../../const/temp";
const useGetTemplateById = (templateId) => {

	const [template, setTemplate] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (templateId) {
			const matchedTemplate = temp.find(template => template.id === Number(templateId));
			setTemplate(matchedTemplate);
			setLoading(false);
		}
	}, [templateId]);
	

	useEffect(() => {

			const fetchData = async () => {
				try {
					const response = await getData(`/api/template/${templateId}`);
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

			fetchData();

	}, []);

	return { template, setTemplate, loading }
}

export default useGetTemplateById;