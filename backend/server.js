require("dotenv").config();


const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const app = express();


app.use(cors());
app.use(express.json());
const upload = multer({
    dest: "uploads/"
});




app.post("/chat", async (req, res) => {


    try {


       console.log("Received body:", req.body);


const userMessage = req.body.message;

if (!userMessage) {
    return res.status(400).json({
        error: "Message is required"
    });
}





        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",


                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },


                body: JSON.stringify({


                    model: "deepseek/deepseek-chat-v3-0324",


                    max_tokens: 500,


                   messages: [
    {
        role: "system",
        content: "You are AI Nexus Assistant. Be helpful, professional, and friendly."
    },
    {
        role: "user",
        content: userMessage
    }
]




                })
            }
        );




        const data = await response.json();




        if (!response.ok) {


            console.log("OpenRouter Error:", data);


            return res.status(response.status).json({
                error: "AI service error"
            });


        }




        res.json({


            reply: data.choices[0].message.content


        });




    } catch (error) {


        console.log(error);


        res.status(500).json({


            error: error.message


        });


    }


});

app.post("/analyze-file", upload.single("file"), async (req, res) => {
console.log(req.file);
    try {

        if(!req.file){
            return res.status(400).json({
                error:"No file uploaded"
            });
        }


        let text = "";


        // PDF
if (req.file.originalname.toLowerCase().endsWith(".pdf")) {

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    text = pdfData.text;

}

// DOCX
else if (req.file.originalname.toLowerCase().endsWith(".docx")) {

    const result = await mammoth.extractRawText({
        path: req.file.path
    });

    text = result.value;

}

// TXT
else if (req.file.originalname.toLowerCase().endsWith(".txt")) {

    text = fs.readFileSync(req.file.path, "utf8");
console.log("Extracted text:", text);
}

else {

    return res.status(400).json({
        error: "Unsupported file type"
    });

}
        
// Limit document size before sending to AI
if(text.length > 12000){
    text = text.substring(0,12000);
}


        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {

                method:"POST",

                headers:{
                    "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    model:"deepseek/deepseek-chat-v3-0324",

                    max_tokens:700,

                    messages:[

                        {
                            role:"system",
                            content:
                            "You are AI Nexus document assistant. Summarize and explain uploaded documents clearly."
                        },

                        {
                            role:"user",
                            content:
`Please analyze the following document.

Give:

1. A short summary.
2. Main points.
3. Important facts.
4. Action items (if any).

Document:

${text}`
                        }

                    ]

                })

            }
        );


        const data = await response.json();
console.log(data);
fs.unlinkSync(req.file.path);

if (!response.ok) {

    console.log("OpenRouter Error:", data);

    return res.status(response.status).json({
        error: "AI service error"
    });

}

res.json({
    reply: data.choices[0].message.content
});


    } catch(error){

        console.log(error);

        res.status(500).json({
            error:error.message
        });

    }

});

app.get("/", (req, res) => {


    res.send("AI Nexus server is running");


});




const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {


    console.log(`AI Nexus server running on http://localhost:${PORT}`);


});
console.log("Ai Nexus server file started");