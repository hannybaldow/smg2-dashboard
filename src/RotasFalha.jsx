import { useMemo, useState } from "react";

const motivosPadrao = {
  clienteAusente: 0,
  comercioFechado: 0,
  recusado: 0,
  faltante: 0,
  palavraChave: 0,
  area: 0,
  endereco: 0,
  mudou: 0,
  outraArea: 0,
  fraude: 0,
  avariado: 0,
  roubo: 0,
  agencia: 0,
  naoVisitado: 0,
};

const campos = [
  ["clienteAusente", "Cliente ausente"],
  ["comercioFechado", "Comércio fechado"],
  ["recusado", "Recusado"],
  ["faltante", "Faltante"],
  ["palavraChave", "Palavra-chave incorreta"],
  ["area", "Área inacessível"],
  ["endereco", "Endereço incompleto"],
  ["mudou", "Cliente mudou endereço"],
  ["outraArea", "Pacote de outra área"],
  ["fraude", "Pacote suspenso por fraude"],
  ["avariado", "Pacote avariado"],
  ["roubo", "Tentativa de roubo"],
  ["agencia", "Não estava na agência"],
  ["naoVisitado", "Não visitado"],
];

export default function RotasFalha({
  rotas,
  detalhesRotas,
  setDetalhesRotas,
}) {

  const [busca, setBusca] = useState("");
  const [rotaSelecionada, setRotaSelecionada] = useState(null);
  const [motivos, setMotivos] = useState(motivosPadrao);

 const lista = useMemo(() => {

  return (rotas || [])
    .filter(r => !String(r.rota).startsWith("COLETA_")) // remove coletas
    .filter(r => Number(r.falhas) > 0)                  // só rotas com falha
    .filter((r) =>
      `${r.rota} ${r.motorista}`
        .toLowerCase()
        .includes(busca.toLowerCase())
    );

}, [rotas, busca]);

  function detalhe(rota) {
    return detalhesRotas.find((r) => r.rota === rota.rota);
  }

  function abrir(rota) {

    const salvo = detalhe(rota);

    setMotivos(salvo?.motivos || motivosPadrao);

    setRotaSelecionada(rota);

  }

  function alterar(campo, valor) {

    setMotivos({
      ...motivos,
      [campo]: Number(valor),
    });

  }

  function concluir() {

    if (!rotaSelecionada) return;

    const descricao = [];

    campos.forEach(([campo, texto]) => {

      if (motivos[campo] > 0) {

        descricao.push(`${motivos[campo]} ${texto}`);

      }

    });

    const novaLista = detalhesRotas.filter(
      (r) => r.rota !== rotaSelecionada.rota
    );
console.log("ROTA SELECIONADA");
console.log(rotaSelecionada);

    novaLista.push({
      ...rotaSelecionada,
      motivos,
      descricao: descricao.join(", "),
    });

    setDetalhesRotas(novaLista);

    setRotaSelecionada(null);

    setMotivos(motivosPadrao);

  }

  return (

<div
style={{
display:"grid",
gridTemplateColumns:"2.3fr 1fr",
gap:20,
alignItems:"start",
}}
>

<div className="box">

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20,
}}
>

<div>

<h2 style={{margin:0}}>
🚨 Rotas com Falha
</h2>

<small style={{color:"#64748b"}}>
Preenchidas {detalhesRotas.length} / {lista.length}
</small>

</div>

<input
value={busca}
onChange={(e)=>setBusca(e.target.value)}
placeholder="Buscar rota ou motorista..."
style={{
width:240,
height:38,
padding:"0 12px",
borderRadius:10,
border:"1px solid #d1d5db",
}}
/>

</div>
<div
  style={{
    maxHeight: 560,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingRight: 6,
  }}
>

{lista.length === 0 && (

<div
style={{
padding:60,
textAlign:"center",
border:"1px dashed #d1d5db",
borderRadius:14,
color:"#64748b",
}}
>

<div
style={{
fontSize:60,
marginBottom:15,
}}
>
📋
</div>

<h3
style={{
marginBottom:10,
}}
>
Nenhuma rota com falha encontrada
</h3>

<p>
Quando houver rotas com insucesso elas aparecerão aqui.
</p>

</div>

)}

{lista.map((rota)=>{

const salvo = detalhe(rota);

return(

<div
key={rota.rota}
style={{
display:"grid",
gridTemplateColumns:"90px 1.6fr 80px 80px 120px 90px",
alignItems:"center",
gap:15,
padding:"14px 18px",
border:"1px solid #E5E7EB",
borderRadius:14,
background:"#fff",
}}
>

<div
style={{
fontWeight:700,
color:"#2563EB",
}}
>
🚚 {rota.rota}
</div>

<div>

<div
style={{
fontWeight:700,
}}
>
{rota.motorista}
</div>

<div
style={{
fontSize:12,
color:"#64748B",
marginTop:4,
}}
>
Stem Out: {rota.orh || "-"}
</div>

</div>

<div
style={{
textAlign:"center",
}}
>

<div
style={{
fontSize:12,
color:"#64748B",
}}
>
Ent.
</div>

<div
style={{
fontWeight:700,
color:"#16A34A",
}}
>
{rota.entregues}
</div>

</div>

<div
style={{
textAlign:"center",
}}
>

<div
style={{
fontSize:12,
color:"#64748B",
}}
>
Falhas
</div>

<div
style={{
fontWeight:700,
color:"#DC2626",
}}
>
{rota.falhas}
</div>

</div>

<div>

<span
style={{
display:"inline-block",
padding:"6px 12px",
borderRadius:20,
fontSize:12,
fontWeight:700,
background:salvo ? "#DCFCE7" : "#FEF3C7",
color:salvo ? "#166534" : "#92400E",
}}
>

{salvo ? "Concluída" : "Pendente"}

</span>

</div>

<button
onClick={()=>abrir(rota)}
style={{
margin:0,
padding:"10px",
background:"#2563EB",
}}
>
✏️ Editar
</button>

</div>

);

})}

</div>

</div>

<div className="box">

<h2 style={{marginTop:0}}>
✏️ Editar Rota
</h2>
{!rotaSelecionada ? (

<div
style={{
height:560,
display:"flex",
justifyContent:"center",
alignItems:"center",
textAlign:"center",
color:"#64748B",
}}
>

<div>

<div
style={{
fontSize:70,
marginBottom:20,
}}
>
🚚
</div>

<h3>
Selecione uma rota
</h3>

<p
style={{
marginTop:10,
lineHeight:1.6,
}}
>
Clique em <strong>Editar</strong> na rota desejada
para informar os motivos dos insucessos.
</p>

</div>

</div>

) : (

<>

<div
style={{
background:"#EFF6FF",
border:"1px solid #BFDBFE",
borderRadius:16,
padding:18,
marginBottom:20,
}}
>

<h3
style={{
margin:0,
color:"#2563EB",
}}
>
🚚 {rotaSelecionada.rota}
</h3>

<div
style={{
marginTop:12,
lineHeight:1.9,
}}
>

<div>
<b>Motorista:</b> {rotaSelecionada.motorista}
</div>

<div>
<b>Entregues:</b>
<span
style={{
color:"#16A34A",
fontWeight:700,
}}
>
{" "}
{rotaSelecionada.entregues}
</span>
</div>

<div>
<b>Falhas:</b>
<span
style={{
color:"#DC2626",
fontWeight:700,
}}
>
{" "}
{rotaSelecionada.falhas}
</span>
</div>

<div>
<b>Stem Out:</b> {rotaSelecionada.orh || "-"}
</div>

</div>

</div>

<div
style={{
maxHeight:300,
overflowY:"auto",
paddingRight:5,
}}
>

{campos.map(([campo,texto])=>(

<div
key={campo}
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:12,
}}
>

<span
style={{
fontSize:14,
}}
>
{texto}
</span>

<input
type="number"
min="0"
value={motivos[campo]}
onChange={(e)=>alterar(campo,e.target.value)}
style={{
width:70,
padding:6,
textAlign:"center",
borderRadius:8,
border:"1px solid #CBD5E1",
}}
/>

</div>

))}
  </div>

        <button
          onClick={concluir}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 14,
            background: "#16A34A",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ✔ Concluir edição
        </button>

      </>

    )}

  </div>

</div>

  );

}