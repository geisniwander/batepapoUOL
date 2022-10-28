const chat = document.querySelector(".chat");
let user={name:''};

function registerUser(){
    user.name = prompt("Digite seu nome");
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',user);
    promise.then(getMessage);
    promise.catch(registerUser);
}

function keepConnected(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',user);
    promise.then(getMessage);
    promise.catch(registerUser);
}

function sendMessage(){
    const message = document.querySelector(".textMessage").value;
    const messageObj = {from:user.name, to:"Todos",text:message,type:"message"};
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',messageObj);
    promise.then(getMessage);
    promise.catch(registerUser);
}

function getMessage(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderMessages,promise);
}

function renderMessages(newMessages){
    const objects = newMessages.data;
    chat.innerHTML="";
    for(let i=1; i<objects.length; i++){
        let message = {from: objects[i].from, to: objects[i].to, text: objects[i].text, type:objects[i].type, time:objects[i].time}

        if(message.type==="status"){
            const msg = (`<li class="status msg${i}">(${message.time}) <span>${message.from}</span> ${message.text}</li>`);
            chat.innerHTML+= msg;
        }
        else if(message.type==="message" & message.to==="Todos"){
            const msg =(`<li class="message msg${i}">(${message.time}) <span>${message.from}</span> para <span>${message.to}:</span> ${message.text}</li>`);
            chat.innerHTML+=msg;
            }
        else{
            const msg =(`<li class="private msg${i}">(${message.time}) <span>${message.from}</span> para <span>${message.to}:</span> ${message.text}</li>`);
            chat.innerHTML+= msg;
        }
        const last = document.querySelector(`.msg${i}`);
        last.scrollIntoView();
    }
}

registerUser();
setInterval(keepConnected,3000);

