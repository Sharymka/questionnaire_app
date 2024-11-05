import React, { useEffect, useState} from "react";
import {getData, postData} from "../../../Requests";
import {templates} from "../../../const/templates";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = React.useState('');
	const [topic, setTopic] = React.useState('education');
	const [description, setDescription] = React.useState('');
	const [tags, setTags] = useState([]);
	const [imgUrl, setImgUrl] = React.useState('');

	const [question, setQuestion] = React.useState('');
	const [temp, setTemp] = useState(templates);
	const [filteredTemp, setFilteredTemp] = useState(templates);
	const [questions, setQuestions] = useState([]);
	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxes, setCheckboxes] = React.useState([]);
	const [accessLevel, setAccessLevel] =  useState('public');
	const [selectedUsers, setSelectedUsers] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [editorAnchor, setEditorAnchor] = React.useState(
		questions && questions.length > 0
			? questions.map((question, index) => ({ id: index, editorAnchorValue: false }))
			: []
	);
	const [privateUsersAnchor, setPrivateUsersAnchor] = React.useState(questions && questions.length > 0
		? questions.map((question, index) => ({ id: index, privateUsersAnchorValue: question?.access === "restricted" }))
		: [] );

	const [markdownHover, setMarkdownHover] = React.useState([]);
	const [refresh, setRefresh] = React.useState(true);
	const [showAllTemplates, setShowAllTemplates] = useState(false);
	const [showSelectedTemplate, setShowSelectedTemplate] = useState(false);

	useEffect(() => {
		resetTemplateStates();
		resetQuestionStates();
		resetEditorAnchor();
	}, []);

	useEffect(() => {
		if (questions.length !== editorAnchor.length) {
			setEditorAnchor(
				questions.map((question, index) => ({
					id: index,
					editorAnchorValue: editorAnchor[index]?.editorAnchorValue || false
				}))
			);
		}

		setPrivateUsersAnchor(
			questions.map((question, index) => ({
				id: index,
				privateUsersAnchorValue: question?.access === "restricted"
			}))
		);

		if (checkboxes.length !== markdownHover.length) {
			setMarkdownHover(
				checkboxes.map((option, index) => ({
					id: option.id,
					value: option[index]?.value || false
				}))
			);
		}

	}, [questions, checkboxes]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getData("api/template");
				const data = await response.json();
				if(response.ok) {
					setTemp(data);
					setFilteredTemp(data);
					console.log("templates were fetched successfully");
				} else {
					console.log(data.error);
					console.log("template getting failed");
				}
			}catch(error) {
				console.log("template getting failed" + error.message);
			}
		}
		fetchData();
	}, [refresh]);

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
			console.log("Registered failed:", error.message);
		}

		resetTemplateStates();
		setRefresh(!refresh);


	}

	const handleTopic = (event) => {
		setTopic(event.target.value);
	}

	const handleAnswerType = (value) => {

		setAnswerType(value);
		value === 'checkboxes' || setCheckboxes([]);
	}





	const handleAddQuestion = () => {
		// setQuestions((prevState) => [...prevState, {
		// 	name: question,
		// 	answerType: answerType,
		// 	checkboxes: checkboxes,
		// 	access: accessLevel,
		// 	selectedUsers: selectedUsers,
		// }])
		setQuestions((prevState) => {
			const updatedQuestions = [...prevState];
			const lastIndex = updatedQuestions.length - 1;
			updatedQuestions[lastIndex] = {
				...updatedQuestions[lastIndex],
				add: 'true',
			};

			return updatedQuestions;
		});




		// setQuestionTemplateAnchor(false);
		resetEditorAnchor();
		resetQuestionStates();
	}

	const handleDeleteQuestion = (questionIndex) => {
		setQuestions(prevState => prevState.filter((question, index) => index !== questionIndex))
	}

	const resetQuestionStates = () => {
		setQuestion('');
		setAnswerType('singleLine');
		setAccessLevel('public');
		setCheckboxes([]);
		setSelectedUsers([]);
		// setShowUsers(false);
	}

	const resetTemplateStates = ()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setTags([]);
		// setShowUsers(false);

	}

	const resetEditorAnchor = () => {
		setEditorAnchor((prevState) => prevState.map((option, index)=> {
			return {...option, editorAnchorValue: false};
		}))
	}

	const handleEditQuestion = (newValue, selectedIndex, field) => {
		setQuestions((prevState) =>
			prevState.map((option, index) =>
				selectedIndex === index
					? { ...option, [field]: newValue }
					: option
			)
		);
	}

	const handleFilteredTemplate = (substring) => {

		if(substring === '') {
			setFilteredTemp(temp);
			setShowAllTemplates(false);
		}

		const selectedTemplates = temp.filter((temp) => temp.tags.some((tag) => tag.label.toLowerCase().includes(substring.toLowerCase())));
		setFilteredTemp(selectedTemplates);
	};



	const handleEditorAnchor = (questionIndex) => {
		setEditorAnchor((prevState) =>
			prevState.map((item) => {
				if(item.id === questionIndex) {
					return {...item, editorAnchorValue: !item.editorAnchorValue}
				}else {
					return {...item, editorAnchorValue: false};
				}
			}));
	}

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
		  setQuestion,
		  question,
		  answerType,
		  handleAnswerType,
		  checkboxes,
		  setCheckboxes,
		  // handleCheckboxes,
		  // handleAddCheckboxOption,
		  // handleDeleteCheckboxOption,
		  // handleCheckboxTextField,
		  accessLevel,
		  setAccessLevel,
		  selectedUsers,
		  setSelectedUsers,
		  questions,
		  setQuestions,
		  temp,
		  setTemp,
		  handleFilteredTemplate,
		  handleAddQuestion,
		  handleEditQuestion,
		  handleEditorAnchor,
		  handleDeleteQuestion,
		  editorAnchor,
		  // handleAccessLevel,
		  // showUsers,
		  privateUsersAnchor,
		  setPrivateUsersAnchor,
		  saveTemplate,
		  // questionTemplateAnchor,
		  // setQuestionTemplateAnchor,
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
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;