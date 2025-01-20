import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {TemplateContext} from "./TemplateContext";


export const HistoryContext = createContext(null);


const HistoryProvider = ({ children }) => {

	const [ history, setHistory ] = useState([null]);
	const { currentView, setCurrentView } = useContext(TemplateContext);

	useEffect(() => {
		console.log('Rendered with updated history:', history);
		setCurrentView(history[history.length - 1]);
	}, [history.length]);

	const resetStates = useCallback(() => {
		const initialHistory = ['templatesTable'];
		setHistory(initialHistory);
		setCurrentView(initialHistory[initialHistory.length - 1]);
	}, []);

	const pushView = (view) => {
		console.log('pushView');
		console.trace();
		setHistory((prevState) => {
			return  [...prevState, view];
		});
	}

	const popView = () => {
		console.log('popView');
		setHistory((prevState) => {
			if (prevState.length > 1) {
				console.log('inside if');
				const updatedHistory = prevState.slice(0, -1);
				console.log('updatedHistory:' , updatedHistory);
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