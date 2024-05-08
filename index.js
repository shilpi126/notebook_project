const API_KEY = "https://crudcrud.com/api/a0c9c44d0a934ebdb54c65e1726c6ecf/notebook"


function handleFormSubmit(event){
    event.preventDefault()
    
    const title = document.getElementById("title").value;
    const descreption = document.getElementById("des").value;
    
    const data = {
        title,
        descreption
    }
    
    addNoteBook(data);

    document.getElementById("title").value ="";
    document.getElementById("des").value = "";
}


function addNoteBook (data){
    console.log(data.title, data.descreption)
    axios.post(`${API_KEY}`,data)
    .then((res)=>getNoteBookData())
    .catch((err)=>console.log("Adding Notebook is feild", err))

}


async function getNoteBookData(){
    await axios.get(`${API_KEY}`)
    .then((res)=>displayNoteBook(res.data))
    .catch((err)=>console.log("Something went wrong", err))
   

}

let showCount = document.getElementById("show")

function displayNoteBook(data){
    const parentElem = document.getElementById("parentList");
    
    parentElem.innerHTML = "";

    data.forEach(({title,descreption,_id},i) => {
        parentElem.innerHTML += `
        <li class="listItem" id=${_id}>
        <h1>${title}</h1>
        <p>${descreption}</p>
        <button onclick="deleteNoteBook('${_id}')">Delete</button>
        </li>
        `

    })

    const totalCount = document.getElementById("count")
    totalCount.textContent=data.length;


    showCount.textContent=data.length;
}



function deleteNoteBook(id){
   console.log(id)

    axios.delete(`${API_KEY}/${id}`)
    .then((res)=>console.log("data deleted successfully",res))
    .catch((err)=>console.log("data not deleted", err))
    getNoteBookData()
}


const searchElemet = document.getElementById("search");
const listItem = document.getElementsByClassName("listItem")

searchElemet.addEventListener("keyup", function(event){
    event.preventDefault();

    const text = event.target.value.toLowerCase()
    let count =0;
    
    for(let i=0; i<listItem.length; i++){
        
        const currentNoteBookText = listItem[i].firstElementChild.textContent.toLowerCase();

        if(currentNoteBookText.indexOf(text)=== -1){
            listItem[i].style.display = "none";
            

        }else{
            listItem[i].style.display = "flex";
            
            count++;
            
        }
      
    }

//console.log(count);

showCount.textContent=count;
    

})


getNoteBookData()