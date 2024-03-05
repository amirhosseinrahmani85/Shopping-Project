import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunc.js";

let allProducts = null;
let query = "";
let category = "all";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContant = document.getElementById("products");
const searchButton = document.getElementById("search-button");
const inputBox = document.getElementById("search-input");
const listItem = document.querySelectorAll("li");

const showProducts = (products) => {
  mainContant.innerHTML = "";
  products.forEach((product) => {
    const jsx = `
    
    <div>
      <img alt="${product.title}" src="${product.image}">
      <h4>${shortenText(product.title)}</h4>
      <div id="price">
        <P>$ ${product.price}</P>
        <button>
           Buy
           <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
      <div id="rate">
        <i class="fa-solid fa-star"></i>
        <span>${product.rating.rate}</span>
      </div>
      <div id="count">
        <i class="fa-solid fa-user"></i>
        <span>${product.rating.count}</span>
      </div>
    </div>
    
    `;
    mainContant.innerHTML += jsx;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  showProducts(allProducts);
};
const filterProducts = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(query);
    } else {
      return (
        product.title.toLowerCase().includes(query) &&
        product.category.toLowerCase() === category
      );
    }
  });
  showProducts(filteredProducts);
};

const searchHandler = () => {
  query = inputBox.value.trim().toLowerCase();
  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();

  listItem.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });
  filterProducts();
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
listItem.forEach((li) => li.addEventListener("click", filterHandler));
