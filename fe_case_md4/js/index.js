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