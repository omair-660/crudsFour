var inputName = document.querySelector("#inputName");
var inputPrice = document.querySelector("#inputPrice");
var inputCategory = document.querySelector("#inputCategory");
var addBtn = document.querySelector("#btnadd");
var rowData = document.querySelector("#rowData");
var show = document.querySelector("#show");
var back = document.querySelector("#back");
var count = document.querySelector("#count");
var card = document.querySelector("#card");
var notFound = document.querySelector("#notFound");
var deleteAll = document.querySelector("#deleteAll");

var contentPro = [];

if (localStorage.contentPro != null) {
    contentPro = JSON.parse(localStorage.contentPro);
} else {
    contentPro = [];
}

addBtn.onclick = function () {

    if (inputName.value === "" || inputPrice.value === "" || inputCategory.value === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in the fields!",
        });
    } else {
        Swal.fire({
            title: "product added!",
            html: `<div class="d-flex justify-content-center align-item-center"> <h4 class="">product name: </h4> <p class="p-2 mb-0 bg-success text-light rounded-2 ms-1">${inputName.value}</p></div>`,
            icon: "success"
        });

        var product = {
            name: inputName.value,
            price: inputPrice.value,
            category: inputCategory.value
        };
        contentPro.push(product);
        localStorage.setItem("contentPro", JSON.stringify(contentPro));
        display();
        clearData();
    }

}

function display() {
    var cartona = "";

    for (var i = 0; i < contentPro.length; i++) {
        cartona += `
            <div class="col-md-4 mb-3">
                <div class="text-center bg-secondary bg-opacity-10 p-3 rounded shadow-sm">
                    <h2 class="fw-bold h5">Name: <span class="fw-normal fs-5">${contentPro[i].name}</span></h2>
                    <h2 class="fw-bold h5 my-3">Price: <span class="fw-normal fs-5">${contentPro[i].price}</span></h2>
                    <h4 class="fw-bold h5">Category: <span class="fw-normal fs-5">${contentPro[i].category}</span></h4>
                    <button class="btn btn-outline-danger w-100 mt-2" onclick="deleteItem(${i})"><i class="fa-regular fa-trash-can pe-2"></i> Delete</button>
                
                </div>
            </div>
        `;
    }

    if (contentPro.length === 0) {
        notFound.classList.remove("d-none");
        count.classList.remove("bg-danger");
        count.classList.add("bg-secondary");
        deleteAll.classList.add("d-none");
        show.classList.add("found");
    } else {
        notFound.classList.add("d-none");
       count.classList.add("bg-danger");
        count.classList.remove("bg-secondary");
        deleteAll.classList.remove("d-none");
        show.classList.remove("found");
        deleteAll.innerHTML = `<i class="fa-solid fa-trash pe-2"></i> delete All  (${contentPro.length})`;
    }

    rowData.innerHTML = cartona;
    count.innerHTML = `${contentPro.length}`;
}

display();

function clearData() {
    inputName.value = null;
    inputPrice.value = null;
    inputCategory.value = null;
    inputCategory.classList.remove("is-valid");
    inputCategory.classList.remove("is-invalid");

    inputName.classList.remove("is-valid");
    inputName.classList.remove("is-invalid");

    inputPrice.classList.remove("is-valid");
    inputPrice.classList.remove("is-invalid");

}

card.onclick = function () {
    show.classList.remove("d-nonee");
    show.classList.add("d-noneeOpen");
}

back.onclick = function () {
    show.classList.add("d-nonee");
    show.classList.remove("d-noneeOpen");
}

function deleteItem(i) {
    contentPro.splice(i, 1);
    localStorage.setItem("contentPro", JSON.stringify(contentPro));
    display();
}

function validationName() {
    var regex = /^[a-zA-Z]{3,12}$/

    if (regex.test(inputName.value.trim())) {
        inputName.classList.add("is-valid");
        inputName.classList.remove("is-invalid");
        console.log("ok");
    } else {
        inputName.classList.remove("is-valid");
        inputName.classList.add("is-invalid");
    }
}
function validationPrice() {
    var regex = /^(?:[1-9]\d{0,3}|10000)$/;

    if (regex.test(inputPrice.value)) {
        inputPrice.classList.add("is-valid");
        inputPrice.classList.remove("is-invalid");
        console.log("ok");
    } else {
        inputPrice.classList.remove("is-valid");
        inputPrice.classList.add("is-invalid");
    }
}
function validationCategory() {
    var regex = /^[a-zA-Z ]{3,7}$/;

    if (regex.test(inputCategory.value.trim())) {
        inputCategory.classList.add("is-valid");
        inputCategory.classList.remove("is-invalid");
        console.log("ok");
    } else {
        inputCategory.classList.remove("is-valid");
        inputCategory.classList.add("is-invalid");
    }
}

deleteAll.onclick = function () {
    contentPro = [];
    localStorage.setItem("contentPro",JSON.stringify(contentPro));
    display();
}
