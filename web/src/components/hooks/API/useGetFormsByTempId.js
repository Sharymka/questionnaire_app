import {useContext, useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {filledForms} from "../../../const/forms";
import {TemplateContext} from "../../contexts/TemplateContext";

const useGetFormsByTempId = () => {

	const { selectedTempId, currentView } = useContext(TemplateContext);
	const [forms, setForms] = useState(filledForms.filter((form) => form.idTemplate === selectedTempId));
	const [loading, setLoading] = useState(true);

	useEffect(()=>{

		if (!selectedTempId &&  currentView !== "filledFormsTable") return;

		const fetchData = async () => {
			try {
				const { data, status } = await getData('api/forms');
				if (status >= 200 && status < 300)  {
					setForms(data.filter((form) => form.idTemplate === selectedTempId));
				} else {
					console.log("forms getting failed:", data.error);
				}
			} catch (error) {
				console.log("error:", error.response.data.message || error.message);
			}finally {
				setLoading(false);
			}
		}
		fetchData();

	}, [selectedTempId]);

	return { forms, setForms, loading }
}

export default useGetFormsByTempId;