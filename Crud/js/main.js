let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let image = document.getElementById("image");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
// let img = "No image";
let searchMood = "title";
//get total functiona

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

//craet proudct

let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

function getBase64Image(file, callback) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

submit.onclick = function () {
  let imageFile = image.files[0]; // Get the selected image file

  if (imageFile) {
    getBase64Image(imageFile, function (base64Image) {
      let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
        image: base64Image
      };

      if (
        title.value != "" &&
        price.value != "" &&
        ads.value != "" &&
        taxes.value != "" &&
        ads.value != "" &&
        category.value != "" &&
        newProduct.count <= 100
      ) {
        if (mood === "create") {
          if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
              data.push(newProduct);
            }
          } else {
            data.push(newProduct);
          }
        } else {
          data[tmp] = newProduct;
          mood = "create";
          submit.innerHTML = "Create";
          count.style.display = "block";
        }
        clearInput();
      }

      localStorage.setItem("product", JSON.stringify(data));
      showData();
    });
  }
};

//clear input

function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  // image.value = '';
}

//showData

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
            <td>${i + 1}</td>
            <td><img src="${
              data[i].image
            }" alt="Product Image"></td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteOneProud(${i})" id="delete">Delete</button></td>
          </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDlet = document.getElementById("dleetall");
  if (data.length > 0) {
    btnDlet.innerHTML = `
        <button onclick="deleteAllProud()">Delete All (${data.length})</button>
        `;
  } else {
    btnDlet.innerHTML = "";
  }
}

showData();

//dlete oneProudct
function deleteOneProud(i) {
  data.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(data));
  showData();
}

//dlete all
function deleteAllProud() {
  localStorage.clear();
  data.splice(0);
  showData();
}

//update product
function updateProduct(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  total.innerHTML = data[i].total;
  getTotal();
  count.style.display = "none";
  category.value = data[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth"
  });
}

function getSearchMood(id) {
  let searchInput = document.getElementById("search");
  if (id === "sh-by-t") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchInput.placeholder = "Search by " + searchMood;
  searchInput.focus();
  searchInput.value = "";
  showData();
}

function searchData(val) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(val.toLowerCase())) {
        table += `
                   <tr>
            <td>${i + 1}</td>
            <td><img src="${
              data[i].image
            }" alt="Product Image"></td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteOneProud(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.toLowerCase().includes(val.toLowerCase())) {
        table += `
                   <tr>
            <td>${i + 1}</td>
            <td><img src="${
              data[i].image
            }" alt="Product Image"></td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteOneProud(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
