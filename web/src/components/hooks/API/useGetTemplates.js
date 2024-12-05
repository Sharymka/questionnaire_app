import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {temp} from "../../../const/temp";

const useGetTemplates = () => {

	const [templates, setTemplates] = useState(temp);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getData("api/templates");
				const data = await response.json();
				if(response.ok) {
					setTemplates(data);
					console.log("templates were fetched successfully");
				} else {
					console.log(data.error);
					console.log("template getting failed");
				}
			}catch(error) {
				console.log("template getting failed");
			}finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	return { templates, setTemplates, loading };
};

export default useGetTemplates;