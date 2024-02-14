import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	label: string;
};

export const Button: React.FC<Props> = ({ label, className, ...rest }) => {
	let styles =
		'bg-customBlue text-white font-poppins w-32 font-medium py-2 px-4 rounded-3xl focus:outline-none';

	if (className) {
		styles = styles.concat(` ${className}`);
	}
	return (
		<button className={styles} {...rest}>
			{label}
		</button>
	);
};
