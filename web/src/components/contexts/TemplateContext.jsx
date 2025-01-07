import React, { useEffect, useState} from "react";
import {postData} from "../../Requests";
import {temp} from "../../const/temp";
import {getQuestionCardConfig} from "../../utilits/getQuestionCardConfig";
import {getDefaultTempConfig} from "../../utilits/getDefaultTempConfig";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState('education');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [imgUrl, setImgUrl] = useState('');
	const [filteredTemp, setFilteredTemp] = useState(temp);
	const [questions, setQuestions] = useState([]);
	const [context, setContext] = useState(null);
	const [action, setAction] = useState('readOnly');
	const [config, setConfig] = useState({ baseConfig: {}, questionList: [] });
	const [message, setMessage] = useState('');
	const [markdownHover, setMarkdownHover] = useState([]);
	const [refresh, setRefresh] = useState(true);
	const [showAllTemplates, setShowAllTemplates] = useState(false);
	const [showSelectedTemplate, setShowSelectedTemplate] = useState(false);


	useEffect(() => {
		resetTemplateStates();
	}, [context]);

	useEffect(() => {

		const baseConfig = getDefaultTempConfig(context);

		setConfig(prevState => {

			// инициализируем базовые настройки для sidePanel и header шаблона
			if(Object.keys(config.baseConfig).length === 0) {
				return {...prevState, baseConfig: baseConfig};
			}

			//инициализируем настройки для списка вопросов, если вопросы подгрузились сразу из готового шаблона
			if (config?.questionList?.length === 0 && questions?.length > 0) {
				setConfig((prevState) => ({
					...prevState,
					questionList: questions.map((question) =>
						getQuestionCardConfig(action, question.id)
					),
				}));
			}

			//инициализируем настройки для списка вопросов, в процессе добавления нового вопроса
			if(config?.questionList?.length !== 0 && questions?.length > prevState.questionList?.length) {
				setConfig((prevState) => ({
					...prevState,
					questionList: [
						...prevState.questionList || [],
						getQuestionCardConfig('edit', questions[questions?.length - 1]?.id),
					],
				}));
			}
			return {...prevState};
		})

	}, [questions.length, context, action]);

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

	const resetTemplateStates = ()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setTags([]);
		setConfig({ baseConfig: {}, questionList: [] });
		setAction('readOnly');
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
		  config,
		  setConfig,
		  context,
		  setContext,
		  action,
		  setAction,
		  // temp,
		  // setTemp,
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