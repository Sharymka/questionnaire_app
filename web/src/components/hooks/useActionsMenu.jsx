import {useState, useCallback, useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

const useActionsMenu = () => {

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
				setShowAllTemplates(true);
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
				setShowAllTemplates(false);
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
