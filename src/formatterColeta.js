export function gerarTextoColetas(coletas) {

  if (!coletas.length) return "";

  return `📦 FALHAS DE COLETA

${coletas.map((rota) => `📍 #${rota.numero}
🚐 ${rota.motorista}
❌ ${rota.falhas} falhas`).join("\n\n")}`;

}