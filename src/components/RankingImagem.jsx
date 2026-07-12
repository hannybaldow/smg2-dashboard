import React, { forwardRef } from "react";

function capitalizar(nome = "") {
  const pequenas = ["da", "de", "do", "das", "dos", "e"];

  return nome
    .toLowerCase()
    .split(" ")
    .map((p, i) => {
      if (i > 0 && pequenas.includes(p)) return p;
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" ");
}

const RankingImagem = forwardRef(
  ({ titulo, cor, data, rotas = [] }, ref) => {

    return (

      <div
        ref={ref}
        style={{
          width: 900,
          background: "#ffffff",
          fontFamily: "Arial, sans-serif",
          borderTop: `6px solid ${cor}`,
          padding: "22px 28px",
          boxSizing: "border-box",
        }}
      >

        {/* CABEÇALHO */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >

            <span style={{ fontSize: 30 }}>
              🚚
            </span>

            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: cor,
              }}
            >
              SMG2
            </span>

          </div>

          <div
            style={{
              fontSize: 20,
              color: "#555",
            }}
          >
            📅 {data}
          </div>

        </div>

        <h2
          style={{
            textAlign: "center",
            color: cor,
            marginTop: 0,
            marginBottom: 35,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {titulo}
        </h2>

        {rotas.map((rota, i) => (

          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 0",
              borderBottom: "1px solid #E5E7EB",
            }}
          >

            <div
              style={{
                display: "flex",
                gap: 18,
              }}
            >

              <div
  style={{
    width:45,
    fontSize:34,
    fontWeight:700,
    color:"#444",
    textAlign:"center"
  }}
>
  {titulo.includes("Promotores")
    ? i === 0
      ? "🥇"
      : i === 1
      ? "🥈"
      : i === 2
      ? "🥉"
      : `${i + 1}º`
    : `${i + 1}º`}
</div>

              <div>

                <div
                  style={{
                    fontSize: 23,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#374151",
                    marginBottom: 10,
                  }}
                >
                  {capitalizar(rota.motorista)}
                </div>

                <div
                  style={{
                    color: "#6B7280",
                    fontSize: 17,
                    lineHeight: 1.8,
                  }}
                >

                  🚚 {rota.rota}

                  <br />

                  🚗 {rota.placa || "-"}

                  <br />

                  {titulo.includes("Ofensores")
                    ? `🚨 ${rota.falhas} falhas`
                    : "✅ Sem falhas"}

                  <br />

                  🕒 Stem Out: {rota.orh || "-"}

                </div>

              </div>

            </div>

            <div
              style={{
                minWidth: 150,
                textAlign: "right",
              }}
            >

              <div
                style={{
                  color: cor,
                  fontSize: 44,
                  fontWeight: 700,
                }}
              >
                {Number(rota.ds).toFixed(1).replace(".", ",")}%
              </div>

            </div>

          </div>

        ))}

      </div>

    );

  }

);

export default RankingImagem;