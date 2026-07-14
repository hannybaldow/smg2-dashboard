export function gerarRanking(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      const entregues = Number(r.entregues) || 0;
      const falhas = Number(r.falhas) || 0;

      const ds =
        r.ds !== undefined && r.ds !== null
          ? Number(r.ds)
          : (entregues + falhas) > 0
            ? (entregues / (entregues + falhas)) * 100
            : 100;

      return {
        ...r,
        entregues,
        falhas,
        ds,
      };

    })
    // Mantém todas as rotas (entrega e coleta) com falhas
    .filter((r) => r.falhas > 0)
    .sort((a, b) => {

      // Menor DS primeiro
      if (a.ds !== b.ds) {
        return a.ds - b.ds;
      }

      // Mais falhas como desempate
      if (b.falhas !== a.falhas) {
        return b.falhas - a.falhas;
      }

      // Stem Out mais tarde perde
      if (!a.orh || a.orh === "-") return 1;
      if (!b.orh || b.orh === "-") return -1;

      return b.orh.localeCompare(a.orh);

    });

}

export function gerarPromotores(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      const entregues = Number(r.entregues) || 0;
      const falhas = Number(r.falhas) || 0;

      const ds =
        r.ds !== undefined && r.ds !== null
          ? Number(r.ds)
          : (entregues + falhas) > 0
            ? (entregues / (entregues + falhas)) * 100
            : 100;

      return {
        ...r,
        entregues,
        falhas,
        ds,
      };

    })
    .filter((r) => r.falhas === 0)
    .sort((a, b) => {

      if (b.ds !== a.ds) {
        return b.ds - a.ds;
      }

      if (!a.orh || a.orh === "-") return 1;
      if (!b.orh || b.orh === "-") return -1;

      return a.orh.localeCompare(b.orh);

    });

}