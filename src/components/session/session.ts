export function checkSessionValidity(): boolean {
    // Exemplo simples: se "alunoLogado" não existe, não está logado
    const storedUser = localStorage.getItem("alunoLogado");
    if (!storedUser) {
      return false;
    }
  
    // Se você usa expiração de sessão, cheque também se "sessionExpiresAt" está no futuro:
    const storedExpiresAt = localStorage.getItem("sessionExpiresAt");
    if (!storedExpiresAt) {
      // Se não existir, podemos considerar inválido
      return false;
    }
  
    const expiresAt = parseInt(storedExpiresAt, 10);
    if (Date.now() > expiresAt) {
      // Sessão venceu
      return false;
    }
  
    // Se passou de todos os checks, está válido
    return true;
  }
  