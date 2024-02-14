import { http, HttpResponse } from 'msw';
import userResponse from './response/user.json';
import investmentsResponse from './response/investments.json';
import { API_PATHS } from '../utils/consts';
import { v4 as uuid } from 'uuid';

export const handlers = [
	http.get(API_PATHS.USERS, ({}) => {
		return HttpResponse.json(userResponse, { status: 200 });
	}),

	http.post(API_PATHS.USERS, async ({ request }) => {
		const newUserData = await request.json();

		const newUser = {
			id: uuid(),
			...(newUserData as object)
		};
		return HttpResponse.json(newUser, { status: 200 });
	}),

	http.put(`${API_PATHS.USERS}/:userId`, async ({ request, params }) => {
		const { userId } = params;
		const editUserData = await request.json();

		const newUser = {
			id: userId,
			...(editUserData as object)
		};
		return HttpResponse.json(newUser, { status: 200 });
	}),

	http.get(API_PATHS.INVESTMENTS, () => {
		return HttpResponse.json(investmentsResponse, { status: 200 });
	}),

	http.post(`${API_PATHS.INVESTMENTS}/:id`, async ({ params }) => {
		const { id } = params;
		return HttpResponse.json({ id }, { status: 200 });
	}),

	http.post(`${API_PATHS.INVESTMENTS}`, async ({ request }) => {
		const investmentData = await request.json();
		const date = new Date().toISOString();
		const response = {
			id: uuid(),
			name: investmentData?.name,
			share: 17,
			value: investmentData?.amount,
			currency: 'USD',
			status: 'active',
			date
		};

		return HttpResponse.json(response, { status: 200 });
	})
];
