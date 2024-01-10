import { useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

const initStatus = {
	isAuthenticated: false,
	curr_ip: '',
};
let globalSet: React.Dispatch<
	React.SetStateAction<{
		isAuthenticated: boolean;
		curr_ip: string;
	}>
> = () => {
	throw new Error('you must useAuth before setting its state');
};

export const useAuth = singletonHook(initStatus, () => {
	const [auth, setAuth] = useState(initStatus);
	globalSet = setAuth;

	return {
		isAuthenticated: auth.isAuthenticated,
		curr_ip: auth.curr_ip,
	};
});

export const setAuthenticated = (data: boolean) =>
	globalSet((prev) => ({ ...prev, isAuthenticated: data }));

export const setCurrentIP = (data: string) => globalSet((prev) => ({ ...prev, curr_ip: data }));
