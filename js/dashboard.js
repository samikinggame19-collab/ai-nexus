if(localStorage.getItem("loggedIn")!=="true"){

    window.location.href="login.html";

}
const input = document.getElementById("dashboardInput");
const button = document.getElementById("dashboardSend");

function openChat() {

    const text = input.value.trim();

    if (text === "") {
        window.location.href = "chat.html";
        return;
    }

    sessionStorage.setItem("dashboardMessage", text);

    window.location.href = "chat.html";
}

button.addEventListener("click", openChat);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        openChat();
    }
});
const bell = document.getElementById("bell");
const notificationMenu = document.getElementById("notificationMenu");

if(bell){

    bell.addEventListener("click",()=>{

        if(notificationMenu.style.display==="block"){

            notificationMenu.style.display="none";

        }else{

            notificationMenu.style.display="block";

        }

    });

    document.addEventListener("click",(e)=>{

        if(!e.target.closest(".notification")){

            notificationMenu.style.display="none";

        }

    });

}
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

if(profileBtn){

    profileBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        profileMenu.style.display =
            profileMenu.style.display === "block"
            ? "none"
            : "block";

    });

}

document.addEventListener("click",(e)=>{

    if(!e.target.closest(".profile")){

        profileMenu.style.display = "none";

    }

});
const upgradeBtn = document.getElementById("upgradeBtn");
const upgradeModal = document.getElementById("upgradeModal");
const closeModal = document.getElementById("closeModal");

if (upgradeBtn) {

    upgradeBtn.addEventListener("click", () => {
        upgradeModal.style.display = "flex";
    });

}

if (closeModal) {

    closeModal.addEventListener("click", () => {
        upgradeModal.style.display = "none";
    });

}

window.addEventListener("click", (e) => {

    if (e.target === upgradeModal) {
        upgradeModal.style.display = "none";
    }

});
const tips = [

"💡 Use clear prompts to get more accurate AI responses.",

"🚀 Upload documents to quickly summarize long reports.",

"🎯 Be specific when asking AI to generate code.",

"📄 AI Nexus works best when prompts include context.",

"⚡ Save frequently used prompts for faster work.",

"🤖 Ask AI to explain code instead of only generating it."

];

const dailyTip = document.getElementById("dailyTip");

if(dailyTip){

    const randomTip = tips[Math.floor(Math.random()*tips.length)];

    dailyTip.innerText = randomTip;

}
const chatCount = document.getElementById("chatCount");
const fileCount = document.getElementById("fileCount");
const tokenCount = document.getElementById("tokenCount");

if(chatCount){

    chatCount.innerText =
    localStorage.getItem("totalChats") || 0;

}

if(fileCount){

    fileCount.innerText =
    localStorage.getItem("totalFiles") || 0;

}

if(tokenCount){

    const chats =
    Number(localStorage.getItem("totalChats") || 0);

    const tokens = chats * 500;

function formatNumber(num){

    if(num >= 1000000){
        return (num / 1000000).toFixed(1) + "M";
    }

    if(num >= 1000){
        return (num / 1000).toFixed(1) + "K";
    }

    return num;
}

tokenCount.innerText = formatNumber(tokens);

document.getElementById("tokenText").innerText =
`${formatNumber(tokens)} / 100K`;

document.getElementById("tokenPercent").innerText =
`${Math.min(Math.round(tokens/1000),100)}%`;

document.querySelector(".progress").style.width =
`${Math.min(tokens/1000,100)}%`;
}
const welcome = document.querySelector(".welcome-card h2");

if(welcome){

    const hour = new Date().getHours();

    if(hour < 12){

        welcome.innerText = "Good Morning ☀️";

    }else if(hour < 18){

        welcome.innerText = "Good Afternoon 🌤️";

    }else{

        welcome.innerText = "Good Evening 🌙";

    }

}
function addActivity(text){

    let activities =
        JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift(text);

    activities = activities.slice(0,5);

    localStorage.setItem(
        "activities",
        JSON.stringify(activities)
    );

}

const activityList =
document.getElementById("activityList");

if(activityList){

    const activities =
        JSON.parse(localStorage.getItem("activities")) || [];

    activityList.innerHTML="";

    activities.forEach(item=>{

        activityList.innerHTML += `<li>${item}</li>`;

    });

}
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {

    document.getElementById("userName").textContent = loggedInUser.name;

    document.getElementById("userEmail").textContent = loggedInUser.email;

    const welcome = document.querySelector(".welcome-card h2");

    welcome.textContent = `Welcome back, ${loggedInUser.name}! 👋`;

}
// ===========================
// Logout
// ===========================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    });

}
// =======================
// Welcome + Live Clock
// =======================

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if(user){

    document.getElementById("userName").textContent = user.name;

    document.getElementById("userEmail").textContent = user.email;

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if(hour < 12){

        greeting = "Good Morning ☀️";

    }else if(hour < 18){

        greeting = "Good Afternoon 🌤️";

    }else{

        greeting = "Good Evening 🌙";

    }

    document.getElementById("welcomeText").textContent =
        `${greeting}, ${user.name}!`;

}

const dateOptions = {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric"
};

document.getElementById("dateText").textContent =
    new Date().toLocaleDateString("en-US",dateOptions);

function updateClock(){

    document.getElementById("clockText").textContent =
        new Date().toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);