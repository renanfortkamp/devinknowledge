const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
});


/* variavel abaixo responsavel por armazenar as tarefas */
const cardList = new Array();

const save = document.getElementById('save')
save.addEventListener('click', function(){
  if(cardList.length < 100){
        let titulo = document.getElementById('titulo').value;
        let linguagem = document.getElementById('linguagem').value;
        let categoria = document.getElementById('categoria').value;
        let descricao = document.getElementById('descricao').value;
        let link = document.getElementById('link').value;
        cardList.push({titulo:titulo,linguagem:linguagem,categoria:categoria,descricao:descricao,link:link});
        createCard();
        saveStorage()
    } else {
      alert("Limite de tarefas atingido!")
   }
  
})

const createCard = ()=>{
    document.querySelector('ul').innerHTML = "";
    document.querySelectorAll("input").value = "";
  for(let i= 0 ; i < cardList.length; i++){
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    let div1 = document.createElement('div');
    let titulo = document.createElement('label');
    titulo.innerText = `${cardList[i].titulo}`

    let div2 = document.createElement('div');
    let linguagem = document.createElement('label');
    linguagem.innerText = 'Linguagem:'
    let p2 = document.createElement('p');
    p2.innerText = `${cardList[i].linguagem}`;

    let div3 = document.createElement('div');
    let categoria = document.createElement('label');
    categoria.innerText = 'Categoria:'
    let p3 = document.createElement('p');
    p3.innerText = `${cardList[i].titulo}`;

    let div4 = document.createElement('div');
    let descricao = document.createElement('label');
    descricao.innerText = "Descrição:"
    let p4= document.createElement('p');
    p4.innerText = `${cardList[i].titulo}`;

    let editar = document.createElement('button');


    let botaoVideo = document.createElement('button');

    let link = document.createElement('a');
      ul.appendChild(li);
      li.appendChild(div1); 
      div1.appendChild(titulo)

      li.appendChild(div2);
      div2.appendChild(linguagem)
      div2.appendChild(p2)

      li.appendChild(div3);
      div3.appendChild(categoria)
      div3.appendChild(p3)
      
      li.appendChild(div4);
      div4.appendChild(descricao)
      div4.appendChild(p4)
      createDeleteButton(i,li);
  }}

const createDeleteButton = (i,li) =>{
  const deletecard = document.createElement('button');
  deletecard.innerText = 'Deletar'
  const excluir = document.createTextNode('I');
  li.appendChild(deletecard);
    deletecard.appendChild(excluir);
    deletecard.name = "deletecard"
    deletecard.classList.add('deletecard');   
      deletecard.addEventListener('click', ()=>{
          deleteThiscard(i);
        } 
      )
}

const deleteThiscard = (i) =>{
  let erase = window.confirm("Você deseja realmente excluir este card?");
  if(erase == true){
    cardList.splice(i,1);
    saveStorage();
    createCard();
  }
}

// deleteALL.addEventListener('click', ()=>{
//   let eraseAll = window.confirm('Você deseja realmente excluir todas as tarefas:');
//   if(eraseAll == true){
//     cardList.splice(0,cardList.length);
//     saveStorage();
//     createCard();
//   }
// })

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
    createCard();
  }
}

loadStorage();