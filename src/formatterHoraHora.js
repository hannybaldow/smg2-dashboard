export function gerarHoraHora(dados = {}, rotasEntrega = [], data = "") {

  if (!dados.rotas) {
    return "";
  }

  const agora = new Date();

  const hora = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const emAndamento = Number(dados.emAndamento) || 0;

  const concluidas = Math.max(
    0,
    Number(dados.rotas) - emAndamento
  );

  return `🕒 Hora a Hora SMG2

📅 ${data}
🕒 Atualizado às ${hora}

📊 DS: ${dados.ds}

🚚 Total de Rotas: ${dados.rotas}
📦 Total de Pacotes: ${dados.pacotes}

✅ Pacotes Entregues: ${dados.entregues}
⏳ Pacotes Pendentes: ${dados.pendentes}
❌ Pacotes com Falha: ${dados.falhas}

────────────────────────

✅ Rotas Concluídas: ${concluidas}
🚚 Rotas Em Andamento: ${emAndamento}`;

}