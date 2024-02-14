import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNewUser, editUser, fetchUsers } from '../../store/user/action';
import { selectUsers } from '../../store/user';
import { AddUserPayload, User } from '../../store/user/interface';
import { CreateEditUser } from './components/CreateEditUser';
import { LiaUserEditSolid } from 'react-icons/lia';
import { Button } from '../../components/Button';
import { Portal } from '../../components/Portal';
import { Helmet } from 'react-helmet';
import { PageWrapper } from '../../components/PageWrapper';

function Settigs() {
	const dispatch = useAppDispatch();

	const users = useAppSelector(selectUsers);

	const [displayForm, setDisplayForm] = useState(false);
	const [userToEdit, setUserToEdit] = useState<User | null>(null);

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	const handleEditUserClick = (user: User) => {
		setUserToEdit(user);
		setDisplayForm(true);
	};

	const renderUserRows = (usersData: User[]) => {
		if (!usersData.length) {
			return (
				<tr>
					<td>No users data</td>
				</tr>
			);
		}

		return usersData.map((user) => {
			const fullName = `${user.firstName} ${user.lastName}`;
			const address = Object.entries(user.address)
				.map(([key, value]) => value)
				.join(', ');

			return (
				<tr key={user.id}>
					<td className="px-4 py-4 text-sm font-poppins whitespace-no-wrap text-left">
						{fullName}
					</td>
					<td className="px-4 py-4 text-sm font-poppins whitespace-no-wrap text-left">
						{user.age}
					</td>
					<td className="px-4 py-4 text-sm font-poppins whitespace-no-wrap text-left">
						{user.email}
					</td>
					<td className="px-4 py-4 text-sm font-poppins whitespace-no-wrap text-left">
						{address}
					</td>
					<td className="px-4 py-4 text-14 whitespace-no-wrap flex justify-center">
						<LiaUserEditSolid
							size={24}
							className="text-customBlue hover:cursor-pointer"
							onClick={() => handleEditUserClick(user)}
						/>
					</td>
				</tr>
			);
		});
	};

	const hideForm = () => {
		setDisplayForm(false);

		if (userToEdit) setUserToEdit(null);
	};

	const submitAction = async (data: AddUserPayload) => {
		if (userToEdit) {
			await dispatch(editUser({ userId: userToEdit.id, userData: data }));

			return hideForm();
		}
		await dispatch(addNewUser(data));

		hideForm();
	};

	return (
		<PageWrapper>
			<Helmet>
				<title>Settings</title>
			</Helmet>
			<div className="flex justify-start items-center gap-5 mb-5">
				<h3 className="text-2xl font-poppins font-medium text-[#2A3D5F] dark:text-lightGrey">
					Users
				</h3>
				<Button label="Add new" onClick={() => setDisplayForm(true)} />
			</div>
			<div className="w-full overflow-x-auto">
				<table className="table-auto min-w-full bg-white dark:bg-warmGray p-5 shadow-md w-full border-r-4">
					<thead>
						<tr>
							<th className="px-4 py-4 text-left font-poppins text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-4 py-4 font-poppins text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Age
							</th>
							<th className="px-4 py-4 font-poppins text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Email
							</th>
							<th className="px-4 py-4 font-poppins text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Address
							</th>
							<th className="px-4 py-4 font-poppins text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
								Operation
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">{renderUserRows(users)}</tbody>
				</table>
			</div>
			{displayForm ? (
				<Portal>
					<CreateEditUser
						userToEdit={userToEdit}
						submitAction={submitAction}
						handleCancelClick={hideForm}
					/>
				</Portal>
			) : null}
		</PageWrapper>
	);
}

export default Settigs;
