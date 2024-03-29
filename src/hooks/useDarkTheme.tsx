import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setDarkMode } from '../store/layout';

const useLocalStorage = (key: string, initialValue: boolean) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;

			setStoredValue(valueToStore);

			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
};

const useDarkMode = () => {
	const dispatch = useAppDispatch();
	const [enabled, setEnabled] = useLocalStorage('dark-theme', false);
	const isEnabled = typeof enabledState === 'undefined' && enabled;

	useEffect(() => {
		const className = 'dark';
		const bodyClass = window.document.body.classList;

		isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
		dispatch(setDarkMode(enabled));
	}, [enabled, isEnabled]);

	return [enabled, setEnabled];
};

export default useDarkMode;
