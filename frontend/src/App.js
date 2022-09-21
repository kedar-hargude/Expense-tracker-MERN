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

let logoutTimer;

export default function App() {

	const [token, setToken] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [userId, setUserId] = useState(false);
	const [isChecking, setIsChecking] = useState(true);
	const [tokenExpirationState, setTokenExpirationState] = useState();

	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60 ); // logout after 1 hour session
		setTokenExpirationState(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid, 
				token: token,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setTokenExpirationState(null);
		localStorage.removeItem('userData');
	}, []);

	const darkThemeToggle = useCallback(() => {
		setIsDarkMode(prevState => !prevState);
	}, []);

	useEffect(() => {
		if(token && tokenExpirationState){
			const remainingTime = tokenExpirationState.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationState]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if(storedData && storedData.token && 
			new Date(storedData.expiration) > new Date()){
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
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
