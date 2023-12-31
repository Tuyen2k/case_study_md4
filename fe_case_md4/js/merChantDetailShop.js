let arrProduct;
let listDisplayPage;
function checkAccount(){
    console.log(localStorage.getItem("idAcc"))
    console.log(localStorage.getItem("idMer"))
    let indexMerchant = parseInt(localStorage.getItem("idMer"))
    if (!isNaN(indexMerchant)){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/api/products/checkAccUser/" + indexMerchant,
            success: function (data) {
                showMerchantInUser(data)
                localStorage.removeItem("idMer")
            }
        })
    } else {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(localStorage.getItem("account")),
            url: "http://localhost:8080/api/products/checkAccMerchant/",
            success: function (data) {
                showMerchant(data)
            }
        })
    }
}

function showMerchant(data) {
            console.log(data)
            localStorage.setItem("idUpdate", "-1");
            $("#productsStart").show();
            $("#showProductInMerchant").show();
            $("#footPage").show();
            $("#formSave").hide();
            localStorage.setItem("idMerchant", id)
            arrProduct = data;
            listDisplayPage = data.reverse();
            numberPage = 0;
            var content =
                `  <div class="container-fluid py-5">\n` +
                '<button class="btn btn-outline-primary click-to-top"  onclick="formCreate()">Thêm sản phẩm</button>\n' +
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
                '               <div class="d-flex justify-content-center">\n' +
                '                  <h3>' + data[i].price_sale + 'VND</h3><h3 class="text-muted ml-2"><del>' + data[i].price + 'VND</del></h3>\n' +
                '               </div>\n' +
                // `                    <p class="text-dark font-weight-medium mb-0 mr-3">Giá đã giảm :</p>\n` +
                // `                <h3 class="font-weight-semi-bold mb-4">` + data[0].price_sale + `VND</h3>\n` +
                `                <h3 class="font-weight-semi-bold mb-4"><input id="price_sale" type="number" value="${data[0].price_sale}" hidden="hidden">` + data[0].price_sale + `VND</h3>\n` +
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
                `                        <div class="input-group-btn" id="minus_div">\n` +
                //thêm hàm
                `                            <button onclick="minusQuantity()" class="btn btn-primary btn-minus" >\n` +
                `                            <i class="fa fa-minus"></i>\n` +
                `                            </button>\n` +
                `                        </div>\n` +
                `                        <input type="text" class="form-control bg-secondary text-center" id="quantity_p" value="1">\n` +
                //đây là cộng
                `                        <div class="input-group-btn" id="plus_div">\n` +
                //thêm ham
                `                            <button onclick="plusQuantity()" class="btn btn-primary btn-plus">\n` +
                `                                <i class="fa fa-plus"></i>\n` +
                `                            </button>\n` +
                `                        </div>\n` +
                `                    </div>\n` +
                `                    <a href="detail.html" onclick="addToCartInDetail(${data[0].id_product})" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i>Thêm vào giỏ</a>\n` +
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
            showPage()

}
// function showMerchant(id) {
//     $.ajax({
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         type: "GET",
//         url: "http://localhost:8080/api/products/showProduct/" + id,
//         success: function (data) {
//             console.log(data)
//             localStorage.setItem("idUpdate", "-1");
//             $("#productsStart").show();
//             $("#showProductInMerchant").show();
//             $("#footPage").show();
//             $("#formSave").hide();
//             localStorage.setItem("idMerchant", id)
//             arrProduct = data;
//             listDisplayPage = data.reverse();
//             numberPage = 0;
//             var content =
//                 `  <div class="container-fluid py-5">\n` +
//                 '<button class="btn btn-outline-primary click-to-top"  onclick="formCreate()">Thêm sản phẩm</button>\n' +
//                 `        <div class="row px-xl-5">\n` +
//                 `            <div class="col-lg-5 pb-5">\n` +
//                 `                <div id="product-carousel" class="carousel slide" data-ride="carousel">\n` +
//                 `                    <div class="carousel-inner border">\n` +
//                 `                        <div class="carousel-item active">\n` +
//                 `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[0].image}" alt="Image">` +
//                 `                        </div>\n` +
//                 `                        <div class="carousel-item">\n` +
//                 `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[1].image}" alt="Image">` +
//                 `                        </div>\n` +
//                 `                        <div class="carousel-item">\n` +
//                 `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[2].image}" alt="Image">` +
//                 `                        </div>\n` +
//                 `                        <div class="carousel-item">\n` +
//                 `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[3].image}" alt="Image">` +
//                 `                        </div>\n` +
//                 `                    </div>\n` +
//                 `                    <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">\n` +
//                 `                        <i class="fa fa-2x fa-angle-left text-dark"></i>\n` +
//                 `                    </a>\n` +
//                 `                    <a class="carousel-control-next" href="#product-carousel" data-slide="next">\n` +
//                 `                        <i class="fa fa-2x fa-angle-right text-dark"></i>\n` +
//                 `                    </a>\n` +
//                 `                </div>\n` +
//                 `            </div>\n` +
//
//
//                 `<div  class="col-lg-7 pb-5">` +
//                 `<h3 class="font-weight-semi-bold">` + data[0].name + `</h3>\n` +
//                 `                <div class="d-flex mb-3">\n` +
//                 `                    <div class="text-primary mr-2">\n` +
//                 `                        <small class="fas fa-star"></small>\n` +
//                 `                        <small class="fas fa-star"></small>\n` +
//                 `                        <small class="fas fa-star"></small>\n` +
//                 `                        <small class="fas fa-star-half-alt"></small>\n` +
//                 `                        <small class="far fa-star"></small>\n` +
//                 `                    </div>\n` +
//                 `                    <small class="pt-1">(` + data[0].view + `)</small>\n` +
//                 `                </div>\n` +
//                 `                <h3 class="font-weight-semi-bold mb-4">` + data[0].price_sale + `VND</h3>\n` +
//                 `                <div class="d-flex mb-3">\n` +
//                 `                    <p class="text-dark font-weight-medium mb-0 mr-3">Loại:</p>\n` +
//                 `                    <form>\n` +
//                 `                        <div class="custom-control custom-radio custom-control-inline">` +
//                 `                            <label for="size-1">` + data[0].category.name + `</label>\n` +
//                 `                        </div>\n` +
//                 `                </div>\n` +
//                 `                <div class="d-flex mb-4">\n` +
//                 `                    <p class="text-dark font-weight-medium mb-0 mr-3">Lượt mua:</p>\n` +
//                 `                    <form>\n` +
//                 `                        <div class="custom-control custom-radio custom-control-inline">` +
//                 `                            <label for="color-1">` + data[0].purchase + `</label>\n` +
//                 `                        </div>\n` +
//                 `                    </form>\n` +
//                 `                </div>\n` +
//                 `               <div class="d-flex mb-4">\n` +
//                 `                    <p class="text-dark font-weight-medium mb-0 mr-3">Trạng thái:</p>\n` +
//                 `                    <form>\n` +
//                 `                        <div class="custom-control custom-radio custom-control-inline">` +
//                 `                            <label for="color-1">Còn</label>\n` +
//                 `                        </div>\n` +
//                 `                    </form>\n` +
//                 `                </div>\n` +
//                 `                <div class="d-flex align-items-center mb-4 pt-2">\n` +
//                 `                    <div class="input-group quantity mr-3" style="width: 130px;">\n` +
//                 //đây là trừ
//                 `                        <div class="input-group-btn">\n` +
//                 `                            <button class="btn btn-primary btn-minus" >\n` +
//                 `                            <i class="fa fa-minus"></i>\n` +
//                 `                            </button>\n` +
//                 `                        </div>\n` +
//                 `                        <input type="text" class="form-control bg-secondary text-center" value="1">\n` +
//                 //đây là cộng
//                 `                        <div class="input-group-btn">\n` +
//                 `                            <button class="btn btn-primary btn-plus">\n` +
//                 `                                <i class="fa fa-plus"></i>\n` +
//                 `                            </button>\n` +
//                 `                        </div>\n` +
//                 `                    </div>\n` +
//                 `                    <button onclick="addToCart()" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i>Thêm vào giỏ</button>\n` +
//                 `                </div>\n` +
//                 `                <div class="d-flex pt-2">\n` +
//                 `                    <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>\n` +
//                 `                    <div class="d-inline-flex">\n` +
//                 `                        <a class="text-dark px-2" href="">\n` +
//                 `                            <i class="fab fa-facebook-f"></i>\n` +
//                 `                        </a>\n` +
//                 `                        <a class="text-dark px-2" href="">\n` +
//                 `                            <i class="fab fa-twitter"></i>\n` +
//                 `                        </a>\n` +
//                 `                        <a class="text-dark px-2" href="">\n` +
//                 `                            <i class="fab fa-linkedin-in"></i>\n` +
//                 `                        </a>\n` +
//                 `                        <a class="text-dark px-2" href="">\n` +
//                 `                            <i class="fab fa-pinterest"></i>\n` +
//                 `                        </a>\n` +
//                 `                    </div>\n` +
//                 `                </div>\n` +
//                 `            </div>\n` +
//                 `        </div>` +
//                 `  </div>`;
//             document.getElementById("showProductInMerchant").innerHTML = content;
//             showPage()
//         }
//     })
// }
function showFootPage() {
    document.getElementById("footPage").innerHTML = `<div style="display: flex;margin-left: 50%" id="footPage">
                     <button class="btn btn-outline-primary click-to-top" id="previous" onclick="previousPage(numberPage)">Previous</button>
                     <span>${numberPage + 1}/${totalPage}</span>
                     <button class="btn btn-outline-primary click-to-top" id="next" onclick="nextPage(numberPage)">Next</button>
                     </div>`
    if (numberPage === 0){
        $("#previous").hide();
    }else if (numberPage === totalPage - 1){
        $("#next").hide();
    }
}

let numberPage;
let totalPage;

function showPage() {
    let data = listDisplayPage;
    let elementPage = 4;
    totalPage = Math.ceil(data.length / elementPage);
    // numberPage;
    //lưu numberPage ra biến Global
    let startPage = (numberPage * elementPage);
    let endPage = ((numberPage + 1) * elementPage);
    let subArr = data.slice(startPage, endPage);
    productsStart(subArr);
    showFootPage();
}


function previousPage(page) {
    numberPage = page - 1;
    upTop()
    showPage();
}

function nextPage(page) {
    numberPage = page + 1;
    upTop()
    showPage();
}

function productsStart(data) {
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
            '<div class="owl-item active col-md-3"">' +
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
            '             <button onclick="updateProduct('+ data[i].id_product +')" class="btn btn-sm text-dark p-0"><svg style="margin-right: 10px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">\n' +
            '  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>\n' +
            '</svg></i>Sửa</button>\n' +
            '             <button onclick="deleteProduct('+ data[i].id_product +')" href="" class="btn btn-sm text-dark p-0"><svg style="margin-right: 10px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n' +
            '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>\n' +
            '  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>\n' +
            '</svg>Xóa</button>\n' +
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

function upTop(){
    window.scroll({
        top: 500,
        left: 0,
        behavior: 'smooth'
    });
}

               //------------------------------------------------------------

function formCreate(){
    $("#showProductInMerchant").hide();
    $("#productsStart").hide();
    $("#footPage").hide();
    $("#formSave").show();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/api/products/getCategory",
        success: function (data) {
            let content = '<h2 style="text-align: center">Thêm sản phẩm</h2>\n' +
                '    <form style="width: 360px; margin: auto"\n' +
                '          enctype="multipart/form-data">\n' +
                '        <div class="mb-3">\n' +
                '            <label style="color: #0f0f0f" for="name" class="form-label">Tên</label>\n' +
                '            <input type="text" class="form-control" id="name" name="name"\n' +
                '                     placeholder="Tên món ăn" required>\n' +
                '        </div>\n' +
                '        <div class="mb-3">\n' +
                '            <label style="color: #0f0f0f" for="price" class="form-label">Giá</label>\n' +
                '            <input type="number" class="form-control" id="price" name="price"\n' +
                '                 placeholder="Price" required>\n' +
                '        </div>\n' +
                '        <div class="mb-3">\n' +
                '            <label style="color: #0f0f0f" for="image" class="form-label">Ảnh</label>\n' +
                '            <input type="file" class="form-control" id="image" name="image"\n' +
                '        </div>\n' +
                '        <div class="mb-3">\n' +
                '            <label style="color: #0f0f0f; margin-top: 15px" class="form-label">Loại sản phẩm</label><br>' +
                '                <select class="form-select" id="category">\n'
                  for (let i = 0; i < data.length; i++) {
                content += '<option value="'+ data[i].id_category +'">'+ data[i].name +'</option>'
                   }
            content +=  '</select>\n' +
                '        </div>\n' +
                '        <button style="border-radius: 5px" onclick="save()" class=" btn btn-primary" type="button">Thêm</button>' +
                '    </form>\n' +
                '    <button style="border-radius: 5px" onclick="showMerchant(1)" class="btn btn-info">Về trang chủ</button>'
            document.getElementById("formSave").innerHTML = content
        }
    })
    event.preventDefault()
}

function formUpdate(oldProduct) {
    $("#showProductInMerchant").hide();
    $("#productsStart").hide();
    $("#footPage").hide();
    $("#formSave").show();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/api/products/getCategory",
        success: function (data) {
            let content = '<h1 style="text-align: center">Sửa sản phẩm</h1>\n' +
                '    <form style="width: 360px; margin: auto"\n' +
                '          enctype="multipart/form-data">\n' +
                '        <div class="mb-3">\n' +
                '            <label for="name" class="form-label">Tên</label>\n' +
                '            <input type="text" class="form-control" id="name" name="name"\n' +
                '                     value="'+(oldProduct ? oldProduct.name : '')+'" placeholder="Tên món ăn" required>\n' +
                '        </div>\n' +
                '        <div class="mb-3">\n' +
                '            <label for="price" class="form-label">Giá</label>\n' +
                '            <input type="number" class="form-control" id="price" name="price"\n' +
                '                    value="'+(oldProduct ? oldProduct.price : '')+'" placeholder="Price" required>\n' +
                '        </div>\n' +
                '        <div class="mb-3">\n' +
                '            <label for="image" class="form-label">Ảnh</label>\n' +
                '            <input type="file" class="form-control" id="image" name="image"\n' +
                '        </div>\n' +
                '        <div class="mb-3">\n' +
                '            <label class="form-label">Loại sản phẩm</label>\n' +
                '            <label>\n' +
                '                <select class="form-select" id="category">\n'
            for (let i = 0; i < data.length; i++) {
                content += '<option value="'+ data[i].id_category +'">'+ data[i].name +'</option>'
            }
              content +=  '</select>\n' +
                '            </label>\n' +
                '        </div>\n' +
                  '    <div class="mb-3">\n' +
                  '      <label for="status" class="form-label">Trạng thái</label>\n' +
                  '      <select class="form-select" id="status">\n' +
                  '        <option value="true">Còn</option>\n' +
                  '        <option value="false">Hết</option>\n' +
                  '      </select>\n' +
                  '    </div>\n' +
                '        <button onclick="save()" class="btn btn-primary" type="button">Save</button>' +
                '    </form>\n' +
                '    <button class="btn btn-info" onclick="showMerchant(1)">Back to list</button>'
            document.getElementById("formSave").innerHTML = content
        }
    })
    event.preventDefault()
}
function save() {
    let product;
    let name = $("#name").val();
    let price = $("#price").val();
    let file = $("#image")[0].files[0];
    let id = parseInt(localStorage.getItem("idUpdate"));
    let category = $("#category").val();
    let status = $("#status").val();
    console.log(category);
    if (file === undefined) {
        file = new File([], "", { type: '' }); // Đảm bảo file là một đối tượng hợp lệ.
    }
    if (id !== -1) {
        if(file.size !== 0){
            product = {
                id_product: id,
                name: name,
                price: +price, // Chuyển đổi price từ string sang number.
                category: {
                    id_category: +category
                },
                status : status
            };
            let formData = new FormData();
            formData.append("product",
                new Blob([JSON.stringify(product)], {type: 'application/json'}));
            formData.append("file", file);

            $.ajax({
                url: "http://localhost:8080/api/products/update",
                type: "POST",
                processData: false,
                contentType: false,
                data: formData,
                success: function () {
                    $("#formSave").hide();
                    alert("Save successfully!");
                    localStorage.setItem("idUpdate", "-1");
                    localStorage.removeItem("idMerchant");
                    showMerchant(1);
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);

                }
            })
            event.preventDefault();
        } else{
        product = {
            id_product: id,
            name: name,
            price: +price, // Chuyển đổi price từ string sang number.
            category: {
                id_category: +category
            },
            image: localStorage.getItem("img"),
            status : status
        }
            let formData = new FormData();
            formData.append("product",
                new Blob([JSON.stringify(product)], {type: 'application/json'}));
            formData.append("file", file);

            $.ajax({
                url: "http://localhost:8080/api/products/update",
                type: "POST",
                processData: false,
                contentType: false,
                data: formData,
                success: function () {
                    $("#formSave").hide();
                    alert("Save successfully!");
                    localStorage.setItem("idUpdate", "-1");
                    localStorage.removeItem("idMerchant");
                    showMerchant(1);
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);

                }
            })
            event.preventDefault();
        }
    } else {
        product = {
            merchant: {
                id_merchant: +localStorage.getItem("idMerchant")
            },
            name: name,
            price: +price, // Chuyển đổi price từ string sang number.
            category: {
                id_category: +category
            }
        };
        let formData = new FormData();
        formData.append("product",
            new Blob([JSON.stringify(product)], {type: 'application/json'}));
        formData.append("file", file);

        $.ajax({
            url: "http://localhost:8080/api/products/create",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            success: function () {
                $("#formSave").hide();
                alert("Create successfully!");
                localStorage.setItem("idUpdate", "-1");
                localStorage.removeItem("idMerchant");
                showMerchant(1);
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);

            }
        })

        event.preventDefault();
    }
}
function updateProduct(id){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8080/api/products/" + id,
        success: function (data) {
            let idProductUpdate = data.id_product
            localStorage.setItem("img", data.image)
            localStorage.setItem("idUpdate", idProductUpdate)
            formUpdate(data)
        }
    })
}

function deleteProduct(id) {
    let comFirmMerchant = confirm("Bạn có chắc chắn xóa sản phẩm không?")
    if (comFirmMerchant) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: `http://localhost:8080/api/products/${id}`,
            type: "DELETE",
            success: function () {
                showMerchant(1)
                alert("Xóa thành công !")
            }
        })
    }
}
//----------------------------user-------------------------

let arrProductInAccUser;
let listDisplayPageInUser;
function showMerchantInUser(data){
        arrProductInAccUser = data;
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
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[0].image}" alt="Image">` +
            `                        </div>\n` +
            `                        <div class="carousel-item">\n` +
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[0].image}" alt="Image">` +
            `                        </div>\n` +
            `                        <div class="carousel-item">\n` +
            `                            <img class="w-100 h-100" src="../src/main/resources/static/image/${data[0].image}" alt="Image">` +
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
            // '                  <h3>' + data[i].price_sale + 'VND</h3><h3 class="text-muted ml-2"><del>' + data[i].price + 'VND</del></h3>\n' +
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

function showFootPageInAccUser() {
    document.getElementById("footPage").innerHTML = `<div style="display: flex;margin-left: 45%" id="footPage">
                     <button class="btn btn-outline-primary click-to-top" id="previous" onclick="previousPageInAccUser(numberPageInUser)">Previous</button>
                     <span>${numberPageInUser + 1}/${totalPageInUser}</span>
                     <button class="btn btn-outline-primary click-to-top" id="next" onclick="nextPageInAccUser(numberPageInUser)">Next</button>
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
    productsStartInAccUser(subArr);
    showFootPageInAccUser();
}


function previousPageInAccUser(page) {
    numberPageInUser = page - 1;
    showPageInUser();
}

function nextPageInAccUser(page) {
    numberPageInUser = page + 1;
    showPageInUser();
}

function productsStartInAccUser(data) {
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








