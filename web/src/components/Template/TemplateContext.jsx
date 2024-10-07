import React from 'react';

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [answerType, setAnswerType] = React.useState('singleLine');
	const [checkboxOptions, setCheckboxOptions] = React.useState([{ value: '', selected: false }]);
	const handleOptionChange = (event) => {
		setCheckboxOptions((prevState) =>
			prevState.map((option) => ({
				...option,
				selected: option.value === event.target.value
			}))
		);
	};

	const handleAddOption = () => {
		setCheckboxOptions([...checkboxOptions, { value: '', selected: false }]);
	};

	const handleDeleteOption = (selecteDindex) => {

		setCheckboxOptions(prevState => (prevState.filter((option, index)=> index!== selecteDindex)));
		setCheckboxOptions([...checkboxOptions, { value: '', selected: false }]);
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
		  handleDeleteOption

	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;