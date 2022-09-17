let page = 1;
let container = document.getElementById("container");
async function getData() {
  let sort = document.getElementById("sort").value;
  let res = await fetch(
    `https://caradapi.herokuapp.com/api/cars?page=${page}&limit=12&orderBy=${sort}`
  );
  let d = await res.json();

  console.log(d);
  showData(d);
}
getData();
async function sortingPrice() {
  container.innerHTML = "";
  let data = await getData();
}
async function sortingKm() {
  container.innerHTML = "";
  let data = await getData();
}
function inc() {
  page = page + 1;
  console.log(page);
  container.innerHTML = "";
  getData();
}
function dec() {
  if (page >= 1) {
    page = page - 1;
  }
  console.log(page);
  container.innerHTML = "";
  getData();
}
async function filter() {
  var selected = document.getElementById("filter").value;
  var data = await getData();
  var newdata = data.filter(function (elem) {
    return elem.category == selected;
  });
  console.log(newdata);
  container.innerHTML = "";
  showData(newdata);
}
let images = [
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75",
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/124027/urban-cruiser-hyryder-exterior-right-front-three-quarter-3.jpeg?isig=0&q=75",
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/127563/new-alto-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
];
function showData(data) {
  let j = 0;
  data.forEach((e, i) => {
    let card = document.createElement("div");
    card.className = "card";
    // -------------------------------
    let top = document.createElement("div");
    top.className = "card-top";

    let img = document.createElement("img");
    img.className = "card-image";

    if (i == 3) {
      j = 0;
    }
    img.src = images[j];

    top.append(img);

    // -------------------------------
    let bottom = document.createElement("div");
    bottom.className = "card-bottom";
    let firstRow = document.createElement("div");
    firstRow.className = "card-firstRow";

    let brand = document.createElement("h3");
    brand.className = "card-brand";
    brand.innerText = e.brand;

    let edit = document.createElement("img");
    edit.className = "card-wish";
    edit.addEventListener("click", editAd(e));
    edit.alt = "edit";
    edit.src = "https://cdn-icons-png.flaticon.com/512/420/420140.png";

    let deleteItem = document.createElement("img");
    deleteItem.className = "card-wish";
    deleteItem.addEventListener("click", deleteAd(e));
    deleteItem.alt = "delete";
    deleteItem.src = "https://cdn-icons-png.flaticon.com/512/6861/6861362.png";

    firstRow.append(brand, edit, deleteItem);

    let type = document.createElement("p");
    type.className = "card-type";
    type.innerText = e.type;

    let lastRow = document.createElement("div");
    lastRow.className = "card-lastRow";

    let price = document.createElement("p");
    price.className = "card-price";
    price.innerText = `Rs. ${e.Price}`;

    let description = document.createElement("p");
    description.className = "card-description";
    description.innerText = e.Description;

    let wish = document.createElement("img");
    wish.className = "card-wish";
    wish.addEventListener("click", addWish(e));
    wish.alt = "like";
    wish.src = "https://cdn-icons-png.flaticon.com/512/4051/4051800.png";

    lastRow.append(price, description, wish);
    bottom.append(firstRow, type, lastRow);
    // -------------------------------
    card.append(top, bottom);
    container.append(card);
    j++;
  });
}
let addWish = async (e) => {
  try {
    let add_wish = JSON.stringify(e);
    let res = await fetch(
      "https://caradapi.herokuapp.com/api/wishlisted_cars",
      {
        method: "POST",
        body: add_wish,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let data = await res.json();
    console.log("data:", data);
  } catch (error) {
    console.log("error:", error);
  }
};
function editAd(e) {
  document.getElementById("brand").value = e.brand;
  document.getElementById("year").value = e.year;
  document.getElementById("type").value = e.type;
  document.getElementById("km").value = e.km;
  document.getElementById("description").value = e.description;
  document.getElementById("price").value = e.price;
}
function deleteAd(data, e) {
  return data.filter((i) => e.id !== i);
}
