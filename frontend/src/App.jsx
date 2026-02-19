import LoginPage from './pages/login';
import SignupPage from './pages/cadastro';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/home';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        
      </Routes>
    </div>
  );
}