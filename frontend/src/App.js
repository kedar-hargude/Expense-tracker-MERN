import React, { useCallback, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Dashboard from './dashboard/pages/Dashboard';
import Expenses from './expenses/pages/Expenses';
import Settings from './settings/pages/Settings';
import Auth from './user/pages/Auth';
import { MyAuthContext } from './shared/context/auth-context';
import { DarkThemeContext } from './shared/context/darkTheme-context';
import './App.css';

export default function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(true); //TODO change to false
	const [isDarkMode, setIsDarkMode] = useState(false);

	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	const darkThemeToggle = useCallback(() => {
		setIsDarkMode(prevState => !prevState);
	}, []);

	let routes;

	if(isLoggedIn){
		routes = (
			<React.Fragment>
				<Route path='/expenses' element={<Expenses />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='*' 
                    element={<Navigate to="/" replace />} 
                />
			</React.Fragment>
		);
	} else {
		routes = (
			<React.Fragment>
				<Route path='/auth' element={<Auth />} />
				<Route path='*' 
                    element={<Navigate to="/auth" replace />} 
                />
			</React.Fragment>
		);
	}

	return(
		<MyAuthContext.Provider value={{isLoggedIn, login, logout}}>
			<DarkThemeContext.Provider value={{isDarkMode,darkThemeToggle}}>
				<div className={`app-container ${isDarkMode && 'dark'}`}>
					<MainNavigation />
						<main>
							<Routes>
								<Route path='/' element={<Dashboard />} />
								{routes}
							</Routes>
						</main>
				</div>
			</DarkThemeContext.Provider>
		</MyAuthContext.Provider>
	)
}
