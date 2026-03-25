import React, { useEffect, useState, useCallback, useReducer} from "react";
import {postData} from "@/shared/api/requests";
import {getQuestionCardConfig} from "@/shared/lib/utilits/getQuestionCardConfig";
import {getDefaultTempConfig} from "@/shared/lib/utilits/getDefaultTempConfig";
import useGetTemplates from "./hooks/API/useGetTemplates";
import {useNavigate} from "react-router-dom";
import useGetUsers from "./hooks/API/useGetUsers";
import {configReducer} from "./configReducer";
import {CONFIG_ACTIONS} from "./configActionTypes";

const safeParse = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch {
		return null;
	}
};

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
	const [selectedTempId, setSelectedTempId] = useState(() => safeParse('tempId'));
	const [filledFormId, setFilledFormId] = useState(() => safeParse('formId'));

	const resetTemplateStates =  useCallback(()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setTags([]);
		configDispatch({type: CONFIG_ACTIONS.RESET_QUESTION_LIST, payload: getDefaultTempConfig(currentView)});
		setQuestionStatus(null);
		setSelectedTempId(null);
		setFilledFormId(null);
		setImgUrl(null);
		setMessage('');
	}, [currentView])

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
			localStorage.removeItem('tempId');
			localStorage.removeItem('formId');
		}

	}, [currentView, resetTemplateStates]);

	useEffect(() => {
		const baseConfig = getDefaultTempConfig(currentView);

		configDispatch({type: CONFIG_ACTIONS.BASE_CONFIG, payload: baseConfig});

		if (config?.questionList?.length === 0 && questions?.length > 0) {
			configDispatch({ type: CONFIG_ACTIONS.INIT_QUESTION_LIST, payload: questions.map((question) =>
				getQuestionCardConfig(questionStatus, question.id)
				), })
		}

		if(config.questionList?.length !== 0 && questions?.length > config.questionList?.length) {
			configDispatch({ type: CONFIG_ACTIONS.ADD_NEW_QUESTION, payload: getQuestionCardConfig('edit', questions[questions?.length - 1]?.id), })
		}

	}, [currentView, questions, questionStatus, config.questionList?.length]);

	const saveForm = async (url) => {
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
				idUser: safeParse('user')?.user?.id,
				questions: newQuestions
			}
		try {
			const { status, data } = await postData(url, requestData);

			if (status >= 200 && status < 300){
				setMessage({success: "Form was saved successfully"});
				setTimeout(()=> {
					navigate('/templates');
					setCurrentView("allTemplates");
				}, 2000)

			}else {
				setMessage({error: "Form saving failed"});
			}
		} catch (error) {
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