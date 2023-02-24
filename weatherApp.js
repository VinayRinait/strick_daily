<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
       body{
            font-family: Arial, Helvetica, sans-serif;
               /* background-color: #000622; */
               background-image: url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit&w=1500&q=500");
  background-color: #cccccc;
   width: 100%;
            
        }

        body>h1{
            text-align: center;
            margin-top: 50px;
            color: #ffffff;
        }

        #submit{
            margin: auto;
            display: block;
            width: 10%;
            height: 40px;
            border-radius: 10px;
            margin-top: 10px;;
            cursor: pointer;
        }


      #info{
        /* border: solid 2px red; */
      
        width: 50%;
        height: 380px;
        padding-left: 40px;
        padding-top: 10px;
        
       
        
      }
      #info>img{
        width: 70px;
        height:70px;
        /* margin-top:30px; */
        /* margin-bottom: 100px; */

      }
      #info>span,h3{
        margin-bottom:20px;
        font-size:30px;
         color: rgb(52, 46, 46);
      }
      #input_value{
        margin: auto;
            width: 30%;
            text-align: center;
            display: block;
            height: 30px;
            margin-top: 50px;
            border-radius: 12px;
            border: 0;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            
      }
      #display{
        width: 80%;
            margin: auto;
            display: flex;
            margin-top: 50px;
            
           gap: 40px;
      }
      #gmap_canvas{
            border-radius: 10px;
            padding-top: 10px;
            /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
        }

        #days{
           
            width: 80%;
         ;
            margin: auto;
            display: flex;
            gap: 20px;
            margin-top: 40px;
        }

        #days img{
            width: 100px;
            ;
            margin-bottom: -20px;

        }

        #days>div{
            display: block;
            margin: auto;
            justify-content: center;
            text-align: center;
            background-color:rgb(249, 222, 171);
            padding: 20px;
            border-radius: 20px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }


      
    </style>
</head>
<body>
       <h1>The Weather Info</h1>
      <input type="text" id="input_value" >
        <button onclick="checkInfo()" id="submit" >Submit</button>
        <div id="days">
            <!-- appends days -->
        </div>
        <div id="display"> 
           
           <div id="info">
            <!-- append info? -->
           </div>

           <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="380px" id="gmap_canvas" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://putlocker-is.org"></a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>

           </div>

            

       
</body>
</html>

 
 <script>
let key = "5d2b771cdace65091e11f51d815df49c"

 
  async function checkInfo(){

    let value = document.getElementById("input_value").value;

            try{
              let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}&units=metric`);
            let data  = await res.json()
            //    console.log(data)

               function MakingData(){
                this.name = data.name
                this.weather = data.weather[0].main;
                this.temp = data.main.temp;
                this.temp_max = data.main.temp_max;
                this.temp_min = data.main.temp_min;
                this.temp_humidity = data.main.humidity;
                 this.wind = data.wind.speed;
                 this.sunset = data.sys.sunset;
                 this.sunrise = data.sys.sunrise;

               }
               let weatherInfo = new MakingData()
                console.log("weatherInfo:",weatherInfo)
                Display(weatherInfo)


                let res1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${key}&cnt=7&units=metric`)
                let data1 = await res1.json();
                    console.log(data1.list)
                    display2(data1.list)
                
            }  
            catch(err){
                 console.log(err)
                 console.log("err")
            }   
      


  }

      function Display(obj){
        // document.getElementById("info").innerHTML="";
        document.getElementById("info").innerHTML ="";
            let name = document.createElement("h3");  
               name.innerText = "►"+" "+obj.name;    
         let image = document.createElement("img")
         if(obj.weather =="Rain"){
                image.src="https://www.freepnglogos.com/uploads/rain-png/transparent-download-green-cloud-with-rain-clipart-png-23.png"
            }else if(obj.weather =="Clouds"){
                image.src="https://www.freepnglogos.com/uploads/cloud-clipart/clipart-clouds-picture-images-0.png";
            }else if(obj.weather =="Clear"){
                image.src="https://purepng.com/public/uploads/large/purepng.com-sunnaturehotcartoonsummerspringsun-961524676783prlpu.png";
            }else{
                image.src="https://www.pngmart.com/files/12/Sun-And-Cloud-Download-PNG-Image.png";
            }
            let temp = document.createElement("span")
            temp.innerText = obj.temp+"°C";
          
           let min = document.createElement("p")
               min.innerText = "Min Temp:"+obj.temp_min+"°C";

           let max = document.createElement("p")
           max.innerText ="Max Temp:"+obj.temp_max+"°C";

           let humdty = document.createElement("p")
              humdty.innerText = "Humidity:"+obj.temp_humidity+"%"
              

               let wind  = document.createElement("p")
                  wind.innerText = "Wind:"+obj.wind


        let sunrise=document.createElement("h4");
        let unix_timestamp =obj.sunrise;
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2);
        sunrise.innerText="You can experience Sunrise at"+" "+formattedTime;


        let sunset=document.createElement("h4");
        let unix_timestamp1 =obj.sunset;
        let date1 = new Date(unix_timestamp1 * 1000);
        let hours1 = date1.getHours();
        let minutes1 = "0" + date1.getMinutes();
        let formattedTime1 = hours1 + ':' + minutes1.substr(-2);
        sunset.innerText="You can experience Sunset at"+" "+formattedTime1;

        document.getElementById("info").style.backgroundColor=" rgb(444, 555, 199)"

        document.getElementById("gmap_canvas").src=`https://maps.google.com/maps?q=${obj.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
            
              document.getElementById("info").append(name,image,temp,min,max,humdty,sunrise,sunset)
            
           
      }


      function display2(arr){

document.getElementById("days").innerHTML=null;

arr.forEach(function(ele,index){
    let div=document.createElement("div");
    
    let day=document.createElement("p");
    day.innerText="Day"+(index+1);

    let ses=document.createElement("img");
    
    if(ele.weather[0].main =="Rain"){
        ses.src="https://www.freepnglogos.com/uploads/rain-png/transparent-download-green-cloud-with-rain-clipart-png-23.png"
    }else if(ele.weather[0].main =="Clouds"){
        ses.src="https://www.freepnglogos.com/uploads/cloud-clipart/clipart-clouds-picture-images-0.png";
    }else if(ele.weather[0].main =="Clear"){
        ses.src="https://purepng.com/public/uploads/large/purepng.com-sunnaturehotcartoonsummerspringsun-961524676783prlpu.png";
    }else{
        ses.src="https://www.pngmart.com/files/12/Sun-And-Cloud-Download-PNG-Image.png";
    }

    let minTemp=document.createElement("h4");
    minTemp.innerText=ele.main.temp_min+" "+"°C";

    let maxTemp=document.createElement("h4");
    maxTemp.innerText=ele.main.temp_max+" "+"°C";

    div.append(day,ses,minTemp,maxTemp);
    document.getElementById("days").append(div);
})
      }

   
  
    

  
      












 </script>