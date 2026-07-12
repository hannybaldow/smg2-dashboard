export function gerarRanking(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      // O DS deve ser calculado apenas por entregues + falhas
      const entregues = Number(r.entregues) || 0;
const falhas = Number(r.falhas) || 0;

const total = entregues + falhas;

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

  // Mais falhas primeiro
  if (b.falhas !== a.falhas) {
    return b.falhas - a.falhas;
  }

  // Menor DS primeiro
  if (a.ds !== b.ds) {
    return a.ds - b.ds;
  }

  // Stem Out mais tarde perde
  if (!a.orh) return 1;
  if (!b.orh) return -1;

  return b.orh.localeCompare(a.orh);

});

}
export function gerarPromotores(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      const entregues = Number(r.entregues) || 0;
      const falhas = Number(r.falhas) || 0;

      const total = entregues + falhas;

      const ds = total > 0
        ? (entregues / total) * 100
        : 100;

      return {
        ...r,
        ds
      };

    })
    .filter((r) => r.falhas === 0)
    .sort((a, b) => b.ds - a.ds);

}