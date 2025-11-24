import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User, authAPI } from './utils/api';
import HomePage from './pages/HomePage';
import MushafViewer from './pages/MushafViewer';
import Memorization from './pages/Memorization';
import Halaqat from './pages/Halaqat';
import AdminDashboard from './pages/AdminDashboard';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.me()
        .then(res => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route
          path="/mushaf"
          element={
            <ProtectedRoute user={user}>
              <MushafViewer user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/memorization"
          element={
            <ProtectedRoute user={user}>
              <Memorization user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/halaqat"
          element={
            <ProtectedRoute user={user}>
              <Halaqat user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} requiredRole="ADMIN">
              <AdminDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="/lessons" element={<Lessons user={user} onLogout={handleLogout} />} />
        <Route path="/lessons/:id" element={<LessonDetail user={user} onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
