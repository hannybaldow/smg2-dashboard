export default function Header({ data }) {

  return (

    <header
      style={{
        background: "#0F172A",
        borderRadius: 18,
        padding: "24px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        marginBottom: 25,
        boxShadow: "0 8px 24px rgba(0,0,0,.15)"
      }}
    >

      <div>

        <h1
          style={{
            margin: 0,
            color: "#60A5FA",
            fontSize: 30
          }}
        >
          🚚 SMG2
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            color: "#CBD5E1"
          }}
        >
          Painel Operacional
        </p>

      </div>

      <div
        style={{
          display: "flex",
          gap: 15
        }}
      >

        <div
          style={{
            background: "#1E293B",
            padding: "10px 18px",
            borderRadius: 12
          }}
        >
          📅 {data}
        </div>

        <div
          style={{
            background: "#16A34A",
            padding: "10px 18px",
            borderRadius: 12,
            fontWeight: 700
          }}
        >
          🟢 Fechamento do Dia
        </div>

      </div>

    </header>

  );

}