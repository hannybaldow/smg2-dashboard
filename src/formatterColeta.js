export function gerarTextoColetas(coletas, detalhesRotas = []) {

  if (!coletas.length) return "";

  return `📦 FALHAS DE COLETA

${coletas.map((rota) => {

  const ds = (
    (rota.entregues / (rota.entregues + rota.falhas)) * 100
  ).toFixed(1).replace(".", ",");

  // procura os motivos que você salvou no RotasFalha
  const detalhe = detalhesRotas.find(
    d => d.rota === rota.rota
  );
console.log("COLETAS:", coletas);
console.log("DETALHES:", detalhesRotas);
  return `📍 #${rota.numero}
🚐 ${rota.motorista}
🚗 ${rota.placa}
📊 DS: ${ds}%
❌ ${rota.falhas} falhas${
  detalhe?.descricao ? ` (${detalhe.descricao})` : ""
}`;

}).join("\n\n")}`;

}