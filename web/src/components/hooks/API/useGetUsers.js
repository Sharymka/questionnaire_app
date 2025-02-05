import { useState, useEffect } from 'react';
import { postData } from '../../../Requests';
import {users} from "../../../const/const";

const useGetUsers = (requestData) => {
	const [usersData, setUsersData] = useState(users);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await postData('api/users', requestData);
				const data = await response.json();
				if(response.ok) {
					setUsersData(data);
					console.log("users were fetched successfully", data);
				} else {
					console.log("users getting failed", data.error);
				}
			}catch(error) {
				console.log("users getting failed", error.message);
			}
		};
		fetchUsers();
	}, []);

	return { usersData };
};

export default useGetUsers;
