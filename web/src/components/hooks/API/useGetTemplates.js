import {useEffect, useState} from "react";
import {getData} from "../../../Requests";
import {temp} from "../../../const/temp";

const  useGetTemplates = () => {

	const [ temps, setTemps] = useState(temp);
	const [refreshTemps, setRefreshTemps] = useState(false);

	useEffect(() => {
		const fetchTemps = async () => {
			try {
				const { data, status } = await getData("api/templates");
				if (status >= 200 && status < 300)  {
					setTemps(data);
					console.log("templates getting success:");
				} else {
					console.log("templates getting failed:", data.error);
				}
			} catch (error) {
				console.log("error:", error.response.data.message || error.message);
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