const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
});


/* variavel abaixo responsavel por armazenar as tarefas */
const cardList = new Array();
const titulo = document.getElementById('titulo')
const linguagem = document.getElementById('linguagem')
const categoria = document.getElementById('categoria')
const descricao = document.getElementById('descricao')
const link = document.getElementById('link')

//---------------------------------------------


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
      createCard();
      saveStorage();  
    }else{
        if(
          titulo.value !=''
          && linguagem.value !=''
          && categoria.value !=''
          && descricao.value !=''
          && link.value !=''

        ){
        cardList.push({titulo:titulo.value,linguagem:linguagem.value,categoria:categoria.value,descricao:descricao.value,link:link.value});
        titulo.className = 'noEdit'
        createCard();
        saveStorage();
}}
}
  

//---------------------------------------------


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
      }  

    }
    let total = frontEnd + backEnd + fullStack + softSkill;
    document.getElementById('total').innerText = total;
    document.getElementById('frontEnd').innerText = frontEnd;
    document.getElementById('backEnd').innerText = backEnd;
    document.getElementById('fullStack').innerText = fullStack;
    document.getElementById('softSkill').innerText = softSkill;


}

//---------------------------------------------

const createCard = ()=>{
    document.querySelector('ul').innerHTML = "";
    document.querySelectorAll("input").value = "";
  for(let i= 0 ; i < cardList.length; i++){
    
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    let thisTitulo = cardList[i].titulo
    let thislinguagem = cardList[i].linguagem
    let thisCategoria = cardList[i].categoria
    let thisDescricao = cardList[i].descricao
    let thisLink = cardList[i].link
    // ----
    let div1 = document.createElement('div');
    let titulo = document.createElement('label');
    titulo.innerText = `${thisTitulo}`
        ul.appendChild(li);
        li.appendChild(div1); 
        div1.appendChild(titulo)
    //----   
    let div2 = document.createElement('div');
    let linguagem = document.createElement('label');
    linguagem.innerText = 'Linguagem:'
    let p2 = document.createElement('p');
    p2.innerText = `${thislinguagem}`;
        li.appendChild(div2);
        div2.appendChild(linguagem)
        div2.appendChild(p2)
    //-----
    let div3 = document.createElement('div');
    let categoria = document.createElement('label');
    categoria.innerText = 'Categoria:'
    let p3 = document.createElement('p');
    p3.innerText = `${thisCategoria}`;
        li.appendChild(div3);
        div3.appendChild(categoria)
        div3.appendChild(p3)
    //-----
    let div4 = document.createElement('div');
    let descricao = document.createElement('p');
    descricao.innerText = `${thisDescricao}`
        li.appendChild(div4);
        div4.appendChild(descricao)
    //-------
    let deletecard = document.createElement('button');
    deletecard.innerText = 'Deletar'
    li.appendChild(deletecard);
      deletecard.name = "deletecard"
      deletecard.classList.add('deletecard');   
        deletecard.addEventListener('click', ()=>{
            deleteThiscard(i);
          } 
        )

    //------      

    let div5 = document.createElement('div')
    let editar = document.createElement('button');
    editar.innerText="Ed"
    editar.addEventListener('click',()=>{
      let edit = window.confirm("Você deseja editar este card ?");
      if(edit == true){
        document.getElementById('titulo').value = thisTitulo;
        document.getElementById('linguagem').value = thislinguagem
        document.getElementById('categoria').value = thisCategoria;
        document.getElementById('descricao').value = thisDescricao;
        document.getElementById('link').value = thisLink;
        document.getElementById('titulo').className = i; 
      } 
    }
      
    )

    let botaoVideo = document.createElement('button');
    let link = document.createElement('a');
    link.href = thisLink
    link.target ='_blank'
    link.rel="noopener noreferrer"
    link.innerText ="VID"
    li.appendChild(div5)
    botaoVideo.appendChild(link)
    div5.appendChild(editar)
    div5.appendChild(deletecard)
    div5.appendChild(botaoVideo)
    somatorios()
    
  }
}


//---------------------------------------------

const deleteThiscard = (i) =>{
  let erase = window.confirm("Você deseja realmente excluir este card?");
  if(erase == true){
    cardList.splice(i,1);
    saveStorage();
    createCard();

  }
}

//---------------------------------------------

  const dellAll = document.getElementById("del")
  dellAll.addEventListener('click', ()=>{
    let eraseAll = window.confirm('Você deseja realmente excluir todas as tarefas?');
    if(eraseAll == true){
      cardList.splice(0,cardList.length);
      somatorios();
      saveStorage();
      createCard();
    }
  })

//---------------------------------------------

const saveStorage = () =>{
  localStorage.removeItem('cardList')
  let list = JSON.stringify(cardList);
  localStorage.setItem('cardList', list)
}

//---------------------------------------------

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