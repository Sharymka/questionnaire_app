import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {TemplateContext} from "./TemplateContext";


export const HistoryContext = createContext(null);


const HistoryProvider = ({ children }) => {

	const [ history, setHistory ] = useState(['table']);
	const [ currentView, setCurrentView] = useState(history[history.length - 1]);


	const resetStates = useCallback(() => {
		console.log('resetStates');
		const initialHistory = ['table'];
		setHistory(initialHistory);
		setCurrentView(initialHistory[initialHistory.length - 1]);
	}, []);

	const pushView = (view) => {
		setHistory((prevState) => {
			const updatedHistory = [...prevState, view];
			console.log('pushView', updatedHistory);
			setCurrentView(view);
			return updatedHistory;
		});
	}

	const popView = () => {
		console.log('popView');
		setHistory((prevState) => {
			if (prevState.length > 1) {
				const updatedHistory = prevState.slice(0, -1);
				setCurrentView(updatedHistory[updatedHistory.length - 1]);
				console.log('popView', updatedHistory);
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