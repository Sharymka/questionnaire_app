import {useContext, useEffect, useState} from "react";
import {getData} from "@/shared/api/requests";
import {filledForms} from "@/shared/config/forms";
import {TemplateContext} from "../../TemplateContext";

const useGetFormsByTempId = () => {

	const { selectedTempId, currentView } = useContext(TemplateContext);

	const [forms, setForms] = useState(filledForms.filter((form) => form.idTemplate === selectedTempId));
	const [loading, setLoading] = useState(true);

	useEffect(()=>{

		if (!selectedTempId &&  currentView !== "filledFormsTable") return;

		const fetchData = async () => {
			try {
				const { data, status } = await getData('/forms');
				if (status >= 200 && status < 300){
					setForms(data.filter((form) => form.idTemplate === selectedTempId));
				}
			} catch (error) {
			}finally {
				setLoading(false);
			}
		}
		fetchData();

	}, [selectedTempId]);

	return { forms, setForms, loading }
}

export default useGetFormsByTempId;