import { useState, useEffect } from 'react';
import { postData } from '../../../Requests';
import {users} from "../../../const/const";

const useGetUsers = (requestData) => {
	const [usersData, setUsersData] = useState(users);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await postData('api/users', requestData);
				const data = await response.json();
				setUsersData(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, []);

	return { usersData, loading, error };
};

export default useGetUsers;
