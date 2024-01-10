import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to={'/'} />;
	}

	return <>{children}</>;
}
