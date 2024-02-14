import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	selectIsDarkModeEnabled,
	selectIsSideBarExpanded,
	toggleSideBar
} from '../../../store/layout';
import { ROUTE_PATHS } from '../../../utils/consts';
import { v4 as uuid } from 'uuid';
import { RxDashboard } from 'react-icons/rx';
import { RiUserSettingsLine } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { MdOutlineDarkMode } from 'react-icons/md';
import { MdOutlineLightMode } from 'react-icons/md';

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

function Sidebar({
	toggleMode
}: {
	toggleMode: (e: React.MouseEvent, value: boolean) => void;
}) {
	const dispatch = useAppDispatch();

	const isSidebarExpanded = useAppSelector(selectIsSideBarExpanded);
	const isDarkModeEnabled = useAppSelector(selectIsDarkModeEnabled);

	return (
		<aside
			className={`${
				isSidebarExpanded ? 'w-48' : 'w-16'
			} fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out h-screen hidden sm:block`}
		>
			<nav
				className="h-full py-5  flex flex-col bg-customBlue dark:bg-darkRussian rounded-tr-3xl rounded-br-3xl justify-between"
				onMouseEnter={() => dispatch(toggleSideBar(true))}
				onMouseLeave={() => dispatch(toggleSideBar(false))}
			>
				<ul
					className={`flex flex-col gap-1 ${
						isSidebarExpanded ? 'pl-2' : 'px-2'
					}`}
				>
					{SIDEBAR_ITEMS.map((item, i) => (
						<SidebarItem
							key={i}
							label={item.label}
							navigateTo={item.navigateTo}
							icon={item.icon}
							isExpanded={isSidebarExpanded}
						/>
					))}
				</ul>
				<div className="flex justify-center">
					{isDarkModeEnabled ? (
						<MdOutlineLightMode
							size={32}
							className="text-white hover:cursor-pointer"
							onClick={(e) => toggleMode(e, false)}
						/>
					) : (
						<MdOutlineDarkMode
							className="text-white hover:cursor-pointer"
							size={32}
							onClick={(e) => toggleMode(e, true)}
						/>
					)}
				</div>
			</nav>
		</aside>
	);
}

type SideBarItemProps = {
	isExpanded: boolean;
	label: string;
	navigateTo: string;
	icon: IconType;
};

function SidebarItem({
	label,
	navigateTo,
	icon: Icon,
	isExpanded
}: SideBarItemProps) {
	const getLinkStyles = ({ isActive }: any) => {
		const mainStyles = `h-12 font-poppins hover:text-customBlue hover:bg-white dark:hover:text-lightGrey hover:dark:bg-midnight flex transition-all duration-200 ease-in-out items-center gap-5 justify-start ${
			isActive
				? 'bg-white dark:bg-midnight text-customBlue dark:text-lightGrey'
				: 'text-lightGrey'
		} ${
			isExpanded
				? 'pl-3 rounded-tl-3xl rounded-bl-3xl'
				: 'justify-center rounded-full'
		}`;

		return mainStyles;
	};
	return (
		<li>
			<NavLink className={getLinkStyles} to={navigateTo}>
				{<Icon size={24} />}
				<span className={`${isExpanded ? '' : 'hidden'}`}>{label}</span>
			</NavLink>
		</li>
	);
}

export default Sidebar;
