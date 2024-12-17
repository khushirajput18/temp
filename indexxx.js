const http=require('http');
const fs =require("fs");
const requests=require("requests");
const { on } = require('events');
const homeFile=fs.readFileSync("Home.html" ,"utf-8");
const replaceVal=(tempVal,orgval)=>{
 let tepmparature=tempVal.replace("{%tempval%}",orgval.main.temp)
 .replace("{%tempmin%}",orgval.main.temp_min)
 .replace("{%tempmax%}",orgval.main.temp_max)
 .replace("{%templocation%}",orgval.name)
 .replace("{%tempcountry%}",orgval.sys.country)
 .replace("{%tempStatus%}",orgval.weather[0].main)
 return tepmparature
}
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
  requests("https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=2fdaf433dcd7b4a6c459adbecd50380e").on("data",(chunk)=>{
    const objdata=JSON.parse(chunk);
    const arrData=[objdata];
    const realtimeData=arrData.map(val=>  replaceVal(homeFile,val)).join("")
   res.write(realtimeData)
  })
   .on("end",(err)=>{
    if (err)return console.log("Connection closed due to errors",err);
    res.end();
    
   })
    }

})
server.listen(5500,"127.0.0.1")