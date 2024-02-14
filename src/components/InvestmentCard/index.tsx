import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { formatCurrency } from '../../utils/currencyFormatter';

type Props = {
	id: number;
	name: string;
	value: number;
	isActive: boolean;
	date: string;
	closeInvestment: (id: number, isActive: boolean) => void;
};

export const InvestmentCard: React.FC<Props> = ({
	id,
	name,
	value,
	isActive,
	date,
	closeInvestment
}) => {
	const [counter, setCounter] = useState(0);
	const duration = 500;

	useEffect(() => {
		let startTime: any;
		let requestId: number;

		const startAnimation = (timestamp: any) => {
			if (!startTime) startTime = timestamp;
			const elapsedTime = timestamp - startTime;
			const progress = Math.min(elapsedTime / duration, 1);
			const nextValue = Math.floor(progress * value);
			setCounter(nextValue);

			if (progress < 1) {
				requestId = requestAnimationFrame(startAnimation);
			}
		};

		requestId = requestAnimationFrame(startAnimation);

		return () => cancelAnimationFrame(requestId);
	}, [value]);

	return (
		<div className="border border-customBlue p-4 bg-white dark:bg-warmGray flex flex-col gap-6 rounded-2xl">
			<div className="flex justify-between">
				<div className="relative">
					<span className="text-lg font-bold">{name}</span>
					<span className="absolute top-6 left-0 text-xs">{date}</span>
				</div>
				<div
					className={`border-4 font-semibold px-2 flex justify-center items-center rounded-3xl text-sm ${
						isActive
							? 'border-green-400 text-green-400'
							: 'border-red-400 text-red-400'
					}`}
				>
					{isActive ? 'Active' : 'Closed'}
				</div>
			</div>
			<div className="flex justify-between items-center">
				<p className="text-2xl">{formatCurrency(counter)}</p>
				{
					<Button
						className="hover:bg-white hover:text-customBlue hover:border-customBlue w-24 text-sm"
						label="Close"
						disabled={!isActive}
						onClick={() => closeInvestment(id, isActive)}
					/>
				}
			</div>
		</div>
	);
};
