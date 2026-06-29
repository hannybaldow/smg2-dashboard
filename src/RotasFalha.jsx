import { useState } from "react";

export default function RotasFalha({
  rotas,
  detalhesRotas,
  setDetalhesRotas,
}) {
  const [rotaEditando, setRotaEditando] = useState(null);
  const [motivos, setMotivos] = useState({
  clienteAusente:0,
  comercioFechado:0,
  recusado:0,
  faltante:0,
  palavraChave:0,
  area:0,
  endereco:0,
  mudou:0,
  outraArea:0,
  fraude:0,
  avariado:0,
  roubo:0,
  agencia:0,
  naoVisitado:0,
});

 function salvar(rota, motivos) {

  const descricao = [];

  if (motivos.clienteAusente > 0)
    descricao.push(`${motivos.clienteAusente} clientes ausentes`);

  if (motivos.comercioFechado > 0)
    descricao.push(`${motivos.comercioFechado} comércios fechados`);

  if (motivos.recusado > 0)
    descricao.push(`${motivos.recusado} recusados`);

  if (motivos.faltante > 0)
    descricao.push(`${motivos.faltante} faltantes`);

  if (motivos.palavraChave > 0)
    descricao.push(`${motivos.palavraChave} palavras chave incorretas`);

  if (motivos.area > 0)
    descricao.push(`${motivos.area} áreas inacessíveis`);

  if (motivos.endereco > 0)
    descricao.push(`${motivos.endereco} endereços incompletos`);

  if (motivos.mudou > 0)
    descricao.push(`${motivos.mudou} clientes mudaram de endereço`);

  if (motivos.outraArea > 0)
    descricao.push(`${motivos.outraArea} pacotes de outra área`);

  if (motivos.fraude > 0)
    descricao.push(`${motivos.fraude} pacotes suspensos por fraude`);

  if (motivos.avariado > 0)
    descricao.push(`${motivos.avariado} pacotes avariados`);

  if (motivos.roubo > 0)
    descricao.push(`${motivos.roubo} tentativas de roubo`);

  if (motivos.agencia > 0)
    descricao.push(`${motivos.agencia} não estavam na agência`);

  if (motivos.naoVisitado > 0)
    descricao.push(`${motivos.naoVisitado} não visitados`);

  const lista = detalhesRotas.filter(r => r.rota !== rota.rota);

console.log("ROTA RECEBIDA:", rota);

  lista.push({
    ...rota,
    motivos,
    descricao: descricao.join(", "),
  });

  setDetalhesRotas(lista);

  setRotaEditando(null);
}

  function detalhe(rota) {
    return detalhesRotas.find((r) => r.rota === rota.rota);
  }

  return (
    <div className="box">

      <h2>🚨 Rotas com Falha</h2>

      <p>
        Preenchidas: {detalhesRotas.length} / {rotas.length}
      </p>

      {rotas.map((rota) => {

        const salvo = detalhe(rota);

        return (

          <div
            key={rota.rota}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >

            <h3>
              🚐 {rota.rota}
              {salvo && (
                <span style={{ color: "green" }}>
                  {" "}✔
                </span>
              )}
            </h3>

            <p>
              <strong>Motorista:</strong> {rota.motorista}
            </p>

            <p>
              ✅ Entregues: {rota.entregues}
              <br />
              ❌ Insucessos: {rota.falhas}
              <br />
              🕒 Stem Out: {rota.orh}
            </p>

            {salvo && (

              <div
                style={{
                  background: "#f5f5f5",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >

                <strong>Falhas informadas:</strong>

                <br />

                {salvo.descricao}

              </div>

            )}

            <button
              onClick={() => {
                setMotivos(
  salvo?.motivos || {
    clienteAusente:0,
    comercioFechado:0,
    recusado:0,
    faltante:0,
    palavraChave:0,
    area:0,
    endereco:0,
    mudou:0,
    outraArea:0,
    fraude:0,
    avariado:0,
    roubo:0,
    agencia:0,
    naoVisitado:0,
  }
);
                setRotaEditando(
                  rotaEditando === rota.rota ? null : rota.rota
                );
              }}
            >
              ✏️ Editar Falhas
            </button>

            {rotaEditando === rota.rota && (

              <div
                style={{
                  marginTop: 15,
                }}
              >

                {[
  ["clienteAusente","Cliente ausente"],
  ["comercioFechado","Comércio fechado"],
  ["recusado","Recusado"],
  ["faltante","Faltante"],
  ["palavraChave","Palavra-chave incorreta"],
  ["area","Área inacessível"],
  ["endereco","Endereço incompleto"],
  ["mudou","Cliente mudou endereço"],
  ["outraArea","Pacote de outra área"],
  ["fraude","Pacote suspenso por fraude"],
  ["avariado","Pacote avariado"],
  ["roubo","Tentativa de roubo"],
  ["agencia","Não estava na agência"],
  ["naoVisitado","Não visitado"],
].map(([campo,label])=>(

<div
key={campo}
style={{
display:"flex",
justifyContent:"space-between",
marginBottom:8
}}
>

<span>{label}</span>

<input
type="number"
min="0"
value={motivos[campo]}
onChange={(e)=>
setMotivos({
...motivos,
[campo]:Number(e.target.value)
})
}
style={{
width:60,
textAlign:"center"
}}
/>

</div>

))}

                <button
                  style={{
                    width: "100%",
                    marginTop: 10,
                  }}
                  onClick={() => salvar(rota, motivos)}
                >
                  💾 Salvar
                </button>

              </div>

            )}

          </div>

        );

      })}

    </div>
  );
}