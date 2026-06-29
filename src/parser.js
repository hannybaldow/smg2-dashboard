export function gerarDados(relatorio) {

  const linhas = relatorio
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  function pegarValor(titulo) {

    const indice = linhas.findIndex(l => l === titulo);

    if (indice === -1) return 0;

    const valor = linhas[indice + 1];

    return Number(valor.replace(/\./g, "").replace(",", "."));
  }

  function pegarPercentual(titulo) {

    const indice = linhas.findIndex(l => l === titulo);

    if (indice === -1) return "0%";

    const valor = linhas[indice + 2];

    if (!valor || !valor.includes("%")) return "0%";

    return valor;
  }

  console.log({
  rotas: pegarValor("Rotas totais"),
  pacotes: pegarValor("Pacotes"),
  pendentes: pegarValor("Pendentes"),
  falhas: pegarValor("Com falhas"),
  entregues: pegarValor("Bem-sucedidos")
});
console.log(linhas);

  return {

    rotas: pegarValor("Rotas totais"),

    pacotes: pegarValor("Pacotes"),

    pendentes: pegarValor("Pendentes"),

    falhas: pegarValor("Com falhas"),

    entregues: pegarValor("Bem-sucedidos"),

    ds: pegarPercentual("Bem-sucedidos"),

    percentualFalhas: pegarPercentual("Com falhas")

  };

}