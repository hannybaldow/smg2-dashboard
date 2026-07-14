import "./styles/relatorio.css";
import CentralImagens from "./components/CentralImagens";
import { useRef } from "react";
import html2canvas from "html2canvas";
import RankingImagem from "./components/RankingImagem";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Indicadores from "./components/Indicadores";
import { gerarHoraHora } from "./formatterHoraHora";
import { gerarDados } from "./parser";
import { extrairRotas } from "./parserRotas";
import { gerarRanking } from "./ranking";

import {
  gerarImpacto,
  gerarTextoRanking,
  gerarRankingOfensores,
  gerarRankingPromotores
} from "./formatterWhats";

import { gerarTextoColetas } from "./formatterColeta";
import RotasFalha from "./RotasFalha";
import "./App.css";

function Card({ titulo, valor }) {

  const icones = {
    "📊 DS": "📊",
    "🚐 Rotas": "🚚",
    "📦 Pacotes": "📦",
    "✅ Entregues": "✅",
    "⏳ Pendentes": "⏳",
    "❌ Falhas": "🚨",
  };

  const subtitulos = {
    "📊 DS": "Desempenho",
    "🚐 Rotas": "Total de rotas",
    "📦 Pacotes": "Total de pacotes",
    "✅ Entregues": "Total entregues",
    "⏳ Pendentes": "Pendentes",
    "❌ Falhas": "Total falhas",
  };

  const cor =
    titulo === "✅ Entregues"
      ? "#16a34a"
      : titulo === "⏳ Pendentes"
      ? "#f59e0b"
      : titulo === "❌ Falhas"
      ? "#dc2626"
      : "#2563eb";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 18,
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.05)",
      }}
    >
      <div style={{ fontSize: 22 }}>
        {icones[titulo]}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 13,
          color: "#64748b",
        }}
      >
        {titulo.replace(/^.+?\s/, "")}
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 32,
          fontWeight: 700,
          color: cor,
        }}
      >
        {valor}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        {subtitulos[titulo]}
      </div>
    </div>
  );
}
 
export default function App() {

  const hoje = new Date().toLocaleDateString("pt-BR");

  const [relatorio, setRelatorio] = useState("");

  const [rotasEntrega, setRotasEntrega] = useState([]);
  const [rotasColeta, setRotasColeta] = useState([]);

  const [detalhesRotas, setDetalhesRotas] = useState([]);

  const [extras, setExtras] = useState({
    data: hoje,
    ambulancias: 0,
    noShow: 0,
    revertidos: 0,
  });

  const [dados, setDados] = useState({
  ds: "0%",
  rotas: 0,
  emAndamento: 0,
  pacotes: 0,
  entregues: 0,
  pendentes: 0,
  falhas: 0,
});
const refOfensores = useRef(null);
const refPromotores = useRef(null);
 const ranking = gerarRanking(detalhesRotas);

  function gerarFechamento() {

  console.log(relatorio);

  const resumo = gerarDados(relatorio);
  console.log("Resumo:", resumo);

  setDados(resumo);

  const resultado = extrairRotas(relatorio);

console.log("Entregas:", resultado.entregas);
console.log("Coletas:", resultado.coletas);
console.log("ROTAS ENCONTRADAS:");
resultado.entregas.forEach((r) => console.log(r.rota));
console.log("ENTREGAS:", resultado.entregas.length);
console.log("COLETAS:", resultado.coletas.length);
console.log(resultado.entregas);
console.log(resultado.coletas);
setRotasEntrega(resultado.entregas);
setRotasColeta(resultado.coletas);
}

const fechamento = `🟢 Fechamento SMG2 🟢

📅 ${extras.data}

📊 DS: ${dados.ds}

🚐 Total de Rotas: ${dados.rotas}

🚑 Total de Ambulâncias: ${extras.ambulancias}

🚨 Total de Rotas No Show: ${extras.noShow}

📦 Total de Pacotes: ${dados.pacotes}

✅ Total de Entregues: ${dados.entregues}

❌ Total de Insucessos: ${dados.falhas}

👍 Total de Revertidos: ${extras.revertidos}

🚨 Impacto de Insucesso: ${dados.percentualFalhas}

──────────────

📌 Motivos dos Insucessos

${gerarImpacto(detalhesRotas)}

──────────────

🚨 Rotas com Insucessos

${gerarTextoRanking(ranking)}

──────────────

${gerarTextoColetas(rotasColeta, detalhesRotas)}



`;

function copiarFechamento() {
  navigator.clipboard.writeText(fechamento);
  alert("Fechamento copiado!");
}
async function gerarImagemOfensores() {

  const canvas = await html2canvas(refOfensores.current, {
    scale: 2,
    backgroundColor: "#ffffff",
  });

  const link = document.createElement("a");

  link.download = "Ranking_Ofensores.png";

  link.href = canvas.toDataURL("image/png");

  link.click();

}
async function gerarImagemPromotores() {

  const canvas = await html2canvas(refPromotores.current, {
    scale: 2,
    backgroundColor: "#ffffff",
  });

  const link = document.createElement("a");

  link.download = "Ranking_Promotores.png";

  link.href = canvas.toDataURL("image/png");

  link.click();

}

 return (
  <div className="container">

    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#0f172a",
    color: "#fff",
    padding: "22px 28px",
    borderRadius: 18,
    marginBottom: 25,
    boxShadow: "0 10px 25px rgba(0,0,0,.15)",
  }}
>
  <div>
    <h1
      style={{
        margin: 0,
        fontSize: 28,
        color: "#60a5fa",
      }}
    >
      Painel Operacional
    </h1>

    <p
      style={{
        margin: "6px 0 0",
        color: "#cbd5e1",
      }}
    >
      Gerador de Fechamento Operacional
    </p>
  </div>

  <div
    style={{
      display: "flex",
      gap: 15,
    }}
  >
    <div
      style={{
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "10px 16px",
      }}
    >
      📅 {extras.data}
    </div>

    <div
      style={{
        background: "#16a34a",
        color: "#fff",
        borderRadius: 12,
        padding: "10px 16px",
        fontWeight: 700,
      }}
    >
      🟢 Fechamento Diário
    </div>
  </div>
</div>

   {/* INDICADORES */}
<div
  style={{
    marginBottom: 25,
  }}
>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 18,
    }}
  >

    <Card titulo="📊 DS" valor={dados.ds} />
    <Card titulo="🚐 Rotas" valor={dados.rotas} />
    <Card titulo="📦 Pacotes" valor={dados.pacotes} />
    <Card titulo="✅ Entregues" valor={dados.entregues} />
    <Card titulo="⏳ Pendentes" valor={dados.pendentes} />
    <Card titulo="❌ Falhas" valor={dados.falhas} />

  </div>

</div>

{/* PRIMEIRA LINHA */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: 20,
    alignItems: "start",
    marginBottom: 25,
  }}
>
  <div className="box">

    <h2>📋 Cole o relatório operacional do Logistics</h2>

    <textarea
      value={relatorio}
      onChange={(e) => setRelatorio(e.target.value)}
      placeholder="Cole aqui o relatório completo..."
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 15,
        marginTop: 20,
      }}
    >

      <div>

        <label>📅 Data</label>

        <input
          type="text"
          value={extras.data}
          onChange={(e)=>
            setExtras({
              ...extras,
              data:e.target.value
            })
          }
        />

      </div>

      <div>

        <label>🚑 Ambulâncias</label>

        <input
          type="number"
          value={extras.ambulancias}
          onChange={(e)=>
            setExtras({
              ...extras,
              ambulancias:e.target.value
            })
          }
        />

      </div>

      <div>

        <label>🚨 No Show</label>

        <input
          type="number"
          value={extras.noShow}
          onChange={(e)=>
            setExtras({
              ...extras,
              noShow:e.target.value
            })
          }
        />

      </div>

      <div>

        <label>👍 Revertidos</label>

        <input
          type="number"
          value={extras.revertidos}
          onChange={(e)=>
            setExtras({
              ...extras,
              revertidos:e.target.value
            })
          }
        />

      </div>

    </div>

    <button
      style={{marginTop:20}}
      onClick={gerarFechamento}
    >
      Gerar Fechamento
    </button>

  </div>

  
</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 20,
    marginTop: 25,
    alignItems: "start",
  }}
>
   <div
  style={{
    gridColumn: "1 / 4",
  }}
>
  <RotasFalha
    rotas={rotasEntrega}
    detalhesRotas={detalhesRotas}
    setDetalhesRotas={setDetalhesRotas}
  />
</div>

<div className="box">

  <h2
    style={{
      marginTop: 0,
    }}
  >
    📦 Falhas de Coleta
  </h2>

    {rotasColeta.length === 0 ? (

      <p
        style={{
          color:"#64748b"
        }}
      >
        Nenhuma coleta encontrada.
      </p>

    ) : (

      rotasColeta.map((rota)=>(

        <div
          key={rota.numero}
          style={{
            border:"1px solid #e5e7eb",
            borderRadius:14,
            padding:16,
            marginBottom:15,
          }}
        >

          <strong>
            📍 #{rota.numero}
          </strong>

          <br/>

          🚚 {rota.motorista}

          <br/>

          <span
            style={{
              color:"#dc2626",
              fontWeight:700,
            }}
          >
            ❌ {rota.falhas} falhas
          </span>

        </div>

      ))

    )}

  </div>

</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20,
    alignItems: "start",
    width: "100%",
  }}
>

  <div className="box">

    <h2>🖼 Central de Imagens</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 15,
        marginTop: 20,
      }}
    >

      <CentralImagens
  ranking={ranking}
  promotores={gerarRankingPromotores(rotasEntrega)}
  data={extras.data}
/>
<div
  style={{
    gridColumn: "1 / 3",
    marginTop: 15,
    paddingTop: 15,
    borderTop: "1px solid #e5e7eb",
  }}
>

  <h3
    style={{
      marginBottom: 15,
      fontSize: 16,
    }}
  >
    ⚙️ Ajustes do Fechamento
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 70px",
      gap: 10,
      alignItems: "center",
    }}
  >

    <label>🚨 No Show</label>

    <input
      type="number"
      value={extras.noShow}
      onChange={(e)=>
        setExtras({
          ...extras,
          noShow:Number(e.target.value)
        })
      }
    />

    <label>🚑 Ambulâncias</label>

    <input
      type="number"
      value={extras.ambulancias}
      onChange={(e)=>
        setExtras({
          ...extras,
          ambulancias:Number(e.target.value)
        })
      }
    />

    <label>👍 Revertidos</label>

    <input
      type="number"
      value={extras.revertidos}
      onChange={(e)=>
        setExtras({
          ...extras,
          revertidos:Number(e.target.value)
        })
      }
    />

  </div>

</div>

      <button
        style={{
          gridColumn:"1 / 3",
          background:"#16a34a"
        }}
        onClick={copiarFechamento}
      >
        📋 Copiar Fechamento
      </button>

      <button
  style={{
    gridColumn: "1 / 3"
  }}
  onClick={() => {
    navigator.clipboard.writeText(
      gerarHoraHora(dados, rotasEntrega, extras.data)
    );
    alert("Hora a Hora copiado!");
  }}
>
  🕒 Copiar Hora a Hora
</button>

    </div>

  </div>

  <div className="box">

    <h2>🕒 Hora a Hora</h2>

    <textarea
  readOnly
 value={gerarHoraHora(dados, rotasEntrega, extras.data)}
  style={{
    width: "100%",
    height: 240,
    resize: "none",
  }}
/>

  </div>

</div>
{/* FECHAMENTO */}
<div className="box">

  <h2>📱 Fechamento WhatsApp</h2>
      
      <button
  onClick={copiarFechamento}
  style={{
    width:"100%",
    padding:15,
    marginBottom:15,
    background:"#25D366",
    color:"#fff",
    border:"none",
    borderRadius:8,
    cursor:"pointer",
    fontSize:18,
    fontWeight:"bold"
  }}
>
  📋 COPIAR FECHAMENTO
</button>

      <textarea
  readOnly
  style={{
    width: "100%",
    height: 450
  }}
value={`🟢 Fechamento SMG2 🟢

📅 ${extras.data}

📊 DS: ${dados.ds}

🚐 Total de Rotas: ${dados.rotas}

🚑 Total de Ambulâncias: ${extras.ambulancias}

🚨 Total de Rotas No Show: ${extras.noShow}

📦 Total de Pacotes: ${dados.pacotes}

✅ Total de Entregues: ${dados.entregues}

❌ Total de Insucessos: ${dados.falhas}

👍 Total de Revertidos: ${extras.revertidos}

🚨 Impacto de Insucesso: ${dados.percentualFalhas}

──────────────

📌 Motivos dos Insucessos

${gerarImpacto(detalhesRotas)}

──────────────

🚨 Rotas com Insucessos

${gerarTextoRanking(ranking)}

──────────────

${gerarTextoColetas(rotasColeta, detalhesRotas)}`}
     />
    </div>

    <div
  style={{
    position: "fixed",
    left: "-9999px",
    top: 0,
  }}
>
  <RankingImagem
    ref={refOfensores}
    titulo="Ranking Ofensores"
    cor="#DC2626"
    data={extras.data}
    rotas={ranking}
  />
</div>

</div>
);

}

const textoWhats = gerarTextoWhats({

    data,
    ds,
    totalRotas,
    ambulancias,
    noShow,
    pacotes,
    entregues,
    falhas,
    revertidos,
    impacto,
    detalhesRotas

});