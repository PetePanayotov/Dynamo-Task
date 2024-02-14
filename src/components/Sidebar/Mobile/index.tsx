import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	toggleSideBar,
	selectIsSideBarExpanded,
	selectIsDarkModeEnabled
} from '../../../store/layout';
import { ROUTE_PATHS } from '../../../utils/consts';
import { RxDashboard } from 'react-icons/rx';
import { RiUserSettingsLine } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { MdOutlineDarkMode, MdOutlineLightMode, MdMenu } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { IoMdClose } from 'react-icons/io';

const SIDEBAR_ITEMS = [
	{
		id: uuid(),
		label: 'Dashboard',
		navigateTo: ROUTE_PATHS.DASHBOARD,
		icon: RxDashboard
	},
	{
		id: uuid(),
		label: 'Settings',
		navigateTo: ROUTE_PATHS.SETTINGS,
		icon: RiUserSettingsLine
	}
];

function SidebarMobile({
	toggleMode
}: {
	toggleMode: (e: React.MouseEvent, value: boolean) => void;
}) {
	const dispatch = useDispatch();
	const isSidebarExpanded = useSelector(selectIsSideBarExpanded);
	const isDarkModeEnabled = useSelector(selectIsDarkModeEnabled);

	const toggleSidebar = () => {
		dispatch(toggleSideBar(!isSidebarExpanded));
	};

	return (
		<aside className="w-full fixed top-0 z-10">
			{/* Mobile Navbar */}
			<nav className="bg-customBlue dark:bg-darkRussian px-4 py-2 flex justify-between items-center flex-col">
				{isSidebarExpanded ? (
					<IoMdClose className="text-white text-xl" onClick={toggleSidebar} />
				) : (
					<MdMenu className="text-white text-xl" onClick={toggleSidebar} />
				)}
				{isSidebarExpanded ? (
					<ul className="w-full">
						{SIDEBAR_ITEMS.map((item) => (
							<SidebarItem
								key={item.id}
								label={item.label}
								navigateTo={item.navigateTo}
								icon={item.icon}
								isExpanded={isSidebarExpanded}
							/>
						))}
					</ul>
				) : null}
			</nav>
			<div className="flex items-center absolute top-2 right-2">
				{isDarkModeEnabled ? (
					<MdOutlineLightMode
						size={24}
						className="text-white cursor-pointer"
						onClick={(e) => toggleMode(e, false)}
					/>
				) : (
					<MdOutlineDarkMode
						size={24}
						className="text-white cursor-pointer"
						onClick={(e) => toggleMode(e, true)}
					/>
				)}
			</div>
		</aside>
	);
}

type SideBarItemProps = {
	isExpanded: boolean;
	label: string;
	navigateTo: string;
	icon: IconType;
};

const SidebarItem = ({
	label,
	navigateTo,
	isExpanded,
	icon: Icon
}: SideBarItemProps) => {
	const getLinkStyles = ({ isActive }: any) => {
		const mainStyles = `h-12 font-poppins hover:text-customBlue hover:bg-white flex transition-all duration-200 ease-in-out items-center gap-5 justify-start ${
			isActive
				? 'bg-white dark:bg-midnight text-customBlue dark:text-lightGrey'
				: 'text-lightGrey'
		}`;

		return mainStyles;
	};
	return (
		<li className="mb-2 w-full">
			<NavLink to={navigateTo} className={getLinkStyles}>
				<Icon size={24} />
				<span>{label}</span>
			</NavLink>
		</li>
	);
};

export default SidebarMobile;
