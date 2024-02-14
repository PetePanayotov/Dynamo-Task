import { useEffect } from 'react';
import PieChart from './components/Piechart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	closeInvestment,
	getInvestmentData
} from '../../store/dashboard/action';
import { selectInvestmentData } from '../../store/dashboard';
import { InvestmentCard } from '../../components/InvestmentCard';
import { formatDate } from '../../utils/dateFormatter';
import { Helmet } from 'react-helmet';
import { PageWrapper } from '../../components/PageWrapper';
import { selectIsDarkModeEnabled } from '../../store/layout';

function Dashboard() {
	const dispatch = useAppDispatch();
	const investmentData = useAppSelector(selectInvestmentData);
	const isDarkModeEnabled = useAppSelector(selectIsDarkModeEnabled);

	useEffect(() => {
		dispatch(getInvestmentData());
	}, []);

	const onCloseInvestment = (id: number, isActive: boolean) => {
		if (!isActive) return;

		dispatch(closeInvestment(id));
	};

	return (
		<PageWrapper>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<section className="mb-8">
				<PieChart data={investmentData} isDarkModeEnabled={isDarkModeEnabled} />
			</section>
			<section className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{investmentData.map(({ id, name, value, status, date }) => {
					return (
						<InvestmentCard
							key={id}
							id={id}
							name={name}
							value={value}
							isActive={status === 'active'}
							date={formatDate(date)}
							closeInvestment={onCloseInvestment}
						/>
					);
				})}
			</section>
		</PageWrapper>
	);
}

export default Dashboard;
