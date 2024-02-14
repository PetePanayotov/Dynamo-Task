export type Status = 'active' | 'closed';

export type InvestmentData = {
	id: number;
	name: string;
	share: number;
	value: number;
	currency: string;
	status: Status;
	date: string;
};
export type DashboardState = {
	investments: InvestmentData[];
};

export type AddInvestmentPayload = {
	name: string;
	amount?: string;
};

export enum ActionTypes {
	FETCH_INVESTMENTS = 'DASHBOARD/FETCH_INVESTMENTS',
	CLOSE_INVESTMENT = 'DASHBOARD/CLOSE_INVESTMENT',
	CREATE_INVESTMEN = 'DASHBOARD/CREATE_INVESTMENT'
}
