import style from './style.module.css';

type Props = {
	children?: React.ReactNode;
};

export const PageWrapper = ({ children }: Props) => {
	return <div className={style.container}>{children}</div>;
};
