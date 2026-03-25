import { useState, useEffect } from 'react';
import {getData} from '@/shared/api/requests';
import {users} from "@/shared/config/const";

const useGetUsers = () => {
	const [usersData, setUsersData] = useState(users);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data, status } = await getData('/users');
				if (status >= 200 && status < 300)  {
					setUsersData(data);
				}
			}catch(error) {
			}
		};
		fetchUsers();
	}, []);

	return { usersData };
};

export default useGetUsers;
