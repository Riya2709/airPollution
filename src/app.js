const fetch=require("node-fetch");
const path=require("path");
const express=require("express");
const app=express();
const hbs=require("hbs");
const dfff=require("dialogflow-fulfillment");
const { response } = require("express");
const port=process.env.PORT || 2000;
const static_path=path.join(__dirname,"../public")

const templatepath=path.join(__dirname,"../templates/views");
app.set("view engine","hbs")
app.set("views",templatepath);
app.use(express.static(static_path));
app.get("",(req,res)=>{
    res.render("index");
});
app.post("/webhook",express.json(),(req,res)=>{
    const agent=new dfff.WebhookClient({
        request:req,
        response:res
    });
    const getData=async(agent)=>{
        var cityVal=agent.parameters.city;
        let url=`https://us1.locationiq.com/v1/search.php?key=pk.e025b5dbd5e9a727657ec2e670b72311&q=${cityVal}&format=json`;
        const response=await fetch(url);
        const data= await response.json();
        const lat=data[0].lat;
        const lon=data[0].lon;
        let url2=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=3a41da93bd091afab19233d92d639244`;
        const response1=await fetch(url2);
        const data1=await response1.json();
        const arrdata1=[data1];
        const a=arrdata1[0].list[0].main.aqi
        const p=["Carbon dioxide","Nitric oxide","Nitrogen dioxide","Ozone","Sulfur dioxide","Particulate matter 2","Particulate matter 10","Ammonia"];
           if(a==1){
            agent.add(`The air quality in ${cityVal} is Good having components `);
            var jsonA=arrdata1[0].list[0].components;
            var jsonP=JSON.parse(JSON.stringify(jsonA));
            var i=0;
            

            for(key in jsonP){
                
                    agent.add(p[i]+" is "+jsonP[key]);
                    i=i+1;
                

            }
           }
           else if(a==2){
               agent.add(`The air quality in ${cityVal} is Fair having components`);
               var jsonA=arrdata1[0].list[0].components;
               var jsonP=JSON.parse(JSON.stringify(jsonA));
               var i=0;
               
   
            
                   for(key in jsonP){
                       agent.add(p[i]+" is "+jsonP[key]);
                       i=i+1;
                   }
   
               
           }
           else if(a==3){
             agent.add(`The air quality in ${cityVal} is Moderate having components`);
             var jsonA=arrdata1[0].list[0].components;
             var jsonP=JSON.parse(JSON.stringify(jsonA));
             var i=0;
             
 
             for(key in jsonP){
            
                     agent.add(p[i]+" is "+jsonP[key]);
                     i=i+1;
                 
 
             }
           }
           else if(a==4){
            agent.add(`The air quality in ${cityVal} is Poor having components`);
            var jsonA=arrdata1[0].list[0].components;
            var jsonP=JSON.parse(JSON.stringify(jsonA));
            var i=0;
            

            for(key in jsonP){
                
                    agent.add(p[i]+" is "+jsonP[key]);
                    i=i+1;
                

            }
           }
           else if(a==5){
            agent.add(`The air quality in ${cityVal} is Very Poor having components`);
            var jsonA=arrdata1[0].list[0].components;
            var jsonP=JSON.parse(JSON.stringify(jsonA));
            var i=0;

            for(key in jsonP){
            
                    agent.add(p[i]+" is "+jsonP[key]);
                    i=i+1;
                

            }
           }
           else{
      // agent.add(`The air quality in ${cityVal} having  components ${JSON.stringify(arrdata1[0].list[0].components)}`);
           agent.add(`The air quality in ${cityVal} having components`);
           var jsonA=arrdata1[0].list[0].components;
           var jsonP=JSON.parse(JSON.stringify(jsonA));
           var i=0;
           

           for(key in jsonP){
        
                   agent.add(p[i]+" is "+jsonP[key]);
                   i=i+1;
               

           }
           }
           





        };
    
        
    
    
    intentMap=new Map();
    intentMap.set("Get airpollution detail",getData);
    agent.handleRequest(intentMap);
    
});
app.get("*",(req,res)=>{
    res.render("404err",{
        err_cmmnt:"opps:( page not found"
    });
});app.get("/*",(req,res)=>{
    res.render("404err",{
        err_cmmnt:"opps:( page not found"
    });
});


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});