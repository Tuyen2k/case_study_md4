function display(data) {
    let content = "";
    for (let i  = 0; i < data.length; i++) {
        let idAcc = data[i].account.id_account
        let idMerchant = data[i].id_merchant
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
            `                                <button onclick='showDetail(${idAcc}, ${idMerchant})' href=\"\" class=\"btn btn-sm text-dark p-0\"><i class=\"fas fa-eye text-primary mr-1\"></i>View Detail</button>\n"` +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>"
    }
    document.getElementById("products").innerHTML = content;
}
function showDetail(idAcc, idMerchant) {
    localStorage.setItem("idAcc", idAcc)
    localStorage.setItem("idMer", idMerchant)
    window.location.href = "http://localhost:63342/case_md4/fe_case_md4/detail.html"
}

function getDB() {
    findCity();
    updateDisplayMerchant()
    checkMerchant()
}

let arrProduct;
let listDisplayPage;

function getAllMerchant() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/merchant',
        success: function (data) {
            console.log(data)
            numberPage = 0;
            arrProduct = data;
            listDisplayPage = data.reverse();
            display(data)
            showPageS()
        }
    })
}

let numberPage;
let totalPage;

function showPageS() {
    let data = listDisplayPage;
    let elementPage = 9;
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
    if (numberPage === 0) {
        $("#previous").hide();
    }
    if (numberPage === totalPage - 1) {
        $("#next").hide();
    }
}

function previousPage(page) {
    numberPage = page - 1;
    showPageS();
}

function nextPage(page) {
    numberPage = page + 1;
    showPageS();
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
            id_account: acc.id
        },
        activity: {
            id_activity: 3
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
            let content = `<select id="city" onchange="findDistrict()"  class="select">`;
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
            let content = `<select class="select" onchange="findWard()" id="district">`;
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

let acc = JSON.parse(localStorage.getItem("account"));
let address;

function updateDisplayMerchant() {
    let id = acc.id;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/merchant/account/${id}`,
        success: function (data) {
            $("#nameU").val(`${data.name}`)
            $("#phoneU").val(`${data.phone}`)
            $("#emailU").val(`${data.email}`)
            $("#open_timeU").val(`${data.open_time}`)
            $("#close_timeU").val(`${data.close_time}`)
            $("#address_detailU").val(`${data.address_shop.address_detail}`)
            address = data.address_shop
            localStorage.setItem("img", data.image)
            localStorage.setItem("id_up_merchant", data.id_merchant)
            localStorage.setItem("id_activity_mer", data.activity.id_activity)
            findCityU()
            findDistrictU()
            findWardU()
        }
    })
}


function updateMerchant() {
    let name = $("#nameU").val()
    let phone = $("#phoneU").val()
    let email = $("#emailU").val()
    let open_time = $("#open_timeU").val()
    let close_time = $("#close_timeU").val()
    let city = $("#cityU").val()
    let district = $("#districtU").val()
    let ward = $("#wardU").val()
    let address_detail = $("#address_detailU").val()
    let file = $("#fileU")[0].files[0]
    if (file === undefined) {
        file = new File([], "", undefined)
    }
    let newMerchant = {
        id_merchant: +localStorage.getItem("id_up_merchant"),
        account: {
            id_account: acc.id
        },
        activity: {
            id_activity: +localStorage.getItem("id_activity_mer")
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
        },
        image: localStorage.getItem("img")
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
            alert("Update merchant success!")
            localStorage.removeItem("img")
            localStorage.removeItem("id_up_merchant")
            localStorage.removeItem("id_activity_mer")
            window.location.href = "index.html"
        }
    })
    event.preventDefault()


}

function findCityU() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/address/city",
        success: function (data) {
            let content = `<select id="cityU" onchange="findDistrictU()"  class="select">`;
            content += '<option value="">Choice a city...</option>';
            for (let i = 0; i < data.length; i++) {
                if (data[i].id_city === address.city.id_city) {
                    content += '<option value="' + data[i].id_city + '" selected>' + data[i].name + '</option>';
                    continue
                }
                content += '<option value="' + data[i].id_city + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("select_cityU").innerHTML = content;
        }
    })
}

function findDistrictU() {
    let id_city = $("#cityU").val()
    if (id_city == -1) {
        id_city = address.city.id_city
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/district${id_city}`,
        success: function (data) {
            let content = `<select class="select" onchange="findWardU()" id="districtU">`;
            content += '<option>Choice a district...</option>';
            for (let i = 0; i < data.length; i++) {
                if (data[i].id_district === address.district.id_district) {
                    content += '<option value="' + data[i].id_district + '" selected>' + data[i].name + '</option>';
                    continue
                }
                content += '<option value="' + data[i].id_district + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("select_districtU").innerHTML = content;
        }
    })
}

function findWardU() {
    let id_district = $("#districtU").val()
    if (id_district == -1) {
        id_district = address.district.id_district
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/ward${id_district}`,
        success: function (data) {
            let content = '<select class="select" id="wardU">';
            content += '<option>Choice a ward...</option>';
            for (let i = 0; i < data.length; i++) {
                if (data[i].id_ward === address.ward.id_ward) {
                    content += '<option value="' + data[i].id_ward + '" selected>' + data[i].name + '</option>';
                    continue
                }
                content += '<option value="' + data[i].id_ward + '">' + data[i].name + '</option>';
            }
            content += "</select>";
            document.getElementById("select_wardU").innerHTML = content;
        }
    })
}

function checkMerchant() {
    if (acc !== null) {
        let role = acc.authorities[0].authority
        console.log(role)
        if (role === "ROLE_MERCHANT") {
            $("#from_register").hide()
        } else if (role === "ROLE_USER") {
            $("#form_update_merchant").hide()
        }
    } else {
        $("#merchant").hide()
    }
}

function searchMerchant() {
    let search = $("#search").val()
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/merchant/search/" + search,
        success: function (data) {
            numberPage = 0;
            arrProduct = data;
            listDisplayPage = data.reverse();
            display(data)
            showPageS()
        }
    })
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function searchCategory(id_category){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/merchant/categories/" + id_category,
        success: function (data) {
            console.log(data)
            numberPage = 0;
            arrProduct = data;
            listDisplayPage = data.reverse();
            display(data)
            showPageInUser()
        }
    })
    event.preventDefault();
}

$.getJSON('http://localhost:8080/api/categories', function(response) {
    let dropdownMenu = $('#navbar-vertical .navbar-nav');
    dropdownMenu.empty();

    response.forEach(function(category) {
        let menuItem = $('<a>', {
            class: 'nav-item nav-link',
            text: category.name,
            // href: "shop.html?category=" + category.id_category

        });
        menuItem.click(function (){
            searchCategory(category.id_category)
        })
        dropdownMenu.append(menuItem);
    });
}).fail(function(error) {
    console.log(error);
});
