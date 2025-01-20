import { Navigate } from "react-router-dom";

// Aqui você verifica se há 'alunoLogado' ou se a sessão ainda é válida.
function isAuthenticated() {
  const storedUser = localStorage.getItem("alunoLogado");
  return !!storedUser; // Se não estiver nulo, consideramos logado. 
  // Se você faz verificação de expiração, inclua aqui também.
}

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
