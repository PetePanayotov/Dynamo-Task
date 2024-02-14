import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import { ROUTE_PATHS } from './utils/consts';
import Dashboard from './pages/Dashboard';
import Settigs from './pages/Settings';
import Sidebar from './components/Sidebar/Desktop';
import useDarkMode from './hooks/useDarkTheme';
import { useWindowWidth } from './hooks/useWindowSize';
import SidebarMobile from './components/Sidebar/Mobile';

function App() {
	const [isEnabled, setIsEnabled] = useDarkMode();
	const [width, setWidth] = useWindowWidth();
	const isSmallScreen = width < 720;

	const toggleMode = (e: React.MouseEvent, value: boolean) => {
		e.stopPropagation();
		setIsEnabled(value);
	};

	return (
		<>
			<Router>
				{isSmallScreen ? (
					<SidebarMobile toggleMode={toggleMode} />
				) : (
					<Sidebar toggleMode={toggleMode} />
				)}
				<Routes>
					<Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTE_PATHS.SETTINGS} element={<Settigs />} />
					<Route
						path={ROUTE_PATHS.ANY}
						element={<Navigate to={ROUTE_PATHS.DASHBOARD} />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;

