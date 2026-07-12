function capitalizar(nome) {

  const pequenas = [
    "da", "de", "do", "das", "dos", "e"
  ];

  return nome
    .toLowerCase()
    .split(" ")
    .map((p, i) => {

      if (i > 0 && pequenas.includes(p))
        return p;

      return p.charAt(0).toUpperCase() + p.slice(1);

    })
    .join(" ");

}

export function gerarTextoColetas(coletas, detalhesRotas = []) {

  if (!coletas.length) return "";

  return `📦 FALHAS DE COLETA

${coletas.map((rota) => {

  const total = Number(rota.entregues) + Number(rota.falhas);

  const ds = total === 0
    ? "100,0"
    : ((rota.entregues / total) * 100)
        .toFixed(1)
        .replace(".", ",");

  const detalhe = detalhesRotas.find(
    d => d.rota === rota.rota
  );

  return `📍 #${rota.numero}
🚐 ${capitalizar(rota.motorista)}
🚗 ${rota.placa || "-"}
🕒 Stem Out: ${rota.orh || "-"}
📊 DS: ${ds}%
❌ ${rota.falhas} falhas${
  detalhe?.descricao ? ` (${detalhe.descricao})` : ""
}`;

}).join("\n\n")}`;

}