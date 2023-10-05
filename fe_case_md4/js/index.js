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
                <p class="text-right">${p.purchase} purchased</p>
                <a href="" class="cat-img position-relative overflow-hidden mb-3">
                    <img class="img-fluid" src="../src/main/resources/static/image/${p.image}" alt="">
                </a>
                <h5 class="font-weight-semi-bold m-0">${p.name}</h5>
                <h5 class="font-weight-semi-bold m-0">${p.price} vnđ</h5>
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

// Example usage:
displayProducts();