import {useContext, useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {TemplateContext} from "../../contexts/TemplateContext";
import {temp} from "../../../const/temp";
const useGetTemplateById = () => {

	const { selectedTempId, currentView} = useContext(TemplateContext);
	const [template, setTemplate] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if(currentView === 'templateEditor' || currentView === 'form') {
				try {
					const { data, status} = await getData(`/api/template/${selectedTempId}`);

					if (status >= 200 && status < 300){
						setTemplate(data);
						console.log("template getting success:", data);
					} else {
						console.log("template getting failed:", data.error);
					}
				} catch (error) {
					setTemplate(temp.find(item=> item.id === selectedTempId));
					console.log("error:", error.response.data.message || error.message);
				}
			}

		};
		fetchData();
	}, []);

	return { template, setTemplate }
}

export default useGetTemplateById;