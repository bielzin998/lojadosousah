const carrinho = [];

const botoesAdicionar =
    document.querySelectorAll(".adicionar");

const abrirCarrinho =
    document.getElementById("abrirCarrinho");

const fecharCarrinho =
    document.getElementById("fecharCarrinho");

const carrinhoElemento =
    document.getElementById("carrinho");

const overlay =
    document.getElementById("overlay");

const itensCarrinho =
    document.getElementById("itensCarrinho");

const quantidadeCarrinho =
    document.getElementById("quantidadeCarrinho");

const totalElemento =
    document.getElementById("total");

const finalizarCompra =
    document.getElementById("finalizarCompra");

const toast =
    document.getElementById("toast");


/* =========================
   ADICIONAR AO CARRINHO
========================= */

botoesAdicionar.forEach((botao) => {

    botao.addEventListener("click", () => {

        const jogo =
            botao.dataset.jogo;

        const nome =
            botao.dataset.nome;

        const preco =
            Number(botao.dataset.preco);


        const produto = {
            jogo: jogo,
            nome: nome,
            preco: preco
        };


        carrinho.push(produto);

        atualizarCarrinho();

        mostrarToast();

    });

});


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";


    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;

    }


    let total = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        const item =
            document.createElement("div");

        item.classList.add(
            "item-carrinho"
        );


        item.innerHTML = `

            <div>

                <strong>
                    ${produto.nome}
                </strong>

                <small>
                    ${produto.jogo}
                    •
                    ${formatarPreco(produto.preco)}
                </small>

            </div>


            <button
                class="remover"
                data-index="${index}"
            >
                Remover
            </button>

        `;


        itensCarrinho.appendChild(item);

    });


    quantidadeCarrinho.textContent =
        carrinho.length;


    totalElemento.textContent =
        formatarPreco(total);


    document
        .querySelectorAll(".remover")
        .forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            botao.dataset.index
                        );

                    carrinho.splice(
                        index,
                        1
                    );

                    atualizarCarrinho();

                }
            );

        });

}


/* =========================
   FORMATAR PREÇO
========================= */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =========================
   ABRIR CARRINHO
========================= */

abrirCarrinho.addEventListener(
    "click",
    () => {

        carrinhoElemento
            .classList
            .add("ativo");

        overlay
            .classList
            .add("ativo");

    }
);


/* =========================
   FECHAR CARRINHO
========================= */

function fecharCarrinhoFuncao() {

    carrinhoElemento
        .classList
        .remove("ativo");

    overlay
        .classList
        .remove("ativo");

}


fecharCarrinho.addEventListener(
    "click",
    fecharCarrinhoFuncao
);


overlay.addEventListener(
    "click",
    fecharCarrinhoFuncao
);


/* =========================
   TOAST
========================= */

function mostrarToast() {

    toast.classList.add(
        "mostrar"
    );


    setTimeout(() => {

        toast.classList.remove(
            "mostrar"
        );

    }, 1800);

}


/* =========================
   FINALIZAR PELO WHATSAPP
========================= */

finalizarCompra.addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "";

    // TÍTULO
    if (carrinho.length === 1) {
        mensagem = "Olá, gostaria de comprar uma conta:\n\n";
    } else {
        mensagem = "Olá, gostaria de comprar as seguintes contas:\n\n";
    }

    // CONTAS
    carrinho.forEach((produto, index) => {

        mensagem += `${index + 1}. ${produto.nome}\n`;
        mensagem += `Jogo: ${produto.jogo}\n`;
        mensagem += `Valor: ${formatarPreco(produto.preco)}\n\n`;

    });

    // TOTAL
    const total = carrinho.reduce(
        (soma, produto) => soma + produto.preco,
        0
    );

    mensagem += `Total da compra: ${formatarPreco(total)}`;

    // WHATSAPP
    const numero = "559988282889";

    const link =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");

});
/* =========================
   INICIAR
========================= */

atualizarCarrinho();