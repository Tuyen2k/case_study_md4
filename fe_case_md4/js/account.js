class Account {
    id
    name
    email
    address_delivery
    delete
    role
}

function getAllAccount() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/auth",
        success: function (data) {
            console.log(data);
            displayAccount(data);
        }
    })
}

function displayAccount(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content += `<tr>
                          <td class="align-middle">${data[i].name}</td> 
                          <td class="align-middle">${data[i].email}</td>
                          <td class="align-middle">
                            ${data[i].role.name}
                         </td>
                         <td class="align-middle"><button class="btn btn-sm btn-primary" onclick="deleteAccount(${data[i].id})"><i class="fa fa-times"></i></button>
                         </td>
                 </tr>`
    }
    document.getElementById("display_account").innerHTML = content;
}

// function deleteAccount(id){
//     if (confirm("Are you sure?")){
//         $.ajax({
//             type: "DELETE",
//             url: ""
//         })
//     }
// }

function loginAccount(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let account = {
        name : username,
        password : +password
    }
    $.ajax({
        headers:{
            "Access" : "json/application",
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: "http://localhost:8080/api/auth/login",
        data: JSON.stringify(account),
        success: function (data){
            alert("Welcome to "+ data.name)
            localStorage.setItem("account", JSON.stringify(data))
            window.location.href = "index.html"
        },
        error : function (data){
            console.log(data)
            alert("Login unsuccessful. Please check again!")
        }
    })
}

function registerAccount(){
    let username = $("#username").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let confirm_password = $("#confirm_password").val();
    let city = $("#city").val();
    let district = $("#district").val();
    let ward = $("#ward").val();
    let address_detail = $("#address_detail").val();
    let account = {
        name : username,
        email : email,
        password : password,
        confirm_password : confirm_password,
        address_delivery : {
            city : {
                id_city : city
            },
            district : {
                id_district : district
            },
            ward : {
                id_ward : ward
            },
            address_detail : address_detail
        }
    }
    $.ajax({
        headers:{
            "Access" : "json/application",
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: "http://localhost:8080/api/auth/register",
        data: JSON.stringify(account),
        success: function (data){
            alert(data)
            window.location.href = "login.html"
        },
        error : function (data){
            console.log(data)
            alert("Register unsuccessful. Please check again!")
        }
    })
}

function findCityA(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/address/city",
        success: function(data){
            let content = '<select id="city" onchange="findDistrictA()" style="width: 100%" class="select">';
            content += '<option>City</option>';
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id_city}">${data[i].name}</option>`;
            }
            content += "</select>";
            document.getElementById("select_city").innerHTML = content;
        }
    })
}
function findDistrictA(){
    let id_city = document.getElementById("city").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/district${id_city}`,
        success: function(data){
            let content = '<select style="width: 100%" class="select" onchange="findWardA()" id="district">';
            content += '<option>Choice District</option>';
            for (let i = 0; i < data.length; i++) {
                content += '<option value="'+data[i].id_district+'">'+data[i].name+'</option>';
            }
            content += "</select>";
            document.getElementById("select_district").innerHTML = content;
        }
    })
}
function findWardA(){
    let id_district = document.getElementById("district").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/address/ward${id_district}`,
        success: function(data){
            let content = '<select style="width: 100%" class="select" id="ward">';
            content += '<option>Choice Ward</option>';
            for (let i = 0; i < data.length; i++) {
                content += '<option value="'+data[i].id_ward+'">'+data[i].name+'</option>';
            }
            content += "</select>";
            document.getElementById("select_ward").innerHTML = content;
        }
    })
}


