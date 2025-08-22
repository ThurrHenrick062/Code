// Variáveis globais
let numberCart = 0     // Contador de itens no carrinho
let total = 0          // Valor total da compra
let productList = []   // Lista de produtos adicionados

// Finalizar pedido e enviar pelo WhatsApp
function finalizar() {
    const number = '5562993323848' // Número para onde será enviado o pedido
    let msg = 'Finalizei! Segue abaixo meu pedido: \n'

    // Monta lista dos produtos no formato desejado
    const finishProducts = productList.map(item => {
        return `${item.quantidade}x ${item.produto} - cor: ${item.cor} - R$ ${item.preco}`
    })

    // Adiciona cada produto na mensagem final
    for (let i = 0; i < finishProducts.length; i++) {
        msg += `- ${finishProducts[i]}\n`
    }

    // Abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, "_blank");
}

// Adicionar item ao carrinho
function carrinho(element) {
    const elementFather = element.parentElement    // Pega o elemento pai do botão clicado
    const cart = document.querySelector('#cart-items') // Lista de itens do carrinho
    const li = document.createElement('li')            // Cria um <li> para o produto

    // Pega informações do produto
    const product = elementFather.querySelector('h3').textContent
    const color = elementFather.querySelector('.select-color').value
    const amount = elementFather.querySelector('input').value
    let preco = elementFather.querySelector('p').textContent

    // Verifica se o produto já está no carrinho
    if (productList.find(item => item.produto === product)) {
        alert('Item já existe no carrinho');
    } else {
        // Atualiza contador do carrinho
        numberCart += 1
        document.querySelector('#cart-count').textContent = `${numberCart}`

        // Cria objeto do produto
        let obj = {
            quantidade: amount,
            produto: product,
            cor: color,
            preco: preco
        }

        // Adiciona produto na lista
        productList.push(obj)

        // Cria HTML do item no carrinho
        li.innerHTML = `
            <div style="display: flex; gap: 12px;">
                <h3>${amount}x ${product} - ${color} - ${preco}</h3>
                <button class="remove" onclick="excluir(this)">❌</button>
            </div>
        `
        cart.appendChild(li)

        // Atualiza o preço total
        const precoAtual = parseFloat(preco.slice(2).replace(',', ".")) * parseFloat(amount)
        total += precoAtual
        document.querySelector('#cart-total').textContent = `${total.toFixed(2).replace('.', ",")}`
    }
}

// Remover item do carrinho
function excluir(element) {
    let div = element.parentElement        // Pega a <div> do item no carrinho
    let productText = div.querySelector("h3").textContent

    // Extrai o nome do produto (ex: "2x Camiseta - Azul - R$ 50" → "Camiseta")
    const product = productText.split('x ')[1].split(' - ')[0].trim()

    // Busca o produto na lista
    const index = productList.findIndex(item => item.produto === product)

    if (index > -1) {
        const item = productList[index]

        // Atualiza contador do carrinho
        numberCart -= 1
        document.querySelector('#cart-count').textContent = `${numberCart}`

        // Atualiza total
        const precoAtual = parseFloat(item.preco.slice(2).replace(",", ".")) * parseFloat(item.quantidade)
        total -= precoAtual
        document.querySelector('#cart-total').textContent = `${total.toFixed(2).replace('.', ",")}`

        // Remove o produto da lista
        productList.splice(index, 1)
        console.log(productList)
    }

    // Remove o item da tela
    div.remove()
}
