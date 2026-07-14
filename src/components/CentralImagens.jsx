
export default function CentralImagens({
  gerarImagemPromotores,
  gerarImagemOfensores,
  extras,
  setExtras,
  atualizarFechamento
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

      <hr style={{ margin: "18px 0" }} />

      <h3 style={{ marginBottom: 15 }}>📋 Informações</h3>

      <div style={{ marginBottom: 12 }}>
        <label>🚑 Ambulâncias</label>
        <input
          type="number"
          value={extras.ambulancias}
          onChange={(e) =>
            setExtras({
              ...extras,
              ambulancias: Number(e.target.value),
            })
          }
          style={{
            width: "100%",
            marginTop: 6,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>👍 Revertidos</label>
        <input
          type="number"
          value={extras.revertidos}
          onChange={(e) =>
            setExtras({
              ...extras,
              revertidos: Number(e.target.value),
            })
          }
          style={{
            width: "100%",
            marginTop: 6,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label>🚨 No Show</label>
        <input
          type="number"
          value={extras.noShow}
          onChange={(e) =>
            setExtras({
              ...extras,
              noShow: Number(e.target.value),
            })
          }
          style={{
            width: "100%",
            marginTop: 6,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <button
  className="btnCentral"
  style={{ background:"#2563EB" }}
 onClick={() => {
  atualizarFechamento();
  alert("Informações salvas!");
}}
>
  ✅ OK
</button>
    </div>
  );
}