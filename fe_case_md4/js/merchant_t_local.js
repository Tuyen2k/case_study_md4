function getAllMerchant() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/merchant/all",
        success: function (data) {
            displayMerchant(data.reverse())
        }
    })
}

function displayMerchant(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content += `<tr> <td class="align-middle">${i + 1}</td> 
                          <td class="align-middle">${data[i].account.name}</td> 
                          <td class="align-middle">${data[i].name}</td> 
                          <td class="align-middle">${data[i].email}</td>
                          <td class="align-middle">${data[i].phone}</td>
                          <td class="align-middle">${data[i].address_shop.city.name}, 
                          ${data[i].address_shop.district.name}, 
                          ${data[i].address_shop.ward.name}, 
                          ${data[i].address_shop.address_detail}</td> 
                          <td class="align-middle">`
        if (data[i].activity.id_activity === 2) {
            content += `<button class="btn btn-sm btn-primary" id="activity" onclick="activity(${data[i].id_merchant}, ${data[i].account.id_account})"><i class="fa fa-check"></i></button>`
        } else if (data[i].activity.id_activity === 1){
            content += `<button class="btn btn-sm btn-primary" id="lock" onclick="lockMerchant(${data[i].id_merchant}, ${data[i].account.id_account})"><i class="fa fa-times"></i></button>`
        }else {
            content += `<button class="btn btn-sm btn-primary" id="lock" onclick="activity(${data[i].id_merchant}, ${data[i].account.id_account})"><i class="fa fa-question-circle"></i></button>`
        }

                          content += `</td>
                          <td class="align-middle">
                          <button class="btn btn-sm btn-primary"><i class="fa fa-times"></i></button>
                          </td>
                          </tr>`

    }
    document.getElementById("display_merchant").innerHTML = content;

}

function activity(id_merchant, id_account){
    let activity = {
        id_activity: 1
    }
    let role = {
        id: 3
    }
    $.ajax({
        headers: {
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: `
        http://localhost:8080/api/merchant/activity/${id_merchant}`,
            data: JSON.stringify(activity),
                success: function () {
            alert("Update successfully!!!")
            getAllMerchant()
        }
    })

    $.ajax({
        headers: {
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: `
        http://localhost:8080/api/auth/up_role/${id_account}`,
        data: JSON.stringify(role),
        success: function () {
            console.log("role sc")
        }
    })
}

function lockMerchant(id_merchant, id_account) {
    let activity = {
        id_activity: 2
    }
    let role = {
        id: 2
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: `http://localhost:8080/api/merchant/activity/${id_merchant}`,
        data: JSON.stringify(activity),
        success: function () {
            alert("Lock merchant successfully!!!")
            getAllMerchant()
        }
    })
    $.ajax({
        headers: {
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: `http://localhost:8080/api/auth/up_role/${id_account}`,
        data: JSON.stringify(role),
        success: function () {
            console.log("role sc")
        }
    })
}
