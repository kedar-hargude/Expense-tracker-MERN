import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Dashboard from './dashboard/pages/Dashboard';
import './App.css';

export default function App() {
	return(
		<React.Fragment>
			<MainNavigation />
			<Routes>
				<Route path='/' element={<Dashboard />} />
			</Routes>
		</React.Fragment>
	)
}
