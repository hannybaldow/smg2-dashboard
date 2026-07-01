export function gerarRanking(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      // O DS deve ser calculado apenas por entregues + falhas
      const total = r.entregues + r.falhas;

      const ds = total > 0
        ? (r.entregues / total) * 100
        : 100;

      return {
        ...r,
        ds
      };

    })
    .filter((r) => r.falhas > 0)
    .sort((a, b) => {

      // Primeiro quem tem mais falhas
      if (b.falhas !== a.falhas) {
        return b.falhas - a.falhas;
      }

      // Em empate, menor DS primeiro
      return a.ds - b.ds;

    });

}