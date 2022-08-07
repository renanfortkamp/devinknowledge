const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
});

const cardList = new Array();
const titulo = document.getElementById("titulo");
const linguagem = document.getElementById("linguagem");
const categoria = document.getElementById("categoria");
const descricao = document.getElementById("descricao");
const link = document.getElementById("link");

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", function () {
    if (link.value == "") {
        let url = false;
        save(url);
    } else {
        let url = link.value;
        save(url);
    }
});

const save = (url) => {
    if (titulo.className != "noEdit") {
        let cardEdit = cardList[titulo.className];
        cardEdit.titulo = titulo.value;
        cardEdit.linguagem = linguagem.value;
        cardEdit.categoria = categoria.value;
        cardEdit.descricao = descricao.value;
        cardEdit.link = url;
        createCard(cardList);
        saveStorage();
        cleanInput();
        titulo.className = "noEdit";
        alert(`  SUCESSO!

  Dica editada da base do conhecimento!`);
    } else {
        if (
            titulo.value != "" &&
            linguagem.value != "" &&
            categoria.value != "" &&
            descricao.value != ""
        ) {
            cardList.push({
                titulo: titulo.value,
                linguagem: linguagem.value,
                categoria: categoria.value,
                descricao: descricao.value,
                link: url,
            });
            titulo.className = "noEdit";
            createCard(cardList);
            saveStorage();
            cleanInput();
            alert(`  SUCESSO!

  Dica cadastrada na base do conhecimento!`);
        }
    }
};

const cleanInput = () => {
    titulo.value = "";
    linguagem.value = "";
    categoria.value = "";
    descricao.value = "";
    link.value = "";
};

const pesquisaCards = document.getElementById("pesquisaButton");
pesquisaCards.addEventListener("click", () => {
    let pesquisaValue = document.getElementById("pesquisa").value;
    let pesquisaLower = pesquisaValue.toLowerCase();
    if (pesquisaValue != "") {
        let cardFiltrados = cardList.filter((item) =>
            item.titulo.toLowerCase().includes(pesquisaLower)
        );
        createCard(cardFiltrados);
    }
});

const resetaPesquisa = document.getElementById("resetPesquisa");
resetaPesquisa.addEventListener("click", () => {
    document.getElementById("pesquisa").value = "";
    createCard(cardList);
});

const somatorios = () => {
    let frontEnd = 0;
    let backEnd = 0;
    let fullStack = 0;
    let softSkill = 0;
    for (let i = 0; i < cardList.length; i++) {
        switch (cardList[i].categoria) {
            case "FrontEnd":
                frontEnd += 1;
                break;
            case "BackEnd":
                backEnd += 1;
                break;
            case "FullStack":
                fullStack += 1;
                break;
            case "softSkill":
                softSkill += 1;
                break;
        }
    }
    let total = frontEnd + backEnd + fullStack + softSkill;
    document.getElementById("total").innerText = total;
    document.getElementById("frontEnd").innerText = frontEnd;
    document.getElementById("backEnd").innerText = backEnd;
    document.getElementById("fullStack").innerText = fullStack;
    document.getElementById("softSkill").innerText = softSkill;
};

const createCard = (arr) => {
    document.querySelector("ul").innerHTML = "";
    cleanInput();
    for (let i = 0; i < arr.length; i++) {
        let ul = document.querySelector("ul");
        let li = document.createElement("li");
        let h2 = document.createElement("h2");
        let div1 = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let div2 = document.createElement("div");
        let btnDelete = document.createElement("button");
        let btnEditar = document.createElement("button");
        let btnVideo = document.createElement("button");
        let link = document.createElement("a");
        ul.appendChild(li);
        li.id = `${i}`;
        li.appendChild(h2);
        li.appendChild(div1);
        li.appendChild(div2);
        h2.innerText = `${arr[i].titulo}`;
        h2.className = "titleCard";
        div1.id = "div1";
        div1.appendChild(p1);
        div1.appendChild(p2);
        div1.appendChild(p3);
        p1.innerHTML = `<span>Linguagem/Skill:</span>${arr[i].linguagem}`;
        p2.innerHTML = `<span>Categoria:</span>${arr[i].categoria}`;
        p3.innerText = `${arr[i].descricao}`;
        div2.id = "div2";
        div2.appendChild(btnDelete);
        btnDelete.innerText = "🗑️";
        btnDelete.addEventListener("click", () => {
            deleteThiscard(i);
        });
        div2.appendChild(btnEditar);
        btnEditar.innerText = "🖊️";
        btnEditar.id = "edit";
        btnEditar.addEventListener("click", () => {
            editThisCard(i);
        });
        if (arr[i].link != false) {
            div2.appendChild(btnVideo);
            btnVideo.appendChild(link);
            link.href = arr[i].link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.innerText = "🎥";
        }
        somatorios();
    }
};

const editThisCard = (i) => {
    let edit = window.confirm("Você deseja editar este card ?");
    if (edit == true) {
        titulo.value = cardList[i].titulo;
        linguagem.value = cardList[i].linguagem;
        categoria.value = cardList[i].categoria;
        descricao.value = cardList[i].descricao;
        if (cardList[i].link != false) {
            link.value = cardList[i].link;
        }
        document.getElementById("titulo").className = i;
    }
};

const deleteThiscard = (i) => {
    let erase = window.confirm("Você deseja excluir esta Dica");
    if (erase == true) {
        cardList.splice(i, 1);
        saveStorage();
        createCard(cardList);
        alert(`  SUCESSO!

  Dica deletada da base do conhecimento!`);
    }
};

const dellAll = document.getElementById("del");
dellAll.addEventListener("click", () => {
    if (cardList.length > 0) {
        let eraseAll = window.confirm("Você deseja excluir todas as Dicas?");
        if (eraseAll == true) {
            cardList.splice(0, cardList.length);
            somatorios();
            saveStorage();
            createCard(cardList);
            titulo.className = "noEdit";
            alert(`  SUCESSO!

  Todas as dicas deletadas da base do conhecimento!`);
        }
    }
});

const saveStorage = () => {
    localStorage.removeItem("cardList");
    let list = JSON.stringify(cardList);
    localStorage.setItem("cardList", list);
};

const loadStorage = () => {
    const local_storage = JSON.parse(localStorage.getItem("cardList"));
    if (local_storage != null) {
        const local_storage = JSON.parse(localStorage.getItem("cardList"));
        for (let i = 0; i < local_storage.length; i++) {
            cardList.push(local_storage[i]);
        }
        createCard(cardList);
    }
};
loadStorage();
