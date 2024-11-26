import {useContext, useEffect, useState} from "react";
import {useSetTempDataToState} from "../useSetTempDataToState";
import {templates} from "../../../const/templates";
import {getData} from "../../../Requests";
import {TemplateContext} from "../../userPage/contexts/TemplateContext";

const useGetTemplate = (templateId = null) => {

	const [myTemplate, setMyTemplate] = useState(templates.find(template => template.id === templateId));
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		if (templateId) {
			const fetchData = async () => {
				try {
					const response = await getData(`/api/template/${templateId}`);
					const data = await response.json();

					if(response.ok) {
						setMyTemplate(data);
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

	return { myTemplate, setMyTemplate, loading }
}

export default useGetTemplate;