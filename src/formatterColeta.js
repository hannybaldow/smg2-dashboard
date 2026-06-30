export function gerarTextoColetas(coletas) {

  if (!coletas.length) return "";

  return `📦 FALHAS DE COLETA

${coletas.map((rota) => {

  const ds = (
    (rota.entregues / (rota.entregues + rota.falhas)) * 100
  ).toFixed(1).replace(".", ",");

  return `📍 #${rota.numero}
🚐 ${rota.motorista}
🚗 ${rota.placa}
📊 DS: ${ds}%
❌ ${rota.falhas} falhas`;

}).join("\n\n")}`;

}