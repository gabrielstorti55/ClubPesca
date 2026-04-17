import LoginPage from './pages/login';
import SignupPage from './pages/cadastro';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/home';
import { ProfileTabs } from './pages/profile';
import { AuthProvider } from './context/auth-context';
import Dicas from './pages/dicas'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfileTabs />} />
          <Route path="/dicas" element={<Dicas/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}