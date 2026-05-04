import { useEffect, useState } from "react";
import { apiUrl, authFetch } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { Link } from "react-router-dom";
import { SimpleHeader } from "@/components/simple-header";

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Só tenta buscar se o usuário já estiver carregado e for admin
    if (!user || user.role !== "ADMIN") return;

    authFetch("/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError(data.error || "Erro ao carregar usuários");
        }
      })
      .catch((err) => setError("Falha na conexão"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await authFetch(`/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
        alert("Cargo atualizado com sucesso!");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao atualizar cargo");
      }
    } catch {
      alert("Falha na conexão com o servidor ao atualizar cargo.");
    }
  };

  // Melhoria: esperar o AuthContext confirmar que não está "loading" antes de bloquear o usuário
  const { loading: authLoading } = useAuth();
  
  if (authLoading) {
    return <div className="p-8 text-center">Verificando permissões...</div>;
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-lg">Apenas administradores podem ver esta página.</p>
        <p className="text-gray-500 mt-2 text-sm">Logado como: {user?.name} (Cargo: {user?.role || 'Nenhum'})</p>
        <Link to="/" className="mt-8 text-blue-600 hover:underline font-semibold">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50">
      <SimpleHeader />
      <main className="container mx-auto p-4 md:p-8 flex-1 max-w-6xl mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Painel de Administração</h1>
            <p className="text-slate-500 mt-2">Gerencie os acessos e permissões dos usuários na plataforma.</p>
          </div>
          <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors">
            Voltar ao Início
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-md">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500 text-lg font-medium animate-pulse">Carregando informações...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase text-xs tracking-wider">
                    <th className="p-4 md:p-5 font-bold">Nome do Usuário</th>
                    <th className="p-4 md:p-5 font-bold">Email</th>
                    <th className="p-4 md:p-5 font-bold">Nível de Acesso</th>
                    <th className="p-4 md:p-5 font-bold text-center">Permissões</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 md:p-5 font-medium text-slate-800">{u.name}</td>
                      <td className="p-4 md:p-5 text-slate-600">{u.email}</td>
                      <td className="p-4 md:p-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide
                          ${u.role === 'ADMIN' ? 'bg-red-100 text-red-700 border border-red-200' : 
                            u.role === 'OWNER' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                          {u.role === 'ADMIN' && <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>}
                          {u.role === 'OWNER' && <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8"></path></svg>}
                          {u.role === 'USER' && <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 text-center">
                        <select 
                          value={u.role} 
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={u.id === user.id}
                        >
                          <option value="USER">Usuário Comum</option>
                          <option value="OWNER">Dono de Pesqueiro</option>
                          <option value="ADMIN">Administrador</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 border-t border-slate-200 p-4 text-xs text-slate-500 text-center md:text-right">
              Total de usuários cadastrados: <span className="font-bold text-slate-700">{users.length}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}