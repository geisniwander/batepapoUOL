const feed = document.querySelector(".feed");
const login = document.querySelector(".login");
const chat = document.querySelector(".chat");
const inputUser = document.querySelector(".name");
const inputMessage = document.querySelector(".textMessage");
const spinner = document.querySelector(".back");
let u=0;
let user={name:""};

inputUser.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        registerUser();
    }
})
inputMessage.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        sendMessage();
    }
})
function reload(){
    window.location.reload();
}
function registerUser(){
    const nameUser = document.querySelector(".name").value;
    user.name = nameUser;
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',user);
    login.classList.add("hidden");
    spinner.classList.remove("hidden");
    promise.then(getMessage);
    promise.catch(reload);
    u=1;
    setInterval(keepConnected,5000);
    setInterval(getMessage,3000);
}
function keepConnected(){
    if(u!==0){
        const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',user);
       promise.catch(reload);
    }
}
function sendMessage(){
    const message = document.querySelector(".textMessage").value;
    const messageObj = {from:user.name, to:"Todos",text:message,type:"message"};
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',messageObj);
    document.querySelector(".textMessage").value = "";
    promise.then(getMessage);
    promise.catch(registerUser);
}
function getMessage(){
    if(u!==0){
        feed.classList.remove("hidden");
        const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
        promise.then(renderMessages,promise);
        promise.catch(reload);
    }
}
function renderMessages(newMessages){
    const objects = newMessages.data;
    chat.innerHTML="";
    for(let i=1; i<objects.length; i++){
        let message = {from: objects[i].from, to: objects[i].to, text: objects[i].text, type:objects[i].type, time:objects[i].time}

        if(message.type==="status")
            chat.innerHTML += (`<li class="status msg${i}"> <span class="time">(${message.time})</span> <span class="from">${message.from}</span> ${message.text}</li>`);
        else if (message.type==="message" && message.to==="Todos")
            chat.innerHTML += (`<li class="message msg${i}"> <span class="time">(${message.time})</span> <span class="from">${message.from}</span>  para  <span class="to">${message.to}:</span> ${message.text}</li>`);
        else
            chat.innerHTML += (`<li class="private msg${i}"> <span class="time">(${message.time})</span> <span class="from">${message.from}</span>  para  <span class="to">${message.to}:</span> ${message.text}</li>`);
        const last = document.querySelector(`.msg${i}`);
        last.scrollIntoView();
    }
}




