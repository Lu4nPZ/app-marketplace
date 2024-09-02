fetch('js/backend.json')
.then(response => response.json())
.then(data =>{
    localStorage.setItem('produtos', JSON.stringify(data))


    setTimeout(() => {
        $('#produtos').empty()

    data.forEach(produto =>{
        var produtoHTML = `<div class="item">
                                <a data-id="${produto.id} href="#" class="produto">
                                    <div class="image-content">
                                        <img class="imagem-produto" src="${produto.imagem}" alt="airpods">
                                    </div>
                                    <div class="info-item">
                                        <div class="nome-preco">
                                            <span class="nome-item">${produto.nome}</span>
                                            <span class="avaliacao-item"><i class=" star ri-star-fill"></i>${produto.rating}</span>
                                        </div>
                                        <div class="preco">
                                            <span>${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>`

        $('#produtos').append(produtoHTML)
    })

        $('.produto').on('click', function (){
            var id = $(this).attr('data-id')
            localStorage.setItem('detalhe', id)
            app.views.main.router.navigate('/detalhes/')
        })

    }, 1000);
})
.catch(error => console.error('Erro ao fazer fetch dos dados' +error))

setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

    $('.btn-car').attr('data-count', carrinho.length)
}, 300);