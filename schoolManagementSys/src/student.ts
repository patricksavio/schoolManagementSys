import {parse} from "./helper.ts"
import "../style.css"

//function to get all details from form
const getDetail = () =>{
    let userName = (<HTMLInputElement>document.getElementById("username")).value;
    let fatherName = (<HTMLInputElement>document.getElementById("fathername")).value;
    let dob = new Date((<HTMLInputElement>document.getElementById("dob")).value);
    let standard = (<HTMLInputElement>document.getElementById("standard")).value;
    let address = (<HTMLInputElement>document.getElementById("address")).value;
    let intrests = (<HTMLInputElement>document.getElementById("intrestText")).value;
    let rollno = standard + count;  
    let studentDetail= new Student(userName,fatherName,dob,standard,address,intrests,rollno);

    return studentDetail;
}

//function to validate name & dob
const validateDetails = (student:Student):boolean =>{
    if(student.getName().search(/[@#$%^&*-+=,.;'0-9]/gi)==-1 && student.getfatherName().search(/[@#$%^&*-+=,.;'0-9]/gi)==-1){
        if(student.getDob().getFullYear()<=2015 && student.getDob().getFullYear()>=2002){
            return true;
            }
            else{
                (<HTMLInputElement>document.getElementById("warning")).innerHTML = "not a valid age"
                return false;
            }
        }
    
    else{
        (<HTMLInputElement>document.getElementById("warning")).innerHTML = "not a valid name"
        return false;
    }
}

//class declaration
class Student{
     private name : string;
     private fatherName : string;
     private dob : Date;
     private standard : string;
     private address : string;
     private intrests : string;
     private rollNo : string;

    constructor (name : string,fathername:string,dob:Date,standard:string,address:string,intrests:string,rollNo:string){
        this.name = name;
        this.fatherName = fathername;
        this.dob = dob;
        this.standard = standard;
        this.address = address;
        this.intrests = intrests;
        this.rollNo = rollNo;
    }
    getName():string{
        return this.name;
    }
    getfatherName():string{
        return this.fatherName
    }
    getDob():Date{
        return this.dob;
    }
}
//verifying user is logged in or not 
localStorage.getItem("token") ? null : (<HTMLInputElement>document.getElementById("formContainer")).innerHTML = "<h1>LOGIN PLEASE!!!</h1>";

//form element
let form = (<HTMLInputElement>document.getElementById("admissionForm"));

//updating the student list if students are present
let tempData:any = (localStorage.getItem("studentArr"));
let tempArr:Student[] = parse(tempData);
const studentArr:Student[] = [];
if(tempArr!=null){ 
for(let itr=0;itr<tempArr.length;itr++){
    studentArr.push(tempArr[itr]);
}
}
let count = parse(localStorage.getItem("count"));
if(count==null){
    count = 1;
}

let intrest = (<HTMLInputElement>document.getElementById("intrest"));

if(typeof(form) != 'undefined' && form != null){

//handling fome submission    
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let studentDetail = getDetail();
    if(validateDetails(studentDetail)==true){
        studentArr.push(studentDetail);
        count++;
        //form.reset();
        localStorage.setItem("studentArr",JSON.stringify(studentArr));
        localStorage.setItem("count",JSON.stringify(count));
        (<HTMLInputElement>document.getElementById("warning")).innerHTML = "Submitted"
    }
    
})
}
if(typeof(intrest) != 'undefined' && intrest != null){
//to display the intrest field    
intrest.addEventListener("change",()=>{
    if((<HTMLInputElement>intrest).checked){
        (<HTMLInputElement>document.getElementById("intrestText")).style.display = "block"
    }
    else{
        (<HTMLInputElement>document.getElementById("intrestText")).style.display = "none"
    }
    
})
}


setTimeout(()=>{
    localStorage.removeItem("token");
},5*60*1000)