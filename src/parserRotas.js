export function extrairRotas(texto) {

  const blocos = texto
  .split(
/(?=CHEVRON_BLUE)|(?=[A-Z]{1,4}\d+_(?:AM1|SD)\s*·\s*#\d+)|(?=Rota\s*#\d+)/i
)
  .filter((b) => b.trim());
  console.log("TOTAL DE BLOCOS:", blocos.length);

blocos.forEach((b, i) => {
  console.log("======== BLOCO", i + 1, "========");
  console.log(b.substring(0, 300));
});

  const entregas = [];
  const coletas = [];

  blocos.forEach((bloco) => {
    console.log("==================================");
console.log(bloco.substring(0,80));

  const rotaEntrega = bloco.match(
/([A-Z]{1,4}\d+_(?:AM1|SD))/i
);
    console.log("ROTA:", rotaEntrega ? rotaEntrega[1] : "NÃO ENCONTROU");
   const rotaColeta = /Rota\s*#\d+/i.test(bloco);

    if (!rotaEntrega && !rotaColeta) return;

    const numero = bloco.match(/(?:#|Rota\s*#)\s*(\d+)/i);

    const motorista = bloco.match(/\n([a-zà-ú\s]+)\n\s*MLP/i);

    const spr = bloco.match(
      /(\d+)\s+pendentes,\s+(\d+)\s+com falha[s]?,\s+(\d+)\s+bem-sucedidos/i
    );
   const dsTexto = bloco.match(/DS\s*([0-9]+,[0-9]+)%/i);

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
  : `#${numero ? numero[1] : ""}`,
  numero: numero ? numero[1] : "",
  placa: placa,
  motorista: motorista ? motorista[1].trim() : "",
  totalPacotes: total ? Number(total[1]) : entregues + falhas,
  pendentes,
  falhas,
  entregues,
  orh: executado?.[1] || "-",
  ds: dsTexto
  ? Number(dsTexto[1].replace(",", "."))
  : (entregues + falhas) > 0
      ? Number(((entregues / (entregues + falhas)) * 100).toFixed(1))
      : 0
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