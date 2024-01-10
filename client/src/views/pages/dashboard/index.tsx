import { Box, Button, Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import axios from 'axios';
import { useRef } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import FileInput, { FileInputHandle } from '../../components/file-input';

export default function Dashboard() {
	const { curr_ip } = useAuth();
	const fileInputRef = useRef<FileInputHandle>(null);

	const enrollFingerprint = async () => {
		try {
			await axios(
				`http://${curr_ip}:8282/enroll-fingerprint/?index=${Math.ceil(Math.random() * 20 + 30)}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					data: {
						index: Math.ceil(Math.random() * 20 + 30),
					},
				}
			);
		} catch (err) {
			//ignore
		}
	};

	const open_gate = async () => {
		try {
			await axios(`http://${curr_ip}:8282/open-gate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (err) {
			//ignore
		}
	};

	const switch_handler = async (name: string, status: boolean) => {
		try {
			await axios(`http://${curr_ip}:8282/switch?name=${name}&status=${status ? 1 : 0}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (err) {
			console.log(err);

			//ignore
		}
	};

	return (
		<Box className=''>
			<FileInput ref={fileInputRef} />
			<img src={`http://${curr_ip}:8282/live-feed`} />
			<Flex gap={'1rem'}>
				<Button onClick={() => fileInputRef.current?.open()} colorScheme='green' className='mt-6'>
					Add Images
				</Button>
				<Button onClick={enrollFingerprint} colorScheme='blue' className='mt-6'>
					Enroll Fingerprint
				</Button>
				<Button onClick={open_gate} colorScheme='yellow' className='mt-6'>
					Open Gate
				</Button>
			</Flex>
			<Flex gap={'1rem'} direction={'column'} marginTop={'1rem'}>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='switch-1' mb='0'>
						Switch 1
					</FormLabel>
					<Switch id='switch-1' onChange={(e) => switch_handler('switch_1', e.target.checked)} />
				</FormControl>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='switch-2' mb='0'>
						Switch 2
					</FormLabel>
					<Switch id='switch-2' onChange={(e) => switch_handler('switch_2', e.target.checked)} />
				</FormControl>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='switch-3' mb='0'>
						Switch 3
					</FormLabel>
					<Switch id='switch-3' onChange={(e) => switch_handler('switch_3', e.target.checked)} />
				</FormControl>
			</Flex>
		</Box>
	);
}
