import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {TemplateContext} from "./TemplateContext";


export const HistoryContext = createContext(null);


const HistoryProvider = ({ children }) => {

	const [ history, setHistory ] = useState([null]);
	const { currentView, setCurrentView } = useContext(TemplateContext);

	useEffect(() => {
		setCurrentView(history[history.length - 1]);
	}, [history.length]);

	const resetStates = useCallback(() => {
		const initialHistory = ['templatesTable'];
		setHistory(initialHistory);
		setCurrentView(initialHistory[initialHistory.length - 1]);
	}, []);

	const pushView = (view) => {
		setHistory((prevState) => {
			return  [...prevState, view];
		});
	}

	const popView = () => {
		setHistory((prevState) => {
			if (prevState.length > 1) {
				const updatedHistory = prevState.slice(0, -1);
				setCurrentView(updatedHistory[updatedHistory.length - 1]);
				return updatedHistory;
			}
			return prevState;
		});

	}

	return <HistoryContext.Provider
		value={{
			history,
			setHistory,
			currentView,
			setCurrentView,
			resetStates,
			pushView,
			popView
		}}
		   >
		{children}
	    </HistoryContext.Provider>
}

export default HistoryProvider;