fetch('js/backend.json')
.then(response => response.json())
.then(data =>{
    localStorage.setItem('produtos', JSON.stringify(data))

    function aparecerProdutos(){
        const produtosContainer = document.querySelector('.produtos')
        let produtos = ''

        data.forEach(produto =>{
            produtos += `<div class="item">
                                <a href="/detalhes/">
                                    <div class="image-content">
                                        <img class="imagem-produto" src="${produto.imagem}" alt="airpods">
                                    </div>
                                    <div class="info-item">
                                        <div class="nome-preco">
                                            <span class="nome-item">${produto.nome}</span>
                                            <span class="avaliacao-item"><i class=" star ri-star-fill"></i>${produto.rating}</span>
                                        </div>
                                        <div class="preco">
                                            <span>${produto.preco_promocional}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>`
        })

        setTimeout(() => {
            produtosContainer.innerHTML = produtos
        }, 1000);
    }

    console.log(data);

    aparecerProdutos()
})
.catch(error => console.error('Erro ao fazer fetch dos dados' +error))