import { gerarRanking, gerarPromotores } from "./ranking";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import RankingImagem from "./components/RankingImagem";
import PainelEdicao from "./components/PainelEdicao";
import { gerarDados } from "./parser";
import { extrairRotas } from "./parserRotas";
import "./styles/botoes.css";
import CentralImagens from "./components/CentralImagens";
import "./styles/dashboard.css";

export default function AppNovo() {
  const [relatorio, setRelatorio] = useState("");
  const [textoWhats, setTextoWhats] = useState("");
const [textoHora, setTextoHora] = useState("");
const [extras, setExtras] = useState({
  ambulancias: 0,
  revertidos: 0,
  noShow: 0,
});

const [rotas, setRotas] = useState([]);
const [rotasEditadas, setRotasEditadas] = useState({});
const [painelAberto, setPainelAberto] = useState(false);
const [rotaSelecionada, setRotaSelecionada] = useState(null);
const [dados, setDados] = useState({
  ds: 0,
  rotasTotais: 0,
  entrega: 0,
  coleta: 0,
  mistas: 0,
  andamento: 0,
  pacotes: 0,
  sacas: 0,
  pendentes: 0,
  falhas: 0,
  entregues: 0,
});

const refPromotores = useRef(null);
const refOfensores = useRef(null);
function gerarFechamento() {

  const resumo = gerarDados(relatorio);
  console.log("Resumo:", resumo);

  setDados(resumo);
  setTextoWhats(`🟢 Fechamento SMG2 🟢

📅 ${new Date().toLocaleDateString("pt-BR")}

📊 DS: ${resumo.ds.toFixed(1).replace(".", ",")}%

🚐 Total de Rotas: ${resumo.rotasTotais}

🚑 Total de Ambulâncias: ${extras.ambulancias}

🚨 Total de Rotas No Show: ${extras.noShow}

📦 Total de Pacotes: ${resumo.pacotes}

✅ Total de Entregues: ${resumo.entregues}

❌ Total de Insucessos: ${resumo.falhas}

👍 Total de Revertidos: ${extras.revertidos}

🚨 Impacto de Insucesso: ${((resumo.falhas / resumo.pacotes) * 100).toFixed(1).replace(".", ",")}%
`);



  const resultado = extrairRotas(relatorio);

const todasRotas = [
  ...resultado.entregas,
  ...resultado.coletas,
];

setRotas(
  todasRotas.map((r) => ({
    ...r,
    motivos: {}
  }))
);

console.log("RESULTADO:", resultado);
console.log("TODAS:", todasRotas);

setTextoHora(`🕒 Hora a Hora SMG2

📅 ${new Date().toLocaleDateString("pt-BR")}
🕘 Atualizado às ${new Date().toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
})}

━━━━━━━━━━━━━━

🚚 Rotas Totais: ${resumo.rotasTotais}
✅ Rotas Concluídas: ${resumo.rotasTotais - resumo.andamento}
🟡 Em Andamento: ${resumo.andamento}

━━━━━━━━━━━━━━

📦 Pacotes Totais: ${resumo.pacotes}
✅ Entregues: ${resumo.entregues}
❌ Falhas: ${resumo.falhas}
⏳ Pendentes: ${resumo.pendentes}

━━━━━━━━━━━━━━

📊 DS Atual: ${resumo.ds.toFixed(1).replace(".", ",")}%
`);

console.log(resultado);

}
function salvarEdicao(motivos) {

  const chave = rotaSelecionada.numero;

  const novasRotas = {
  ...rotasEditadas,
  [chave]: {
    ...rotaSelecionada,
    revisado: true,
    motivos
  }
};

const listaAtualizada = rotas.map((r) =>
  r.numero === chave
    ? {
        ...r,
        revisado: true,
        motivos
      }
    : r
);

setRotas(listaAtualizada);

  setRotasEditadas(novasRotas);

  atualizarFechamento(listaAtualizada);

  setPainelAberto(false);

}
function atualizarFechamento(rotasSalvas, resumo = dados) {

  const totais = {
    "Não havia ninguém no endereço": 0,
    "Comércio fechado": 0,
    "Recusados": 0,
    "Faltantes": 0,
    "Palavra-chave incorreta": 0,
    "Área inacessível": 0,
    "Endereço incorreto ou incompleto": 0,
    "Cliente mudou de endereço": 0,
    "Pacote de outra área": 0,
    "Pacote suspenso por fraude": 0,
    "Pacote avariado": 0,
    "Tentativa de roubo": 0,
    "Não estava na agência": 0,
    "Não visitado": 0
  };

  let rotasEntregaTexto = "";
let rotasColetaTexto = "";

  Object.entries(rotasSalvas).forEach(([_, rota]) => {

    let descricao = [];

    Object.entries(rota.motivos).forEach(([motivo, qtd]) => {

      if (qtd > 0) {

        switch (motivo) {

          case "Não havia ninguém":
            totais["Não havia ninguém no endereço"] += qtd;
            descricao.push(`${qtd} não havia ninguém`);
            break;

          case "Comércio fechado":
            totais["Comércio fechado"] += qtd;
            descricao.push(`${qtd} comércio fechado`);
            break;

          case "Recusado":
            totais["Recusados"] += qtd;
            descricao.push(`${qtd} recusados`);
            break;

          case "Faltante":
            totais["Faltantes"] += qtd;
            descricao.push(`${qtd} faltantes`);
            break;

          case "Palavra-chave incorreta":
            totais["Palavra-chave incorreta"] += qtd;
            descricao.push(`${qtd} palavra-chave incorreta`);
            break;

          case "Área inacessível":
            totais["Área inacessível"] += qtd;
            descricao.push(`${qtd} áreas inacessíveis`);
            break;

          case "Endereço incorreto":
            totais["Endereço incorreto ou incompleto"] += qtd;
            descricao.push(`${qtd} endereço incorreto`);
            break;

          case "Cliente mudou de endereço":
            totais["Cliente mudou de endereço"] += qtd;
            descricao.push(`${qtd} cliente mudou de endereço`);
            break;

          case "Pacote de outra área":
            totais["Pacote de outra área"] += qtd;
            descricao.push(`${qtd} pacote de outra área`);
            break;

          case "Pacote suspenso por fraude":
            totais["Pacote suspenso por fraude"] += qtd;
            descricao.push(`${qtd} fraude`);
            break;

          case "Pacote avariado":
            totais["Pacote avariado"] += qtd;
            descricao.push(`${qtd} avariado`);
            break;

          case "Tentativa de roubo":
            totais["Tentativa de roubo"] += qtd;
            descricao.push(`${qtd} tentativa de roubo`);
            break;

          case "Não estava na agência":
  totais["Não estava na agência"] += qtd;

  descricao.push(
    `${qtd} ${qtd > 1 ? "não estavam na agência" : "não estava na agência"}`
  );

  break;

          case "Não visitado":
            totais["Não visitado"] += qtd;
            descricao.push(`${qtd} não visitado`);
            break;

        }

      }

    });

  if (descricao.length) {

  const texto = `
📊 DS: ${rota.ds.toFixed(1).replace(".", ",")}%
👨‍✈️ Motorista: ${rota.motorista}
🚐 Placa: ${rota.placa}
📍 Rota: ${rota.rota.startsWith("#")
  ? rota.rota
  : `${rota.rota} | #${rota.numero}`}
🕒 Stem Out: ${rota.orh || "-"}
❌ Insucessos: ${rota.falhas} (${descricao.join(", ")})

──────────────`;

  if (rota.tipo === "Coleta") {
    rotasColetaTexto += texto;
  } else {
    rotasEntregaTexto += texto;
  }

}

  });

  setTextoWhats(`🟢 Fechamento SMG2 🟢

📅 ${new Date().toLocaleDateString("pt-BR")}

📊 DS: ${resumo.ds.toFixed(1).replace(".", ",")}%

🚐 Total de Rotas: ${resumo.rotasTotais}

🚑 Total de Ambulâncias: ${extras.ambulancias}

🚨 Total de Rotas No Show: ${extras.noShow}

📦 Total de Pacotes: ${resumo.pacotes}

✅ Total de Entregues: ${resumo.entregues}

❌ Total de Insucessos: ${resumo.falhas}

👍 Total de Revertidos: ${extras.revertidos}

🚨 Impacto de Insucesso: ${((resumo.falhas / resumo.pacotes) * 100).toFixed(1).replace(".", ",")}%

──────────────

📌 Motivos dos Insucessos

• Não havia ninguém no endereço: ${totais["Não havia ninguém no endereço"]}
• Comércio fechado: ${totais["Comércio fechado"]}
• Recusados: ${totais["Recusados"]}
• Faltantes: ${totais["Faltantes"]}
• Palavra-chave incorreta: ${totais["Palavra-chave incorreta"]}
• Área inacessível: ${totais["Área inacessível"]}
• Endereço incorreto ou incompleto: ${totais["Endereço incorreto ou incompleto"]}
• Cliente mudou de endereço: ${totais["Cliente mudou de endereço"]}
• Pacote de outra área: ${totais["Pacote de outra área"]}
• Pacote suspenso por fraude: ${totais["Pacote suspenso por fraude"]}
• Pacote avariado: ${totais["Pacote avariado"]}
• Tentativa de roubo: ${totais["Tentativa de roubo"]}
• Não estava na agência: ${totais["Não estava na agência"]}
• Não visitado: ${totais["Não visitado"]}

──────────────

🚨 Rotas com Insucessos

${rotasEntregaTexto}

${rotasColetaTexto
  ? `🚛 FALHAS DE COLETA

${rotasColetaTexto}`
  : ""}
`);


}
async function gerarImagemPromotores() {

  const canvas = await html2canvas(refPromotores.current,{
    scale:2,
    backgroundColor:"#fff"
  });

  const link=document.createElement("a");

  link.download="Ranking_Promotores.png";
  link.href=canvas.toDataURL("image/png");
  link.click();

}

async function gerarImagemOfensores() {

  const canvas = await html2canvas(refOfensores.current,{
    scale:2,
    backgroundColor:"#fff"
  });

  const link=document.createElement("a");

  link.download="Ranking_Ofensores.png";
  link.href=canvas.toDataURL("image/png");
  link.click();

}  

  return (

    <div className="dashboard">

      <header className="topo">

        <div>

          <h1>🚚 SMG2</h1>

          <p>Painel Operacional</p>

        </div>

        <div className="status">

          <span>📅 {new Date().toLocaleDateString("pt-BR")}</span>

          <button>🟢 Fechamento do Dia</button>

        </div>

      </header>

      <section className="indicadores">

  <div className="indicador azul">
    <div className="icone">📊</div>
    <h3>DS</h3>
    <h1>{dados.ds.toFixed(1).replace(".", ",")}%</h1>
    <span>Performance do dia</span>
  </div>

  <div className="indicador">
    <div className="icone">🚚</div>
    <h3>Rotas Totais</h3>
    <h1>{dados.rotasTotais}</h1>
    <span>{dados.entrega} Entrega • {dados.coleta} Coleta</span>
  </div>

  <div className="indicador">
    <div className="icone">📦</div>
    <h3>Pacotes</h3>
    <h1>{dados.pacotes}</h1>
    <span>{dados.sacas} Sacas</span>
  </div>

  <div className="indicador verde">
    <div className="icone">✅</div>
    <h3>Entregues</h3>
    <h1>{dados.entregues}</h1>
    <span>{dados.ds.toFixed(1).replace(".", ",")}%</span>
  </div>

  <div className="indicador vermelho">
    <div className="icone">🚨</div>
    <h3>Falhas</h3>
    <h1>{dados.falhas}</h1>
   <span>
  {((dados.falhas / dados.pacotes) * 100 || 0)
    .toFixed(1)
    .replace(".", ",")}
  %
</span>
  </div>

  <div className="indicador laranja">
    <div className="icone">⏳</div>
    <h3>Pendentes</h3>
   <h1>{dados.pendentes}</h1>
    <span>
  {((dados.pendentes / dados.pacotes) * 100 || 0)
    .toFixed(1)
    .replace(".", ",")}
  %
</span>
  </div>

</section>

      <section className="linha">

       <div className="card grande">

  <h2>📋 Relatório Logistics</h2>

  <p className="subtitulo">
    Cole aqui o relatório do Logistics para gerar o fechamento operacional.
  </p>

  <textarea
  className="txtRelatorio"
  value={relatorio}
  onChange={(e) => setRelatorio(e.target.value)}
  placeholder="Cole o relatório aqui..."
/>

 <button
  className="btnGerar"
  onClick={gerarFechamento}
>
  🚀 Gerar Fechamento
</button>

</div>

       <div className="card gigante">

  <div className="tituloTabela">

    <div>
      <h2>🚨 Rotas com Insucesso</h2>
      <p>Edite a quantidade de insucessos por motorista.</p>
    </div>

   
  </div>

  <div className="tabela">

    <div className="cabecalho">
  <div>#</div>
  <div>Motorista</div>
  <div>Rota / Placa</div>
  <div>Falhas</div>
  <div>Ação</div>
</div>

   {rotas
  .filter((rota) => rota.falhas > 0)
  .map((rota, i) => (

    <div key={i}>

      <div
className={
rotasEditadas[rota.numero]?.revisado
? "linhaTabela concluida"
: "linhaTabela"
}
>

        <div>{i + 1}</div>

        <div>{rota.motorista}</div>

        <div>{rota.rota} / {rota.placa}</div>

        <div className="qtdFalhas">
          {rota.falhas}
        </div>

        <div>
      <button
className={
rotasEditadas[rota.numero]?.revisado
? "btnConcluido"
: "btnEditar"
}
onClick={()=>{
setRotaSelecionada(rota);
setPainelAberto(true);
}}
>

{rotasEditadas[rota.numero]?.revisado ? "✔" : "✏️"}

</button>
        </div>

      </div>

     
    </div>

))}

  </div>

</div>

<CentralImagens
  gerarImagemPromotores={gerarImagemPromotores}
  gerarImagemOfensores={gerarImagemOfensores}
  extras={extras}
  setExtras={setExtras}
  atualizarFechamento={() => atualizarFechamento(rotas)}
/>

      </section>

   <section className="linha2">

  <div className="card whatsapp">

    <div className="cardHeader">

      <h2>📱 Prévia WhatsApp</h2>

      <button
  className="btnCopiarWhats"
  onClick={() => {
    navigator.clipboard.writeText(textoWhats);
    alert("✅ Fechamento copiado!");
  }}
>
  📋 Copiar
</button>

    </div>

    <textarea
      className="previewBox"
      readOnly
      value={textoWhats}
    />

  </div>

  <div className="card hora">

    <div className="cardHeader">

      <h2>🕒 Hora a Hora</h2>
<button
  className="btnCopiarHora"
  onClick={() => {
    navigator.clipboard.writeText(textoHora);
    alert("✅ Hora a Hora copiado!");
  }}
>
  📋 Copiar
</button>

    </div>

    <textarea
      className="previewBox"
      readOnly
      value={textoHora}
    />

  </div>

</section>

<PainelEdicao
   aberto={painelAberto}
   rota={rotaSelecionada}
   onClose={() => setPainelAberto(false)}
   onSalvar={salvarEdicao}
/>

{/* COLE AQUI */}

<div
  style={{
    position: "fixed",
    left: "-9999px",
    top: 0,
  }}
>

  <RankingImagem
  ref={refPromotores}
  titulo="🏆 Ranking Promotores"
  cor="#16A34A"
  data={new Date().toLocaleDateString("pt-BR")}
  rotas={gerarPromotores(rotas).slice(0, 10)}
/>

  <RankingImagem
    ref={refOfensores}
    titulo="🚨 Ranking Ofensores"
    cor="#DC2626"
    data={new Date().toLocaleDateString("pt-BR")}
    rotas={gerarRanking(rotas).slice(0, 10)}
  />

</div>

</div>

);

}