import React from 'react';

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const[name, setName] = React.useState('');
	const [topic, setTopic] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [question, setQuestion] = React.useState('');
	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxOptions, setCheckboxOptions] = React.useState([]);


	const handleOptionChange = (event) => {
		setCheckboxOptions((prevState) =>
			prevState.map((option) => ({
				...option,
				selected: option.value === event.target.value
			}))
		);
	};

	const handleSetName = (event) => {
		setName(event.target.value);
	};

	const handleSetTopic = (event) => {
		setDescription(event.target.value);
	};

	const handleSetDescription = (event) => {
		setDescription(event.target.value);
	};

	const handleSetQuestion = (event) => {
		setQuestion(event.target.value);
	};

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
  return (
	  <TemplateContext.Provider value={{
		  setAnswerType,
		  answerType,
		  checkboxOptions,
		  setCheckboxOptions,
		  handleOptionChange,
		  handleOptionTextChange,
		  handleAddOption,
		  handleDeleteOption,
		  setTopic,
		  topic,
		  handleSetName,
		  handleSetDescription,
		  handleSetTopic,
		  handleSetQuestion,
		  description
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;