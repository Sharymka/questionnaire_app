import {useContext, useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {transformForm} from "../../../utilits/transformForm";
import {TemplateContext} from "../../contexts/TemplateContext";

const useGetFormById =  () => {

	const { filledFormId, currentView} = useContext(TemplateContext);
	const [form, setForm] = useState(null);

	useEffect(()=>{
			const fetchData = async () => {
				if(currentView === 'filledForm') {
					try {
						const { data, status } = await getData(`api/form/${filledFormId}`);
						if (status >= 200 && status < 300)  {
							const transformedForm = transformForm(data);
							setForm(transformedForm);
						} else {
							console.log("form getting failed:", data.error);
						}
					} catch (error) {
						console.log("error:", error.response.data.message || error.message);
					}
				}
			}

		fetchData();

	}, []);

	return { form }
}

export default useGetFormById;