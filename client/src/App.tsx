import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './views/components/protected-route';
import Dashboard from './views/pages/dashboard';
import Login from './views/pages/login';

function App() {
	useAuth();
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route
					path={'/dashboard'}
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				{/* <Route path='*' element={<Navigate to='/' />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
