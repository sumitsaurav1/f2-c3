async function getMenu(){
    let url = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    appendItems(data)
}

function appendItems(data){
    
    data.forEach((e)=>{
        let div = document.createElement("div");
        div.className="card";
        let img = document.createElement("img");
        img.src=e.imgSrc;
        div.appendChild(img);
        let div1 = document.createElement("div");
        div1.innerText=e.name;
        div.appendChild(div1);
        let div2= document.createElement("div");
        div2.innerText=e.price;
        div.appendChild(div2)
        let button= document.createElement("button");
        button.innerText="Add To Cart";
        div.appendChild(button);
        itemContainer.appendChild(div);
    })
}
let itemContainer = document.getElementById("item-container");

function takeOrder(){
    let items = document.querySelectorAll("#item-container button");
    let newOrder = new Promise((reject,resolve)=>{
        setTimeout(()=>{
            let burgers=[];
            for(let i=0;i<items.length;i++){
                items[i].addEventListener('click',(e)=>{
                    burgers.push(itemContainer.children[i].children[1].innerText)
                    let ul=document.getElementById("order-items")
                    let li  = document.createElement("li");
                    li.innerHTML=itemContainer.children[i]
                    ul.appendChild(li)
                })
            }
            
            let order = {
                burgers:burgers,
                order_status:"Received",
            }
            resolve(order);
        },2500)
    })
}
function orderPrep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Resolve the order with status as prepared and not paid
        const order = {
          order_status: 'Prepared',
          paid: false
        };
        resolve(order);
      }, 1500);
    });
  }
  function payOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Resolve the order with status as prepared and paid
        const order = {
          order_status: 'Prepared',
          paid: true
        };
        resolve(order);
      }, 1000);
    });
  }
  function thankYouFnc() {
    alert('Thank you for eating with us today!');
  }
 
  getMenu()
  .then(() => {
    return takeOrder();
  })
  .then(order => {
    console.log('Order received:', order);
    return orderPrep();
  })
  .then(order => {
    console.log('Order prepared:', order);
    return payOrder();
  })
  .then(order => {
    console.log('Order paid:', order);
    if (order.paid) {
      thankYouFnc();
    }
  })
  .catch(error => console.error(error));
