"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

renderTableBreed(breedArr);

btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  const isValidate = validate(data);

  if (isValidate) {
    breedArr.push(data);

    saveToStorage("breedArr", breedArr);

    renderTableBreed(breedArr); 

    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;

  if (breedInput.value.trim().length === 0) {
    alert("Pleasure input for breed !");
    isValidate = false;
  }

  if (data.type === "Select Type") {
    alert("Pleasure select Type !");
    isValidate = false;
  }

  return isValidate;
}

function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

function renderTableBreed() {
  tableBodyEl.innerHTML = "";

  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td scope="col">${index + 1}</td>
		<td scope="col">${breedItem.breed}</td>
		<td scope="col">${breedItem.type}</td>
        <td>
        <button type="button" onclick = "deleteBreed('${
          breedItem.breed
        }')" class="btn btn-danger">Delete</button>
        </td>`;

        tableBodyEl.appendChild(row);
  });
}

function deleteBreed(breed) {
    const isDelete = confirm("Are you sure?");
    if (isDelete) {
      // Thực hiện bước xoá
      for (let i = 0; i < breedArr.length; i++) {
        if (breed === breedArr[i].breed) {
          // Xoá khỏi mảng
          breedArr.splice(i, 1);
          // cập nhật lại dữ liệu dưới dạng local storage
          saveToStorage("breedArr", breedArr);
          // Gọi lại hàm hiển thị
          renderTableData(breedArr);
          break;
        }
      }
    }
  }