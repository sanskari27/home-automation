import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthenticated, setCurrentIP } from '../../../hooks/useAuth';

export default function Login() {
	const [password, setPassword] = useState('');
	const [ip, setIP] = useState('');
	const navigate = useNavigate();

	const handleSubmit = () => {
		if (password === 'admin') {
			setAuthenticated(true);
			setCurrentIP(ip);
			setTimeout(() => {
				navigate('/dashboard');
			}, 500);
		} else {
			setAuthenticated(false);
		}
	};

	return (
		<>
			<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Sign in to Home Automation
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<div className='space-y-6'>
						<div>
							<div className='flex items-center justify-between'>
								<label htmlFor='ip' className='block text-sm font-medium leading-6 text-gray-800'>
									IP
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='ip'
									name='ip'
									type='text'
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									value={ip}
									onChange={(e) => setIP(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-gray-800'
								>
									Password
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								onClick={handleSubmit}
							>
								Sign in
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
