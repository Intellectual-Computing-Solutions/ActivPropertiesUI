import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold text-[#1f2440]">
        Welcome, {user?.firstName} {user?.lastName}
      </h1>
      <p className="text-gray-500">{user?.email} · {user?.role}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-[#6b40ed] text-white px-6 py-2.5 rounded hover:bg-[#5a33d4] transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
