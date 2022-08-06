const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
});

const cardList = new Array();
const titulo = document.getElementById('titulo')
const linguagem = document.getElementById('linguagem')
const categoria = document.getElementById('categoria')
const descricao = document.getElementById('descricao')
const link = document.getElementById('link')

const saveButton = document.getElementById('save')
saveButton.addEventListener('click', function(){
  save()
})

const save = ()=>{
    if(titulo.className != 'noEdit'){
      let cardEdit = cardList[titulo.className]
      cardEdit.titulo = titulo.value
      cardEdit.linguagem = linguagem.value
      cardEdit.categoria = categoria.value
      cardEdit.descricao = descricao.value
      cardEdit.link = link.value
      createCard(cardList);
      saveStorage();
      titulo.value = ''
      linguagem.value = ''
      categoria.value = ''
      descricao.value = ''
      link.value = ''
      titulo.className = 'noEdit'  
    }else{
        if(
          titulo.value !=''
          && linguagem.value !=''
          && categoria.value !=''
          && descricao.value !=''
          && link.value !=''

        ){
        cardList.push({
          titulo:titulo.value,
          linguagem:linguagem.value,
          categoria:categoria.value,
          descricao:descricao.value,
          link:link.value});
        titulo.className = 'noEdit'
        createCard(cardList);
        saveStorage();
        titulo.value = ''
        linguagem.value = ''
        categoria.value = ''
        descricao.value = ''
        link.value = ''
        }}
}

const pesquisaCards = document.getElementById('pesquisaButton')
pesquisaCards.addEventListener('click',()=>{
  let pesquisaValue = document.getElementById('pesquisa').value
  let pesquisaLower = pesquisaValue.toLowerCase()
  if(pesquisaValue != ''){
  let cardFiltrados = cardList.filter(item => item.titulo.toLowerCase().includes(pesquisaLower));
  createCard(cardFiltrados)
  }}
)

const resetaPesquisa = document.getElementById('resetPesquisa');
resetaPesquisa.addEventListener('click',()=>{
  document.getElementById('pesquisa').value = ''
  createCard(cardList)
})

const somatorios = ()=>{
    let frontEnd = 0;
    let backEnd = 0;
    let fullStack = 0;
    let softSkill = 0;
    for(let i = 0; i < cardList.length; i++) {
      switch(cardList[i].categoria){
        case 'FrontEnd': frontEnd +=1;
          break;
        case 'BackEnd': backEnd +=1;
          break;
        case 'FullStack': fullStack +=1;
          break;
        case 'softSkill': softSkill +=1;
          break;
      }}
    let total = frontEnd + backEnd + fullStack + softSkill;
    document.getElementById('total').innerText = total;
    document.getElementById('frontEnd').innerText = frontEnd;
    document.getElementById('backEnd').innerText = backEnd;
    document.getElementById('fullStack').innerText = fullStack;
    document.getElementById('softSkill').innerText = softSkill;
}

const createCard = (arr)=>{
    document.querySelector('ul').innerHTML = "";
    document.querySelectorAll("input").value = "";
  for(let i= 0 ; i < arr.length; i++){
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    let h2 = document.createElement('h2')
    let div1 = document.createElement('div')
    div1.id = 'div1'
    let div2 = document.createElement('div')
    div2.id = 'div2'
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')
    let btnDelete = document.createElement('button')
    let btnEditar = document.createElement('button')
    let btnVideo =document.createElement('button')
    let link = document.createElement('a');
    ul.appendChild(li);
    li.appendChild(h2);
      h2.innerText = `${arr[i].titulo}`
    li.appendChild(div1);
    div1.appendChild(p1);
      p1.innerText = `Linguagem:${arr[i].linguagem}`
    div1.appendChild(p2) 
      p2.innerText = `Categoria:${arr[i].categoria}`
    div1.appendChild(p3) 
      p3.innerText = `${arr[i].descricao}`
    li.appendChild(div2); 
    div2.appendChild(btnDelete)
      btnDelete.innerText = 'Deletar'
        btnDelete.name = "deletecard"
        btnDelete.classList.add('deletecard');   
          btnDelete.addEventListener('click', ()=>{
              deleteThiscard(i);
          })   
    div2.appendChild(btnEditar)
      btnEditar.innerText="Ed"
      btnEditar.id = 'edit'
      btnEditar.addEventListener('click',()=>{
        editThisCard(i)
      })
    div2.appendChild(btnVideo)
      btnVideo.appendChild(link)
        link.href = arr[i].link
        link.target ='_blank'
        link.rel="noopener noreferrer"
        link.innerText ="VID" 
    somatorios()

  }
}

const editThisCard = (i)=>{
  let edit = window.confirm("Você deseja editar este card ?");
  if(edit == true){
    titulo.value = cardList[i].titulo
    linguagem.value = cardList[i].linguagem;
    categoria.value = cardList[i].categoria;
    descricao.value = cardList[i].descricao;
    link.value = cardList[i].link;
    document.getElementById('titulo').className = i; 
  }
}

const deleteThiscard = (i) =>{
  let erase = window.confirm("Você deseja realmente excluir este card?");
  if(erase == true){
    cardList.splice(i,1);
    saveStorage();
    createCard(cardList);
  }
}

const dellAll = document.getElementById("del")
  dellAll.addEventListener('click', ()=>{
    if(cardList.length > 0){
      let eraseAll = window.confirm('Você deseja realmente excluir todas as tarefas?');
      if(eraseAll == true){
      cardList.splice(0,cardList.length);
      somatorios();
      saveStorage();
      createCard(cardList);
      titulo.className = 'noEdit' 
      }
    }
  }
)

const saveStorage = () =>{
  localStorage.removeItem('cardList')
  let list = JSON.stringify(cardList);
  localStorage.setItem('cardList', list)
}

const loadStorage = () =>{
  const local_storage = JSON.parse(localStorage.getItem('cardList'));
  if(local_storage != null){
    const local_storage = JSON.parse(localStorage.getItem('cardList'));
    for(let i=0; i < local_storage.length;i++){
      cardList.push(local_storage[i])
    }
    createCard(cardList);
  }
}
loadStorage();