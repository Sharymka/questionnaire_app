import {useState, useCallback, useContext, useEffect} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import {useNavigate} from "react-router-dom";
import {HistoryContext} from "../contexts/HistoryContext";
import {AuthContext} from "../mainPage/context/AuthContext";

const useActionsMenu = () => {

	const navigate = useNavigate();
	const { setCurrentView } = useContext(TemplateContext);
	const { isAuthenticated } = useContext(AuthContext);
	const { pushView } = useContext(HistoryContext);
	const [showMenu, setShowMenu] = useState(null);
	const [menuItems, setMenuItems] = useState(null);

	const handleOpenMenu = useCallback((event) => setShowMenu(event.currentTarget), []);
	const handleCloseMenu = useCallback(() => setShowMenu(null), []);

	useEffect(() => {
	setMenuItems([
		{
			label: "Все шаблоны",
			action: () => {
				navigate('/templates');
				setCurrentView('allTemplates');
				pushView('allTemplates');
				handleCloseMenu();
			},
		},
		...(
			isAuthenticated
				? [{
					label: "Моя страница",
					action: () => {
						navigate('/home');
						setCurrentView(null);
						handleCloseMenu();
					},
				}]
				: []
		)
	])
	}, [isAuthenticated]);

	return {
		showMenu,
		handleOpenMenu,
		handleCloseMenu,
		menuItems,
	};
};

export default useActionsMenu;
