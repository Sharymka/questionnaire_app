import React, { useEffect, useState} from "react";
import {postData} from "../../../Requests";
import {questionTopics} from "../../../const/const";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = React.useState('');
	const [topic, setTopic] = React.useState('education');
	const [description, setDescription] = React.useState('');
	const [imgUrl, setImgUrl] = React.useState('');
	const [question, setQuestion] = React.useState('');
	const [questions, setQuestions] = useState([]);
	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxes, setCheckboxes] = React.useState([]);
	const [accessLevel, setAccessLevel] =  useState('public');
	const [selectedUsers, setSelectedUsers] = React.useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [message, setMessage] = React.useState('');
	const [editorAnchor, setEditorAnchor] = React.useState(
		questions && questions.length > 0
			? questions.map((question, index) => ({ id: index, editorAnchorValue: false }))
			: []
	);
	const [showUsers , setShowUsers] = React.useState(false);
	const [privateUsersAnchor, setPrivateUsersAnchor] = React.useState(questions && questions.length > 0
		? questions.map((question, index) => ({ id: index, privateUsersAnchorValue: question?.access === "restricted" }))
		: [] );
	const [questionTemplateAnchor, setQuestionTemplateAnchor ] = useState(false);
	const [markdownHover, setMarkdownHover] = React.useState([]);
	const [refresh, setRefresh] = React.useState(true);

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

	}, [questions, checkboxes]); // Следим за изменениями questions

	const saveTemplate = async (url)=> {
		const requestData = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:selectedTags,
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

	const handleAnswerType = (event) => {
		const newAnswerType = event.target.value;
		setAnswerType(newAnswerType);
		if(newAnswerType !== 'checkboxes') {
			setCheckboxes([]);
		}
	}

	const handleCheckboxes = (event) => {
		setCheckboxes((prevState) =>
			prevState.map((option) => {
				console.log("event.target.value - " + event.target.value);
				console.log("option.id - " + option.id);
				if(option.id === parseInt(event.target.value)) {
					return {...option, selected: true}
				}else {
					return {...option, selected: false}
				}

			})
		);
	};

	const handleAddCheckboxOption = () => {
		setCheckboxes([...checkboxes, { id:checkboxes.length + 1, value: '', selected: false }]);
	};

	const handleDeleteCheckboxOption = (selectedId) => {
		setCheckboxes(prevState => (prevState.filter((option, index)=> option.id!== selectedId)));
	};

	const handleCheckboxTextField = (value, selectedId)=> {
		setCheckboxes((prevState) => (
			prevState.map((option, index)=> option.id === selectedId ? {...option, value: value}  : option )
		));
	}

	const handleAddQuestion = () => {
		setQuestions((prevState) => [...prevState, {
			name: question,
			answerType: answerType,
			checkboxes: checkboxes,
			access: accessLevel,
			selectedUsers: selectedUsers,
		}])
		setQuestionTemplateAnchor(false);
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
		setShowUsers(false);
	}

	const resetTemplateStates = ()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setSelectedTags([]);
		setShowUsers(false);

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
	const handleAccessLevel = (event) => {
		setAccessLevel(event.target.value);
		if(event.target.value === 'public'){
			setShowUsers(false);
			setSelectedUsers([]);
		}else {
			setShowUsers(true);
		}
	}

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
		  setTitle,
		  topic,
		  setTopic,
		  handleTopic,
		  description,
		  setDescription,
		  setQuestion,
		  question,
		  imgUrl,
		  setImgUrl,
		  answerType,
		  handleAnswerType,
		  checkboxes,
		  handleCheckboxes,
		  handleAddCheckboxOption,
		  handleDeleteCheckboxOption,
		  handleCheckboxTextField,
		  accessLevel,
		  setAccessLevel,
		  selectedUsers,
		  setSelectedUsers,
		  selectedTags,
		  setSelectedTags,
		  questions,
		  setQuestions,
		  handleAddQuestion,
		  handleEditQuestion,
		  handleEditorAnchor,
		  handleDeleteQuestion,
		  editorAnchor,
		  handleAccessLevel,
		  showUsers,
		  privateUsersAnchor,
		  setPrivateUsersAnchor,
		  saveTemplate,
		  questionTemplateAnchor,
		  setQuestionTemplateAnchor,
		  message,
		  markdownHover,
		  setMarkdownHover,
		  handleHoverMarkdown,
		  refresh
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;