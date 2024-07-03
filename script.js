"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

let deleteElList = document.querySelectorAll(".btn.btn-danger");
const healthyBtn = document.getElementById("healthy-btn");

// Hiển thị danh sách thú cưng đã nhập trước đó
renderTableData(petArr);

typeInput.addEventListener("click", renderBreed);

function renderBreed() {
    breedInput.innerHTML = "<option>Select Breed</option>";

    if (typeInput.value === "Dog") {
        const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
        breedDogs.forEach(function (breedItem) {
            const option = document.createElement("option");
            option.innerHTML = `${breedItem.breed}`;
            breedInput.appendChild(option);
        });
    } else if (typeInput.value === "Cat") {
        const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
        breedCats.forEach(function (breedItem) {
            const option = document.createElement("option");
            option.innerHTML = `${breedItem.breed}`;
            breedInput.appendChild(option);
        });
    }
}

submitBtn.addEventListener("click", function (e) {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
    };

    const isValidate = validateData(data);

    if (isValidate) {
        petArr.push(data);
        saveToStorage("petArr", petArr);

        //  Hiển thị danh sâch thú cưng
        renderTableData(petArr);

        // Xoá các dữ liệu vừa nhập trên Form
        deleteForm();
    }
});

function renderTableData(petArr) {
    tableBodyEl.innerHTML = "";

    petArr.forEach((pet) => {
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${pet.id}</th>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.type}</td>
            <td>${pet.weight} kg</td>
            <td>${pet.length} cm</td>
            <td>${pet.breed}</td>
            <td>
                <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
            </td>
            <td><i class="bi 
            ${pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
            <td><i class="bi 
            ${pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
            <td><i class="bi 
            ${pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
            <td>
            ${displayTime(pet.date).slice(8, 10)}
            /${displayTime(pet.date).slice(5, 7)}
            /${displayTime(pet.date).slice(0, 4)}
            </td>
        <td><button onclick="deletePet('${pet.id}')" type="button" class="btn btn-danger">Delete</button></td>`;
        tableBodyEl.appendChild(row);
    });
}

// Hàm hiển thị thời gian
function displayTime(date) {
    return new Date(date).toISOString().slice(0, 10);
}

// Hàm xoá các dữ liệu vừa nhập trên Form
function deleteForm() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

// Hàm: xoá xoá một thú cưng với id được truyền vào
function deletePet(petId) {
    const isDeleted = confirm("Are you sure?");
    if (isDeleted) {
        // Thực hiện bước xoá
        for (let i = 0; i < petArr.length; i++) {
            if (petId === petArr[i].id) {
                // Xoá khỏi mảng
                petArr.splice(i, 1);
                // Cập nhật lại dũ liệu dưới local storage
                saveToStorage("petArr", petArr);
                // Gọi lại hàm hiển thị
                renderTableData(petArr);
            }
        }
    }
}

// Hàm kiểm tra dữ liệu hợp lệ
function validateData(data) {
    let isValidate = true;

    // ID phải duy nhất
    for (let i = 0; i < petArr.length; i++) {
        if (data.id === petArr[i].id) {
            alert("ID must unique!");
            isValidate = false;
        }
    }
    // Các trường không được để trống
    if (data.id.trim().length === 0) {
        alert("Please input for id");
        isValidate = false;
    }
    if (data.name.trim().length === 0) {
        alert("Please input for name");
        isValidate = false;
    }
    if (isNaN(data.age)) {
        alert("Please input for age");
        isValidate = false;
    } else if (data.age < 1 || data.age > 15) {
        alert("Age must be between 1 and 15!");
        isValidate = false;
    }
    if (data.type === "Select Type") {
        alert("Please select Type!");
        isValidate = false;
    }
    if (isNaN(data.weight)) {
        alert("Please input for weight");
        isValidate = false;
    } else if (data.weight < 1 || data.weight > 15) {
        alert("Weight must be between 1 and 15!");
        isValidate = false;
    }
    if (isNaN(data.length)) {
        alert("Please input for length");
        isValidate = false;
    } else if (data.length < 1 || data.length > 100) {
        alert("Length must be between 1 and 100!");
        isValidate = false;
    }
    if (data.breed === "Select Breed") {
        alert("Please select Breed!");
        isValidate = false;
    }

    return isValidate;
}
