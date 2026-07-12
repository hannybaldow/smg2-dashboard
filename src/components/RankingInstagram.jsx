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

const RankingInstagram = forwardRef(

({ titulo, cor, data, rotas = [] }, ref) => {

return (

<div
ref={ref}
style={{
width:1080,
background:"#FFFFFF",
fontFamily:"Arial, Helvetica, sans-serif",
boxSizing:"border-box",
padding:"40px",
borderTop:`10px solid ${cor}`
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:35
}}
>

<div>

<div
style={{
fontSize:34,
fontWeight:700,
color:cor
}}
>
🚚 SMG2
</div>

<div
style={{
fontSize:18,
color:"#666",
marginTop:6
}}
>
Painel Operacional
</div>

</div>

<div
style={{
fontSize:22,
fontWeight:600,
color:"#444"
}}
>
📅 {data}
</div>

</div>

<div
style={{
textAlign:"center",
fontSize:40,
fontWeight:700,
color:cor,
marginBottom:40
}}
>
{titulo}
</div>
{rotas.map((rota, index) => {

  const ds = Number.isFinite(Number(rota.ds))
    ? Number(rota.ds)
    : 100;

  return (

    <div
      key={rota.numero || index}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E5E7EB",
        padding: "24px 0",
      }}
    >

      <div
        style={{
          display: "flex",
          gap: 22,
          flex: 1,
        }}
      >

        <div
          style={{
            width: 55,
            fontSize: 30,
            fontWeight: 700,
            color: "#555",
          }}
        >
          {index + 1}º
        </div>

        <div style={{ flex: 1 }}>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1F2937",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {capitalizar(rota.motorista)}
          </div>

          <div
            style={{
              fontSize: 19,
              color: "#6B7280",
              lineHeight: 1.8,
            }}
          >

            <div>
              🚚 {rota.rota}
            </div>

            <div>
              🚗 {rota.placa || "-"}
            </div>

            {titulo.includes("Ofensores") ? (

              <div>
                🚨 {rota.falhas} falhas
              </div>

            ) : (

              <div>
                ✅ Sem falhas
              </div>

            )}

            <div>
              🕒 Stem Out: {rota.orh || "-"}
            </div>

          </div>

        </div>

      </div>

      <div
        style={{
          width: 180,
          textAlign: "right",
        }}
      >

        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            color: cor,
          }}
        >
          {ds.toFixed(1).replace(".", ",")}%
        </div>

      </div>

    </div>

  );

})}
</div>

);

}

);

export default RankingInstagram;