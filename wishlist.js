let images = [
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75",
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/124027/urban-cruiser-hyryder-exterior-right-front-three-quarter-3.jpeg?isig=0&q=75",
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
  "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/127563/new-alto-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
];
async function getData() {
  let res = await fetch(`https://caradapi.herokuapp.com/api/wishlisted_cars`);
  let d = await res.json();

  console.log(d);
  showData(d);
}
getData();

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

    firstRow.append(brand);

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

    lastRow.append(price, description);

    bottom.append(firstRow, type, lastRow);
    // -------------------------------

    card.append(top, bottom);
    container.append(card);
    j++;
  });
}
