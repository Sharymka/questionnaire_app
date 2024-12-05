import {useEffect, useState} from "react";
import {temp} from "../../../const/temp";
import {getData} from "../../../Requests";
const useGetTemplateById = (templateId = null) => {

	const [template, setTemplate] = useState(temp.find(template => template.id === templateId));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (templateId) {
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
		}
	}, []);

	return { template, setTemplate, loading }
}

export default useGetTemplateById;