
function getAllMerchant(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/merchant",
        success: function (data){
            displayMerchant(data)
        }
    })
}

function displayMerchant(data){
    let content = "";
    for (let i = 0; i < data.length; i++) {
        content += `<tr> <td class="align-middle">${i + 1}</td> 
                          <td class="align-middle">${data[i].name}</td> 
                          <td class="align-middle">${data[i].email}</td>
                          <td class="align-middle">${data[i].phone}</td>
                          <td class="align-middle">${data[i].address_shop.city.name}, 
${data[i].address_shop.district.name}, ${data[i].address_shop.ward.name}, ${data[i].address_shop.address_detail}</td> 
                      
                         <td class="align-middle"><button class="btn btn-sm btn-primary"><i class="fa fa-check"></i></button>
                         <button class="btn btn-sm btn-primary"><i class="fa fa-times"></i></button>
                         </td>
                          <td class="align-middle">
                         <button class="btn btn-sm btn-primary"><i class="fa fa-times"></i></button>
                         </td>
                 </tr>`
    }
    document.getElementById("display_merchant").innerHTML = content;
}