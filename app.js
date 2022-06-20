let storeItems = [];
let cart = [];
let rate = 0;
let modalBg = document.querySelector(".modal-bg");


//Constructor
function itemStore(id,name,price,qty,max,category,shipping,reviews, description,image) {
    this.id = id,
    this.name = name,
    this.price = price,
    this.qty = qty,
    this.max = max,
    this.category = category,
    this.shipping = shipping,
    this.reviews = reviews,
    this.description = description,
    this.image = image
}


function itemCart(id,name,price,qty,shipping) {
    this.id = id,
    this.name = name,
    this.price = price,
    this.qty = qty,
    this.shipping = shipping
}


function onload () {
    populateStore();
    displayItems();
    time();
    //displayCart();
    document.getElementById("categories").addEventListener("change",displayItems,false);
    document.getElementById("currency").addEventListener("change",displayItems,false);
    document.querySelector(".modal-btn").addEventListener("click", function() {
    modalBg.classList.add('bg-active');
    })
    document.querySelector(".close").addEventListener("click", function() {
        modalBg.classList.remove('bg-active');
    })


}



function displayItems () {
    let category = document.getElementById("categories").value;
    let getCurr = document.getElementById("currency").value;
    switch(getCurr)
    {
        case "CAD":
            rate = 1.0;
            break;
        case "USD":
            rate = 0.72;
            break;
    }
    let container = document.getElementById("container");
    container.innerHTML = "";
    for(let i = 0; i < storeItems.length; i++) {
        if(category === storeItems[i].category|| category === "All") {
            
            let item = document.createElement("div");
            item.classList.add("storeItem");

            let img = document.createElement("div");
            img.classList.add("img");

            let product = document.createElement("img");
            product.src = storeItems[i].image;

            let cool = document.createElement("div");
            cool.classList.add("cool");

            let brandName = document.createElement("div");
            brandName.classList.add("brand-name")

            let name = document.createElement("p");
            name.innerHTML = storeItems[i].name;

            let quantity = document.createElement("input");
            quantity.type="number";

            let review = document.createElement("div");
            review.classList.add("review")

            let reviewBtn = document.createElement("button");
            reviewBtn.classList.add("reviewBtn");
            reviewBtn.innerHTML = "leave review";
            reviewBtn.id = i;
            reviewBtn.value = i;
            reviewBtn.onclick = function () {
                let rvw = prompt("Please Leave Your Review Here");
                leaveReview(id, rvw);
                console.log(id);
                alert(storeItems[i].reviews);
            }

            let desc = document.createElement("div");
            desc.classList.add("description")

            let itemDesc = document.createElement("p");
            itemDesc.innerHTML = storeItems[i].description

            let price = document.createElement("div");
            price.classList.add("price")

            let cost = document.createElement("p");
            cost.innerHTML = "$" + (storeItems[i].price * rate).toFixed(2);
            cost.classList.add("cost");

            let id = i;

            let button = document.createElement("button");
            button.innerText = 'buy';
            button.classList.add('buy');
            button.id = i;
            button.onclick = function() {
                let item = storeItems[id];
                let numItem = parseInt(prompt("How many?"))
                cart.push(new itemCart(item.id, item.name, item.price));
                displayCart(item,numItem);
            }

            item.appendChild(img);
            img.appendChild(product);
            item.appendChild(cool);
            cool.appendChild(brandName);
            brandName.appendChild(name);
            cool.appendChild(review);
            review.appendChild(reviewBtn);
            cool.appendChild(desc);
            desc.appendChild(itemDesc);
            cool.appendChild(price);
            price.appendChild(cost);
            price.appendChild(button);
            container.appendChild(item);
        }
    }
}

function calculateSubtotal() {
    let getCurr = document.getElementById("currency").value;
    switch(getCurr)
    {
        case "CAD":
            rate = 1.0;
            break;
        case "USD":
            rate = 0.72;
            break;
    }
    let subtotal = 0;
    let shipping = 0;
    let calculated = document.querySelector('.subtotal');
    let total = document.getElementsByClassName('total');
    let quantity = document.getElementsByClassName('tdQty').value;
    for(let i = 0; i < total.length; i++) {
        subtotal += parseFloat(total[i].innerHTML);
    }
    calculated.innerHTML = "$" + subtotal.toFixed(2);
}



function displayCart(item,numItem) {
    if(numItem > item.max) {
        alert("Sorry, We don't have much")
    }
    else {
        let getCurr = document.getElementById("currency").value;
        switch(getCurr)
        {
            case "CAD":
                rate = 1.0;
                break;
            case "USD":
                rate = 0.72;
                break;
        }


        let tbody = document.querySelector('tbody');
        let tr = document.createElement('tr');

        let tdId = document.createElement('td');
        tdId.innerText = item.id;
        tdId.classList.add("tdId");
        tdId.id = "tdId";

        let tdName = document.createElement('td');
        tdName.innerText = item.name;

        let tdQty = document.createElement('td');
        let qtyInput = document.createElement('input');
        qtyInput.value = numItem;
        qtyInput.classList.add("tdQty");
        qtyInput.setAttribute("disabled",false)
        qtyInput.id = item.id;

        let minusBtn = document.createElement('button');
        minusBtn.id = item.id;
        minusBtn.classList.add("plus-minus-btn")
        minusBtn.innerText = "-"

        minusBtn.addEventListener("click", function() {
            let qty = document.getElementsByClassName("tdQty");
            for(let i = 0; i < qty.length; i++) {
                if(qty[i].id === minusBtn.id) {
                    let quantity = parseInt(qty[i].value)
                    quantity -= 1;
                    if(quantity < 0) {
                        alert("sorry");
                        
                    }
                    else {
                        qty[i].value = quantity;
                        tdTotal.innerText = (quantity * item.price * rate).toFixed(2);
                        calculateSubtotal()
                    }

                }
            }
        })

        let plusBtn = document.createElement('button');
        plusBtn.id = item.id;
        plusBtn.innerText = "+"
        plusBtn.classList.add("plus-minus-btn")

        plusBtn.addEventListener("click", function() {
            let qty = document.getElementsByClassName("tdQty");
            for(let i = 0; i < cart.length; i++) {
                if(qty[i].id === plusBtn.id) {
                    let parsedID = parseInt(plusBtn.id);
                    console.log(typeof parsedID);
                    let quantity = parseInt(qty[i].value)
                    quantity += 1;
                    if(quantity > item.max) {
                        alert("sorry")
                    }
                    else {
                        qty[i].value = quantity;
                        tdTotal.innerText = (quantity * item.price * rate).toFixed(2);
                        calculateSubtotal()
                    }

                }
            }
        })

        let tdPrice = document.createElement('td');
        tdPrice.innerText = "$" + (item.price * rate).toFixed(2);

        let tdTotal = document.createElement('td');
        tdTotal.innerText = (numItem * item.price * rate).toFixed(2);
        tdTotal.classList.add("total");
        tdTotal.id = "total";

        tbody.appendChild(tr);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQty);
        tdQty.appendChild(minusBtn);
        tdQty.appendChild(qtyInput);
        tdQty.appendChild(plusBtn)
        tr.appendChild(tdTotal);
        calculateSubtotal()
    }
}



function time () {
    let today = new Date(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds(),
        years = today.getFullYear(),
        months = today.getMonth(),
        days = today.getDate();

}

function leaveReview (id,review) {
    storeItems[id].reviews.push(review);
}



function populateStore() {
    storeItems.push(new itemStore(0,"Air Jordan Mid 1",149.99,10,2,"Nike",5.88,["amazing","awesome","comfortable"],"The Air Jordan 1 Mid Shoe is inspired by the first AJ1, offering fans of Jordan retros a chance to follow.","img/jordan1.png"))
    storeItems.push(new itemStore(1,"Puma Suede",99.99,20,5,"Puma",5.88,["amazing","awesome","comfortable"],"The Puma Suede Classic is probably the most famous and popular Puma. Its cool, sporty","img/2.png"))
    storeItems.push(new itemStore(2,"Adidas Superstar",129.99,5,1,"Adidas",5.88,["amazing","awesome","comfortable"],"Originally made for basketball courts in the '70s. Celebrated by hip hop royalty in the '80s.","img/5.png"))
    storeItems.push(new itemStore(3,"Nike Air Max 270",259.99,4,1,"Nike",5.88,["amazing","awesome","comfortable"],"The Nike Air Max 270 combines the exaggerated tongue from the Air Max 180","img/6.png"))
    storeItems.push(new itemStore(4,"Puma CA Pro",149.99,12,2,"Puma",5.88,["amazing","awesome","comfortable"],"The CA range quickly became a cult classic down the years throughout a host of subcultures.","img/10.png"))
    storeItems.push(new itemStore(5,"Adidas Nite",189.99,14,7,"Adidas",5.88,["amazing","awesome","comfortable"],"The Nite Jogger debuted in 1980, when recreational running became a popular pastime.","img/12.png"))
}


// function addCart (event) {
//     let btn = event.target;
//     let s = btn.id;
//     let item = storeItems[s];
//     console.log(s);
//     cart.push(new itemCart(item.id, item.name, item.price));
//     console.log("i");
//     addItemToCart(item)
// }


// function addItemToCart(i) {
//  // add element to cart array
// }


// function displayCart() {
//     let tbody = document.querySelector('tbody');
//     for(let i = 0; i < cart.length; i++) {
//         let tr = document.createElement('tr');
//         let tdID = document.createElement('td');
//         tdID.innerText = cart[i].id;

//         let tdName = document.createElement('td');
//         tdName.innerText = cart[i].name;

//         let tdPrice = document.createElement('td');
//         tdPrice.innerText = cart[i].price;

//         let tdQty = document.createElement('td');
//         tdQty.innerText = cart[i].qty;
//         console.log(tr);

//         tbody.appendChild(tr);
//         tr.appendChild(tdID);
//         tr.appendChild(tdName);
//         tr.appendChild(tdPrice);
//         tr.appendChild(tdQty);
//     }
// }


    // let btnAdd = document.getElementsByClassName('buy');
    // for(let i = 0; i < btnAdd.length; i++) {
    //     let btn = btnAdd[i];
    //     btn.addEventListener('click',addCart)
    // }