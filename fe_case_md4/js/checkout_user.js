let acc = JSON.parse(localStorage.getItem("account"))
let address;

function getAccount() {
    let id_account = acc.id;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/auth/${id_account}`,
        success: function (data) {
            address = data.address_delivery
            displayBillAddress(data);
            findCityB()
            findDistrictB()
            findWardB()
        }
    })
}
getDBBillAddress()
function getDBBillAddress(){
    getAccount()
    getBill()
}

function displayBillAddress(data){
    document.getElementById("bill_address").innerHTML = ` <div class="mb-4" id="bill_address">
                    <h4 class="font-weight-semi-bold mb-4">Billing Address</h4>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>First Name</label>
                            <input class="form-control" type="text" value="${data.name}">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Last Name</label>
                            <input class="form-control" type="text" value="${data.name}">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>E-mail</label>
                            <input class="form-control" type="text" value="${data.email}">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Mobile No</label>
                            <input class="form-control" type="text" value="${data.phone}">
                        </div>
                        <div class="col-md-6 form-group" id="form_city">
                            <label>City</label>
                            <select class="custom-select" id="city">
                                <option value="-1" selected>City</option>
                            </select>
                        </div>
                        <div class="col-md-6 form-group" id="form_district">
                            <label>District</label>
                            <select class="custom-select" id="district">
                                <option value="-1" selected>District</option>
                               
                            </select>
                        </div>
                        <div class="col-md-6 form-group" id="form_ward">
                            <label>Ward</label>
                            <select class="custom-select" id="ward">
                                <option value="-1" selected>Ward</option>
                              
                            </select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Address Detail</label>
                            <input class="form-control" type="text" value="${data.address_delivery.address_detail}">
                        </div>
                       
                        <div class="col-md-12 form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="newaccount">
                                <label class="custom-control-label" for="newaccount">Create an account</label>
                            </div>
                        </div>
                        <div class="col-md-12 form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="shipto">
                                <label class="custom-control-label" for="shipto"  data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
                            </div>
                        </div>
                    </div>
                </div>`
}

function findCityB() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/address/city",
        success: function (data) {
            let content = `<label>City</label>
                                      <select class="custom-select" id="city" onchange="findDistrictB()">
                                      <option value="-1">City</option>`;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id_city === address.city.id_city) {
                    content += '<option value="' + data[i].id_city + '" selected>' + data[i].name + '</option>';
                    continue
                }
                content += '<option value="' + data[i].id_city + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("form_city").innerHTML = content;
        }
    })
}

function findDistrictB() {
    let id_city = $("#city").val()
    if (id_city == -1) {
        id_city = address.city.id_city
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/district${id_city}`,
        success: function (data) {
            let content = `<label>City</label>
                                      <select class="custom-select" id="district" onchange="findWardB()">
                                      <option value="-1">District</option>`;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id_district === address.district.id_district) {
                    content += '<option value="' + data[i].id_district + '" selected>' + data[i].name + '</option>';
                    continue
                }
                content += '<option value="' + data[i].id_district + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("form_district").innerHTML = content;
        }
    })
}

function findWardB() {
    let id_district = $("#district").val()
    if (id_district == -1) {
        id_district = address.district.id_district
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/ward${id_district}`,
        success: function (data) {
            let content = `<label>City</label>
                                      <select class="custom-select" id="ward">
                                      <option value="-1">District</option>`;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id_ward === address.ward.id_ward) {
                    content += '<option value="' + data[i].id_ward + '" selected>' + data[i].name + '</option>';
                    continue
                }
                content += '<option value="' + data[i].id_ward + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("form_ward").innerHTML = content;
        }
    })
}

function getBill(){
    let id_account = acc.id;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/carts/user/${id_account}?status=8`,
        success: function (data){
            if (data.length !== 0){
                $("#order").show()
                displayBill(data)
            }else{
                $("#show_order").hide()
                alert("Bill order is empty!")
            }
        },
        error: function () {
            $("#show_order").hide()
            alert("Bill order is empty!")
        }
    })
}

function displayBill(data){
    let total= 0
    let content =`<h5 class="font-weight-medium mb-3">Products</h5>`;
    for (let i = 0; i < data.length; i++) {
        content +=`<div class="d-flex justify-content-between">
                    <p class="col-md-7">${data[i].product.name}</p>
                    <p class="col-md-4">${data[i].price * data[i].quantity} VND</p>
                    <p class="col-md-1"><button class="btn btn-sm btn-primary" onclick="deleteBill(${data[i].id_cartDetail})">
                    <i class="fa fa-times">
                    </i></button></p>
                    </div>`;
        total += data[i].price * data[i].quantity;
    }
    document.getElementById("show_bill").innerHTML = content
    document.getElementById("total").innerText = total +" VND"
}

function deleteBill(id_cart_detail){
    if (confirm("Are you sure want remove from bill?")){
        let status = {
            id_status : 7
        }
        $.ajax({
            headers: {
                "Content-Type" : "application/json"
            },
            type: "POST",
            url:`http://localhost:8080/api/carts/user/status/${id_cart_detail}`,
            data: JSON.stringify(status),
            success:function (){
                alert("Remove from bill success!")
                window.location.href = "checkout.html"
            }
        })
    }

}

function orderCart(){
    let id_account = acc.id;
    let status = {
        id_status : 1
    }
    $.ajax({
        headers : {
            "Content-Type" : "application/json"
        },
        type:"POST",
        url:`http://localhost:8080/api/carts/user/status/all/${id_account}?status=8`,
        data: JSON.stringify(status),
        success: function (){
            alert("Order success, waiting confirm to merchant!")
            window.location.href = "checkout.html"
        },
        error(er){
            alert(er)
        }
    })
}

window.addEventListener('beforeunload', function(event) {
    let id_account = acc.id;
    let status = {
        id_status : 7
    }
    $.ajax({
        headers : {
            "Content-Type" : "application/json"
        },
        type:"POST",
        url:`http://localhost:8080/api/carts/user/status/all/${id_account}?status=8`,
        data: JSON.stringify(status),
        success: function (){
        }
    })
});