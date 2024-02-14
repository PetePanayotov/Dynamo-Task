import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const useWindowWidth = (): [
	number,
	Dispatch<SetStateAction<number>>
] => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		let timeoutId: any;

		function handleResize() {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setWidth(window.innerWidth);
			}, 100);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(timeoutId);
		};
	}, []);

	return [width, setWidth];
};
