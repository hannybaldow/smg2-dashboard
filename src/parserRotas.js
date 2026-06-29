export function extrairRotas(texto) {

  const blocos = texto.split("CHEVRON_BLUE");

  const entregas = [];
  const coletas = [];

  blocos.forEach((bloco) => {

    const rotaEntrega = bloco.match(/([A-Z]{2}\d+_AM1)/);
    const rotaColeta = bloco.match(/Rota\s*#(\d+)/i);

    if (!rotaEntrega && !rotaColeta) return;

    const numero = bloco.match(/#(\d+)/);

    const motorista = bloco.match(/\n([a-zà-ú\s]+)\n\s*MLP/i);

    const spr = bloco.match(
      /(\d+)\s+pendentes,\s+(\d+)\s+com falha[s]?,\s+(\d+)\s+bem-sucedidos/i
    );

    const executado = bloco.match(/Executado\s+(\d{2}:\d{2})hs/i);

    const total = bloco.match(/SPR\s+(\d+)\s+unidades/i);

    if (!spr) return;

    const linhas = bloco
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    // Procura automaticamente qualquer placa da Amazon

let placa = "";

const regexPlaca =
  /^(SDD-[A-Z0-9]{7}|[A-Z]{3}[0-9A-Z]{4})$/i;

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

    const dados = {
      tipo: rotaEntrega ? "Entrega" : "Coleta",
      rota: rotaEntrega ? rotaEntrega[1] : "COLETA",
      numero: numero ? numero[1] : "",
      placa: placa,
      motorista: motorista ? motorista[1].trim() : "",
      totalPacotes: total ? Number(total[1]) : entregues + falhas,
      pendentes,
      falhas,
      entregues,
      orh: executado ? executado[1] : ""
    };

    console.log(dados);

    if (dados.tipo === "Entrega") {
      entregas.push(dados);
    } else {
      coletas.push(dados);
    }

  }); // fecha o forEach

  return {
    entregas,
    coletas
  };

} // fecha a função extrairRotas