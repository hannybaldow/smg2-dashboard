export function gerarRanking(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      const total = r.totalPacotes || (r.entregues + r.falhas);

      const ds = total > 0
        ? (r.entregues / total) * 100
        : 100;

      return {
        ...r,
        ds
      };

    })
   .filter((r) => r.falhas > 0)
    .sort((a, b) => a.ds - b.ds);

}