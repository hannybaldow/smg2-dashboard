export default function Indicadores({ dados }) {

  const cards = [
    {
      titulo: "DS",
      valor: dados.ds,
      cor: "#2563EB",
      icone: "📊",
      detalhe: "Performance"
    },
    {
      titulo: "Rotas",
      valor: dados.rotas,
      cor: "#0F766E",
      icone: "🚚",
      detalhe: "Operação"
    },
    {
      titulo: "Pacotes",
      valor: dados.pacotes,
      cor: "#7C3AED",
      icone: "📦",
      detalhe: "Total"
    },
    {
      titulo: "Entregues",
      valor: dados.entregues,
      cor: "#16A34A",
      icone: "✅",
      detalhe: "Bem-sucedidos"
    },
    {
      titulo: "Falhas",
      valor: dados.falhas,
      cor: "#DC2626",
      icone: "❌",
      detalhe: "Insucessos"
    },
    {
      titulo: "Pendentes",
      valor: dados.pendentes,
      cor: "#F59E0B",
      icone: "⏳",
      detalhe: "Restantes"
    }
  ];

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6,1fr)",
        gap: 18,
        marginBottom: 25
      }}
    >

      {cards.map((card) => (

        <div
          key={card.titulo}
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: 22,
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            borderTop: `5px solid ${card.cor}`
          }}
        >

          <div
            style={{
              fontSize: 17,
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span style={{ fontSize: 24 }}>
              {card.icone}
            </span>

            {card.titulo}
          </div>

          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#0F172A",
              marginTop: 18
            }}
          >
            {card.valor}
          </div>

          <div
            style={{
              color: "#94A3B8",
              marginTop: 10,
              fontSize: 14
            }}
          >
            {card.detalhe}
          </div>

        </div>

      ))}

    </div>

  );

}