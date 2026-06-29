function textoMotivos(motivos) {

  if (!motivos) return "Sem detalhamento";

  const lista = [];

  if (motivos.clienteAusente)
    lista.push(`${motivos.clienteAusente} cliente${motivos.clienteAusente > 1 ? "s" : ""} ausente${motivos.clienteAusente > 1 ? "s" : ""}`);

  if (motivos.comercioFechado)
    lista.push(`${motivos.comercioFechado} comércio${motivos.comercioFechado > 1 ? "s" : ""} fechado${motivos.comercioFechado > 1 ? "s" : ""}`);

  if (motivos.recusado)
    lista.push(`${motivos.recusado} recusado${motivos.recusado > 1 ? "s" : ""}`);

  if (motivos.faltante)
    lista.push(`${motivos.faltante} faltante${motivos.faltante > 1 ? "s" : ""}`);

  if (motivos.palavraChave)
    lista.push(`${motivos.palavraChave} palavra${motivos.palavraChave > 1 ? "s" : ""} chave incorreta`);

  if (motivos.area)
    lista.push(`${motivos.area} área${motivos.area > 1 ? "s" : ""} inacessível${motivos.area > 1 ? "is" : ""}`);

  if (motivos.endereco)
    lista.push(`${motivos.endereco} endereço${motivos.endereco > 1 ? "s" : ""} incompleto${motivos.endereco > 1 ? "s" : ""}`);

  if (motivos.agencia)
    lista.push(`${motivos.agencia} não estava${motivos.agencia > 1 ? "m" : ""} na agência`);

  if (lista.length === 0) {
  return "Sem detalhamento";
}

return lista.join(", ");
}

function capitalizar(nome) {

  const pequenas = [
    "da","de","do","das","dos","e"
  ];

  return nome
    .toLowerCase()
    .split(" ")
    .map((p,i)=>{

      if(i>0 && pequenas.includes(p))
        return p;

      return p.charAt(0).toUpperCase()+p.slice(1);

    })
    .join(" ");

}
export function gerarTextoRotas(detalhesRotas) {

  if (!detalhesRotas.length) return "";

  return detalhesRotas.map((rota) => {

    return `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
🚐 ${rota.rota} | #${rota.numero}
👨‍✈️ Motorista: ${capitalizar(rota.motorista)}
✅ Entregues: ${rota.entregues}
🔴 Insucessos: ${rota.falhas} (${textoMotivos(rota.motivos)})
🕒 Stem Out: ${rota.orh}`;

  }).join("\n\n━━━━━━━━━━━━━━━━━━\n\n");

}
export function gerarImpacto(detalhesRotas) {

  const total = {
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
  };

  detalhesRotas.forEach((rota)=>{

    if(!rota.motivos) return;

    Object.keys(total).forEach((k)=>{
      total[k]+=rota.motivos[k] || 0;
    });

  });

  const linhas=[];

 linhas.push(`• Não havia ninguém no endereço: ${total.clienteAusente}`);
linhas.push(`• Comércio fechado: ${total.comercioFechado}`);
linhas.push(`• Recusados: ${total.recusado}`);
linhas.push(`• Faltantes: ${total.faltante}`);
linhas.push(`• Palavra-chave incorreta: ${total.palavraChave}`);
linhas.push(`• Área inacessível: ${total.area}`);
linhas.push(`• Endereço incorreto ou incompleto: ${total.endereco}`);
linhas.push(`• Cliente mudou de endereço: ${total.mudou}`);
linhas.push(`• Pacote de outra área: ${total.outraArea}`);
linhas.push(`• Pacote suspenso por fraude: ${total.fraude}`);
linhas.push(`• Pacote avariado: ${total.avariado}`);
linhas.push(`• Tentativa de roubo: ${total.roubo}`);
linhas.push(`• Não estava na agência: ${total.agencia}`);
linhas.push(`• Não visitado: ${total.naoVisitado}`);

  return linhas.join("\n");
}
export function gerarTextoRanking(rotas) {

  if (!rotas.length) return "";

  return rotas.map((rota) => {

    const ds = rota.ds.toFixed(1).replace(".", ",");

    return `📊 DS: ${ds}%
👨‍✈️ Motorista: ${capitalizar(rota.motorista)}
🚐 Placa: ${rota.placa || "-"}
📍 Rota: ${rota.rota} | #${rota.numero}
❌ Insucessos: ${rota.falhas} (${textoMotivos(rota.motivos)})`;

  }).join("\n\n━━━━━━━━━━━━━━━━━━\n\n");

}
export function gerarRankingOfensores(rotas) {

  if (!rotas.length) return "";

  const medalhas = ["🥇","🥈","🥉"];

  return `🚨 Ranking Ofensores

${rotas.map((rota, i) => {

  const posicao = medalhas[i] || `${i + 1}º`;

  return `${posicao} ${capitalizar(rota.motorista)}
📊 DS: ${rota.ds.toFixed(1).replace(".", ",")}%
❌ Insucessos: ${rota.falhas}
🕒 Stem Out: ${rota.orh}`;

}).join("\n\n")}`;

}
export function gerarRankingPromotores(rotas) {

  console.log(rotas);

  const promotores = rotas
    .filter((r) => {

      const total = r.entregues + r.falhas;

const ds = total === 0
  ? 100
  : (r.entregues / total) * 100;

return r.falhas === 0;

     
    })
    .sort((a,b)=>a.orh.localeCompare(b.orh));

  if (!promotores.length) return "";

  const medalhas = ["🥇","🥈","🥉"];

  return `🏆 Ranking Promotores

${promotores.map((rota, i)=>{

  const posicao = medalhas[i] || `${i + 1}º`;

  return `${posicao} ${capitalizar(rota.motorista)}
📊 DS: 100%
🕒 Stem Out: ${rota.orh}`;

}).join("\n\n")}`;

}