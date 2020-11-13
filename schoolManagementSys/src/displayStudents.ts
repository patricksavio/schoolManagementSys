import {parse} from "./helper.ts"
import "../style.css"

//getting html elements
const list = (<HTMLInputElement>document.getElementById("list"));
const display = (<HTMLInputElement>document.getElementById("studentDisplay"));
const standard = (<HTMLInputElement>document.getElementById("standard"));

//checking if user is logged in
if(localStorage.getItem("token")!=null){ 
if(typeof(list) != 'undefined' && list != null){
    //listing the students
    standard.addEventListener("change",()=>{
        let studentArr = parse(localStorage.getItem("studentArr"));
        if(studentArr!=null){
            let tempArr:any =[];
            tempArr = studentArr.filter((student:any) => student.standard == standard.value ) 
            tempArr.sort((a:any, b:any) => (a.name > b.name) ? 1 : -1)
            removeComponents();
            addInfo(tempArr);                
    }
    })
}
}
else{
    (<HTMLInputElement>document.getElementById("list")).innerHTML = "<h1>LOGIN PLEASE!!</h1>"
}


setTimeout(()=>{
    localStorage.removeItem("token");
},5*60*1000)



const addInfo = (tempArr:any):any =>{
    for(let itr=0;itr<tempArr.length;itr++){
        let code = `<div class="student">
        <h1>${tempArr[itr].name}</h1>
        <h2>class ${tempArr[itr].standard}</h2>
        <h3>Father name:${tempArr[itr].fatherName}</h3>
        <h3>Age:${new Date().getFullYear()-new Date(tempArr[itr].dob).getFullYear() }</h3>
    </div>`;
       (<HTMLInputElement>document.getElementById("studentDisplay")).insertAdjacentHTML("beforeend",code);
       console.log(tempArr);
    }
}

const removeComponents = () =>{
    while(display.firstChild){
        display.removeChild(display.firstChild);
    }
}
