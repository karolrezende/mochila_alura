const formulario = document.querySelector("#novoItem")
const lista = document.querySelector("#lista")
const itemArray = JSON.parse(localStorage.getItem("itemArray")) || []

itemArray.forEach(
    (elemento) => {

    novoItemFuncao(elemento)
    
                    }
)
formulario.addEventListener("submit", (acontece) =>{
    acontece.preventDefault()

    const nome = acontece.target.elements['nome'].value
    const quantidade = acontece.target.elements['quantidade'].value

    const existe = itemArray.find(elemento2 => elemento2.nome === nome)
    console.log(existe)

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }
    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itemArray[existe.id] = itemAtual
    }else{

        itemAtual.id = itemArray.length

        itemArray.push(itemAtual)

        localStorage.setItem("itemArray", JSON.stringify(itemArray))
    
        novoItemFuncao(itemAtual)
    }
    nome =""
    quantidade= ""
})

function novoItemFuncao(item){
   
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const itemQuantidade = document.createElement('strong')
    itemQuantidade.innerHTML = item.quantidade
    itemQuantidade.dataset.id = item.id
    novoItem.appendChild(itemQuantidade)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)


}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const botao = document.createElement("button");
    botao.innerText = "X"
    botao.addEventListener("click", function(){
        deletaElemento(this.parentNodem, id)
    })
    return botao
}

function deletaElemento(tag, id){
    tag.remove()

    itemArray.splice(itemArray.findIndex(elemento => elemento.id ===id), 1)
    localStorage.setItem("itemArray", JSON.stringify(itemArray))
}