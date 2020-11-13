import "../style.css"
import {parse} from "./helper"
const Chart = require("../node_modules/chart.js/dist/Chart.min.js")

//function to find category of studetns
const findCategory = (primary:number,higherSecondary:number,highSkol:number,studentList:any) =>{
    for(let itr=0;itr<studentList.length;itr++){
        if(studentList[itr].standard=="I" || studentList[itr].standard=="II" || studentList[itr].standard=="III"|| studentList[itr].standard=="IV"||studentList[itr].standard=="V"){
                 primary++;
        }
        else if(studentList[itr].standard=="X"||studentList[itr].standard=="XI"||studentList[itr].standard=="XII"){
            higherSecondary++;
        }
        else{
            highSkol++;
        }
    }
    return [primary,higherSecondary,highSkol];
}

//setting the loginDetail 
let loginDetail = (<HTMLInputElement>document.getElementById("status"));
localStorage.getItem("token") ? loginDetail.innerText = "Logout" : loginDetail.innerText = "Login";
loginDetail.addEventListener("click",()=>{
    localStorage.getItem("token") ? (localStorage.removeItem("token"),location.reload()) : location.replace("./login.html")
})
//getting the student list & categorizing them
let studentList = parse(localStorage.getItem("studentArr"));
(<HTMLInputElement>document.getElementById("total")).innerHTML = studentList.length;
console.log(studentList);
let primary = 0;
let highSkol = 0;
let higherSecondary = 0; 
 [primary,higherSecondary,highSkol] = findCategory(primary,higherSecondary,highSkol,studentList);

 //adding chart
 const ctx = document.getElementById('myChart');
 new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Primary','High_School','Higher_Secondary'],
        datasets: [{
            label: '# of Votes',
            data: [primary,highSkol,higherSecondary],
            backgroundColor: [
                'aqua',
                'azure',
                'wheat'
            ],
            borderColor: [
                'aqua',
                'azure',
                'wheat'
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        legend:{
            position:"bottom"
        },
        
    },
})

setTimeout(()=>{
    localStorage.removeItem("token");
},5*60*1000)

