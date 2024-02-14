import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddUserPayload, User } from '../../../../store/user/interface';
import { Button } from '../../../../components/Button';

type Props = {
	submitAction: (data: AddUserPayload) => void;
	handleCancelClick: () => void;
	userToEdit: User | null;
};

const AddNewUserSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	age: Yup.number()
		.required('Age is required')
		.positive('Age should be positive number')
		.integer('Age should be integer'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	phone: Yup.string().required('Phone is required'),
	address: Yup.object({
		country: Yup.string().required('Country is required'),
		city: Yup.string().required('City is required'),
		street: Yup.string().required('Street is required')
	})
});

export const CreateEditUser: React.FC<Props> = ({
	userToEdit,
	submitAction,
	handleCancelClick
}) => {
	const initialValues: AddUserPayload = {
		firstName: userToEdit?.firstName ?? '',
		lastName: userToEdit?.lastName ?? '',
		age: userToEdit?.age ?? '',
		address: {
			country: userToEdit?.address.country ?? '',
			city: userToEdit?.address.city ?? '',
			street: userToEdit?.address.street ?? ''
		},
		email: userToEdit?.email ?? '',
		phone: userToEdit?.phone ?? ''
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: AddNewUserSchema,
			onSubmit: (values) => {
				submitAction(values);
			}
		});

	return (
		<div className="absolute z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70 w-full h-screen">
			<form
				onSubmit={handleSubmit}
				className="p-8 bg-white dark:bg-warmGray rounded-3xl"
			>
				<div className="flex md:gap-8 md:flex-row flex-wrap mb-6 flex-col">
					<div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="firstName"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								First Name*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.firstName}
								type="text"
								id="firstName"
								name="firstName"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.firstName && touched.firstName ? (
								<div className="absolute text-red-600 text-xs">
									{errors.firstName}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="lastName"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Last Name*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.lastName}
								type="text"
								id="lastName"
								name="lastName"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.lastName && touched.lastName ? (
								<div className="absolute text-red-600 text-xs">
									{errors.lastName}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="age"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Age*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.age}
								type="number"
								id="age"
								name="age"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.age && touched.age ? (
								<div className="absolute text-red-600 text-xs">
									{errors.age}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Email*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								type="email"
								id="email"
								name="email"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.email && touched.email ? (
								<div className="absolute text-red-600 text-xs">
									{errors.email}
								</div>
							) : null}
						</div>
					</div>
					<div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="phone"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Phone*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.phone}
								type="text"
								id="phone"
								name="phone"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.phone && touched.phone ? (
								<div className="absolute text-red-600 text-xs">
									{errors.phone}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="country"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Country*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.address.country}
								type="text"
								id="country"
								name="address.country"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.address?.country && touched.address?.country ? (
								<div className="absolute text-red-600 text-xs">
									{errors.address?.country}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="city"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								City*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.address.city}
								type="text"
								id="city"
								name="address.city"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.address?.city && touched.address?.city ? (
								<div className="absolute text-red-600 text-xs">
									{errors.address?.city}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="street"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Street*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.address.street}
								type="text"
								id="street"
								name="address.street"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							></input>
							{errors.address?.street && touched.address?.street ? (
								<div className="absolute text-red-600 text-xs">
									{errors.address?.street}
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center gap-8">
					<Button
						label="Cancel"
						className="bg-white !text-customBlue border-customBlue"
						onClick={handleCancelClick}
					/>
					<Button label={userToEdit ? 'Edit' : 'Create'} type="submit" />
				</div>
			</form>
		</div>
	);
};
