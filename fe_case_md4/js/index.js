$.ajax({
    url: 'http://localhost:8080/api/categories',
    method: 'GET',
    success: function(response) {
        // Update the dropdown menu items with the retrieved data
        var dropdownMenu = $('#navbar-vertical .navbar-nav');
        dropdownMenu.empty(); // Clear existing menu items

        // Loop through the data and create new menu items
        response.forEach(function(category) {
            var menuItem = $('<a>', {
                class: 'nav-item nav-link',
                href: 'http://localhost:8080/api/categories/' + category.id_category,
                text: category.name
            });
            dropdownMenu.append(menuItem);
        });
    },
    error: function(error) {
        console.log(error);
    }
});

function displayProducts() {
    $.ajax({
        url: "http://localhost:8080/api/products/list", // Replace with the URL of your server-side script
        type: "GET", // or "POST" depending on your server-side setup
        dataType: "json", // Specify the expected data type of the response
        success: function (response) {
            let str = "";
            for (const p of response) {
                str += `<div class="col-lg-4 col-md-6 pb-1">
            <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                <p class="text-right">NEW!</p>
                <a href="" class="cat-img position-relative overflow-hidden mb-3">
                    <img class="img-fluid" src="../src/main/resources/static/image/${p.image}" width="500" height="400" alt="">
                </a>
                <h5 class="font-weight-semi-bold m-0">${p.name}</h5>
                <h5 class="font-weight-semi-bold m-0"><input type="number" value="${p.price}" id="price_p_home" hidden="hidden">${p.price} vnđ</h5>
                <h5></h5>
                <div class="d-flex justify-content-between">
                <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
            <a href="#" class="btn btn-sm text-dark p-0" onclick="addToCart(${p.id_product})"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                </div>
            </div>
            
        </div>`;
            }
            document.getElementById("displayProducts").innerHTML = str;
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur during the AJAX request
            console.error(error);
        },
    });
}

displayProducts();

function displaySales() {
    $.ajax({
        url: "http://localhost:8080/api/products/highsales", // Replace with the URL of your server-side script
        type: "GET", // or "POST" depending on your server-side setup
        dataType: "json", // Specify the expected data type of the response
        success: function (response) {
            let str = "";
            for (const p of response) {
                str += `<div class="col-lg-3 col-md-6 col-sm-12 pb-1">
    <div class="card product-item border-0 mb-4">
        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img class="img-fluid w-100" src="../src/main/resources/static/image/${p.image}" width="500" height="400" alt="">
        </div>
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
        <p class="text-right">${p.purchase} purchased</p>
            <h6 class="text-truncate mb-3">${p.name}</h6>
            <div class="d-flex justify-content-center">
                <h6><input type="number" value="${p.price}" id="price_p_home" hidden="hidden">${p.price} vnđ</h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between bg-light border">
            <a href="#" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
            <a href="#" onclick="addToCart(${p.id_product})" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
        </div>
    </div>
</div>`;
            }
            document.getElementById("displaySales").innerHTML = str;
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur during the AJAX request
            console.error(error);
        },
    });
}

displaySales();