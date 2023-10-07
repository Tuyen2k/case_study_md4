let acc = JSON.parse(localStorage.getItem("account"))

function addToCartInDetail(id_product) {
    let id_account = acc.id
    let price = $("#price_sale").val();
    let quantity = $("#quantity_p").val();
    let cart_detail = {
        product: {
            id_product: id_product
        },
        status: {
            id_status: 7
        },
        price: price,
        quantity: quantity
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: `http://localhost:8080/api/carts/save/${id_account}`,
        data: JSON.stringify(cart_detail),
        success: function () {
            alert("Add to cart success!")
        }
    })
}

function addToCart(id_product) {
    let id_account = acc.id
    let price = $("#price_p_home").val();
    let cart_detail = {
        product: {
            id_product: id_product
        },
        status: {
            id_status: 7
        },
        price: price,
        quantity: 1
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: `http://localhost:8080/api/carts/save/${id_account}`,
        data: JSON.stringify(cart_detail),
        success: function () {
            alert("Add to cart success!")
        }
    })

}

function plusQuantity() {
    let quantity = $("#quantity_p").val();
    if (quantity >= 0 && quantity < 20) {
        $("#quantity_p").val(+quantity + 1);
    } else {
        alert("Quantity max order!")
    }
}

function minusQuantity() {
    let quantity = $("#quantity_p").val();
    if (quantity > 0) {
        $("#quantity_p").val(+quantity - 1);
    } else {
        alert("Add product quantity!")
    }
}

function getCartUser() {
    let id_account = acc.id
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/api/carts/user/${id_account}`,
            success: function (data){
                console.log(data)
                displayCartUser(data)
            }
        })
}
getCartUser()
function displayCartUser(data){
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content +=` <tr>
                         <td class="align-middle">${data[i].product.name}</td>
                         <td class="align-middle">${data[i].price} VND</td>
                         <td class="align-middle">
                             <div class="input-group quantity mx-auto" style="width: 100px;">
                                <div class="input-group-btn" onclick="minusQuantityCart(${data[i].id_cartDetail})">
                                    <button class="btn btn-sm btn-primary btn-minus"  >
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                    <input type="text" class="form-control form-control-sm bg-secondary text-center" id="quantity_cart_${data[i].id_cartDetail}" value="${data[i].quantity}">
                                <div class="input-group-btn" onclick="plusQuantityCart(${data[i].id_cartDetail})">
                                        <button class="btn btn-sm btn-primary btn-plus" >
                                            <i class="fa fa-plus"></i>
                                        </button>
                                </div>
                             </div>
                         </td>
                         <td class="align-middle">${data[i].quantity * data[i].price} VND</td>
                         <td class="align-middle">${data[i].product.merchant.name}</td>
                         <td class="align-middle"><button class="btn btn-sm btn-primary" onclick="addBill(${data[i].id_cartDetail})"><i class="fa fa-check"></i></button></td>
                         <td class="align-middle"><button class="btn btn-sm btn-primary" onclick="deleteCart(${data[i].id_cartDetail})"><i class="fa fa-times"></i></button></td>
                    </tr>`
    }
    document.getElementById("cart_user").innerHTML = content
}

function plusQuantityCart(id_cart_detail) {
    let quantity = $(`#quantity_cart_${id_cart_detail}`).val();
    if (quantity >= 0 && quantity < 20) {
        $.ajax({
            type: "POST",
            url:`http://localhost:8080/api/carts/user/update/${id_cart_detail}?quantity=${+quantity + 1}`,
            success: function (data){
                alert(data)
                window.location.href = "cart.html"
            }
        })
    } else {
        alert("Quantity max order!")
    }

}

function minusQuantityCart(id_cart_detail) {
    let quantity = $(`#quantity_cart_${id_cart_detail}`).val();
    if (quantity > 1) {
        $.ajax({
            type: "POST",
            url:`http://localhost:8080/api/carts/user/update/${id_cart_detail}?quantity=${+quantity - 1}`,
            success: function (data){
                alert(data)
                window.location.href = "cart.html"
            }
        })
    } else if (+quantity === 1){
        if (confirm("Quantity reaches 0, the product will be deleted. Are you sure?")){
            $.ajax({
                type: "DELETE",
                url:`http://localhost:8080/api/carts/user/delete/${id_cart_detail}`,
                success: function (data){
                    alert(data)
                    window.location.href = "cart.html"
                }
            })
        }
    }
}

function deleteCart(id_cart_detail){
    if (confirm("Are you sure?")){
        $.ajax({
            type: "DELETE",
            url:`http://localhost:8080/api/carts/user/delete/${id_cart_detail}`,
            success: function (data){
                alert(data)
                window.location.href = "cart.html"
            }
        })
    }
}

function addBill(id_cart_detail){
    let status = {
        id_status : 8
    }
    $.ajax({
        headers : {
            "Content-Type" : "application/json"
        },
        type:"POST",
        url:`http://localhost:8080/api/carts/user/status/${id_cart_detail}`,
        data: JSON.stringify(status),
        success: function (){
            alert("Add bill success!")
        },
        error(er){
            alert(er)
        }
    })
}