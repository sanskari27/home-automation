import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { forwardRef, useImperativeHandle, useState } from 'react';
import Dropzone from 'react-dropzone';

export type FileInputHandle = {
	close: () => void;
	open: () => void;
};

const FileInput = forwardRef<FileInputHandle>((_, ref) => {
	const [isOpen, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [file, setFile] = useState<File | null>(null);

	const onClose = () => {
		setFile(null);
		setOpen(false);
	};

	useImperativeHandle(ref, () => ({
		close: () => {
			setFile(null);
			setOpen(false);
		},
		open: () => {
			setOpen(true);
		},
	}));

	const handleAttachmentInput = (files: File) => {
		if (files === null) return;
		if (files.size > 5 * 1025) return setError('File size should be less than 5MB');
		setFile(files);
	};

	const handleAddAttachment = async () => {
		if (!name) {
			setError('Please enter a file name');
			return;
		}

		if (!file) {
			setError('Please select a file');
			return;
		}
		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('name', name);
			await axios('http://0.0.0.0:8282/upload-images', {
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (err) {
			setError('Error uploading');
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Attachment</ModalHeader>
				<ModalBody pb={6}>
					<Dropzone
						onDropAccepted={(acceptedFile) => {
							handleAttachmentInput(acceptedFile[0]);
						}}
						maxSize={62914560}
						onDropRejected={() => setError('File size should be less than 5MB')}
						multiple={false}
						onError={(err) => {
							setError(err.message);
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<Box
								{...getRootProps()}
								borderWidth={'1px'}
								borderColor={'gray'}
								borderStyle={'dashed'}
								borderRadius={'lg'}
								py={'3rem'}
								textAlign={'center'}
								textColor={'gray'}
							>
								<input {...getInputProps()} />
								<Text>Drag and drop file here, or click to select files</Text>
							</Box>
						)}
					</Dropzone>
					{file && <Text mt={'0.5rem'}>Selected file : {file.name}</Text>}
					<FormControl pt={'1rem'}>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder='name'
							value={name ?? ''}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>

					{error && <Text textColor={'red.300'}>{error}</Text>}
				</ModalBody>

				<ModalFooter>
					<HStack width={'full'} justifyContent={'flex-end'}>
						<Button onClick={onClose} colorScheme='red'>
							Cancel
						</Button>
						<Button colorScheme='whatsapp' mr={3} onClick={handleAddAttachment}>
							Save
						</Button>
					</HStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
});

export default FileInput;
