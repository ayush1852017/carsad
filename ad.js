let addAd = async () => {
  try {
    let add_data = {
      brand: document.getElementById("brand").value,
      year: document.getElementById("year").value,
      type: document.getElementById("type").value,
      kms: document.getElementById("km").value,
      Description: document.getElementById("description").value,
      Price: document.getElementById("price").value,
    };
    add_data = JSON.stringify(add_data);
    let res = await fetch("https://caradapi.herokuapp.com/api/cars", {
      method: "POST",
      body: add_data,
      headers: {
        "Content-type": "application/json",
      },
    });
    let data = await res.json();
    alert("Car Inforamtion Succesfully posted");
    window.location.href = "index.html";
    console.log("data:", data);
  } catch (error) {
    console.log("error:", error);
  }
};
function verifyUser() {
  // Get the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function clickEvent(first, last) {
  if (first.value.length) {
    document.getElementById(last).focus();
  }
}

document.getElementById("submit").addEventListener("click", async () => {
  let first = document.getElementById("first").value;
  let second = document.getElementById("second").value;
  let third = document.getElementById("third").value;
  let fourth = document.getElementById("fourth").value;

  if (first !== "1" || second !== "2" || third !== "3" || fourth !== "4") {
    alert("Wrong OTP");
  } else {
    addAd();
  }
});

//Reset the data
function resetForm() {
  document.getElementById("productcode").value = "";
  document.getElementById("product").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("perprice").value = "";
}
