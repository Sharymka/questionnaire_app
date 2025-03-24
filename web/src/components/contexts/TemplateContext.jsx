import React, { useEffect, useState, useCallback, useReducer} from "react";
import {postData} from "../../Requests";
import {getQuestionCardConfig} from "../../utilits/getQuestionCardConfig";
import {getDefaultTempConfig} from "../../utilits/getDefaultTempConfig";
import useGetTemplates from "../hooks/API/useGetTemplates";
import {useNavigate} from "react-router-dom";
import useGetUsers from "../hooks/API/useGetUsers";
import {configReducer} from "../../reducers/configReducer";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const navigate = useNavigate();
	const { temps, refreshTemps, setRefreshTemps } = useGetTemplates();
	const { usersData} = useGetUsers();
	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState('education');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [author, setAuthor] = useState('');
	const [imgUrl, setImgUrl] = useState(null);
	const [templates, setTemplates] = useState([]);
	const [filteredTemps, setFilteredTemps] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [currentView, setCurrentView] = useState(null);
	const [questionStatus, setQuestionStatus] = useState(null);
	const [config, configDispatch] = useReducer(configReducer, {
		baseConfig: null,
		questionList: [],
	});
	const [message, setMessage] = useState('');
	const [markdownHover, setMarkdownHover] = useState([]);
	const [showSelectedTemplate, setShowSelectedTemplate] = useState(false);
	const [selectedTempId, setSelectedTempId] = useState(() => {
		return JSON.parse(localStorage.getItem('tempId'))? JSON.parse(localStorage.getItem('tempId')) : null;
	});
	const [filledFormId, setFilledFormId] = useState(() => {
		return JSON.parse(localStorage.getItem('formId'))? JSON.parse(localStorage.getItem('formId')) : null;
	});

	const resetTemplateStates =  useCallback(()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setTags([]);
		configDispatch({type:'BASE_CONFIG', payload: getDefaultTempConfig(currentView)});
		setQuestionStatus(null);
		setSelectedTempId(null);
		setFilledFormId(null);
		setImgUrl(null);
		setFilledFormId(null);
		setMessage('');
	})

	useEffect(() => {
		if(currentView === 'allTemplates') {
			navigate('/templates');
		}
	}, [currentView, navigate])

	useEffect(() => {
		setTemplates(temps);
	}, [temps]);

	useEffect(() => {
		setFilteredTemps(templates);
	}, [templates]);

	useEffect(() => {
		if(currentView === 'addTemplate' || currentView === 'templatesTable' || currentView === 'allTemplates') {
			resetTemplateStates();
		}

	}, [currentView, resetTemplateStates]);

	useEffect(() => {
		if(currentView === 'addTemplate' || currentView === 'templatesTable' || currentView === 'allTemplates') {
			localStorage.removeItem('tempId');
			localStorage.removeItem('formId');
		}

	}, [currentView]);



	useEffect(() => {
		const baseConfig = getDefaultTempConfig(currentView);

		configDispatch({type:'BASE_CONFIG', payload: baseConfig});

		//инициализируем настройки для списка вопросов, если вопросы подгрузились сразу из готового шаблона
		if (config?.questionList?.length === 0 && questions?.length > 0) {

			configDispatch({ type: 'INIT_QUESTION_LIST', payload: questions.map((question) =>
					getQuestionCardConfig(questionStatus, question.id)
				), })
		}

		//инициализируем настройки для списка вопросов, в процессе добавления нового вопроса
		if(config?.questionList?.length !== 0 && questions?.length > config.questionList?.length) {

			configDispatch({ type: 'ADD_NEW_QUESTION', payload: getQuestionCardConfig('edit', questions[questions?.length - 1]?.id), })
		}

	}, [questions?.length, currentView, questionStatus, config.questionList?.length, questions]);

	const saveForm = async (url) => {
		const fullUrl = `${window.location.origin}/${url}`;
		const newQuestions = questions.map((item) => ({
			id: item.id,
			question: item.name,
			answer: item.answer,
			answerType: item.answerType,
			selectedUsers: item.selectedUsers,
			access: item.access,
		}));


		const requestData =  {
				idTemplate:selectedTempId,
				idUser: JSON.parse(localStorage.getItem('user')).user.id,
				questions: newQuestions
			}
		try {
			const { status, data } = await postData(fullUrl, requestData);

			if (status >= 200 && status < 300){
				setMessage({success: "Form was saved successfully"});
				console.log("Form was saved successfully:", data);
				setTimeout(()=> {
					navigate('/templates');
					setCurrentView("allTemplates");
				}, 2000)

			}else {
				setMessage({error: "Form saving failed"});
				console.log("Form saving failed:", data.error);

			}
		} catch (error) {
			console.log("Saving Form failed:", error.message);
		}
	}


	const handleHoverMarkdown = (selectedId) => {
		setMarkdownHover(prevState => prevState.map((option) => {
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
		  author,
		  setAuthor,
		  imgUrl,
		  setTitle,
		  setTopic,
		  setDescription,
		  setTags,
		  setImgUrl,
		  questions,
		  setQuestions,
		  config,
		  configDispatch,
		  // setConfig,
		  currentView,
		  setCurrentView,
		  questionStatus,
		  setQuestionStatus,
		  temps,
		  usersData,
		  setSelectedTempId,
		  selectedTempId,
		  filledFormId,
		  setFilledFormId,
		  saveForm,
		  message,
		  setMessage,
		  markdownHover,
		  setMarkdownHover,
		  handleHoverMarkdown,
		  filteredTemps,
		  setFilteredTemps,
		  templates,
		  setTemplates,
		  showSelectedTemplate,
		  setShowSelectedTemplate,
		  resetTemplateStates,
		  refreshTemps,
		  setRefreshTemps
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;