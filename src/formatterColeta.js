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

  const somenteColetas = coletas.filter(
    (r) => Number(r.falhas) > 0
  );

  if (!somenteColetas.length) return "";

  return `🚛 FALHAS DE COLETA

${somenteColetas.map((rota) => {

  const detalhe = detalhesRotas.find(
    d => d.rota === rota.rota
  );

  return `📊 DS: ${rota.ds.toFixed(1).replace(".", ",")}%
👨‍✈️ Motorista: ${capitalizar(rota.motorista)}
🚐 Placa: ${rota.placa || "-"}
📍 Rota: ${
  rota.rota.startsWith("#")
    ? rota.rota
    : `${rota.rota} | #${rota.numero}`
}
🕒 Stem Out: ${rota.orh || "-"}
❌ Insucessos: ${rota.falhas}${
  detalhe?.descricao
    ? ` (${detalhe.descricao})`
    : ""
}`;

  }).join("\n\n──────────────\n\n")}`;

}