import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {temp} from "../../../const/temp";

const  useGetTemplates = () => {

	const [ temps, setTemps] = useState(temp);
	const [refreshTemps, setRefreshTemps] = useState(false);

	useEffect(() => {
		const fetchTemps = async () => {
			try {
				const response = await getData("api/templates");
				const data = await response.json();
				if(response.ok) {
					setTemps(data);
					console.log("templates were fetched successfully", data);
				} else {
					console.log("template getting failed", data.error);
				}
			}catch(error) {
				console.log("template getting failed", error.message);
			}
		}
		fetchTemps();
	}, [refreshTemps]);


	return {
		temps,
		refreshTemps,
		setRefreshTemps
	}
};

export default useGetTemplates;