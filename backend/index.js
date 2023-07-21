

const express=require("express")
const cors=require("cors")
const axios=require("axios")

//routes


const app=express()

app.use(express.json())
app.use(cors())







app.get("/",(req,res)=>
{
    res.send("Welecome to server")
})

app.post("/data",async(req,res)=>
{
    //  const response = await fetch(`https://gpt-api.richexplorer.com/api/general`, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       usecase: "GPT_MEDITATION_CREATOR",
    //       userInput: `feeling good right now, they currently are docter and facing pain issues today`,
    //     }),
    //   });
    //     console.log(response);
    const {feeling,work,issue}=req.body
    const response=await axios.post("https://gpt-api.richexplorer.com/api/general",
        {
        usecase: "GPT_MEDITATION_CREATOR",
        userInput: `feeling ${feeling} right now, they currently are ${work} and facing ${issue} issues today`},
        {mode:"no-cors"})

        res.send(response.data) 

})



app.listen(8080,async()=>
{
  
    console.log("Server started")
})