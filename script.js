const addbutton=document.getElementById("addtask");
const userinput= document.getElementById("inputtask");
const tasklist=document.getElementById("tasklist");
let taskcount=0;
const doneno=document.getElementById("doneno");
const taskno=document.getElementById("taskno");
const donesec=document.getElementById("donelist");
window.onload=function(){
  let storedtask=JSON.parse(localStorage.getItem("tasks"))|| [];
  storedtask.forEach((inputtask,index)=>{
    const taskitem=document.createElement('div');
    taskitem.classList.add("taskcontainer");
    taskitem.innerHTML =  `<div id="tasktext" class="taskcontent">
            <p class="tasks">${inputtask}</p></div>
    <div class="buttons">
          <button class="done" onclick="donetask(${index})">
             <img src="assets/Check.svg" alt="done" />
           </button>
           <button class="edit" onclick="edittask(${index})">
             <img src="assets/Icon.svg" alt="edit" />
           </button>
           <button class="delete" onclick="deletetask(${index})">
             <img src="assets/Vector.svg" alt="delete" />
           </button>
    </div>`;
    console.log(index);
    tasklist.appendChild(taskitem);
    });
    let donetask=JSON.parse(localStorage.getItem("done"))|| [];
    donetask.forEach((done)=>{
      const doneitem=document.createElement('div');
  doneitem.innerHTML=`
  <p id="donetask" class="markedtask taskcontainer"> 
  ${done}
  </p>`
donesec.appendChild(doneitem);
    })
    update_taskcount();
    update_donecount(); 
  }




function update_taskcount() {
let tasks=document.getElementsByClassName("tasks").length;
let design=document.getElementById('tasklist');
if (tasks===0){
  taskno.textContent='Tasks to do';
  design.classList.add("taskListEmpty");
}
else{
  design.classList.remove("taskListEmpty");
  taskno.textContent=`Tasks to do - ${tasks}`;
}
}




function update_donecount() {
let done=document.getElementsByClassName("markedtask").length;
if (done===0){
  doneno.textContent='Done';
}
else{
  doneno.textContent=`Done - ${done}`;
}
}




function savetasks(){
  let storedtask=[];
  tasklist.querySelectorAll('.tasks').forEach(function(item){
    storedtask.push(item.textContent.trim());
    console.log(storedtask);
  });
  localStorage.setItem('tasks',JSON.stringify(storedtask));
}

function reassignindex(){
  const taskbox = document.querySelectorAll(".taskcontainer");
  taskbox.forEach((taskitem,newindex)=> {
const donebut= taskitem.querySelector(".done");
const editbut= taskitem.querySelector(".edit");
const deletebut= taskitem.querySelector(".delete");
if (donebut){
donebut.setAttribute('onclick',`donetask(${newindex})`);
}
if (editbut){
editbut.setAttribute('onclick',`edittask(${newindex})`);
}
if (deletebut){
deletebut.setAttribute('onclick',`deletetask(${newindex})`);
}
  });
}





function addtask(event){
event.preventDefault();
let inputtask= userinput.value.trim();
if (inputtask===""){
    alert("Please enter a task!!");
    return;
}
const index=taskcount++;

const taskitem=document.createElement('div');
taskitem.classList.add("taskcontainer");
taskitem.innerHTML =  `<div id="tasktext" class="taskcontent">
        <p class="tasks">${inputtask}</p></div>
<div class="buttons">
      <button class="done" onclick="donetask(${index})">
         <img src="assets/Check.svg" alt="done" />
       </button>
       <button class="edit" onclick="edittask(${index})">
         <img src="assets/Icon.svg" alt="edit" />
       </button>
       <button class="delete" onclick="deletetask(${index})">
         <img src="assets/Vector.svg" alt="delete" />
       </button>
</div>`;
tasklist.appendChild(taskitem);
reassignindex();
update_taskcount();
savetasks();
userinput.value="";
}


function donesave(){
  let donetaskList=[];
  donesec.querySelectorAll('#donetask').forEach(function(item){
    donetaskList.push(item.textContent.trim());
    console.log(donetaskList);
  });
    console.log(donetaskList);
  localStorage.setItem('done',JSON.stringify(donetaskList));
}

function donetask(index){
  event.preventDefault();
  let storedtask=JSON.parse(localStorage.getItem("tasks"))|| [];
  const taskitem= tasklist.querySelectorAll(".taskcontainer")[index];
  taskitem.remove();
  let done=storedtask[index];
  storedtask.splice(index,1);
  localStorage.setItem('tasks',JSON.stringify(storedtask));
  const doneitem=document.createElement('div');
  doneitem.innerHTML=`
  <p id="donetask" class="markedtask taskcontainer">
  ${done}
  </p>
`
donesec.appendChild(doneitem);
donesave();
reassignindex();
update_taskcount();
update_donecount();
}



function edittask(index){
  event.preventDefault();
  const taskitem= document.querySelectorAll(".taskcontainer")[index];
  const tasktext = taskitem.querySelector('.tasks').textContent.trim();
  console.log(tasktext);
  taskitem.innerHTML=`<div id="buttonedtask" style="position:relative; width:100%; display:flex; justify-content:space-between"> <div id="tasktext" class="taskcontent">
       <input id="editinput" value="${tasktext}" type="text" 
       </div>
  <button id="done" onclick="complete(${index})">
            <img src="assets/Check.svg" alt="done" />
          </button>
          </div>

     `
}


function complete(index){
  const taskitem= document.querySelectorAll(".taskcontainer")[index];
  const updatedtext=taskitem.querySelector("#editinput").value.trim();
  console.log(updatedtext);
  taskitem.innerHTML=` <div id="tasktext" class="taskcontent">
     <p class="tasks">${updatedtext}</p></div>
     <div class="buttons">
    <button class="done" onclick="donetask(${index})">
       <img src="assets/Check.svg" alt="done" />
     </button>
     <button class="edit" onclick="edittask(${index})">
       <img src="assets/Icon.svg" alt="edit" />
     </button>
     <button class="delete" onclick="deletetask(${index})">
       <img src="assets/Vector.svg" alt="delete" />
     </button>
</div>
     `
     let storedtask=JSON.parse(localStorage.getItem("tasks"))|| [];
  storedtask[index]=updatedtext;
  localStorage.setItem('tasks',JSON.stringify(storedtask));
    
 }



function deletetask(index){
  event.preventDefault();
  let storedtask=JSON.parse(localStorage.getItem("tasks"))|| [];
  const deleteitem= tasklist.querySelectorAll(".taskcontainer")[index];
  deleteitem.remove();
  storedtask.splice(index,1);
  localStorage.setItem('tasks',JSON.stringify(storedtask));
  update_taskcount();
  reassignindex()
}