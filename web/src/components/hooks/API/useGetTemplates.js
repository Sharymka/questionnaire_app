import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {templates} from "../../../const/templates";

const useGetTemplates = () => {

	const [myTemplates, setMyTemplates] = useState(templates);
	const [loading, setLoading] = useState(true);
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getData("api/templates");
				const data = await response.json();
				if(response.ok) {
					// console.log('userId - ' + user.id);
					setMyTemplates(data.filter((template) => template.userId === user.id));
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

	return { myTemplates, setMyTemplates,  loading };
};

export default useGetTemplates;