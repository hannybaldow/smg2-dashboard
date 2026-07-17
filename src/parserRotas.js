export function extrairRotas(texto) {

  // Normaliza o texto
  texto = texto.replace(/\r/g, "");

  // Localiza o início de cada rota
  const regexInicio =
    /(?:>?[A-Z]{1,4}\d+_(?:AM1|SD)\s*·\s*#\d+|Rota\s*#\d+)/gi;

  const matches = [...texto.matchAll(regexInicio)];

  const blocos = [];

  for (let i = 0; i < matches.length; i++) {

    const inicio = matches[i].index;

    const fim =
      i + 1 < matches.length
        ? matches[i + 1].index
        : texto.length;

    blocos.push(
      texto.substring(inicio, fim).trim()
    );

  }

  console.log("TOTAL DE BLOCOS:", blocos.length);

  const entregas = [];
  const coletas = [];

  blocos.forEach((bloco) => {

    console.log("==============================");
    console.log(bloco.substring(0,120));

   const primeiraLinha = bloco
  .split("\n")
  .map(l => l.trim())
  .find(l => l.length);

const numero = bloco.match(/#\s*(\d+)/);

const rotaColeta = /^Rota\s*#/i.test(primeiraLinha);

const rotaEntrega = !rotaColeta
  ? [null, primeiraLinha.split("·")[0].trim()]
  : null;



if (!rotaEntrega && !rotaColeta) return;

    const motorista =
      bloco.match(/\n([a-zà-ú\s]+)\n\s*MLP/i);

    const spr =
      bloco.match(
        /(\d+)\s+pendentes?,\s+(\d+)\s+com\s+falha[s]?,\s+(\d+)\s+bem-sucedidos/i
      );

    if (!spr) {

      console.log("SEM SPR");
      console.log(bloco);

      return;

    }

    const executado = bloco.match(
  /Executado[\s\S]{0,40}?(\d{2}:\d{2})\s*h?s?/i
);

    
       const linhas = bloco
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let placa = "";

    const regexPlaca =
      /^(SDD-[A-Z0-9]{7}|[A-Z]{3}[0-9A-Z]{4}|TX[A-Z0-9]{4}|OPQ[A-Z0-9]{3}|SRV[A-Z0-9]{4})$/i;

    for (const linha of linhas) {

      if (regexPlaca.test(linha)) {
        placa = linha;
        break;
      }

    }

    const pendentes = Number(spr[1]);
    const falhas = Number(spr[2]);
    const entregues = Number(spr[3]);
    console.log("================================");

const totalPacotes = pendentes + falhas + entregues;

    const ds =
      totalPacotes > 0
        ? Number(
            ((entregues / totalPacotes) * 100).toFixed(1)
          )
        : 0;

        if ((rotaEntrega?.[1] || "") === "VX2_AM1") {
  console.log("======== VX2 ========");
  console.log({
    pendentes,
    falhas,
    entregues,
    totalPacotes,
    ds,
  });
}
console.log(
  "TIPO:",
  rotaEntrega?.[1],
  "| rotaColeta:",
  rotaColeta,
  "| tipo:",
  rotaColeta ? "Coleta" : "Entrega"
);

   const dados = {
  tipo: rotaEntrega ? "Entrega" : "Coleta",

  rota: rotaEntrega
    ? rotaEntrega[1]
    : `#${numero[1]}`,

      numero: numero ? numero[1] : "",

      placa,

      motorista: motorista
        ? motorista[1].trim()
        : "",

      totalPacotes,

      pendentes,

      falhas,

      entregues,

      orh: executado?.[1] || "-",

      ds

    };

    console.log(dados);
     // Ignora rotas inválidas
    if (!dados.rota) {
      console.log("ROTA INVÁLIDA");
      return;
    }

    // Evita duplicar a mesma rota
    const lista = dados.tipo === "Entrega" ? entregas : coletas;

    const jaExiste = lista.find(
      (r) =>
        r.rota === dados.rota ||
        (dados.numero && r.numero === dados.numero)
    );

    if (jaExiste) {

      // Atualiza caso a nova versão tenha mais informações
      if (dados.totalPacotes > jaExiste.totalPacotes) {
        Object.assign(jaExiste, dados);
      }

      return;
    }

    lista.push(dados);

    console.log(
      "ADICIONOU:",
      dados.rota,
      "| DS:",
      dados.ds,
      "| Falhas:",
      dados.falhas,
      "| Pendentes:",
      dados.pendentes
    );

  }); // fim do forEach
  console.log("================================");
  console.log("RESUMO PARSER");
  console.log("================================");

  console.log("ENTREGAS:", entregas.length);
  console.log("COLETAS:", coletas.length);

  console.table(
    entregas.map((r) => ({
      Rota: r.rota,
      Motorista: r.motorista,
      Total: r.totalPacotes,
      Pendentes: r.pendentes,
      Falhas: r.falhas,
      Entregues: r.entregues,
      DS: r.ds,
    }))
  );

  console.table(
    coletas.map((r) => ({
      Rota: r.rota,
      Motorista: r.motorista,
      Total: r.totalPacotes,
      Pendentes: r.pendentes,
      Falhas: r.falhas,
      Entregues: r.entregues,
      DS: r.ds,
    }))
  );

  return {
    entregas,
    coletas,
  };

}