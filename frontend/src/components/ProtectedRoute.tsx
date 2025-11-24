import { Navigate } from 'react-router-dom';
import { User } from '../utils/api';

interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

const ProtectedRoute = ({ user, children, requiredRole }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
