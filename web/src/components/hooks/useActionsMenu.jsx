import {useState, useCallback, useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import { useLocation, useNavigate} from "react-router-dom";
import {HistoryContext} from "../contexts/HistoryContext";

const useActionsMenu = () => {

	const navigate = useNavigate();
	const { setShowAllTemplates, setCurrentView } = useContext(TemplateContext);
	const { pushView }= useContext(HistoryContext);

	const [showMenu, setShowMenu] = useState(null);
	const [showSaleForceModal, setShowSaleForceModal] = useState(false);

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
				pushView('allTemplates');
				// setShowAllTemplates(true);
				handleCloseMenu();
			},
		},
		{
			label: "Моя страница",
			action: () => {
				navigate('/home');
				setCurrentView(null);
				// setShowAllTemplates(false);
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
