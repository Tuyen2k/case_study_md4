let arrProductInUser;
let listDisplayPageInUser;
function showMerchantInUser(id)
{$.ajax({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    type: "GET",
    url: "http://localhost:8080/api/products/showProduct/" + id,
    success: function (data) {
        localStorage.setItem("idMerchant", id)
        arrProductInUser = data;
        listDisplayPageInUser = data.reverse();
        numberPageInUser = 0;
        var content =
            `  <div class="container-fluid py-5">\n` +
            `        <div class="row px-xl-5">\n` +
            `            <div class="col-lg-5 pb-5">\n` +
            `                <div id="product-carousel" class="carousel slide" data-ride="carousel">\n` +
            `                    <div class="carousel-inner border">\n` +
            `                        <div class="carousel-item active">\n` +
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[0].image}" alt="Image">` +
            `                        </div>\n` +
            `                        <div class="carousel-item">\n` +
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[1].image}" alt="Image">` +
            `                        </div>\n` +
            `                        <div class="carousel-item">\n` +
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[2].image}" alt="Image">` +
            `                        </div>\n` +
            `                        <div class="carousel-item">\n` +
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[3].image}" alt="Image">` +
            `                        </div>\n` +
            `                    </div>\n` +
            `                    <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">\n` +
            `                        <i class="fa fa-2x fa-angle-left text-dark"></i>\n` +
            `                    </a>\n` +
            `                    <a class="carousel-control-next" href="#product-carousel" data-slide="next">\n` +
            `                        <i class="fa fa-2x fa-angle-right text-dark"></i>\n` +
            `                    </a>\n` +
            `                </div>\n` +
            `            </div>\n` +


            `<div  class="col-lg-7 pb-5">` +
            `<h3 class="font-weight-semi-bold">` + data[0].name + `</h3>\n` +
            `                <div class="d-flex mb-3">\n` +
            `                    <div class="text-primary mr-2">\n` +
            `                        <small class="fas fa-star"></small>\n` +
            `                        <small class="fas fa-star"></small>\n` +
            `                        <small class="fas fa-star"></small>\n` +
            `                        <small class="fas fa-star-half-alt"></small>\n` +
            `                        <small class="far fa-star"></small>\n` +
            `                    </div>\n` +
            `                    <small class="pt-1">(` + data[0].view + `)</small>\n` +
            `                </div>\n` +
            `                <h3 class="font-weight-semi-bold mb-4">` + data[0].price_sale + `VND</h3>\n` +
            `                <div class="d-flex mb-3">\n` +
            `                    <p class="text-dark font-weight-medium mb-0 mr-3">Loại:</p>\n` +
            `                    <form>\n` +
            `                        <div class="custom-control custom-radio custom-control-inline">` +
            `                            <label for="size-1">` + data[0].category.name + `</label>\n` +
            `                        </div>\n` +
            `                </div>\n` +
            `                <div class="d-flex mb-4">\n` +
            `                    <p class="text-dark font-weight-medium mb-0 mr-3">Lượt mua:</p>\n` +
            `                    <form>\n` +
            `                        <div class="custom-control custom-radio custom-control-inline">` +
            `                            <label for="color-1">` + data[0].purchase + `</label>\n` +
            `                        </div>\n` +
            `                    </form>\n` +
            `                </div>\n` +
            `               <div class="d-flex mb-4">\n` +
            `                    <p class="text-dark font-weight-medium mb-0 mr-3">Trạng thái:</p>\n` +
            `                    <form>\n` +
            `                        <div class="custom-control custom-radio custom-control-inline">` +
            `                            <label for="color-1">Còn</label>\n` +
            `                        </div>\n` +
            `                    </form>\n` +
            `                </div>\n` +
            `                <div class="d-flex align-items-center mb-4 pt-2">\n` +
            `                    <div class="input-group quantity mr-3" style="width: 130px;">\n` +
            //đây là trừ
            `                        <div class="input-group-btn">\n` +
            `                            <button onclick="subtractionQuantity()" class="btn btn-primary btn-minus" >\n` +
            `                            <i class="fa fa-minus"></i>\n` +
            `                            </button>\n` +
            `                        </div>\n` +
            `                        <input type="text" class="form-control bg-secondary text-center" id="valueQuantity" value="1">\n` +
            //đây là cộng
            `                        <div class="input-group-btn">\n` +
            `                            <button onclick="additionQuantity()" class="btn btn-primary btn-plus">\n` +
            `                                <i class="fa fa-plus"></i>\n` +
            `                            </button>\n` +
            `                        </div>\n` +
            `                    </div>\n` +
            `                    <button onclick="addToCart()" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i>Thêm vào giỏ</button>\n` +
            `                </div>\n` +
            `                <div class="d-flex pt-2">\n` +
            `                    <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>\n` +
            `                    <div class="d-inline-flex">\n` +
            `                        <a class="text-dark px-2" href="">\n` +
            `                            <i class="fab fa-facebook-f"></i>\n` +
            `                        </a>\n` +
            `                        <a class="text-dark px-2" href="">\n` +
            `                            <i class="fab fa-twitter"></i>\n` +
            `                        </a>\n` +
            `                        <a class="text-dark px-2" href="">\n` +
            `                            <i class="fab fa-linkedin-in"></i>\n` +
            `                        </a>\n` +
            `                        <a class="text-dark px-2" href="">\n` +
            `                            <i class="fab fa-pinterest"></i>\n` +
            `                        </a>\n` +
            `                    </div>\n` +
            `                </div>\n` +
            `            </div>\n` +
            `        </div>` +
            `  </div>`;
        document.getElementById("showProductInMerchant").innerHTML = content;
        showPageInUser()
    }
})
}
// function subtractionQuantity(){
//     let value = $("#valueQuantity")
//     return --value
// }
// function additionQuantity(){
//     let value = $("#valueQuantity")
//     return ++value
// }
function showFootPageInUser() {
    document.getElementById("footPage").innerHTML = `<div style="display: flex;margin-left: 45%" id="footPage">
                     <button class="btn btn-outline-primary click-to-top" id="previous" onclick="previousPageInUser(numberPageInUser)">Previous</button>
                     <span>${numberPageInUser + 1}/${totalPageInUser}</span>
                     <button class="btn btn-outline-primary click-to-top" id="next" onclick="nextPageInUser(numberPageInUser)">Next</button>
                     </div>`
    if (numberPageInUser === 0){
        $("#previous").hide();
    }else if (numberPageInUser === totalPageInUser - 1){
        $("#next").hide();
    }
}

let numberPageInUser;
let totalPageInUser;

function showPageInUser() {
    let data = listDisplayPageInUser;
    let elementPage = 4;
    totalPageInUser = Math.ceil(data.length / elementPage);
    // numberPage;
    //lưu numberPage ra biến Global
    let startPage = (numberPageInUser * elementPage);
    let endPage = ((numberPageInUser + 1) * elementPage);
    let subArr = data.slice(startPage, endPage);
    productsStartInUser(subArr);
    showFootPageInUser();
}


function previousPageInUser(page) {
    numberPageInUser = page - 1;
    showPageInUser();
}

function nextPageInUser(page) {
    numberPageInUser = page + 1;
    showPageInUser();
}

function productsStartInUser(data) {
    var content = '<div class="text-center mb-4">\n' +
        '                       <h2 class="section-title px-5">' +
        '                           <span class="px-2">Có thể bạn sẽ thích</span>' +
        '                       </h2>\n' +
        '                 </div>\n' +
        '                 <div class="row px-xl-5">\n' +
        '                     <div class="col">\n' +
        '                         <div class="owl-carousel related-carousel owl-loaded owl-drag">'+
        '<div class="owl-stage-outer">'
    for (let i = 0; i < data.length; i++) {
        content +=
            '<div class="owl-item active col-md-3">' +
            '<div class="card product-item border-0">\n' +
            '          <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">\n' +
            `             <img class="img-fluid w-100" src="../src/main/resources/static/image/${data[i].image}" alt="image">\n` +
            '          </div>\n' +
            '             <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">\n' +
            '               <h6 class="text-truncate mb-3">' + data[i].name + '</h6>\n' +
            '               <div class="d-flex justify-content-center">\n' +
            '                  <h6>' + data[i].price_sale + 'VND</h6><h6 class="text-muted ml-2"><del>' + data[i].price + 'VND</del></h6>\n' +
            '               </div>\n' +
            '             </div>\n' +
            '          <div class="card-footer d-flex justify-content-between bg-light border">\n' +
            '             <button href="#" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>Xem</button>\n' +
            '             <button href="#" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Thêm vào giỏ</button>\n' +
            '          </div>\n' +
            '        </div>'+
            '        </div>'
    }
    content += '</div>\n ' +
        '</div>\n ' +
        '</div>\n ' +
        '</div>\n ' +
        '</div>\n'
    document.getElementById("productsStart").innerHTML = content
}






