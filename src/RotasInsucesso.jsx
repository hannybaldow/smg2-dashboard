<div className="card gigante">

  <div className="tituloTabela">

    <div>
      <h2>🚨 Rotas com Insucesso</h2>
      <p>Edite a quantidade de insucessos por motorista.</p>
    </div>

    <button className="btnRecalcular">
      🔄 Recalcular Percentuais
    </button>

  </div>

  <div className="tabela">

    <div className="cabecalho">

      <div>#</div>
      <div>Motorista</div>
      <div>Rota / Placa</div>
      <div>Insucessos</div>
      <div>% Falhas</div>
      <div>Ações</div>

    </div>

    {[1,2,3,4,5,6,7,8].map((item)=>(

      <div className="linhaTabela" key={item}>

        <div>{item}</div>

        <div>MARCOS VINICIUS</div>

        <div>VK5_AM1 / TXP9H05</div>

       <div className="qtdFalhas">
  {rota.falhas}
</div>
        <div>1,6%</div>

        <div>
  <button
  className="btnEditar"
  onClick={() => setRotaEditando(i)}
>
  ✏️
</button>
</div>

      </div>

    ))}

  </div>

</div>