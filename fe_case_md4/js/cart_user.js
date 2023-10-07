let acc = JSON.parse(localStorage.getItem("account"))

function addToCartInDetail(id_product){
    let id_account = acc.id
    let price = $("#price_sale").val();
    let quantity = $("#quantity_p").val();
    let cart_detail = {
        product : {
            id_product : id_product
        },
        status : {
            id_status : 7
        },
        price : price,
        quantity : quantity
    }
    $.ajax({
        headers:{
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: `http://localhost:8080/api/carts/save/${id_account}`,
        data: JSON.stringify(cart_detail),
        success: function (){
            alert("Add to cart success!")
        }
    })
}
function addToCart(id_product){
    let id_account = acc.id
    let price = $("#price_p_home").val();
    let cart_detail = {
        product : {
            id_product : id_product
        },
        status : {
            id_status : 7
        },
        price : price,
        quantity : 1
    }
    $.ajax({
        headers:{
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: `http://localhost:8080/api/carts/save/${id_account}`,
        data: JSON.stringify(cart_detail),
        success: function (){
            alert("Add to cart success!")
        }
    })

}

function plusQuantity(){
    let quantity = $("#quantity_p").val();
    if (quantity >= 0 && quantity < 20){
        $("#quantity_p").val(+quantity + 1);
    }else {
        alert("Quantity max order!")
    }
}
function minusQuantity(){
    let quantity = $("#quantity_p").val();
    if (quantity > 0){
        $("#quantity_p").val(+quantity - 1);
    }else {
        alert("Add product quantity!")
    }
}