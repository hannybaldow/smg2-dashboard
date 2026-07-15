export function gerarRanking(detalhesRotas) {

  return detalhesRotas
    .map((r) => {

      return {
  ...r,
  ds: Number(r.ds) || 0,
};

      return {
        ...r,
        entregues,
        falhas,
        ds,
      };

    })

    // Apenas rotas com falha
    .filter((r) => r.falhas > 0)

    // Menor DS primeiro
    .sort((a, b) => {

      if (a.ds !== b.ds) {
        return a.ds - b.ds;
      }

      // Mais falhas desempata
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

      const total = entregues + falhas;

      const ds =
        total > 0
          ? (entregues / total) * 100
          : 100;

      return {
        ...r,
        entregues,
        falhas,
        ds,
      };

    })

    // Apenas quem não teve falhas
    .filter((r) => r.falhas === 0)

    // Maior DS primeiro
    .sort((a, b) => {

      if (b.ds !== a.ds) {
        return b.ds - a.ds;
      }

      if (!a.orh || a.orh === "-") return 1;
      if (!b.orh || b.orh === "-") return -1;

      return a.orh.localeCompare(b.orh);

    });

}