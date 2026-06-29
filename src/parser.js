export function gerarDados(relatorio) {

  function numero(regex) {
    const match = relatorio.match(regex);
    return match ? Number(match[1].replace(/\./g, "").replace(",", ".")) : 0;
  }

  const rotas = numero(/Rotas totais\s+(\d+)/i);

  const pacotes = numero(/Pacotes\s+(\d+)/i);

  const pendentes = numero(/Pendentes\s+(\d+)\s+69,2%/i) ||
                    numero(/Pendentes\s+(\d+)/i);

  const falhas = numero(/Com falhas\s+(\d+)\s+2,7%/i) ||
                 numero(/Com falhas\s+(\d+)/i);

  const entregues = numero(/Bem-sucedidos\s+(\d+)\s+28,1%/i) ||
                    numero(/Bem-sucedidos\s+(\d+)/i);

  const dsMatch = relatorio.match(/Bem-sucedidos\s+\d+\s+([\d,]+)%/i);

  const ds = dsMatch ? dsMatch[1] + "%" : "0%";

  const impacto = relatorio.match(/Com falhas\s+\d+\s+([\d,]+)%/i);

const percentualFalhas = impacto ? impacto[1] + "%" : "0%";

  return {
    ds,
    rotas,
    pacotes,
    pendentes,
    falhas,
    entregues,
    percentualFalhas,
  };
}