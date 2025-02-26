import { useState, useEffect } from 'react';
import {getData} from '../../../Requests';
import {users} from "../../../const/const";

const useGetUsers = () => {
	const [usersData, setUsersData] = useState(users);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data, status } = await getData('api/users');
				if (status >= 200 && status < 300)  {
					setUsersData(data);
					console.log("users were fetched successfully", data);
				} else {
					console.log("users getting failed", data.error);
				}
			}catch(error) {
				console.log("error:", error.response.data.message || error.message);
			}
		};
		fetchUsers();
	}, []);

	return { usersData };
};

export default useGetUsers;
