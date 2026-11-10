let students =
JSON.parse(localStorage.getItem("students")) || [];

function addStudent(){

let id =
document.getElementById("studentId").value;

let name =
document.getElementById("studentName").value;

let studentClass =
document.getElementById("studentClass").value;

let age =
document.getElementById("studentAge").value;

let email =
document.getElementById("studentEmail").value;

if(
id===""||
name===""||
studentClass===""||
age===""||
email===""){
alert("Please fill all fields");
return;
}

students.push({
id,
name,
studentClass,
age,
email
});

saveData();
displayStudents();
clearFields();
}

function displayStudents(){

let table =
document.getElementById("studentTable");

table.innerHTML="";

if(students.length===0){

table.innerHTML=`
<tr>
<td colspan="6">
No Students Found
</td>
</tr>
`;

}

students.forEach((student,index)=>{

table.innerHTML+=`

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.studentClass}</td>

<td>${student.age}</td>

<td>${student.email}</td>

<td>

<button
class="edit-btn"
onclick="editStudent(${index})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteStudent(${index})">
Delete
</button>

</td>

</tr>

`;

});

document.getElementById("studentCount").innerText =
students.length;

let classList =
[...new Set(
students.map(
student=>student.studentClass
)
)];

document.getElementById("classCount").innerText =
classList.length;

let totalAge =
students.reduce(
(sum,student)=>
sum+Number(student.age),
0
);

let average =
students.length>0
?
(totalAge/students.length).toFixed(1)
:
0;

document.getElementById("avgAge").innerText =
average;

}

function deleteStudent(index){

students.splice(index,1);

saveData();

displayStudents();
}

function editStudent(index){

let student =
students[index];

document.getElementById("studentId").value =
student.id;

document.getElementById("studentName").value =
student.name;

document.getElementById("studentClass").value =
student.studentClass;

document.getElementById("studentAge").value =
student.age;

document.getElementById("studentEmail").value =
student.email;

students.splice(index,1);

saveData();

displayStudents();

}

function searchStudent(){

let input =
document.getElementById(
"searchInput"
).value.toLowerCase();

let rows =
document.querySelectorAll(
"#studentTable tr"
);

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

if(text.includes(input)){

row.style.display="";

}else{

row.style.display="none";

}

});

}

function saveData(){

localStorage.setItem(
"students",
JSON.stringify(students)
);

}

function clearFields(){

document.getElementById("studentId").value="";

document.getElementById("studentName").value="";

document.getElementById("studentClass").value="";

document.getElementById("studentAge").value="";

document.getElementById("studentEmail").value="";

}

function exportCSV(){

let csv =
"ID,Name,Class,Age,Email\n";

students.forEach(student=>{

csv +=
`${student.id},
${student.name},
${student.studentClass},
${student.age},
${student.email}\n`;

});

let blob =
new Blob([csv],{
type:"text/csv"
});

let url =
window.URL.createObjectURL(blob);

let a =
document.createElement("a");

a.href = url;

a.download =
"students.csv";

a.click();

}

displayStudents();