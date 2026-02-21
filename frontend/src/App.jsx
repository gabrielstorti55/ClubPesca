import LoginPage from './pages/login';
import SignupPage from './pages/cadastro';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/home';
import { ProfileTabs } from './pages/profile-tabs';
import { AuthProvider } from './context/auth-context';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfileTabs />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}