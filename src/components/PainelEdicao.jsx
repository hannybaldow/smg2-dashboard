import { useEffect, useMemo, useState } from "react";
import "../styles/painelEdicao.css";

const MOTIVOS = [
  "Não havia ninguém",
  "Comércio fechado",
  "Recusado",
  "Faltante",
  "Palavra-chave incorreta",
  "Área inacessível",
  "Endereço incorreto",
  "Cliente mudou de endereço",
  "Pacote de outra área",
  "Pacote suspenso por fraude",
  "Pacote avariado",
  "Tentativa de roubo",
  "Não estava na agência",
  "Não visitado",
];

export default function PainelEdicao({
  aberto,
  rota,
  onClose,
  onSalvar,
  dadosSalvos
}) {

  const [motivos, setMotivos] = useState({});

  useEffect(() => {

    if (!rota) return;

    if (dadosSalvos) {
      setMotivos(dadosSalvos);
      return;
    }

    const obj = {};

    MOTIVOS.forEach((m) => {
      obj[m] = 0;
    });

    setMotivos(obj);

  }, [rota, dadosSalvos]);

  const totalDigitado = useMemo(() => {

    return Object.values(motivos).reduce(
      (a, b) => a + Number(b || 0),
      0
    );

  }, [motivos]);

  const restante = (rota?.falhas || 0) - totalDigitado;

  function alterar(nome, valor) {

    setMotivos((old) => ({
      ...old,
      [nome]: Number(valor || 0)
    }));

  }

  if (!aberto || !rota) return null;

  return (

    <div className="painelEditar">

      <div className="painelHeader">

        <h2>✏️ Editar Rota</h2>

        <button onClick={onClose}>
          ✕
        </button>

      </div>

      <div className="painelConteudo">

        <h3>{rota.motorista}</h3>

        <span className="subPainel">
          {rota.rota} / {rota.placa}
        </span>

        <div className="cardResumo">

          <div>

            <small>Total da rota</small>

            <strong>{rota.falhas}</strong>

          </div>

          <div>

            <small>Distribuído</small>

            <strong>{totalDigitado}</strong>

          </div>

          <div>

            <small>Restante</small>

            <strong
              style={{
                color:
                  restante === 0
                    ? "#16a34a"
                    : "#dc2626"
              }}
            >
              {restante}
            </strong>

          </div>

        </div>

        <div className="listaMotivos">

          {MOTIVOS.map((motivo) => (

            <div
              className="motivoLinha"
              key={motivo}
            >

              <span>{motivo}</span>

              <input
                type="number"
                min="0"
                value={motivos[motivo] || 0}
                onChange={(e) =>
                  alterar(
                    motivo,
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>

      </div>

      <div className="rodapePainel">

        <button
          className="btnSalvar"
          disabled={restante !== 0}
          onClick={() => onSalvar(motivos)}
        >

          💾 Salvar

        </button>

        <button
          className="btnCancelar"
          onClick={onClose}
        >

          Cancelar

        </button>

      </div>

    </div>

  );

}