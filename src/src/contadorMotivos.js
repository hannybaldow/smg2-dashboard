export function contarMotivos(detalhesRotas) {

  const totais = {
    "Não havia ninguém no endereço": 0,
    "Comércio Fechado": 0,
    "Recusados": 0,
    "Faltantes": 0,
    "Palavra Chave Incorreta": 0,
    "Área inacessível": 0,
    "Endereço incorreto ou incompleto": 0,
    "Cliente mudou Endereço": 0,
    "Pacote de Outra Área": 0,
    "Pacote Suspenso por Fraude": 0,
    "Pacote Avariado": 0,
    "Tentativa de Roubo": 0,
    "Não estava na agência": 0,
    "Não visitado": 0,
  };

  detalhesRotas.forEach((rota) => {

    const texto = rota.descricao.toLowerCase();

    function pegarNumero(palavra) {
      const regex = new RegExp("(\\d+)\\s+" + palavra, "i");
      const m = texto.match(regex);
      return m ? Number(m[1]) : 0;
    }

    totais["Não havia ninguém no endereço"] +=
      pegarNumero("cliente") +
      pegarNumero("clientes ausentes") +
      pegarNumero("cliente ausente");

    totais["Comércio Fechado"] +=
      pegarNumero("comércio fechado") +
      pegarNumero("comércios fechados");

    totais["Recusados"] +=
      pegarNumero("recusado") +
      pegarNumero("recusados");

    totais["Faltantes"] +=
      pegarNumero("faltante") +
      pegarNumero("faltantes");

    totais["Área inacessível"] +=
      pegarNumero("área inacessível") +
      pegarNumero("áreas inacessíveis");

    totais["Endereço incorreto ou incompleto"] +=
      pegarNumero("endereço incompleto") +
      pegarNumero("endereços incompletos");

    totais["Não estava na agência"] +=
      pegarNumero("não estava na agência");

  });

  return totais;

}