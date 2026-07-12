export default function CentralImagens({
  gerarImagemPromotores,
  gerarImagemOfensores
}) {

  return (

    <div className="card lateral">

      <h2>🖼️ Central de Imagens</h2>

      <button
        className="btnCentral verde"
        onClick={gerarImagemPromotores}
      >
        🏆 Gerar Promotores
      </button>

      <button
        className="btnCentral vermelho"
        onClick={gerarImagemOfensores}
      >
        🚨 Gerar Ofensores
      </button>

    </div>

  );

}