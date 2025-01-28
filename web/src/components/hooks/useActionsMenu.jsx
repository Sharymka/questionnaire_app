import {useState, useCallback, useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import { useLocation, useNavigate} from "react-router-dom";

const useActionsMenu = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const { setShowAllTemplates } = useContext(TemplateContext);

	const [showMenu, setShowMenu] = useState(null);
	const [showSaleForceModal, setShowSaleForceModal] = useState(false);
	const [showForm, setShowForm] = useState(false);

	// Управление меню
	const handleOpenMenu = useCallback((event) => setShowMenu(event.currentTarget), []);
	const handleCloseMenu = useCallback(() => setShowMenu(null), []);

	// // Управление модальным окном и формой
	// const handleOpenModal = useCallback(() => {
	// 	setShowSaleForceModal(true);
	// 	setShowForm(true);
	// 	handleCloseMenu();
	// }, [handleCloseMenu]);
	//
	// const handleCloseModal = useCallback(() => setShowSaleForceModal(false), []);
	// const handleCloseForm = useCallback(() => setShowForm(false), []);

	// Конфигурация пунктов меню
	const menuItems = [
		{
			label: "Все шаблоны",
			action: () => {
				navigate('/home');
				setShowAllTemplates(true);
				handleCloseMenu();
			},
		},
		{
			label: "Моя страница",
			action: () => {
				navigate('/home');
				setShowAllTemplates(false);
				handleCloseMenu();
			},
		},
		{
			label: "SaleForce",
			// action: handleOpenModal,
		},
		{
			label: "Назад",
			action: () => {
				navigate(-1);
				// if (matchPath('/templates/:id', location.pathname)){
				// 	setShowAllTemplates(true);
				// 	const user = getUser();
				// 	console.log('user', user);
				// 	if(user) {
				// 		navigate('/home');
				// 	} else {
				// 		navigate('/');
				// 	}
				//
				// }
				handleCloseMenu();
			},
		},
	];

	return {
		showMenu,
		handleOpenMenu,
		handleCloseMenu,
		// setShowSaleForceModal,
		// showForm,
		// handleCloseModal,,
		// handleCloseForm,
		menuItems,
	};
};

export default useActionsMenu;
