var products = [
  {
    id: 1,
    name: "Xiaomai",
    brand: "Xiaomi",
    price: "21,000",
    quantity: 0,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
    consectetur, ante id gravida rutrum, augue odio ultricies
    magna, eu rutrum enim ligula ac risus.`,
    image:
      "https://www.recipesbynora.com/wp-content/uploads/2023/10/Siomai-with-Pork-and-Shrimp-featured-image.jpg",
  },

  {
    id: 2,
    name: "Meowa",
    brand: "Apple",
    price: "87,000",
    quantity: 0,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
    consectetur, ante id gravida rutrum, augue odio ultricies
    magna, eu rutrum enim ligula ac risus.`,
    image:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Q2YXVpcHc1bTJraXNtNTQ1b25yN3UxZGVnZXE5NjgyeGRkb2RoYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YLx7SXuC7CWGFyzC6a/giphy.gif",
  },
  {
    id: 3,
    name: "Ratomobile",
    brand: "RAT",
    price: "37,000",
    quantity: 0,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
    consectetur, ante id gravida rutrum, augue odio ultricies
    magna, eu rutrum enim ligula ac risus.`,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEnfLzDCfH2saJPsv55xKqFMrjzuQXpQQ4Q&s",
  },
  {
    id: 3,
    name: "Ratomobile",
    brand: "RAT",
    price: "37,000",
    quantity: 0,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
    consectetur, ante id gravida rutrum, augue odio ultricies
    magna, eu rutrum enim ligula ac risus.`,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEnfLzDCfH2saJPsv55xKqFMrjzuQXpQQ4Q&s",
  },
];

var cart = [];

function indexProducts() {
  const productList = document.getElementById("productList");

  productList.innerHTML = products
    .map((product) => {
      return `
          <div class="product-card">
            <div class="product-card-image">
              <img
                src="${product.image}"
                alt="Product Image"
                class="product-image"
              />
            </div>
            <div class="product-container">
              <div class="product-details">
                <div class="product-label">
                  <h3>Name:</h3>
                  <p>${product.name}</p>
                </div>
                <div class="product-label">
                  <h3>Brand:</h3>
                  <p>${product.brand}</p>
                </div>
                <div class="product-label">
                  <h3>Price:</h3>
                  <p>${product.price}</p>
                  <p>PHP</p>
                </div>
                <div class="product-label">
                  <h3>Description:</h3>
                  <p>${product.description}</p>
                </div>
              </div>
            <div class="buy-button" data-id="${product.id}">BUY</div>
          </div>
            </div>
        `;
    })
    .join("");
}

indexProducts();

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("buy-button")) {
    const productId = event.target.getAttribute("data-id");
    storeCart(productId);
  }
  if (event.target.classList.contains("remove-button")) {
    const productId = event.target.getAttribute("data-id");
    deleteCart(productId);
  }
});

function storeCart(productId) {
  var selectedProduct = products.find((product) => product.id == productId);
  if (selectedProduct) {
    cart.push(selectedProduct);
    indexCarts();
    indexProducts();
  } else {
    console.error("Product not found!");
  }
}

function deleteCart(productId) {
  cart = cart.filter((item) => item.id != productId);
  indexCarts();
  indexProducts();
  console.log(cart);
}

function indexCarts() {
  const cartList = document.getElementById("cartList");
  let totalPrice = 0;
  const cartMap = {};

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    if (cartMap[item.id]) {
      cartMap[item.id].quantity += 1;
    } else {
      cartMap[item.id] = { ...item, quantity: 1 };
    }
  }

  cartList.innerHTML = Object.values(cartMap)
    .map((cartItem) => {
      totalPrice +=
        parseFloat(cartItem.price.replace(/[^0-9.-]+/g, "")) *
        cartItem.quantity;

      return `
        <div class="cart-card" data-id="${cartItem.id}">
          <div class="cart-card-details">
            <div class="cart-card-img">
              <img src="${cartItem.image}" alt="Logo" class="logo" />
            </div>
            <div class="cart-card-label">
              <div>${cartItem.name}</div>
              <div>${cartItem.price}</div>
            </div>
          </div>
          <div class="cart-card-info">
            <div class="cart-card-quantity">
              <div class="cart-card-quantity-value">${cartItem.quantity}</div>
            </div>
            <div class="cart-card-buttons">
              <div class="cart-card-remove-button" data-id="${cartItem.id}">REMOVE</div>
             <div class="cart-card-add-button" data-id="${cartItem.id}">ADD</div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById(
    "totalPrice"
  ).textContent = `PHP ${totalPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const addButtons = document.querySelectorAll(".cart-card-add-button");
  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      storeCart(id);
      indexCarts();
    });
  });

  const removeButtons = document.querySelectorAll(".cart-card-remove-button");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");

      const quantity = cart.filter((item) => item.id == id).length;

      if (quantity > 1) {
        const indexToRemove = cart.findIndex((item) => item.id == id);
        if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
        }
      } else {
        const indexToRemove = cart.findIndex((item) => item.id == id);
        if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
        }
      }

      indexCarts();
    });
  });
}

indexCarts();

const cartModal = document.getElementById("cartModal");
const openCartBtn = document.getElementById("openCartBtn");
const closeModal = document.getElementById("closeModal");

openCartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  indexCarts();
});

closeModal.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

const slides = document.querySelector(".slides");
const slideCount = document.querySelectorAll(".slide").length;
let index = 0;

function showSlide(i) {
  index = (i + slideCount) % slideCount;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
  showSlide(index + 1);
});

document.querySelector(".prev").addEventListener("click", () => {
  showSlide(index - 1);
});

setInterval(() => {
  showSlide(index + 1);
}, 3000);
