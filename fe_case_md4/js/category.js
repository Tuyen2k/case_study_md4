function fetchData(url, method, successCallback, errorCallback) {
    $.ajax({
        url: url,
        method: method,
        success: successCallback,
        error: errorCallback
    });
}

function show() {
    fetchData(
        'http://localhost:8080/api/categories',
        'GET',
        function (response) {
            let str = "";
            let count = 0;
            for (const c of response) {
                str += ` <tr>
                  <td>${c.name}</td>
                  <td><button type="button" class="btn btn-primary" onclick="openForm(${c.id_category})" data-toggle="modal" data-target="#modalEdit" style="background-color: #D19C97;">Edit</button></td>
                </tr>`;
            }
            document.getElementById("show").innerHTML = str;
            closeForm();
        },
        function (error) {
            console.log(error);
        }
    );
}

$(document).ready(function () {
    show();
});

function readInputAndCreateCategory() {
    // Read the input value from the "categoryName" variable
    var categoryName = document.getElementById("categoryInput").value;

    // Create an object with the category name
    var category = {name: categoryName};

    // Create an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/categories", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Set up the callback function for when the request is complete
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                // Request is successful, do something
                alert("Category created successfully!");
            } else {
                // Request failed, handle the error
                alert("Failed to create category");
            }
        }
    };

    // Send the AJAX request with the category as JSON data
    xhr.send(JSON.stringify(category));
}

// Add an event listener to the button that triggers the function
var button = document.getElementById("createCategory");
button.addEventListener("click", readInputAndCreateCategory);

function openForm(id) {
    // Fetch the category data based on the id_category
    fetchData(
        'http://localhost:8080/api/categories/' + id,
        'GET',
        function (response) {
            document.getElementById("categoryName").value = response.name;
            document.getElementById("btn_update").value = response.id_category;
            document.getElementById("myForm").style.display = "block";
        },
        function (error) {
            console.log(error);
        }
    );
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
function updateCategory(id){
    let nameUpdate = $("#categoryName").val()
    let category = {
        id_category : +id,
        name : nameUpdate
    }
    $.ajax({
        headers : {
            "Access" : "json/application",
            "Content-Type" : "application/json"
        },
        type: "POST",
        url: "http://localhost:8080/api/categories/update",
        data: JSON.stringify(category),
        success: function (){
            alert("Update success!!!")
            show();
        }
    })
    event.preventDefault();
}


