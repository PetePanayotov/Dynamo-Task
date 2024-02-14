import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../../components/Button';
import { AddInvestmentPayload } from '../../../../store/dashboard/interface';

type Props = {
	submitAction: (data: AddInvestmentPayload) => void;
	handleCancelClick: () => void;
};

const AddInvestmentSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	amount: Yup.number().required('Amount is required')
});

export const AddInvestment: React.FC<Props> = ({
	submitAction,
	handleCancelClick
}) => {
	const initialValues: AddInvestmentPayload = {
		name: '',
		amount: ''
	};

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: AddInvestmentSchema,
			onSubmit: (values) => {
				submitAction(values);
			}
		});

	return (
		<div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70 w-full h-screen">
			<form
				onSubmit={handleSubmit}
				className="p-8 bg-white dark:bg-warmGray rounded-3xl"
			>
				<div className="flex md:gap-8 md:flex-row flex-wrap mb-6 flex-col">
					<div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="name"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Name*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								type="text"
								id="name"
								name="name"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.name && touched.name ? (
								<div className="absolute text-red-600 text-xs">
									{errors.name}
								</div>
							) : null}
						</div>
						<div className="mb-3 md:mb-6 text-left relative">
							<label
								htmlFor="value"
								className="block text-gray-700 text-sm font-bold mb-1"
							>
								Amount*
							</label>
							<input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.amount}
								type="number"
								id="value"
								name="amount"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							{errors.amount && touched.amount ? (
								<div className="absolute text-red-600 text-xs">
									{errors.amount}
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
					<Button label="Create" type="submit" />
				</div>
			</form>
		</div>
	);
};
