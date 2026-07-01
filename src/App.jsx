import { useState } from "react";
import "./App.css";

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
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <h2>{valor}</h2>
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
    pacotes: 0,
    entregues: 0,
    pendentes: 0,
    falhas: 0,
  });

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
console.log(gerarRankingOfensores(ranking));
console.log(gerarRankingPromotores(rotasEntrega));

console.log("ROTAS ENTREGA");
console.log(rotasEntrega);

console.log("PROMOTORES");
console.log(gerarRankingPromotores(rotasEntrega));
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

──────────────

${gerarRankingOfensores(ranking)}

──────────────

${gerarRankingPromotores(rotasEntrega)}

`;

function copiarFechamento() {
  navigator.clipboard.writeText(fechamento);
  alert("Fechamento copiado!");
}

 return (
  <div className="container">

    <h1>📦 SMG2 Dashboard</h1>

    <p className="subtitulo">
      Gerador de Fechamento Operacional
    </p>

    <div className="box">

      <h2>📋 Cole o relatório operacional do Logistics</h2>

      <textarea
        value={relatorio}
        onChange={(e)=>setRelatorio(e.target.value)}
        placeholder="Cole aqui o relatório completo..."
      />

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:15,
          marginTop:20
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

    <div className="cards">

      <Card titulo="📊 DS" valor={dados.ds} />

      <Card titulo="🚐 Rotas" valor={dados.rotas} />

      <Card titulo="📦 Pacotes" valor={dados.pacotes} />

      <Card titulo="✅ Entregues" valor={dados.entregues} />

      <Card titulo="⏳ Pendentes" valor={dados.pendentes} />

      <Card titulo="❌ Falhas" valor={dados.falhas} />

    </div>

 <RotasFalha
  rotas={[...rotasEntrega, ...rotasColeta]}
  detalhesRotas={detalhesRotas}
  setDetalhesRotas={setDetalhesRotas}
/>

{rotasColeta.length > 0 && (
  <div className="box">

    <h2>📦 Falhas de Coleta</h2>

    {rotasColeta.map((rota) => (
      <div
        key={rota.numero}
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <strong>📍 #{rota.numero}</strong>
        <br />
        🚐 {rota.motorista}
        <br />
        ❌ {rota.falhas} falhas
      </div>
    ))}

  </div>
)}

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

${gerarTextoColetas(rotasColeta, detalhesRotas)}

──────────────

${gerarRankingOfensores(ranking)}

──────────────

${gerarRankingPromotores(rotasEntrega)}`}
      />
    </div>

  </div>
);

}