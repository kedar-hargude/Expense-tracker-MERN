import React, { useCallback, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Dashboard from './dashboard/pages/Dashboard';
import Expenses from './expenses/pages/Expenses';
import Settings from './settings/pages/Settings';
import Auth from './user/pages/Auth';
import { MyAuthContext } from './shared/context/auth.context';
import { DarkThemeContext } from './shared/context/darkTheme-context';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import './App.css';

export default function App() {

	const [token, setToken] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [userId, setUserId] = useState(false);
	const [isChecking, setIsChecking] = useState(true);

	const login = useCallback((uid, token) => {
		setToken(token);
		localStorage.setItem(
			'userData',
			JSON.stringify({userId: uid, token: token})
		);
		setUserId(uid);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	const darkThemeToggle = useCallback(() => {
		setIsDarkMode(prevState => !prevState);
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if(storedData && storedData.token){
			login(storedData.userId, storedData.token);
		}
		setIsChecking(false);
	}, [login]);

	let routes;

	if(token){
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
		<React.Fragment>
		{isChecking && <LoadingSpinner asOverlay />}
		{!isChecking && <MyAuthContext.Provider value={{
				isLoggedIn: !!token,
				token,
				userId,
				login,
				logout
			}}>
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
		</MyAuthContext.Provider>}
		</React.Fragment>
	)
}
