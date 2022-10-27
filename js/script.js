const chat = document.querySelector(".chat");


function enviarMensagem(){
    const mensagem = document.querySelector(".mensagem").value;
    alert(mensagem);
}

function buscarMensagem(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderizaMensagem,promise);
}

function renderizaMensagem(novasMensagens){
    const objetos = novasMensagens.data;

    for(let i=0; i<objetos.length; i++){
        let mensagem = {from: objetos[i].from, to: objetos[i].to, text: objetos[i].text, type:objetos[i].type, time:objetos[i].time}

        if(mensagem.type==="status"){
            chat.innerHTML += `<li>(${mensagem.time}) <span>${mensagem.from}</span> ${mensagem.text}</li>`;

        }
        else if(mensagem.type==="message"){
            chat.innerHTML += `<li>(${mensagem.time}) <span>${mensagem.from}</span> para <span>${mensagem.to}:</span> ${mensagem.text}</li>`;
        }
        else{
            chat.innerHTML += `<li class="privada">(${mensagem.time}) <span>${mensagem.from}</span> para <span>${mensagem.to}:</span> ${mensagem.text}</li>`;
        }
    }
}

buscarMensagem();