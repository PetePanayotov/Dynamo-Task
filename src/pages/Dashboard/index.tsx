import { useEffect, useState } from 'react';
import PieChart from './components/Piechart';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	closeInvestment,
	createInvestment,
	getInvestmentData
} from '../../store/dashboard/action';
import { selectInvestmentData } from '../../store/dashboard';
import { InvestmentCard } from '../../components/InvestmentCard';
import { formatDate } from '../../utils/dateFormatter';
import { Helmet } from 'react-helmet';
import { PageWrapper } from '../../components/PageWrapper';
import { selectIsDarkModeEnabled } from '../../store/layout';
import { Button } from '../../components/Button';
import { Portal } from '../../components/Portal';
import { AddInvestment } from './components/AddInvestment';
import { AddInvestmentPayload } from '../../store/dashboard/interface';

function Dashboard() {
	const dispatch = useAppDispatch();
	const investmentData = useAppSelector(selectInvestmentData);
	const isDarkModeEnabled = useAppSelector(selectIsDarkModeEnabled);

	const [displayForm, setDisplayForm] = useState(false);

	useEffect(() => {
		dispatch(getInvestmentData());
	}, []);

	const onCloseInvestment = (id: number, isActive: boolean) => {
		if (!isActive) return;

		dispatch(closeInvestment(id));
	};

	const submitAction = async (data: AddInvestmentPayload) => {
		await dispatch(createInvestment(data));

		setDisplayForm(false);
	};

	return (
		<PageWrapper>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<section className="mb-8">
				<PieChart data={investmentData} isDarkModeEnabled={isDarkModeEnabled} />
			</section>
			<section className="flex flex-col justify-start">
				<Button
					label="Add new"
					className="mb-5"
					onClick={() => setDisplayForm(true)}
				/>
				<div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
				</div>
			</section>
			{displayForm ? (
				<Portal>
					<AddInvestment
						handleCancelClick={() => setDisplayForm(false)}
						submitAction={submitAction}
					/>
				</Portal>
			) : null}
		</PageWrapper>
	);
}

export default Dashboard;
