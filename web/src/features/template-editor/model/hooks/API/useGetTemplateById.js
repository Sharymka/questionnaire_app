import {useContext, useEffect, useState} from "react";
import {getData} from "@/shared/api/requests";
import {TemplateContext} from "../../TemplateContext";
import {temp} from "@/shared/config/temp";
const useGetTemplateById = () => {

	const { selectedTempId, currentView } = useContext(TemplateContext);
	const [template, setTemplate] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if(currentView === 'templateEditor' || currentView === 'form') {
				try {
					const { data, status} = await getData(`/template/${selectedTempId}`);

					if (status >= 200 && status < 300){
						setTemplate(data);
					}
				} catch (error) {
					setTemplate(temp.find(item=> item.id === selectedTempId));
				}
			}

		};
		fetchData();
	}, []);

	return { template, setTemplate }
}

export default useGetTemplateById;