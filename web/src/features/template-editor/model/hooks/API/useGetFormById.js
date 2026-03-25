import {useContext, useEffect, useState} from "react";
import {getData} from "@/shared/api/requests";
import {transformForm} from "@/shared/lib/utilits/transformForm";
import {TemplateContext} from "../../TemplateContext";
import {filledForms} from "@/shared/config/forms";

const useGetFormById =  () => {

	const { filledFormId, currentView} = useContext(TemplateContext);
	const [form, setForm] = useState(null);

	useEffect(()=>{
			const fetchData = async () => {
				if(currentView === 'filledForm') {
					try {
						const { data, status } = await getData(`api/form/${filledFormId}`);
						if (status >= 200 && status < 300){
							const transformedForm = transformForm(data);
							setForm(transformedForm);
						} else {
							console.log("form getting failed:", data.error);
						}
					} catch (error) {
						const transformedForm = transformForm(filledForms.find((item)=> item.id === filledFormId));
						console.log('transformedForm', transformedForm);
						setForm(transformedForm);
						console.log("error:", error.response.data.message || error.message);
					}
				}
			}

		fetchData();

	}, []);

	return { form }
}

export default useGetFormById;