

function carregarDadosAPI() {
    fetch(`http://localhost:3000/produtos/listar`)
        .then((response) => response.json())
        .then((resultado) => {
            console.log(resultado)
            var linha = ``;

            resultado.output.map((itens, ix) => {
                linha += `<div class="card">
                <img src=${itens.foto} class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${itens.nomeproduto}</h5>
                  <p class="card-text">${itens.descricao}</p>
                  <p class="card-text">${itens.preco}</p>

                  <p class="card-text"><small class="text-muted"><a href="pedido.html?id=${itens.idproduto}" class="btn btn-primary btn-lg">Comprar</a>
                 
                  
                </small></p>
                </div>
              </div> `;
            });
           
         
            document.getElementById("grupocard").innerHTML = linha;

        })
        .catch((erro) => console.error(`Erro ao carregar a API->${erro}`))
}
function carregarAtualizar() {
    var id = window.location.search.substring(4);
    fetch(`http://localhost:3000/produto/buscar/${id}`)
        .then((response) => response.json())
    then((dados) => {
        console.log(dados);
        document.getElementById("txtNomeProduto").value = dados.output[0].nomeproduto;
        document.getElementById("txtDescricao").value = dados.output[0].descricao;
        document.getElementById("txtPreco").value = dados.output[0].preco;
        document.getElementById("txtFoto").value = dados.output[0].foto;
    })
        .catch((erro) => console.error(`Erro ao carregar a api -> ${erro}`));
}