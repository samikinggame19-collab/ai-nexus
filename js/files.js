const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const filesList = document.querySelector(".files-list");

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {

    const file = fileInput.files[0];

    if (!file) return;

    const fileCard = document.createElement("div");
    fileCard.className = "file-card";

    fileCard.innerHTML = `
        <i class="fa-solid fa-file"></i>

        <div>
            <h3>${file.name}</h3>
            <p>${(file.size / 1024).toFixed(1)} KB</p>
        </div>
        <button type="button" class="summarize-btn">Summarize</button>

        <div class="summary-box" style="display:none;margin-top:20px;"></div>
    `;

    filesList.appendChild(fileCard);
    addActivity("📄 Uploaded " + file.name);
    let files = localStorage.getItem("totalFiles") || 0;

files++;

localStorage.setItem("totalFiles", files);

    const summarizeBtn = fileCard.querySelector(".summarize-btn");
    const summaryBox = fileCard.querySelector(".summary-box");

    summarizeBtn.addEventListener("click", async () => {

        summaryBox.style.display = "block";
        summaryBox.innerHTML = "🤖 Analyzing document...";

        const formData = new FormData();
        formData.append("file", file);

        try{

            const response = await fetch(
                "http://localhost:3000/analyze-file",
                {
                    method:"POST",
                    body:formData
                }
            );

            const data = await response.json();
console.log("Response:", data);
console.log("Status:", response.status);
            if(data.error){
console.log("Reply:", data.reply);
                summaryBox.innerHTML =
                `<span style="color:red;">${data.error}</span>`;

                return;

            }

console.log("FULL AI DATA:", data);

const aiReply = data.reply || data.message || "No AI response received";

summaryBox.innerHTML = `
    <h4>🤖 AI Summary</h4>

    <p>${aiReply.replace(/\n/g,"<br>")}</p>

    <div class="summary-actions">
        <button class="copy-btn">📋 Copy</button>
        <button class="download-btn">⬇ Download</button>
    </div>
`;
const copyBtn = summaryBox.querySelector(".copy-btn");

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(aiReply);
    copyBtn.innerText = "✅ Copied";

    setTimeout(() => {
        copyBtn.innerText = "📋 Copy";
    },2000);

});
const downloadBtn = summaryBox.querySelector(".download-btn");

downloadBtn.addEventListener("click", () => {

   const blob = new Blob([aiReply], {
        type:"text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "AI-Summary.txt";

    a.click();

    URL.revokeObjectURL(url);

});

        }

        catch(error){

            summaryBox.innerHTML =
            `<span style="color:red;">${error.message}</span>`;

        }

    });

    fileInput.value = "";

});
document.querySelectorAll(".demo-btn").forEach(button => {

    button.addEventListener("click", () => {

        showToast("Demo file: Upload a real file to use AI analysis.");

    });

});