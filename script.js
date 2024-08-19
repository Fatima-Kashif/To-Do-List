let tasks=document.getElementsByClassName("tasks").length;
const taskno=document.getElementById("taskno")
taskno.textContent+=tasks===0? "" : " - " + tasks;
let done=document.getElementsByClassName("markedtask").length;
const doneno=document.getElementById("doneno")
doneno.textContent+=done===0? "" : " - " + done;
function addtask(){


}
function donetask(){


}
function edittask(){


}
function deletetask(){

    
}