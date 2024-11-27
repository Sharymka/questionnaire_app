import React, { useEffect, useState} from "react";
import {getData, postData} from "../../../Requests";
import {templates} from "../../../const/templates";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState('education');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [imgUrl, setImgUrl] = useState('');
	const [temp, setTemp] = useState(templates);
	const [filteredTemp, setFilteredTemp] = useState(templates);
	const [questions, setQuestions] = useState([]);
	const [message, setMessage] = useState('');
	const [markdownHover, setMarkdownHover] = useState([]);
	const [refresh, setRefresh] = useState(true);
	const [showAllTemplates, setShowAllTemplates] = useState(false);
	const [showSelectedTemplate, setShowSelectedTemplate] = useState(false);

	// useEffect(() => {
	// 	resetTemplateStates();
	// 	resetQuestionStates();
	// }, []);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await getData("api/templates");
	// 			const data = await response.json();
	// 			if(response.ok) {
	// 				setTemp(data);
	// 				setFilteredTemp(data);
	// 				console.log("templates were fetched successfully");
	// 			} else {
	// 				console.log(data.error);
	// 				console.log("template getting failed");
	// 			}
	// 		}catch(error) {
	// 			console.log("template getting failed" + error.message);
	// 		}
	// 	}
	// 	fetchData();
	// }, [refresh]);

	const saveTemplate = async (url)=> {
		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:imgUrl
		}
		try {
			const response = await postData(url, requestData);

			const responseData = await response.json();

			if (response.ok) {
				setMessage({success: "Template was saved successfully"});
				console.log("Template was saved successfully:", responseData);
			}else {
				setMessage({error: "Template saving failed"});
				console.log("Template saving failed:", responseData.error);

			}
			setTimeout(() => {
				setMessage(null);
			}, 3000);

		}catch (error) {
			console.log("Saving Template failed:", error.message);
		}
		resetTemplateStates();
		setRefresh(!refresh);
	}

	const handleTopic = (event) => {
		setTopic(event.target.value);
	}


	const resetQuestionStates = () => {

	}

	const resetTemplateStates = ()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setTags([]);

	}

	const handleFilteredTemplate = (substring) => {

		if(substring === '') {
			setFilteredTemp(temp);
			setShowAllTemplates(false);
		}

		const selectedTemplates = temp.filter((temp) => temp.tags.some((tag) => tag.label.toLowerCase().includes(substring.toLowerCase())));
		setFilteredTemp(selectedTemplates);
	};

	const handleHoverMarkdown = (selectedId) => {
		setMarkdownHover(prevState => prevState.map((option, index) => {
			if (option.id === selectedId) {
				return {...option, value: !option.value};
			}else {
				return {...option, value: false};
			}
		}))
	}


  return (
	  <TemplateContext.Provider value={{
		  title,
		  topic,
		  description,
		  tags,
		  imgUrl,
		  setTitle,
		  setTopic,
		  setDescription,
		  setTags,
		  setImgUrl,
		  handleTopic,
		  questions,
		  setQuestions,
		  temp,
		  setTemp,
		  handleFilteredTemplate,
		  saveTemplate,
		  message,
		  markdownHover,
		  setMarkdownHover,
		  handleHoverMarkdown,
		  refresh,
		  showAllTemplates,
		  setShowAllTemplates,
		  filteredTemp,
		  showSelectedTemplate,
		  setShowSelectedTemplate,
		  resetTemplateStates
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;