import React, { useEffect, useState} from "react";
import {postData} from "../../Requests";
import {getQuestionCardConfig} from "../../utilits/getQuestionCardConfig";
import {getDefaultTempConfig} from "../../utilits/getDefaultTempConfig";
import useGetTemplates from "../hooks/API/useGetTemplates";
import {useNavigate} from "react-router-dom";

export const TemplateContext = React.createContext(null);

function TemplateProvider({children}) {

	const navigate = useNavigate();
	const { temps } = useGetTemplates();
	const [title, setTitle] = useState('');
	const [topic, setTopic] = useState('education');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [imgUrl, setImgUrl] = useState('');
	const [templates, setTemplates] = useState(null);
	const [filteredTemps, setFilteredTemps] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [currentView, setCurrentView] = useState(null);
	const [questionStatus, setQuestionStatus] = useState(null);
	const [config, setConfig] = useState({ baseConfig: {}, questionList: [] });
	const [message, setMessage] = useState('');
	const [markdownHover, setMarkdownHover] = useState([]);
	const [showAllTemplates, setShowAllTemplates] = useState(false);
	const [showSelectedTemplate, setShowSelectedTemplate] = useState(false);
	const [selectedTempId, setSelectedTempId] = useState(null);
	const [filledFormId, setFilledFormId] = useState(null);

	useEffect(() => {
		setTemplates(temps);
	}, [temps]);

	useEffect(() => {
		setFilteredTemps(templates);
	}, [templates]);

	useEffect(() => {
		if(currentView === 'addTemplate' || currentView === 'templatesTable') {
			resetTemplateStates();
		}

	}, [currentView]);

	useEffect(() => {

		const baseConfig = getDefaultTempConfig(currentView);

			// инициализируем базовые настройки для sidePanel и header шаблона
				setConfig(prevState => ({
					...prevState,
					baseConfig: baseConfig,
				}))

			//инициализируем настройки для списка вопросов, если вопросы подгрузились сразу из готового шаблона
			if (config?.questionList?.length === 0 && questions?.length > 0) {
				setConfig((prevState) => ({
					...prevState,
					questionList: questions.map((question) =>
						getQuestionCardConfig(questionStatus, question.id)
					),
				}));
			}

			//инициализируем настройки для списка вопросов, в процессе добавления нового вопроса
			if(config?.questionList?.length !== 0 && questions?.length > config.questionList?.length) {
				setConfig((prevState) => ({
					...prevState,
					questionList: [
						...prevState.questionList || [],
						getQuestionCardConfig('edit', questions[questions?.length - 1]?.id),
					],
				}));
			}

	}, [questions?.length, currentView, questionStatus]);
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
				idUser: JSON.parse(localStorage.getItem('user')).id,
				questions: newQuestions
			}

			try {
				const response = await postData(fullUrl, requestData);
				const responseData = await response.json();

					if(response.ok) {
						setMessage({success: "Form was saved successfully"});
						console.log("Form was saved successfully:", responseData);
						setTimeout(()=> {
							navigate('/home');
							setShowAllTemplates(true);
						}, 2000)

					}else {
						setMessage({error: "Form saving failed"});
						console.log("Form saving failed:", responseData.error);

					}
			} catch (error) {
					console.log("Saving Form failed:", error.message);
			}
	}
	const resetTemplateStates = ()=> {
		setTitle('');
		setTopic('education');
		setDescription('');
		setQuestions([]);
		setTags([]);
		setConfig({ baseConfig: {}, questionList: [] });
		setQuestionStatus(null);
		setSelectedTempId(null);
		setImgUrl('');
		setFilledFormId(null);
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
		  imgUrl,
		  setTitle,
		  setTopic,
		  setDescription,
		  setTags,
		  setImgUrl,
		  questions,
		  setQuestions,
		  config,
		  setConfig,
		  currentView,
		  setCurrentView,
		  questionStatus,
		  setQuestionStatus,
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
		  showAllTemplates,
		  setShowAllTemplates,
		  filteredTemps,
		  setFilteredTemps,
		  templates,
		  setTemplates,
		  showSelectedTemplate,
		  setShowSelectedTemplate,
		  resetTemplateStates,
	  }}>
		  {children}
	  </TemplateContext.Provider>

  );
}

export default TemplateProvider;