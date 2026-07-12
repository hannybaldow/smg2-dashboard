function numero(texto, campo) {

  const regex = new RegExp(
    campo + "\\s*([0-9\\.]+)",
    "i"
  );

  const m = texto.match(regex);

  if (!m) return 0;

  return Number(
    m[1]
      .replace(/\./g, "")
      .replace(",", ".")
  );

}

function porcentagem(texto) {

  const m = texto.match(/Bem-sucedidos[\s\S]*?([0-9]+,[0-9]+)%/i);

  if (!m) return 0;

  return Number(
    m[1].replace(",", ".")
  );

}

export function gerarDados(texto) {

  const rotasTotais = numero(texto, "Rotas totais");

  const entrega = numero(texto, "De entrega");

  const coleta = numero(texto, "De coleta");

  const mistas = numero(texto, "Mistas");

  const andamento = numero(texto, "Em andamento");

  const pacotes = numero(texto, "Pacotes");

  const sacas = numero(texto, "Sacas");

  const pendentes = numero(texto, "Pendentes");

  const falhas = numero(texto, "Com falhas");

  const entregues = numero(texto, "Bem-sucedidos");

  const ds = porcentagem(texto);

  return {

    ds,

    rotasTotais,

    entrega,

    coleta,

    mistas,

    andamento,

    pacotes,

    sacas,

    pendentes,

    falhas,

    entregues

  };

}
export function extrairRotas(texto) {

  const linhas = texto.split("\n").map(l => l.trim());

  const rotas = [];

  let rota = null;

  for (let i = 0; i < linhas.length; i++) {

    const l = linhas[i];

    // Exemplo: #405136110
    if (/^#\d+/.test(l)) {

      if (rota) rotas.push(rota);

      rota = {
        numero: l.replace("#", ""),
        motorista: "",
        placa: "",
        rota: "",
        tipo: "",
        ds: 0,
        entregues: 0,
        falhas: 0,
        orh: "-"
      };

      continue;
    }

    if (!rota) continue;

    // Placa
    if (/^[A-Z]{3}[0-9A-Z]{4}$/i.test(l.replace("-", ""))) {
      rota.placa = l;
      continue;
    }

    // Stem Out
    if (/stem/i.test(l) || /orh/i.test(l)) {
      const h = l.match(/\d{2}:\d{2}/);
      if (h) rota.orh = h[0];
      continue;
    }

    // DS
    if (/DS/i.test(l)) {
      const ds = l.match(/(\d+,\d+)/);
      if (ds)
        rota.ds = Number(ds[1].replace(",", "."));
      continue;
    }

    // Entregues
    if (/Bem-sucedidos/i.test(l)) {
      const n = l.match(/\d+/);
      if (n) rota.entregues = Number(n[0]);
      continue;
    }

    // Falhas
    if (/Com falhas/i.test(l)) {
      const n = l.match(/\d+/);
      if (n) rota.falhas = Number(n[0]);
      continue;
    }

    // Motorista (linha em MAIÚSCULO)
    if (
      l.length > 4 &&
      l === l.toUpperCase() &&
      !l.startsWith("ROTA") &&
      !l.startsWith("#")
    ) {
      rota.motorista = l;
    }

  }

  if (rota) rotas.push(rota);

  return rotas;

}