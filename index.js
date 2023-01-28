const DATA_SOURCE='http://webapi19sa-1.course.tamk.cloud/v1/weather';

//view 1(Latest 30 measurements)
var latestData = [];


//view 2(Latest 20 temperature measurements)
var  dataListTemp=[];
var  dataListTime=[];


//view 3(Latest 20 wind speed measurements)
var  dataListWind=[];
var  dataListTime1=[];


//time measure(view 5)
var  dataListTimeMeasureFiltered=[];
var  dataListTimeMeasureFilteredX=[];
var  dataListTimeMeasureFilteredY=[];
// rain different time
var datarain=[];
var datarainTime1 = [];
//windspeed different time
var datawindspeed=[];
var datawindspeedTime1 = [];
//windspeed different time
var datawinddirection=[];
var datawinddirectionTime1 = [];
//ligth different time
var datalight=[];
var datalightTime1 = [];
//tem different time
var datatemperature=[];
var datatemperatureTime1 = [];


//Latest 20 temperature measurements(view 2)
var chartTemperature = new Chart("chart", {
    type: "bar"
  });


  //Latest 20 wind speed measurements(view 3)
  var chartwindSpeed = new Chart("chart_wind", {
    type: "bar"
  });


//Time and Measurement (UI)(view 5)
var chartNew = new Chart("chart_new", {
    type: "bar"
  });




// view 1(Latest 30 measurements)
function dataToHtmlRepresentationWeather(dataObjects){
    let html = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measurement type</th><th>measured value</th></tr>";
    
    
    for (let j=0; j<30; j++){
        const dataObject = dataObjects[j];
        html += `
        <tr>    
        <td>${dataObject.id}</td>         
        <td>${dataObject.measureTime.split("T")[0]}</td>
        <td>${dataObject.measureTime.split("T")[1]}</td>
        <td>${dataObject.measureType}</td>
        <td>${dataObject.measureValue}</td>
        </tr>
        
`
}
html +="</tr></table>";
return html;

  }
function wrapData(jsonData){
    latestData = [];
    for (let i = 0; i < 30; i++) {
        let _measureTime = jsonData[i].date_time;
        let _keyName;
        let _keyValue;

        for (let key in jsonData[i].data){
            _keyName = key;
            _keyValue = jsonData[i].data[key];
        }
        const Data = {id : i+1 , measureTime: _measureTime , measureType: _keyName,measureValue: _keyValue };
        latestData.push(Data);
        
    }
    console.log(latestData);
    document.getElementById('data0').innerHTML = dataToHtmlRepresentationWeather(latestData);
}

function getData(){
    fetch(DATA_SOURCE)
    .then(response => {return response.json();})
    .then (data => {
        wrapData(data);
});
}

window.onload = getData();

//temperature (for view 2,Latest 20 temperature measurements)
const DATA1_SOURCE='http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature';
function dataToHtmlRepresentationTemp(dataobjects){
    let hTml = "<table id ='view2table'> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const l = dataobjects.length;
    for (let k=0; k<l; k++){
        const dataobject = dataobjects[k];
        hTml += `
                    <tr>
                        <td>${k+1}</td>  
                        <td>${dataobject.date_time.split("T")[0]}</td>
                        <td>${dataobject.date_time.split("T")[1]}</td>
                        <td>${dataobject.temperature}</td>
                    </tr>
                        
                `
            }

    
        hTml +="</tr></table>";
        return hTml;
    }


function drawNewChart(){
    chartTemperature.destroy();
   chartTemperature = new Chart("chart", {
        type: "bar",
        data: {
          labels: dataListTime,
          datasets: [{
            backgroundColor: "purple",
            data: dataListTemp
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text: "Temperature"
          }
        }
      });
      chartTemperature.update();
}

function wrapDataChart01(jsonData){
    dataListTemp=[];
    dataListTime = [];
    for (let i = 0; i < jsonData.length; i++) {
        dataListTemp.push(jsonData[i].temperature);
        dataListTime.push(jsonData[i].date_time.split("T")[1]);    
    }
    console.log(jsonData);
    console.log(dataListTemp);
    console.log(typeof(dataListTime));
    drawNewChart();
}

function getData1(){
    fetch(DATA1_SOURCE)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data1').innerHTML = dataToHtmlRepresentationTemp(data);
        wrapDataChart01(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}





//wind(for view 3 Latest 20 wind speed measurements)
const DATA2_SOURCE='http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed';
function dataToHtmlRepresentationWind(datAobjects){
    let hTMl = "<table id ='view3table'> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.wind_speed}</td>
        </tr>
            
    `
}
hTMl +="</tr></table>";
return hTMl;

}


    function drawNewChart1(){
        chartwindSpeed.destroy();
        chartwindSpeed = new Chart("chart_wind", {
            type: "bar",
            data: {
              labels: dataListTime1,
                datasets: [{
                backgroundColor: "purple",
                data: dataListWind
              }]
            },
            options: {
              legend: {display: false},
              title: {
                display: true,
                text: "Wind"
              }
            }
          });
    }

    function wrapDataChart02(jsonData1){
        dataListWind=[];
        dataListTime1 = [];
        for (let i = 0; i < jsonData1.length; i++) {
            dataListWind.push(jsonData1[i].wind_speed);
            dataListTime1.push(jsonData1[i].date_time.split("T")[1]);    
        }
        console.log(jsonData1);
        console.log(dataListWind);
        console.log(typeof(dataListTime1));
        drawNewChart1();
    }
function getData2(){
    fetch(DATA2_SOURCE)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data2').innerHTML = dataToHtmlRepresentationWind(data);
        wrapDataChart02(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}




//select option for temperature(view 2)
function getDataSelectTemperature(_url){
    fetch(_url)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data1').innerHTML = dataToHtmlRepresentationTemp(data);
        wrapDataChart01(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}

function weatherFetch(){
    let weather= document.getElementById('weatherSelect').value;
    console.log(weather);
    document.getElementById('chart').innerHTML = "";
    let url ="";

    if(weather == "0")
    {
        console.log("20 latest temperature.");
        getData1();
    }
    if(weather == "24")
    {
        console.log("24 hours latest hourly averages temperature.");
        url = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23";
        getDataSelectTemperature(url);
    }
    if(weather == "48")
    {
        console.log("48 hours latest hourly averages temperature.");
        url = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47";
        getDataSelectTemperature(url);
    }
    if(weather == "72")
    {
        console.log("72 hours latest hourly averages temperature.");
        url = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71";
        getDataSelectTemperature(url);
    }
    if(weather == "7")
    {
        console.log("1 week latest hourly averages temperature.");
        url = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167";
        getDataSelectTemperature(url);
    }
}




//select option for wind_speed(view 3)
function getDataSelectWindSpeed(_url1){
    fetch(_url1)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data2').innerHTML = dataToHtmlRepresentationWind(data);
        wrapDataChart02(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}
function weatherFetch1(){
    let weather1= document.getElementById('weatherSelect1').value;
    console.log(weather1);
    let url1 ="";

    if(weather1 == "0")
    {
        console.log("20 latest Wind speed.");
        getData2();
    }
    if(weather1 == "24")
    {
        console.log("24 hours latest hourly averages Wind speed.");
        url1 = "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/23";
        getDataSelectWindSpeed(url1);
    }
    if(weather1 == "48")
    {
        console.log("48 hours latest hourly averages Wind speed.");
        url1 = "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/47";
        getDataSelectWindSpeed(url1);
    }
    if(weather1 == "72")
    {
        console.log("72 hours latest hourly averages Wind speed.");
        url1 = "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/71";
        getDataSelectWindSpeed(url1);
    }
    if(weather1 == "7")
    {
        console.log("1 week latest hourly averages Wind speed.");
        url1 = "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/167";
        getDataSelectWindSpeed(url1);
    }
}





//Time & Measure(view 5 )

//line chart for now
function drawNewChart2(){
    chartNew.destroy();
    chartNew  = new Chart("chart_new", {
             type: "line",
             data: {
               labels: dataListTimeMeasureFilteredX,
                 datasets: [{
                    borderColor: "purple",  
                 backgroundColor: 'transparent',
                 data:  dataListTimeMeasureFilteredY
               }]
             },
             options: {
               legend: {display: false},
               title: {
                 display: true,
                 text: "Time & Measurement"
               }
             }
           });
};

// data for now option line chart
function wrapDataChartdiff(jsonData1,_measureName){
    dataListTimeMeasureFilteredY=[];
    dataListTimeMeasureFilteredX = [];
    for (let i = 0; i < jsonData1.length; i++) {
        dataListTimeMeasureFilteredY.push(jsonData1[i].data[_measureName]);
        dataListTimeMeasureFilteredX.push(jsonData1[i].date_time.split("T")[1]);    
    }
    console.log(jsonData1);
    console.log(dataListTimeMeasureFilteredY);
    console.log(typeof(dataListTimeMeasureFilteredX));
    drawNewChart2();
}


function dataToHtmlRepresentationTimeMeasure(datAobjects,_measureName){
    let hTMl = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.data[_measureName]}</td>
        </tr>
    `
}
hTMl +="</tr></table>";
return hTMl;
}

function parseArray(jsonData,measureName){
    let len = 25;
    dataListTimeMeasureFiltered = [];
    for (let i = 0; i < jsonData.length; i++) {
        let _keyName;

        for (let key in jsonData[i].data){
            _keyName = key;
        }
        if(_keyName == measureName){
            dataListTimeMeasureFiltered.push(jsonData[i]);
        }
    }
    if(dataListTimeMeasureFiltered.length > len){
        dataListTimeMeasureFiltered = dataListTimeMeasureFiltered.slice(0,len);
    }
    
    console.log(dataListTimeMeasureFiltered);
    document.getElementById('data3').innerHTML = dataToHtmlRepresentationTimeMeasure(dataListTimeMeasureFiltered,measureName);
    wrapDataChartdiff(dataListTimeMeasureFiltered,measureName);
}
//select option for now option
function getDataSelectTimeMeasureNow(_urlnew,_measureName){
    fetch(_urlnew)
    .then(response => {return response.json();})
    .then (data => {
        parseArray(data,_measureName);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}




// different avarage time
//line chart for rain 
function drawNewChartrain(){
    chartNew.destroy();
    chartNew = new Chart("chart_new", {
             type: "line",
             data: {
               labels: datarainTime1,
                 datasets: [{
                borderColor: "purple",  
                backgroundColor: 'transparent',
                 data:  datarain
               }]
             },
             options: {
               legend: {display: false},
               title: {
                 display: true,
                 text: "Time & Measurement"
               }
             }
           });
    };
// for rain different time table
function dataToHtmlRepresentationdiff(datAobjects){
    let hTMl = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.rain}</td>
        </tr>
            
    `
}
hTMl +="</tr></table>";
return hTMl;

}
// data for rain different avarage time line chart 
function wrapDataChartrain(jsonDatarain){
    datarain=[];
    datarainTime1 = [];
    for (let i = 0; i < jsonDatarain.length; i++) {
        datarain.push(jsonDatarain[i].rain);
        datarainTime1.push(jsonDatarain[i].date_time.split("T")[1]);    
    }
    console.log(jsonDatarain);
    console.log(datarain);
    console.log(typeof(datarainTime1));
    drawNewChartrain();
}
function getDataSelectdiff(_url){
    fetch(_url)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data3').innerHTML = dataToHtmlRepresentationdiff(data);
        wrapDataChartrain(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}



//line chart for windspeed 
function drawNewChartwindspeed(){
    chartNew.destroy();
    chartNew = new Chart("chart_new", {
             type: "line",
             data: {
               labels: datawindspeedTime1,
                 datasets: [{
                borderColor: "purple",  
                backgroundColor: 'transparent',
                 data:  datawindspeed
               }]
             },
             options: {
               legend: {display: false},
               title: {
                 display: true,
                 text: "Time & Measurement"
               }
             }
           });
    };

//for windspeed different time table
function dataToHtmlRepresentationdiffwindSpeed(datAobjects){
    let hTMl = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.wind_speed}</td>
        </tr>
            
    `
}
hTMl +="</tr></table>";
return hTMl;

}

// data for windspeed different avarage time line chart 
function wrapDataChartwindspeed(jsonDatawindspeed){
    datawindspeed=[];
    datawindspeedTime1 = [];
    for (let i = 0; i < jsonDatawindspeed.length; i++) {
        datawindspeed.push(jsonDatawindspeed[i].wind_speed);
        datawindspeedTime1.push(jsonDatawindspeed[i].date_time.split("T")[1]);    
    }
    console.log(jsonDatawindspeed);
    console.log(datawindspeed);
    console.log(typeof(datawindspeedTime1));
    drawNewChartwindspeed();
}
function getDataSelectdiffwindSpeed(_url){
    fetch(_url)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data3').innerHTML = dataToHtmlRepresentationdiffwindSpeed(data);
        wrapDataChartwindspeed(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}




//line chart for winddirection 
function drawNewChartwinddirection(){
    chartNew.destroy();
    chartNew = new Chart("chart_new", {
             type: "line",
             data: {
               labels: datawinddirectionTime1,
                 datasets: [{
                borderColor: "purple",  
                backgroundColor: 'transparent',
                 data:  datawinddirection
               }]
             },
             options: {
               legend: {display: false},
               title: {
                 display: true,
                 text: "Time & Measurement"
               }
             }
           });
    };
//for winddirection different time table
function dataToHtmlRepresentationdiffwinddirection(datAobjects){
    let hTMl = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.wind_direction}</td>
        </tr>
            
    `
}
hTMl +="</tr></table>";
return hTMl;

}
//data for winddirection different avarage time line chart 
function wrapDataChartwinddirection(jsonDatawinddirection){
    datawinddirection=[];
    datawinddirectionTime1 = [];
    for (let i = 0; i < jsonDatawinddirection.length; i++) {
        datawinddirection.push(jsonDatawinddirection[i].wind_direction);
        datawinddirectionTime1.push(jsonDatawinddirection[i].date_time.split("T")[1]);    
    }
    console.log(jsonDatawinddirection);
    console.log(datawinddirection);
    console.log(typeof(datawinddirectionTime1));
    drawNewChartwinddirection();
}
function getDataSelectdiffwinddirection(_url){
    fetch(_url)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data3').innerHTML = dataToHtmlRepresentationdiffwinddirection(data);
        wrapDataChartwinddirection(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}



//line chart for light 
function drawNewChartlight(){
    chartNew.destroy();
    chartNew = new Chart("chart_new", {
             type: "line",
             data: {
               labels: datalightTime1,
                 datasets: [{
                borderColor: "purple",  
                backgroundColor: 'transparent',
                 data:  datalight
               }]
             },
             options: {
               legend: {display: false},
               title: {
                 display: true,
                 text: "Time & Measurement"
               }
             }
           });
    };
//for light different time table
function dataToHtmlRepresentationdifflight(datAobjects){
    let hTMl = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.light}</td>
        </tr>
            
    `
}
hTMl +="</tr></table>";
return hTMl;

}
//data for ligth different avarage time line chart 
function wrapDataChartlight(jsonDatalight){
    datalight=[];
    datalightTime1 = [];
    for (let i = 0; i < jsonDatalight.length; i++) {
        datalight.push(jsonDatalight[i].light);
        datalightTime1.push(jsonDatalight[i].date_time.split("T")[1]);    
    }
    console.log(jsonDatalight);
    console.log(datalight);
    console.log(typeof(datalightTime1));
    drawNewChartlight();
}
function getDataSelectdifflight(_url){
    fetch(_url)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data3').innerHTML = dataToHtmlRepresentationdifflight(data);
        wrapDataChartlight(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}




//line chart for temperature 
function drawNewCharttemperature(){
    chartNew.destroy();
    chartNew = new Chart("chart_new", {
             type: "line",
             data: {
               labels: datatemperatureTime1,
                 datasets: [{
                borderColor: "purple",  
                backgroundColor: 'transparent',
                 data:  datatemperature
               }]
             },
             options: {
               legend: {display: false},
               title: {
                 display: true,
                 text: "Time & Measurement"
               }
             }
           });
    };
//for tempareture different time table
function dataToHtmlRepresentationdifftem(datAobjects){
    let hTMl = "<table> <tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>";
    const t = datAobjects.length;
    for (let h=0; h<t; h++){
        const dAtaobject = datAobjects[h];
        hTMl += `
        <tr>
            <td>${h+1}</td>
            <td>${dAtaobject.date_time.split("T")[0]}</td>
            <td>${dAtaobject.date_time.split("T")[1]}</td>
            <td>${dAtaobject.temperature}</td>
        </tr>
            
    `
}
hTMl +="</tr></table>";
return hTMl;

}
//data for temperature different avarage time line chart 
function wrapDataCharttemperature(jsonDatatemperature){
    datatemperature=[];
    datatemperatureTime1 = [];
    for (let i = 0; i < jsonDatatemperature.length; i++) {
        datatemperature.push(jsonDatatemperature[i].temperature);
        datatemperatureTime1.push(jsonDatatemperature[i].date_time.split("T")[1]);    
    }
    console.log(jsonDatatemperature);
    console.log(datatemperature);
    console.log(typeof(datatemperatureTime1));
    drawNewCharttemperature();
}

function getDataSelectdifftem(_url){
    fetch(_url)
    .then(response => {return response.json();})
    .then (data => {
        document.getElementById('data3').innerHTML = dataToHtmlRepresentationdifftem(data);
        wrapDataCharttemperature(data);
}).catch(error => console.error('AAAARRRGGHH! '+error));
}




//for Time and Measurement select option(view 5)
function weatherFetch2(){
let weather2= document.getElementById('weatherSelect2').value;
let weather3= document.getElementById('weatherSelect3').value;
console.log(weather2);
console.log(weather3);
let url2Fixed ="http://webapi19sa-1.course.tamk.cloud/v1/weather";
let url2 ="";
let measureName ="";


// for 0 value
if(weather2 == "0"){
    if(weather3 == "rain")
    {
        console.log("20 latest Wind speed.");
        measureName ="rain";
        getDataSelectTimeMeasureNow(url2Fixed,measureName);
    }
    if(weather3 == "wind speed")
    {
        console.log("24 hours latest hourly averages Wind speed.");
        measureName ="wind_speed";
        getDataSelectTimeMeasureNow(url2Fixed,measureName);
    }
    if(weather3 == "wind direction")
    {
        console.log("48 hours latest hourly averages Wind speed.");
        measureName ="wind_direction";
        getDataSelectTimeMeasureNow(url2Fixed,measureName);
    }
    if(weather3 == "light")
    {
        console.log("72 hours latest hourly averages Wind speed.");
        measureName ="light";
        getDataSelectTimeMeasureNow(url2Fixed,measureName);
    }
    if(weather3 == "temperature")
    {
        console.log("1 week latest hourly averages Wind speed.");
        measureName ="temperature";
        getDataSelectTimeMeasureNow(url2Fixed,measureName);
    }
}



//for 24 hour
if(weather2 == "24"){
    if(weather3 == "rain")
    {
        console.log("24 hours latest hourly averages rain.");
        
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/23";
        getDataSelectdiff(url2);
    }
    if(weather3 == "wind speed")
    {
        console.log("24 hours latest hourly averages Wind speed.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/23";
        getDataSelectdiffwindSpeed(url2);
    }
    if(weather3 =="wind direction")
    {
        console.log("24 hours latest hourly averages Wind direction.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/23";
        getDataSelectdiffwinddirection(url2);
    }
    if(weather3 == "light")
    {
        console.log("24 hours latest hourly averages light.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/light/23";
        getDataSelectdifflight(url2);
    }
    if(weather3 ==  "temperature")
    {
        console.log("24 hours latest hourly averages temperature.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23";
        getDataSelectdifftem(url2);
    }

}


//for 48 hour
if(weather2 == "48"){
    if(weather3 == "rain")
    {
        console.log("48 hours latest hourly averages rain.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/47";
        getDataSelectdiff(url2);
    }
    if(weather3 == "wind speed")
    {
        console.log("48 hours latest hourly averages Wind speed.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/47";
        getDataSelectdiffwindSpeed(url2);
    }
    if(weather3 =="wind direction")
    {
        console.log("48 hours latest hourly averages Wind direction.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/47";
        getDataSelectdiffwinddirection(url2);
    }
    if(weather3 == "light")
    {
        console.log("48 hours latest hourly averages light.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/light/47";
        getDataSelectdifflight(url2);
    }
    if(weather3 ==  "temperature")
    {
        console.log("48 hours latest hourly averages temperature.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47";
        getDataSelectdifftem(url2);
    }
}



//for 72 hour
if(weather2 == "72"){
    if(weather3 == "rain")
    {
        console.log("72 hours latest hourly averages rain.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/71";
        getDataSelectdiff(url2);
    }
    if(weather3 == "wind speed")
    {
        console.log("72 hours latest hourly averages Wind speed.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/71";
        getDataSelectdiffwindSpeed(url2);
    }
    if(weather3 =="wind direction")
    {
        console.log("72 hours latest hourly averages Wind direction.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/71";
        getDataSelectdiffwinddirection(url2);
    }
    if(weather3 == "light")
    {
        console.log("72 hours latest hourly averages light.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/light/71";
        getDataSelectdifflight(url2);
    }
    if(weather3 ==  "temperature")
    {
        console.log("72 hours latest hourly averages temperature.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71";
        getDataSelectdifftem(url2);
    }
}



//for 1 week
if(weather2 == "7"){
    if(weather3 == "rain")
    {
        console.log("1 week latest hourly averages rain.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/167";
        getDataSelectdiff(url2);
    }
    if(weather3 == "wind speed")
    {
        console.log("1 week latest hourly averages Wind speed.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/167";
        getDataSelectdiffwindSpeed(url2);
    }
    if(weather3 =="wind direction")
    {
        console.log("1 week latest hourly averages Wind direction.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/167";
        getDataSelectdiffwinddirection(url2);
    }
    if(weather3 == "light")
    {
        console.log("1 week latest hourly averages light.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/light/167";
        getDataSelectdifflight(url2);
    }
    if(weather3 ==  "temperature")
    {
        console.log("1 week latest hourly averages temperature.");
        url2="http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167";
        getDataSelectdifftem(url2);
    }
}
}
// view 2 search
function view2Search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("view2Search");
    filter = input.value;
    table = document.getElementById("view2table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

// view 3 search
function view3Search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("view3Search");
    filter = input.value;
    table = document.getElementById("view3table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
    
  }
  