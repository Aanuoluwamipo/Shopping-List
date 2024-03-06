let inputOne = document.getElementById("inputOne");
let inputTwo = document.getElementById("inputTwo");
let inputThree = document.getElementById("inputThree");
let displayOne = document.getElementById("displayOne");
let total = document.getElementById("total");

function display(){
    if(localStorage.getItem("List") === null) {
        localStorage.setItem("List", "[]")
        return
    }
    let List = JSON.parse(localStorage.getItem("List"));

    displayOne.innerHTML = "";
    List.map((item, index)=>{
        displayOne.innerHTML += `
            <div id="list">
                <p>S/N: ${index + 1}</p>    
                <p>Item: ${item.name}</p>    
                <p>Price: ${item.price}</p>    
                <p>Quantity: ${item.quantity}</p>    
                <p>Sub-total: ${item.subTotal}</p>
                <button onclick="editList(${index})">Edit</button>
                <button onclick="deleteList(${index})">Delete</button>
            </div>
        `
    })

    let totalPrice = List.reduce((total, item) => {
        return total + item.subTotal
    }, 0);
    total.innerHTML = `Total: ${totalPrice}`;

    inputOne.value = "";
    inputTwo.value = "";
    inputThree.value = "";
}
display()

function submitList(){
    let name = inputOne.value;
    let price = inputTwo.value;
    let quantity = inputThree.value;

    let list ={
        name,
        price,
        quantity,
        subTotal: price * quantity,
    };

    let List = JSON.parse(localStorage.getItem("List"));
    List.push(list);
    localStorage.setItem("List", JSON.stringify(List));
   display();
    
}

 function deleteList(index) {
    let List = JSON.parse(localStorage.getItem("List"));

    let confirmation = confirm(`Are you sure you want to delete item ${index + 1}?`);
    if (confirmation) {
        List.splice(index, 1);
        display();
    } else {
        return;
    }

    localStorage.setItem("List", JSON.stringify(List));
    display();
}

function editList(index) {
    let List = JSON.parse(localStorage.getItem("List"));
    let name = prompt("Enter your new item", List[index].name);
    let price = prompt("Enter your new price", List[index].price);
    let quantity = prompt("Enter your new quantity", List[index].quantity);
    let subTotal = price * quantity;
    let list = {
        name,
        price,
        quantity,
        subTotal,
    };
    List.splice(index, 1, list);
    localStorage.setItem("List", JSON.stringify(List));
    display()
}