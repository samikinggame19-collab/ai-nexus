const newChat = document.querySelector(".new-chat");
const clearChat = document.querySelector(".clear-chat");
const input = document.querySelector(".chat-input input");
const button = document.querySelector(".chat-input button");
const messages = document.querySelector(".chat-messages");
let history = [];

try {
    history = JSON.parse(localStorage.getItem("chatHistory")) || [];
} catch (e) {
    localStorage.removeItem("chatHistory");
    history = [];
}

history.forEach(chat => {

    messages.innerHTML += `
        <div class="message user-msg">
            <strong>You:</strong><br>${chat.user}
        </div>

        <div class="message ai-msg">
            <strong>AI:</strong><br>${chat.ai}
        </div>
    `;

});



button.addEventListener("click", sendMessage);




input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});




function sendMessage(){


    let text = input.value.trim();
    if(text === "") return;
    


    let userMessage = document.createElement("div");
    userMessage.className = "message user-msg";
    userMessage.innerHTML = "<strong>You:</strong> " + text;




    messages.appendChild(userMessage);
messages.scrollTop =
messages.scrollHeight;



    input.value = "";




   let typingMessage = document.createElement("div");
typingMessage.className = "message ai-msg";
typingMessage.innerHTML = `
<strong>AI:</strong>
<span class="typing">
    <span></span>
    <span></span>
    <span></span>
</span>
`;


messages.appendChild(typingMessage);
messages.scrollTop = 
messages.scrollHeight;



fetch("https://ai-nexus-0nsz.onrender.com/chat", {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        message: text
    })

})

.then(async response => {

    const result = await response.text();

    console.log("Server returned:");
    console.log(result);

    return JSON.parse(result);

})

.then(data => {

    console.log("Backend response:", data);

    typingMessage.innerHTML = `
<strong>AI:</strong><br>
${data.reply}

<button class="copy-btn">
<i class="fa-solid fa-copy"></i>
Copy
</button>
`;

    const copyButton = typingMessage.querySelector(".copy-btn");

    copyButton.addEventListener("click", () => {

        navigator.clipboard.writeText(data.reply);

        copyButton.innerHTML = `
<i class="fa-solid fa-check"></i>
Copied!
`;

        setTimeout(() => {

            copyButton.innerHTML = `
<i class="fa-solid fa-copy"></i>
Copy
`;

        }, 2000);

    });

})

.catch(error => {

    console.log(error);

    typingMessage.innerHTML =
    "<strong>AI:</strong> " + error.message;

});




}

newChat.addEventListener("click", function(){


    messages.innerHTML = "";

    history = [];

    localStorage.removeItem("chatHistory");

    let welcomeMessage = document.createElement("div");
    welcomeMessage.className = "message ai-msg";


    welcomeMessage.innerHTML = "<strong>AI:</strong> Hello! How can I help you today?";


    messages.appendChild(welcomeMessage);


});
clearChat.addEventListener("click", function(){

    messages.innerHTML = "";

    history = [];

    localStorage.removeItem("chatHistory");

});
const dashboardMessage = sessionStorage.getItem("dashboardMessage");

if (dashboardMessage) {

    input.value = dashboardMessage;

    sessionStorage.removeItem("dashboardMessage");

    sendMessage();

}
