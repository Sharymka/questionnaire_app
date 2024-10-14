import React, {useState} from "react";
import {postData} from "../../Requests";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = React.useState('');
	const [topic, setTopic] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [question, setQuestion] = React.useState('');
	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxOptions, setCheckboxOptions] = React.useState([]);
	const [selectedUsers, setSelectedUsers] = React.useState([]);
	const [accessLevel, setAccessLevel] =  useState('public');
	const [selectedTags, setSelectedTags] = useState([]);
	const [questions, setQuestions] = useState([]);

	const handleSentTemplateDate = async ()=> {
		const requestData = {
			name:title,
			topic:topic,
			description:description,
			question:question,
			answerType:answerType,
			checkboxOptions:checkboxOptions,
			accessLevel:accessLevel,
			selectedUsers:selectedUsers,
			selectedTags:selectedTags,
		}
		try {
			const response = await postData('/template', requestData);

			const responseData = await response.json();

			if (response.ok) {
				console.log("Save template successfully:", responseData);
			}else {
				console.log("template saving failed:", responseData.error);
				// setMessage(data.error);
			}
		}catch (error) {
			console.log("Registered failed:", error.message);
		}

	}

	const handleTopic= (event) => {
		setTopic(event.target.value);
	}

	const handleOptionChange = (event) => {
		setCheckboxOptions((prevState) =>
			prevState.map((option) => ({
				...option,
				selected: option.value === event.target.value
			}))
		);
	};

	const handleTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleSetTopic = (event) => {
		setDescription(event.target.value);
	};

	const handleDescription = (event) => {
		setDescription(event.target.value);
	};

	const handleSetQuestion = (event) => {
		setQuestion(event.target.value);
	};

	const handleAnswerType = (event) => {
		const newAnswerType = event.target.value;
		setAnswerType(newAnswerType);
		if(newAnswerType !== 'checkboxes') {
			setCheckboxOptions([]);
		}
	}


	const handleAddOption = () => {
		setCheckboxOptions([...checkboxOptions, { value: '', selected: false }]);
	};

	const handleDeleteOption = (selecteDindex) => {
		setCheckboxOptions(prevState => (prevState.filter((option, index)=> index!== selecteDindex)));
	};

	const handleOptionTextChange = (event, selectedIndex)=> {
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
			selectedTags: selectedTags,
		}])

		resetInitialStates();

	}

	const resetInitialStates = ()=> {
		setQuestion('')
		setAnswerType('');
		setAccessLevel('public');
		setCheckboxOptions([]);
		setSelectedUsers([]);
		setSelectedTags([]);
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

  return (
	  <TemplateContext.Provider value={{
		  handleAnswerType,
		  answerType,
		  checkboxOptions,
		  setCheckboxOptions,
		  handleOptionChange,
		  handleOptionTextChange,
		  handleAddOption,
		  handleDeleteOption,
		  handleTopic,
		  topic,
		  handleTitle,
		  title,
		  handleDescription,
		  handleSetTopic,
		  handleSetQuestion,
		  description,
		  selectedUsers,
		  setSelectedUsers,
		  accessLevel,
		  setAccessLevel,
		  selectedTags,
		  setSelectedTags,
		  handleSentTemplateDate,
		  questions,
		  handleAddQuestion,
		  handleEditQuestion
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;