function display(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content += "<div class=\"col-lg-4 col-md-6 col-sm-12 pb-1\">\n" +
            `<div class=\"card product-item border-0 mb-4\">\n` +
            `<div class=\"card-header product-img position-relative overflow-hidden bg-transparent border p-0\">\n` +
            `<img class=\"img-fluid w-100\" src="../src/main/resources/static/image/${data[i].image}" alt="">\n` +
            "                            </div>\n" +
            "                            <div class=\"card-body border-left border-right text-center p-0 pt-4 pb-3\">\n" +
            `                            <h6 class=\"text-truncate mb-3\">${data[i].name}</h6>\n` +
            "                                <div class=\"d-flex justify-content-center\">\n" +
            ` <h6 ><p> open : ${data[i].open_time} - ${data[i].close_time}</p></h6>\n` +
            "                                </div>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            <div class=\"card-footer d-flex justify-content-between bg-light border\">\n" +
            "                                <a href=\"\" class=\"btn btn-sm text-dark p-0\"><i class=\"fas fa-eye text-primary mr-1\"></i>View Detail</a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>"
    }
    document.getElementById("products").innerHTML = content;
}

function getDB() {
    findCity();
}
let arrProduct;
let listDisplayPage;
function getAllMerchant() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/merchant',
        success: function (data) {
            numberPage = 0;
            arrProduct = data;
            listDisplayPage = data.reverse();
            display(data)
            showPage()
        }
    })
}
let numberPage;
let totalPage;
function showPage() {
    let data = listDisplayPage;
    let elementPage = 5;
    totalPage = Math.ceil(data.length / elementPage);
    // numberPage;
    //lưu numberPage ra biến Global
    let startPage = (numberPage * elementPage);
    let endPage = ((numberPage + 1) * elementPage);
    let subArr = data.slice(startPage, endPage);
    display(subArr);
    showFootPage();
    console.log(totalPage)
}
function showFootPage() {
    let content = `<div id="footPage">
                     <button class="btn btn-outline-primary" id="previous" onclick="previousPage(numberPage)">Previous</button>
                     <span>${numberPage + 1}/${totalPage}</span>
                     <button class="btn btn-outline-primary" id="next" onclick="nextPage(numberPage)">Next</button>
                     </div>`
    document.getElementById("footPage").innerHTML = content;
    if (numberPage === 0){
        $("#previous").hide();
    }else if (numberPage === totalPage - 1){
        $("#next").hide();
    }
}
function previousPage(page) {
    numberPage = page - 1;
    showPage();
}

function nextPage(page) {
    numberPage = page + 1;
    showPage();
}



function save() {
    let name = $("#name").val()
    let phone = $("#phone").val()
    let email = $("#email").val()
    let open_time = $("#open_time").val()
    let close_time = $("#close_time").val()
    let city = $("#city").val()
    let district = $("#district").val()
    let ward = $("#ward").val()
    let address_detail = $("#address_detail").val()
    let file = $("#file")[0].files[0]
    if (file === undefined) {
        file = new File([], "", undefined)
    }
    let newMerchant = {
        account: {
            id_account: 3
        },
        activity: {
            id_activity: 1
        },
        name: name,
        phone: phone,
        email: email,
        open_time: open_time,
        close_time: close_time,
        address_shop: {
            city: {
                id_city: +city
            },
            district: {
                id_district: +district
            },
            ward: {
                id_ward: +ward
            },
            address_detail: address_detail
        }
    }
    let formData = new FormData();
    formData.append("file", file);
    let merchant = new Blob([JSON.stringify(newMerchant)], {type: 'application/json'});
    formData.append("merchant", merchant);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/merchant",
        data: formData,
        contentType: false,
        processData: false,
        success: function () {
            alert("Register success, waiting for approval!")
            window.location.href = "index.html"
        }
    })
    event.preventDefault()


}

function findCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/address/city",
        success: function (data) {
            console.log(data)
            let content = '<select id="city" onchange="findDistrict()" placeholder="Choice a city..."  class="select">';
            content += '<option value="">Choice a city...</option>';
            for (let i = 0; i < data.length; i++) {
                content += '<option value="' + data[i].id_city + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("select_city").innerHTML = content;
        }
    })
}

function findDistrict() {
    let id_city = document.getElementById("city").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/district${id_city}`,
        success: function (data) {
            let content = '<select class="select" onchange="findWard()" id="district">';
            content += '<option>Choice a district...</option>';
            for (let i = 0; i < data.length; i++) {
                content += '<option value="' + data[i].id_district + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("select_district").innerHTML = content;
        }
    })
}

function findWard() {
    let id_district = document.getElementById("district").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/ward${id_district}`,
        success: function (data) {
            let content = '<select class="select" id="ward">';
            content += '<option>Choice a ward...</option>';
            for (let i = 0; i < data.length; i++) {
                content += '<option value="' + data[i].id_ward + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("select_ward").innerHTML = content;
        }
    })
}

class Address {
    id_address
    city
    district
    ward
    address_detail

    constructor() {
        this.id_address = -1
        this.city = {}
        this.district = {}
        this.ward = {}
        this.address_detail = ""
    }
}

