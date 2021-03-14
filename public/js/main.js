


const submitBtn=document.getElementById("submitBtn");
const cityName=document.getElementById("cityName");
const data=document.getElementById("data")

const getInfo =async(event)=>{
   event.preventDefault();
   //alert("hii")
   let  cityVal=cityName.value;
   if(cityVal==""){
       data.innerText="Plz enter the city name before search"
   }
   else{
       try{
           let url=`https://us1.locationiq.com/v1/search.php?key=pk.e025b5dbd5e9a727657ec2e670b72311&q=${cityVal}&format=json`;
          const response= await fetch(url);
           const arrdata= await response.json();
           //console.log([arrdata]);
           //console.log([arrdata][0].results[0].locations[0].latLng.lat);
           const lat=arrdata[0].lat;
           const lon=arrdata[0].lon;
           let url1=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=3a41da93bd091afab19233d92d639244`;
           const response1= await fetch(url1);
           const data1= await response1.json();
           const arrdata1=[data1]
           //console.log(arrdata1);
           const a=arrdata1[0].list[0].main.aqi;
           if(a==1){
            data.innerHTML=`<p> The air quality in ${cityVal} is Good having components in ug/m<sup>3</sup> is<br>${JSON.stringify(arrdata1[0].list[0].components)}</p>`
           }
           else if(a==2){
               data.innerHTML=`<p> The air quality in ${cityVal} is Fair having components in ug/m<sup>3</sup> is<br>${JSON.stringify(arrdata1[0].list[0].components)}</p>`
           }
           else if(a==3){
            data.innerHTML=`<p> The air quality in ${cityVal} is Moderate having components in ug/m<sup>3</sup> is<br>${JSON.stringify(arrdata1[0].list[0].components)}</p>`
           }
           else if(a==4){
            data.innerHTML=`<p> The air quality in ${cityVal} is Poor having components in ug/m<sup>3</sup> is<br>${JSON.stringify(arrdata1[0].list[0].components)}</p>`
           }
           else if(a==5){
            data.innerHTML=`<p> The air quality in ${cityVal} is Very Poor having components in ug/m<sup>3</sup> is<br>${JSON.stringify(arrdata1[0].list[0].components)}</p>`
           }
           else{
            data.innerHTML=`<p> The air quality in ${cityVal} having  components in ug/m<sup>3</sup> is<br>${JSON.stringify(arrdata1[0].list[0].components)}</p>`
           }
           

       }catch{
           console.log("error");

       }
   }
}

submitBtn.addEventListener('click',getInfo);