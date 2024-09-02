var localCarrinho = localStorage.getItem('carrinho')

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho)
    if(carrinho.length >0){
        renderizarCarrinho()
        calcularTotal()
    }else{
        carrinhoVazio()
    }
}else{
    carrinhoVazio()
}

function renderizarCarrinho(){
    $('.lista-carrinho').empty()

    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `<li class="item-carrinho">
                            <div class="area-img">
                                <img src="${itemCarrinho.item.imagem}" alt="produto">
                            </div>
                            <div class="item-details">
                                <div class="nome">
                                    <span class="nome-produto">${itemCarrinho.item.nome}</span>
                                    <a data-index="${index}" class="delete-item" href="#"><i class="ri-close-fill"></i></a>
                                </div>
                                <div class="configuracao">
                                    <span>${itemCarrinho.item.principal_caracteristica}</span>
                                </div>
                                <div class="preco-quantidade">
                                    <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                                    <div class="count">
                                        <a class="minus" data-index="${index}" href="#">-</a>
                                        <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                                        <a class="plus" data-index="${index}" href="#">+</a>
                                    </div>
                                </div>
                            </div>
                        </li>`

        $('.lista-carrinho').append(itemDiv)
    })

    attachEventHandlers()
}

function calcularTotal(){
    var totalCarrinho = 0
    $.each(carrinho, function(index, itemCarrinho){
        totalCarrinho += itemCarrinho.total_item
    })
    $('#subtotal').html(totalCarrinho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}))
}

function carrinhoVazio(){
    $('.lista-carrinho').empty()
    $('#valor-carrinho').addClass('display-none')
    $('#comprar').addClass('display-none')

    $('.lista-carrinho').html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span class="color-gray">Nada por enquanto</span>
        </div>`)
}

$('#esvaziar').on('click', function(){
        app.dialog.confirm('Deseja limpar o carrinho ?', '<strong>LIMPAR</strong>', function(){
        localStorage.removeItem('carrinho')
        app.views.main.router.refreshPage()
    })
})

function attachEventHandlers(){
    $(".delete-item").on('click', function (){
        var index = $(this).data('index');
        app.dialog.confirm('Deseja remover este item ?', 'REMOVER', function(){
            carrinho.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            app.views.main.router.refreshPage();
        });
    });

    $(".minus").on('click', function (){
        var index = $(this).data('index');
        if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotal();
        } else {
            var itemName = carrinho[index].item.nome;
            app.dialog.confirm(`Deseja remover ${itemName} do carrinho?`, 'REMOVER ?', function(){
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                
                if(carrinho.length > 0) {
                    renderizarCarrinho();
                    calcularTotal();
                } else {
                    carrinhoVazio();
                }
            });
        }
    });

    $(".plus").on('click', function (){
        var index = $(this).data('index');
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotal();
    });
}