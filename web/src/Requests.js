import axios from "axios";

export const postData = async (url, data) => {
	try{
		return await axios.post( url, data, {
			withCredentials: true,
		});
	} catch(error){
		throw error;
	}

};

export const postFileData = async (url, data) => {
	try {
	return await axios.post( url, data, {
		withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} catch (error) {
		throw error;
	}
};


export const getData = async (url) => {
	try {
		return await axios.get(url, {
			withCredentials: true,
		});
	} catch (error) {
		throw error;
	}
};

export const deleteData = async (url) => {
	try {
		return await axios.delete( url, {
			withCredentials: true,
		});
	} catch (error) {
		throw error;
	}
};