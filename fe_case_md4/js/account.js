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

function deleteAccount(id){
    if (confirm("Are you sure?")){
        $.ajax({
            type: "DELETE",
            url: ""
        })
    }
}



