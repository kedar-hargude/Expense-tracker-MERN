import React, { useCallback, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Dashboard from './dashboard/pages/Dashboard';
import Expenses from './expenses/pages/Expenses';
import Settings from './settings/pages/Settings';
import Auth from './user/pages/Auth';
import { MyAuthContext } from './shared/context/auth-context';
import './App.css';

export default function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
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
			<React.Fragment>
				<MainNavigation />
					<main>
						<Routes>
							<Route path='/' element={<Dashboard />} />
							{routes}
						</Routes>
					</main>
			</React.Fragment>
		</MyAuthContext.Provider>
	)
}
