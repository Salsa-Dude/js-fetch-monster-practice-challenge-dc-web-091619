
let currentPage = 1;


document.addEventListener("DOMContentLoaded", function() {
    fetchMonsters(currentPage)
    initForm()
    initButtons();
})

function initButtons() {
    // grab buttons
    let leftButton = document.getElementById("back")
    let rightButton = document.getElementById("forward")
    // addEventListeners
    leftButton.addEventListener("click", handleLeftButtonClick)
    rightButton.addEventListener("click", handleRightButtonClick)
    // debugger
    // left button should go back a page
    // right button should go forward a page
  
}

function handleLeftButtonClick(){
    // error check for trying to go to negative page
    if (currentPage === 1){
      alert("no hack no sir!")
      return
    }
    //update currentPage
    currentPage--
  
    // clear DOM of current 50
    let monstersContainer = document.getElementById("monster-container");
    monstersContainer.innerHTML = ""
    // fetch the correct page
    fetchMonsters(currentPage)
  }

  function handleRightButtonClick(){
    currentPage++
    
  
    // clear DOM of current 50
    let monstersContainer = document.getElementById("monster-container");
    monstersContainer.innerHTML = ""
    // fetch the correct page
    fetchMonsters(currentPage)
  }

function fetchMonsters(num) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
        .then(response => response.json())
        .then(monstersArray => {
            monstersArray.forEach(renderMonster)
        })
}

function renderMonster(monster) {
    // grab the element that will house the monster
    let monstersContainer = document.getElementById("monster-container");
    // create DOM elements that will represent the monster in the DOM
    let nameHeader = document.createElement("h2");
    let agePara = document.createElement("p");
    let descPara = document.createElement("p");
    // manipulate these elements to represent the Monster (name, age, description)
    nameHeader.innerText = monster.name;
    agePara.innerText = monster.age;
    descPara.innerText = monster.description;
    // add elements to DOM
    let monsterDiv = document.createElement("div");
  
    monsterDiv.appendChild(nameHeader)
    monsterDiv.appendChild(agePara)
    monsterDiv.appendChild(descPara)
  
    monstersContainer.appendChild(monsterDiv)
  }

  function initForm(){
    // find form
    let form = document.querySelector("form")
    // set variables equal to form values
    form.addEventListener("submit", handleFormSubmission)
  }

  function handleFormSubmission(e){
    e.preventDefault()
    // When you click the button, the monster should be added to the list and saved in the API.
    let nameInput = document.getElementById("name").value
    let ageInput = document.getElementById("age").value
    let descInput = document.getElementById("desc").value

    // console.log(nameInput, ageInput, descInput)
  
     let monsterInfo = {
      name: nameInput, 
      age: ageInput, 
      description: descInput
    }
    fetch("http://localhost:3000/monsters", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(monsterInfo)
    })
    .then(response => response.json())
    .then(monsterObj => {
      alert("Added!")
    })
    .catch(error => {
        console.log("Sorry!")
    })
  
   }