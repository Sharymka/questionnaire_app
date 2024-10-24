import React, { useEffect, useState} from "react";
import {postData} from "../../../Requests";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = React.useState('');
	const [topic, setTopic] = React.useState('education');
	const [description, setDescription] = React.useState('');
	const [imgUrl, setImgUrl] = React.useState('');
	const [question, setQuestion] = React.useState('');
	const [questions, setQuestions] = useState([]);
	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxOptions, setCheckboxOptions] = React.useState([ { value: '', selected: false }]);
	const [accessLevel, setAccessLevel] =  useState('public');
	const [selectedUsers, setSelectedUsers] = React.useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [message, setMessage] = React.useState();
	const [editorAnchor, setEditorAnchor] = React.useState(
		questions && questions.length > 0
			? questions.map((question, index) => ({ id: index, editorAnchorValue: false }))
			: []
	);
	const [showUsers , setShowUsers] = React.useState(false);
	const [privateUsersAnchor, setPrivateUsersAnchor] = React.useState(questions && questions.length > 0
		? questions.map((question, index) => ({ id: index, privateUsersAnchorValue: true }))
		: [] );
	const [ questionTemplateAnchor, setQuestionTemplateAnchor ] = useState(false);

	useEffect(() => {
		// Сброс всех состояний при монтировании компонента
		resetTemplateStates();
		resetQuestionStates();
		resetEditorAnchor();
	}, []); // Срабатывает только при монтировании

	useEffect(() => {
		// resetInitialStates();
		// Проверяем, изменилось ли количество вопросов
		if (questions.length !== editorAnchor.length) {
			// Обновляем editorAnchor только если количество вопросов изменилось
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

	}, [questions]); // Следим за изменениями questions

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


	}

	const handleTopic= (event) => {
		setTopic(event.target.value);
	}

	const handleAnswerType = (event) => {
		const newAnswerType = event.target.value;
		setAnswerType(newAnswerType);
		if(newAnswerType !== 'checkboxes') {
			setCheckboxOptions([]);
		}
	}

	const handleCheckboxes = (event) => {
		setCheckboxOptions((prevState) =>
			prevState.map((option) => ({
				...option,
				selected: option.value === event.target.value
			}))
		);
	};

	const handleAddCheckboxOption = () => {
		setCheckboxOptions([...checkboxOptions, { value: '', selected: false }]);
	};

	const handleDeleteCheckboxOption = (selecteDindex) => {
		setCheckboxOptions(prevState => (prevState.filter((option, index)=> index!== selecteDindex)));
	};

	const handleCheckboxTextField = (event, selectedIndex)=> {
		setCheckboxOptions((prevState) => (
			prevState.map((option, index)=> selectedIndex === index? {...option, value: event.target.value}  : option )
		));
	}

	const handleAddQuestion = () => {
		setQuestions((prevState) => [...prevState, {
			name: question,
			answerType: answerType,
			checkboxOptions: checkboxOptions,
			access: accessLevel,
			selectedUsers: selectedUsers,
		}])
		setQuestionTemplateAnchor(false);
		resetEditorAnchor();
		resetQuestionStates();
	}

	const handleQuestionTemplateAnchor = () => {
		setQuestionTemplateAnchor(true);
	}

	const handleDeleteQuestion = (questionIndex) => {
		setQuestions(prevState => prevState.filter((question, index) => index !== questionIndex))
	}

	const resetQuestionStates = () => {
		setQuestion('');
		setAnswerType('singleLine');
		setAccessLevel('public');
		setCheckboxOptions([]);
		setSelectedUsers([]);
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
		  checkboxOptions,
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
		  message
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;