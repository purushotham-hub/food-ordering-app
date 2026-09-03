// =====================================
// FOOD DATA
// =====================================

const foods = [

    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        emoji: "🍕",
        description: "Cheesy pizza with fresh tomato."
    },

    {
        id: 2,
        name: "Chicken Pizza",
        category: "Pizza",
        price: 399,
        emoji: "🍕",
        description: "Pizza loaded with chicken."
    },

    {
        id: 3,
        name: "Cheese Burger",
        category: "Burger",
        price: 199,
        emoji: "🍔",
        description: "Juicy burger with cheese."
    },

    {
        id: 4,
        name: "Chicken Burger",
        category: "Burger",
        price: 249,
        emoji: "🍔",
        description: "Crispy chicken burger."
    },

    {
        id: 5,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 299,
        emoji: "🍛",
        description: "Spicy chicken biryani."
    },

    {
        id: 6,
        name: "Mutton Biryani",
        category: "Biryani",
        price: 399,
        emoji: "🍛",
        description: "Traditional mutton biryani."
    },

    {
        id: 7,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 149,
        emoji: "🍰",
        description: "Soft chocolate cake."
    },

    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 99,
        emoji: "🍨",
        description: "Creamy vanilla ice cream."
    }

];


// =====================================
// CART
// =====================================

let cart = [];

let selectedCategory = "All";


// =====================================
// HTML ELEMENTS
// =====================================

const foodContainer =
    document.getElementById("foodContainer");

const searchInput =
    document.getElementById("searchInput");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartPanel =
    document.getElementById("cart");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkout =
    document.getElementById("checkout");


// =====================================
// DISPLAY FOOD
// =====================================

function displayFoods(foodList) {

    foodContainer.innerHTML = "";


    if (foodList.length === 0) {

        foodContainer.innerHTML = `
            <p style="
                text-align:center;
                grid-column:1/-1;
                color:#64748b;
            ">
                No food found 😔
            </p>
        `;

        return;
    }


    foodList.forEach(function(food) {

        const card =
            document.createElement("div");

        card.classList.add("food-card");


        card.innerHTML = `

            <div class="food-image">
                ${food.emoji}
            </div>

            <div class="food-info">

                <h3>
                    ${food.name}
                </h3>

                <p>
                    ${food.description}
                </p>

                <div class="food-bottom">

                    <span class="price">
                        ₹${food.price}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${food.id})"
                    >
                        Add
                    </button>

                </div>

            </div>

        `;


        foodContainer.appendChild(card);

    });

}


// =====================================
// ADD TO CART
// =====================================

function addToCart(id) {

    const food =
        foods.find(function(food) {

            return food.id === id;

        });


    const existing =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...food,

            quantity: 1

        });

    }


    updateCart();

}


// =====================================
// UPDATE CART
// =====================================

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty">

                <h3>
                    Your cart is empty 🛒
                </h3>

                <p>
                    Add some delicious food!
                </p>

            </div>

        `;

    }


    cart.forEach(function(item) {

        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.emoji}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price}
                </p>

                <div class="quantity">

                    <button
                        onclick="decrease(${item.id})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increase(${item.id})"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                onclick="removeItem(${item.id})"
                style="
                    border:none;
                    background:none;
                    cursor:pointer;
                    font-size:18px;
                "
            >
                🗑️
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    updateTotal();

}


// =====================================
// INCREASE QUANTITY
// =====================================

function increase(id) {

    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    if (item) {

        item.quantity++;

    }


    updateCart();

}


// =====================================
// DECREASE QUANTITY
// =====================================

function decrease(id) {

    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        removeItem(id);

        return;

    }


    updateCart();

}


// =====================================
// REMOVE ITEM
// =====================================

function removeItem(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    updateCart();

}


// =====================================
// UPDATE TOTAL
// =====================================

function updateTotal() {

    let total = 0;

    let count = 0;


    cart.forEach(function(item) {

        total +=
            item.price * item.quantity;

        count += item.quantity;

    });


    cartTotal.textContent =
        `₹${total}`;


    cartCount.textContent =
        count;

}


// =====================================
// SEARCH
// =====================================

searchInput.addEventListener(
    "input",
    function() {

        filterFoods();

    }
);


// =====================================
// FILTER FOODS
// =====================================

function filterFoods() {

    const search =
        searchInput.value.toLowerCase();


    const result =
        foods.filter(function(food) {

            const categoryMatch =
                selectedCategory === "All" ||
                food.category === selectedCategory;


            const searchMatch =
                food.name
                    .toLowerCase()
                    .includes(search);


            return categoryMatch && searchMatch;

        });


    displayFoods(result);

}


// =====================================
// CATEGORY BUTTONS
// =====================================

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove("active");

                    }
                );


                button.classList.add("active");


                selectedCategory =
                    button.dataset.category;


                filterFoods();

            }
        );

    }
);


// =====================================
// OPEN CART
// =====================================

cartButton.addEventListener(
    "click",
    function() {

        cartPanel.classList.add("open");

    }
);


// =====================================
// CLOSE CART
// =====================================

closeCart.addEventListener(
    "click",
    function() {

        cartPanel.classList.remove("open");

    }
);


// =====================================
// ORDER NOW
// =====================================

const orderNow =
    document.getElementById("orderNow");


orderNow.addEventListener(
    "click",
    function() {

        document
            .querySelector(".menu")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// =====================================
// CHECKOUT
// =====================================

checkout.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Please add food to your cart first!"
            );

            return;

        }


        alert(
            "🎉 Your order has been placed successfully!"
        );


        cart = [];

        updateCart();

        cartPanel.classList.remove("open");

    }
);


// =====================================
// INITIAL DISPLAY
// =====================================

displayFoods(foods);

updateCart();