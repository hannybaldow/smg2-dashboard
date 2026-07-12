export function extrairRotas(texto) {

  const blocos = texto
  .split(/(?=>?[A-Z]{1,4}\d+_(?:AM1|SD)\s*·\s*#\d+|(?=Rota\s*#\d+)|(?=\d{4}\s*·\s*#\d+))/i)
  .filter((b) => b.trim());

  const entregas = [];
  const coletas = [];

  blocos.forEach((bloco) => {
    console.log("==================================");
console.log(bloco.substring(0,80));

   const rotaEntrega = bloco.match(
/([A-Z]{1,4}\d+_(AM1|SD)|\d{4})/i
);
    console.log("ROTA:", rotaEntrega ? rotaEntrega[1] : "NÃO ENCONTROU");
    const rotaColeta =
  !rotaEntrega &&
  bloco.match(/Rota\s*#(\d+)/i);

    if (!rotaEntrega && !rotaColeta) return;

    const numero = bloco.match(/#(\d+)/);

    const motorista = bloco.match(/\n([a-zà-ú\s]+)\n\s*MLP/i);

    const spr = bloco.match(
      /(\d+)\s+pendentes,\s+(\d+)\s+com falha[s]?,\s+(\d+)\s+bem-sucedidos/i
    );
    const ds = bloco.match(
  /([0-9]+,[0-9]+)%\s+falhas de entrega/i
);

    const executado = bloco.match(
  /Executado[\s\S]{0,30}?(\d{2}:\d{2})\s*h?s?/i
);

    const total = bloco.match(/SPR\s+(\d+)\s+unidades/i);

   if (!spr) {
  console.log("Bloco sem SPR:");
  console.log(bloco);
  return;
}

    const linhas = bloco
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    // Procura automaticamente qualquer placa da Amazon

let placa = "";

const regexPlaca =
/^(SDD-[A-Z0-9]{7}|[A-Z]{3}[0-9A-Z]{4}|TX[A-Z0-9]{4}|OPQ[A-Z0-9]{3}|SRV[A-Z0-9]{4})$/i;

for (const linha of linhas) {

  const texto = linha.trim();

  if (regexPlaca.test(texto)) {
    placa = texto;
    break;
  }

}
console.log(
  motorista ? motorista[1].trim() : "",
  "=>",
  placa
);

    const pendentes = Number(spr[1]);
const falhas = Number(spr[2]);
const entregues = Number(spr[3]);

console.log("CAPTUROU:", rotaEntrega ? rotaEntrega[1] : "COLETA", "| SPR:", spr ? "SIM" : "NÃO");

const dados = {
  tipo: rotaColeta ? "Coleta" : "Entrega",
  rota: rotaEntrega
    ? rotaEntrega[1]
    : `COLETA_${numero ? numero[1] : motorista ? motorista[1].trim() : ""}`,
  numero: numero ? numero[1] : "",
  placa: placa,
  motorista: motorista ? motorista[1].trim() : "",
  totalPacotes: total ? Number(total[1]) : entregues + falhas,
  pendentes,
  falhas,
  entregues,
  orh: executado?.[1] || "-",
  ds: ds ? Number(ds[1].replace(",", ".")) : 100
};

    console.log(dados);

    if (dados.tipo === "Entrega") {
      entregas.push(dados);
    } else {
      coletas.push(dados);
    }

  }); // fecha o forEach

 console.log("ENTREGAS:", entregas.length);
console.log("COLETAS:", coletas.length);

return {
  entregas,
  coletas
};

} // fecha a função extrairRotas