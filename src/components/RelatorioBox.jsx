export default function RelatorioBox({
  relatorio,
  setRelatorio,
  gerarFechamento,
}) {

  return (

    <div className="card">

      <h2>
        📋 Relatório Logistics
      </h2>

      <textarea
        className="relatorio-textarea"
        value={relatorio}
        onChange={(e)=>setRelatorio(e.target.value)}
        placeholder="Cole aqui todo o relatório operacional do Logistics..."
      />

      <button
        className="btn btn-primary"
        onClick={gerarFechamento}
      >
        🚀 Gerar Fechamento
      </button>

    </div>

  );

}