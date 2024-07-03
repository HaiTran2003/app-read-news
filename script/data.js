'use strict';

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

btnExport.addEventListener("click", function () {
    const isExport = confirm("Bạn chắc chắn export  ?");
    if (isExport) {
        saveStaticDataToFile();
    }
});

function saveStaticDataToFile() {
    const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
        type: "application/json",
    });

    saveAs(blob, "petData.json");
}

btnImport.addEventListener("click", function () {
    if (!fileInput.value) {
        alert("Vui lòng chọn file muốn import !");
    } else {
        const isImport = confirm("Bạn có chắc chắn import ?");
        if (isImport) {
            const file = fileInput.files[0];

            const reader = new FileReader();

            reader.addEventListener("load", function () {
                const isValidateFile = checkFile(JSON.parse(reader.result));
                if (isValidateFile) {
                    saveToStorage("petArr", JSON.parse(reader.result));
                    alert("Import thành công !");
                }
            });

            if (file) {
                reader.readAsText(file);
            }

            fileInput.value = "";
        }
    }
});

function checkFile(data) {
    if (!(data instanceof Array)) {
        alert("File không hợp lệ: vì dữ liệu không phải là một mảng chứa các object");
        return false;
    }

    if (!isPetObject(data)) {
        return false;
    }

    if (!validateData(data)) {
        return false;
    }

    return true;
}

function isPetObject(data) {
    if (!data.every((item) => item instanceof Object)) {
        alert("File không hợp lệ: có phần tử trong mảng không phải là Object !");
        return false;
    }

    const isOk = data.every((item) => {
        return (
            Object.keys(item).length === 12 &&
            item.hasOwnProperty("id") &&
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("age") &&
            item.hasOwnProperty("type") &&
            item.hasOwnProperty("weight") &&
            item.hasOwnProperty("length") &&
            item.hasOwnProperty("color") &&
            item.hasOwnProperty("breed") &&
            item.hasOwnProperty("vaccinated") &&
            item.hasOwnProperty("dewormed") &&
            item.hasOwnProperty("sterilized") &&
            item.hasOwnProperty("date")
        );
    });

    if (!isOk) {
        alert("File không hợp lệ: vì object có thuộc tính không hợp lệ !");
        return false;
    }

    return true;
}

function validateData(data) {
    const idSet = new Set();
    return data.every(function (pet) {
        if (pet.id.trim().length === 0) {
            alert("File không hợp lệ: file có thuộc tính id không hợp lệ !");
            return false;
        }

        if (idSet.has(pet.id)) {
            alert("File không hợp lệ: các id phải là duy nhất !");
            return false;
        }
        idSet.add(pet.id);

        if (pet.name.trim().length === 0) {
            alert("File không hợp lệ: file có thuộc tính name không hợp lệ !");
            return false;
        }

        pet.age = parseInt(pet.age);
        if (isNaN(pet.age) || pet.age < 1 || pet.age > 15) {
            alert("File không hợp lệ: file có thuộc tính age không hợp lệ !");
            return false;
        }

        pet.weight = parseInt(pet.weight);
        if (isNaN(pet.weight) || pet.weight < 1 || pet.weight > 15) {
            alert("File không hợp lệ: file có thuộc tính weight không hợp lệ !");
            return false;
        }

        pet.length = parseInt(pet.length);
        if (isNaN(pet.length) || pet.length < 1 || pet.length > 100) {
            alert("File không hợp lệ: file có thuộc tính length không hợp lệ !");
            return false;
        }

        if (pet.type.trim().length === 0) {
            alert("File không hợp lệ: file có thuộc tính type không hợp lệ !");
            return false;
        }

        if (pet.color.trim().length === 0) {
            alert("File không hợp lệ: file có thuộc tính color không hợp lệ !");
            return false;
        }

        if (pet.breed.trim().length === 0) {
            alert("File không hợp lệ: file có thuộc tính breed không hợp lệ !");
            return false;
        }

        if (typeof pet.date !== "string" || pet.date.trim().length === 0) {
            alert("File không hợp lệ: file có thuộc tính date không hợp lệ !");
            return false;
        }

        if (typeof pet.vaccinated !== "boolean") {
            alert("File không hợp lệ: file có thuộc tính vaccinated không hợp lệ !");
            return false;
        }

        if (typeof pet.dewormed !== "boolean") {
            alert("File không hợp lệ: file có thuộc tính dewormed không hợp lệ !");
            return false;
        }

        if (typeof pet.sterilized !== "boolean") {
            alert("File không hợp lệ: file có thuộc tính sterilized không hợp lệ !");
            return false;
        }

        return true;
    });
}
