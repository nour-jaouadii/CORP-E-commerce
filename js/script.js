// function checkedBox that return true if  checkbox is checked
function checkedBox(id) {
    checkBox = document.getElementById(id);
    let exist = false;
    if (checkBox.checked == true) {
        exist = true;

    }
    return exist;

}
// function displayErrorMessage that display message error
function displayErrorMessage(id, condition, msg, color) {
    if (condition) {
        document.getElementById(id).innerHTML = "";
    } else {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = color;
    }
}

// function pattentNotExist  that return true if pattent not exist
function pattentNotExist(pattent, array) {
    exist = true
    for (let i = 0; i < array.length; i++) {

        if (pattent == array[i].pattent) {
            exist = false;
            break;

        }
    }
    return exist;
}
// function companyNamyNotExist  that return true if companyName not exist

function companyNamyNotExist(companyName, array) {
    exist = true
    for (let i = 0; i < array.length; i++) {

        if (companyName == array[i].CompanyName) {
            exist = false;
            break;

        }
    }
    return exist;
}

// function companyNamyNotExist  that return true if email not exist

function emailNotExist(email, array) {
    exist = true
    for (let i = 0; i < array.length; i++) {

        if (email == array[i].email) {
            exist = false;
            break;

        }
    }
    return exist;
}
// function verifLength  that take 2 params(ch,nb) 
function verifLength(ch, nbr) {

    return (ch.length >= nbr);
}
// function verifEmail that check  email 
function verifEmail(email) {
    const regExp = /^(([^<>()[\]\\ .,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}
// function compare that  compare 2 string and return True or false  
function compare(ch, ch1) {
    return (ch == ch1);
}

// *********** customerSignUp  function to add user  into local Storage : users with role = 'user' 
function customerSignUp() {
    let firstName = document.getElementById('fName').value;
    let lastName = document.getElementById('lName').value;
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pwd').value;
    let tel = document.getElementById('tel').value;

    let confirmPwd = document.getElementById('confirmPwd').value;

    // display error
    let isFirstNameValid = verifLength(firstName, 3);
    displayErrorMessage('fNameErrorMsg', isFirstNameValid, 'First Name must have at least 3 characters', 'red');
    let isLastNameValid = verifLength(lastName, 5);
    displayErrorMessage('lNameErrorMsg', isLastNameValid, 'last Name must have at least 3 characters', 'red');

    let isPwdValid = verifLength(pwd, 8);
    displayErrorMessage('pwdErrorMsg', isPwdValid, 'password not valid', 'red');


    let isEmailValid = verifEmail(email);
    displayErrorMessage('mailErrorMsg', isEmailValid, 'email not valid', 'red');

    let isConfirmPwdMatch = compare(pwd, confirmPwd);
    displayErrorMessage('CpwdErrorMsg', isConfirmPwdMatch, 'pwd not equal cpwd', 'red');   // Get all users from LS by key = users

    // Get all user from local storage by key ='users
    let usersTab = JSON.parse(localStorage.getItem('users') || '[]');

    displayErrorMessage('mailExistErrorMsg', emailNotExist(email, usersTab), 'email exist', 'red');


    // setUser into LS : firstName >=3, lastName>=5, Pwd>=8, email:format Valid, pwd == confirmPwd
    if (isFirstNameValid && isLastNameValid && isPwdValid && isEmailValid && isConfirmPwdMatch && emailNotExist(email, usersTab)) {
        // create user id 

        let idUser = JSON.parse(localStorage.getItem('keyUser') || '1');

        let user = {
            id: idUser,
            fName: firstName,
            lName: lastName,
            email: email,
            pwd: pwd,
            confirmPwd: confirmPwd,
            role: 'user',
            tel: tel
        };

        // increment id
        localStorage.setItem('keyUser', idUser + 1);

        // insert users object into user
        usersTab.push(user);

        // set users array into LS
        localStorage.setItem('users', JSON.stringify(usersTab));

        // vider les input = ''
        let inputValue = document.querySelectorAll('input');
        inputValue.forEach(element => {
            element.value = '';
        });



    } else {
        // alert('Error');
        console.log('error')
    }
}
// *********** end signUp()   *****************************//


//  page login For admin and user *********************************************//
function login() {
    let email = document.getElementById("logEmail").value;

    let pass = document.getElementById("logPassword").value;
    console.log(email); console.log(pass);

    let findUser = search(email, pass);
    console.log('find user ', findUser);
    let rolee = '';
    console.log('find user role =>', role = findUser.role);

    // user is  correct
    if (findUser) {
        if (role == "user") {
            //save user id into local storage
            localStorage.setItem('connectedUserId', findUser.id);


            // go to index.html
            location.replace("./shop.html");
        } else {
            //save user id into local storage
            localStorage.setItem('connectedUserId', findUser.id);

            // go to add admin
            location.replace("./products.html ");

        }


        // go to index.html

    } else {
        document.getElementById('errorMsg').innerHTML = "  please check email/password ";
        document.getElementById('errorMsg').style.color = 'red';
        alert('error')

    }
}

function search(email, pwd) {
    let users = getObjectsFromLS('users');
    let findUser = '';
    for (let i = 0; i < users.length; i++) {

        if (users[i].email == email && users[i].pwd == pwd) {
            findUser = users[i];
            break;
        }

    }
    return findUser;
}

//  AdminSignUp function to add Addmin  into local Storage : users with role = 'admin' 
function adminSignUp() {
    let firstName = document.getElementById('AdminFirstName').value;
    let lastName = document.getElementById('AdminLastName').value;
    let email = document.getElementById('adminEmail').value;
    let pwd = document.getElementById('AdminPwd').value;
    let confirmPwd = document.getElementById('AdminConfirmPwd').value;
    let adresse = document.getElementById('adresse').value;
    let fax = document.getElementById('fax').value;
    let tel = document.getElementById('tel').value;
    let raisonSocial = document.getElementById('raisonSocial').value;
    let pattente = document.getElementById('pattente').value;

    // display error
    let isFirstNameValid = verifLength(firstName, 3);
    displayErrorMessage('fNameAdminErrorMsg', isFirstNameValid, 'First Name must have at least 3 characters', 'red');
    let isLastNameValid = verifLength(lastName, 5);
    displayErrorMessage('lNameAdminErrorMsg', isLastNameValid, 'last Name must have at least 3 characters', 'red');

    let isPwdValid = verifLength(pwd, 8);
    displayErrorMessage('pwdAdminErrorMsg', isPwdValid, 'password not valid', 'red');


    let isEmailValid = verifEmail(email);
    displayErrorMessage('mailAdminErrorMsg', isEmailValid, 'email not valid', 'red');

    let isConfirmPwdMatch = compare(pwd, confirmPwd);
    displayErrorMessage('cPwdAdminErrorMsg', isConfirmPwdMatch, 'pwd not equal cpwd', 'red');   // Get all users from LS by key = users

    // Get all user from local storage by key ='users
    let usersTab = JSON.parse(localStorage.getItem('users') || '[]');

    displayErrorMessage('mailAdminExistErrorMsg', emailNotExist(email, usersTab), 'email exist', 'red');
    let pattenteNotExist = pattentNotExist(pattente, usersTab);
    displayErrorMessage('pattentExistErrorMsg', pattenteNotExist, 'pattent exist', 'red');

    let companyNameyNotExist = companyNamyNotExist(raisonSocial, usersTab);
    displayErrorMessage('companyNameExistErrorMsg', companyNameyNotExist, 'email exist', 'red');

    console.log(companyNameyNotExist);
    // verif if   check box  checked 

    let isValidCHeck = '';
    isValidCHeck = checkedBox('myCheck');
    console.log('checkBox =>', isValidCHeck);
    displayErrorMessage('checkBoxErrorMsg', isValidCHeck, 'you must accept condition', 'red');

    // setUser into LS : firstName >=3, lastName>=5, Pwd>=8, email:format Valid, pwd == confirmPwd
    if (isFirstNameValid && isLastNameValid && isPwdValid && isEmailValid && isConfirmPwdMatch && emailNotExist(email, usersTab) && companyNameyNotExist && pattenteNotExist && isValidCHeck) {
        let idUser = JSON.parse(localStorage.getItem('keyUser') || '1');
        //  create Admin object
        let user = {
            id: idUser,
            fName: firstName,
            lName: lastName,
            email: email,
            adresse: adresse,
            fax: fax,
            tel: tel,
            CompanyName: raisonSocial,
            pattent: pattente,
            pwd: pwd,
            confirmPwd: confirmPwd,
            role: 'admin'

        };

        // let usersTab = JSON.parse(localStorage.getItem('users')  || '[]');
        localStorage.setItem('keyUser', idUser + 1);

        // insert users object into user

        usersTab.push(user);

        // set users array into LS
        localStorage.setItem('users', JSON.stringify(usersTab));

        // vider les input = ''
        let inputValue = document.querySelectorAll('input');
        inputValue.forEach(element => {
            element.value = '';
        });



    } else {
        // alert('Error');
        console.log('error')
        document.getElementById("myCheck").checked = false;

    }
}

// ****************************************
// function checkStock that ckeck if  stock > 10 and return boolean
function checkStock(x) {
    return ((x > 10) && x.length > 0);
}
function checkPrice(x) {
    return ((x >= 0) && x.length > 0);
}
function checkIfNumber(x) {
    return !isNaN(x);
}
function checkName(x) {
    return x.length > 3;
}
function generateOptions() {

    let connectedUserId = getConnectedUserFromLS()
    let categoryTab = JSON.parse(localStorage.getItem('categories') || '[]');
    // console.log(categoryTab, '555555555555');
    let categoryOption = ``
    for (let i = 0; i < categoryTab.length; i++) {
        console.log(categoryOption);
        if (categoryTab[i].userId == connectedUserId) {
            categoryOption += `<option value="${categoryTab[i].name}"> ${categoryTab[i].name} </option>`;
            // console.log(categoryOption, '5555555555555555555555555444444444444');

        }

    }
    // let option = 
    document.getElementById('productCategoryId').innerHTML = categoryOption;
    // console.log(option);
}


//  **********************************************
// function addProduct that add product into products in lS
function addProduct() {
    var name = document.getElementById('productName').value;
    var stock = document.getElementById('productStock').value;
    var price = document.getElementById('productPrice').value;

    var category = document.getElementById('productCategoryId').value;

    //  var discount = document.getElementById('discount').value;
    //  var priceWithD = price * (1 - (discount/100))
    console.log(name);
    console.log(stock);
    console.log(category);


    var isStockValid = checkStock(stock);
    displayErrorMessage('productStockErrorMsg', isStockValid, 'the price must be greater than 10 ', 'red');

    var isNameValid = checkName(name);
    displayErrorMessage('productNameErrorMsg', isNameValid, 'the nameis too short', 'red');
    let isValidPrice = checkPrice(price);
    displayErrorMessage('productPriceErrorMsg', isValidPrice, 'the price must be greater than 0', 'red');

    let idProcuct = JSON.parse(localStorage.getItem('keyProcuct') || '1');


    if (isStockValid) {
        var product = {
            id: idProcuct,
            name: name,
            stock: stock,
            category: category,
            price: price,
            isConfirmed: false,
            //  ref:category,
            //  discount: discount,
            //  price:   price   ,
            //  priceWithDiscount:  priceWithD ,
            userId: getConnectedUserFromLS()
        };
        // Get all products from LS by key = invoice
        let productTab = JSON.parse(localStorage.getItem('products') || '[]');
        // insert product object into productsTab
        productTab.push(product);
        // set products array into LS
        localStorage.setItem('products', JSON.stringify(productTab));
        localStorage.setItem('keyProcuct', idProcuct + 1);


    } else {


        alert("Error");
    }
}

// function CategoryNameNotExist that search category name  exist into localS
function CategoryNameNotExist(name, array) {
    exist = true
    for (let i = 0; i < array.length; i++) {

        if (name == array[i].name) {
            exist = false;
            break;

        }
    }
    return exist;
}

// function addCategory that add category into categories in lS

function addCategory() {

    let cat = document.getElementById('category').value;

    let isCatValid = checkName(cat);

    displayErrorMessage('categoryErrorMsg', isCatValid, 'Name must have at least 3 characters', 'red');

    // get all categoy from LS

    let categoryTable = JSON.parse(localStorage.getItem('categories') || '[]');

    let isCategoryNotExist = CategoryNameNotExist(cat, categoryTable);

    displayErrorMessage('categoryNameErrorMsg', isCategoryNotExist, 'categry Name exist', 'red');

    let idCategory = JSON.parse(localStorage.getItem('keyCategory') || '1');

    // && isCategoryNotExist
    if (isCatValid ) {
        let category = {
            id: idCategory,
            name: cat,
            userId: getConnectedUserFromLS()

        };



        // insert category into categoyTab 

        categoryTable.push(category);
        // set categoyTab into LS
        localStorage.setItem('categories', JSON.stringify(categoryTable))
        localStorage.setItem('keyCategory', idCategory + 1);

    } else {

        alert("Error");
    }

}

//********************* */ products

// function getObjectsFromLS that return all objects from lS by params = key
function getObjectsFromLS(key) {

    return JSON.parse(localStorage.getItem(key) || '[]');

}
// function getConnectedUserFromLS that return connectedUser

function getConnectedUserFromLS() {

    return JSON.parse(localStorage.getItem('connectedUserId') );

}

// function that getUserProducts return user products by (userId, product array)

function getUserProducts(idUser, products) {

    let myProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].userId == idUser && products[i].isConfirmed == true) {

            myProducts.push(products[i]);
        }

    }
    return myProducts;
}

// function displayUserProduct that display all products of user
function displayUserProduct() {

    let productTab = getObjectsFromLS('products');
    let connectedUserId = getConnectedUserFromLS();
    let myproducts = getUserProducts(connectedUserId, productTab);
    let productsDiv = ``;
    if(myproducts.length != 0){
        for (let i = 0; i < myproducts.length; i++) {
            productsDiv += `<div class="col-lg-3 col-md-6">
            <div class="single-product">
                <img class="img-fluid" src="img/product/p1.jpg" alt="">
                <div class="product-details">
                    <h6> ${myproducts[i].name}</h6>
                    <div class="price">
                        <h6>$${myproducts[i].price}</h6>
                        <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">
    
                        <div class="social-info">
                            <span class="ti-bag"></span>
                            <p class="hover-text" onclick="goToDisplay(${myproducts[i].id})"> Display</p>
                        </div>
                         
                        <div  class="social-info">
                            <span class="lnr lnr-heart" ></span>
                 <p class="hover-text"  onclick=' deleteObject(${getObjectPositionById(myproducts[i].id, productTab)}, "products")' >Delete</button>

                        </div>
                        <a href="" class="social-info">
                            <span class="lnr lnr-sync"></span>
                            <p class="hover-text">compare</p>
                        </a>
                        <a href="" class="social-info">
                            <span class="lnr lnr-move"></span>
                            <p class="hover-text">view more</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>`
        }// end for
    }else{
        productsDiv +=`<div class="text-center">
        <h2>No Product</h2>
        </div>`
    }

    
    document.getElementById('products').innerHTML = productsDiv;


}
// function deleteProduct(pos) that delete product by pos
function deleteProduct(pos) {
    let products = getObjectsFromLS('products');
    console.log(products.length);

    products.splice(pos, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
    console.log(pos);
    console.log("product.lengh after delete", products.length);
    alert(pos)

}
// function deleteOrerAndUpdateStock that delete and update product by 3 params(position , productId,qty )
function deleteOrerAndUpdateStock(pos, key,productId,qty) {
    let object = getObjectsFromLS(key);

    object.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(object));
//    Update product stock 
    let products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId ) {
            products[i].stock += Number(qty);
            break;
            
        }
  
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();

}

function  deleteObject(pos, key) {
    let object = getObjectsFromLS(key);

    object.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(object));
    location.reload();

}


// function that change location and save id into LS
function goToDisplay(idProduct) {

    localStorage.setItem('selectedProductId', idProduct);
    location.replace('single-product.html');
}

function getProductIdFromLS() {

    return localStorage.getItem('selectedProductId');

}
// search searchProductById that returns object (product) from local storage
//  used into productInformation and displayEdit
function searchProductById(id) {
    let products = getObjectsFromLS('products');

    let myProduct = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            myProduct = products[i];
            break;
        }
    }
    return myProduct

}
// function productInformation that display product information
// Declarer au niv de la page single-product
function productInformation() {
    let findedProduct = searchProductById(getProductIdFromLS());

    document.getElementById('prName').innerHTML = " Product Name " + findedProduct.name;
    document.getElementById('prPrice').innerHTML = " $" + findedProduct.price;
    document.getElementById('prCategory').innerHTML = " Product Category " + findedProduct.category;
    document.getElementById('prStock').innerHTML = " Product  Stock " + findedProduct.stock;

}

// function displayEditForm that display Edit form after btn click ( abderahmen)

// f displayEdit concerne la page edit afficher les valeur au niveau d'input onclick =>display='block'

function displayEdit() {
    let findedProduct = searchProductById(getProductIdFromLS());

    document.getElementById('editProduct').style.display = 'block';
    // document.getElementById('editPrName').value = findedProduct.name;
    document.getElementById('editPrStock').value = findedProduct.stock;
    document.getElementById('editPrPrice').value = findedProduct.price;
}

// function validatEdit that  update values
function validatEdit() {
    // let name = document.getElementById('editPrName').value;
    let newStock = document.getElementById('editPrStock').value;
    let newPrice = document.getElementById('editPrPrice').value;
    let selectConnectedId = getProductIdFromLS();
    let products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == selectConnectedId) {
            products[i].price = newPrice;
            products[i].stock = newStock;

            break;
        }
    }

    localStorage.setItem('products', JSON.stringify(products));
    console.log(findedProduct);
}

// super admin page ***************************** 
// function isConfirmedProduct that display button confirm if product not confirmed
function isConfirmedProduct(products){
   return products.isConfirmed == false ? `<button  class="btn btn-primary" onclick="confirmProduct(${products.id})" >confirme</button>` : '';
// let btn = '';
// //    if ( products.isConfirmed == false) {
// //     return btn = <button  class="btn btn-primary" onclick="confirmProduct()" >confirme</button>;
// //    }
}
// function generateProductsTable that display all products 
function generateProductsTable() {

    // get all products
    let products = getObjectsFromLS('products');
    block = '';
    for (let i = 0; i < products.length; i++) {
        block += `
        <tr>
        <th scope="row">${products[i].id}</th>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].stock}</td>
        <td>
        <div>
          <button  class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>`
        //   ici
        block += isConfirmedProduct(products[i]);
        block += `
        </div>

        </td>

      </tr>
        `;


    }
    document.getElementById('block').innerHTML = block;


}
// function generateProductsTable that display all users 
function generateUsersTable() {

    // get all products
    let  users = getObjectsFromLS('users');
    blockUsers = '';
    function CompanyNameUndifined(users) {
        return  users.CompanyName == "undefined" ? '<td>null</td>' : `<td>${users.CompanyName}</td>`;

    }
    for (let i = 0; i < users.length; i++) {
        blockUsers += `
        <tr>
        <th scope="row">${users[i].id}</th>
        <td>${users[i].fName}</td>
        <td>${users[i].lName}</td>
        <td>${users[i].email}</td>
        <td>${users[i].pwd}</td>
        <td>${users[i].role}</td>`
       
        blockUsers += CompanyNameUndifined(users[i]) ;


        blockUsers += `</tr>`


    }
    document.getElementById('blockUsers').innerHTML = blockUsers;


}
// function confirmProduct that alows admin to change status of product
function confirmProduct(id) {
    let products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].isConfirmed = true;
            break;
        }

    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();  

}
// function displayShop that display all products into shop

function displayShop() {
    let products = getObjectsFromLS('products');

    let shopDiv = ``;
    if (products.length != 0) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].isConfirmed == true) {
    
    
                shopDiv += `<div class="col-lg-3 col-md-6">
            <div class="single-product">
                <img class="img-fluid" src="img/product/p1.jpg" alt="">
                <div class="product-details">
                    <h6> ${products[i].name}</h6>
                    <div class="price">
                        <h6>$${products[i].price}</h6>
                        <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">
    
                        <div class="social-info">
                            <span class="ti-bag"></span>
                            <p class="hover-text" onclick="goToDisplay(${products[i].id})"> Display</p>
                        </div>
                        <div class="social-info">
                            <span class="lnr lnr-heart"></span>
                            <p class="hover-text" onclick="addToWishlist(${products[i].id})">wishlist</p>
                        </div>
                                   
                       
                    </div>
                </div>
            </div>
        </div>`
            }
        }
    }else{
        shopDiv +=`<div class="text-center">
        <h2>No Product</h2>
        </div>`
    }
    
    document.getElementById('shop').innerHTML = shopDiv;

}
// function searchUserById that display user by iD
function searchUserById(id) {

    let users = getObjectsFromLS('users');
    let user = "";
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }
    return user;
}
// function hide Reserve Button when user isn't logged  and display Reserve Button when user is logged 

function hideReserveButton(){
    let connectedUserId = getConnectedUserFromLS();

    if(connectedUserId){
       return `<button class="btn btn-warning"  onclick="reserveProduct()"  >Reserve product</button>`;

    }else{
        return `<button class="btn btn-warning" onclick="goToIndex()"   > Create an account</button>`;
   
    }

}
// goToIndex 
function goToIndex(){
    location.replace('../index.html')
}
// function displayProductInfoUserRole that display  product info by user role 'admin' or 'user'
function displayProductInfoUserRole() {

    let connectedUserId = getConnectedUserFromLS();
    findedUser = searchUserById(connectedUserId);
    console.log(findedUser.role);
    let productInfoBloc = ``
    if (findedUser.role == 'admin') {
        productInfoBloc += `<div class="s_product_text">
    <h3 id="prName"></h3>
    <h2 id="prPrice"></h2>
    <ul class="list">
        <li><a class="active" href="#"><span id="prCategory"></span></a></li>
        <li><a href="#"><span>Availibility</span> : In Stock</a></li>
    </ul>
    <h4 id="prStock"></h4>
    <button class="btn btn-warning" onclick="displayEdit()">Edit product</button>

</div>`
    } else {
        productInfoBloc += `<div class="s_product_text">
        <h3 id="prName"></h3>
        <h2 id="prPrice"></h2>
        <ul class="list">
            <li><a class="active" href="#"><span id="prCategory"></span></a></li>
            <li><a href="#"><span>Availibility</span> : In Stock</a></li>
        </ul>
        <h4 id="prStock"></h4>
       <div>
       <input type="number" class="form-control" placeholder="Quantity" name="" id="reservePr">
        <br>`
        productInfoBloc += hideReserveButton();
        productInfoBloc += `<div id='notAvailableError' > </div><div id='isEqualZero' > </div>
       </div>
    
    </div>`
    } 7
    document.getElementById("productInfo").innerHTML = productInfoBloc;
}

// function reserveProduct that create order
function reserveProduct() {
    let selectedProductId = getProductIdFromLS();
    let reservePr = document.getElementById('reservePr').value;
    let findedProduct = searchProductById(selectedProductId);

    console.log(reservePr > 0);
    console.log(reservePr.length != 0 ,'reservePr.length');  
    console.log(typeof (parseInt(reservePr)));
    let isNotAvailable = parseInt((findedProduct.stock)) >= parseInt(reservePr) ;
    displayErrorMessage('notAvailableError', isNotAvailable,'stock is must be greater than zero> 0','red');
    // let isNotEqualZero = reservePr > 0;
    // displayErrorMessage('isEqualZero', isequalZero,'choose a value > 0','red');
    if (isNotAvailable  && reservePr.length != 0) {
        let idOrder = JSON.parse(localStorage.getItem('keyOrder') || '1');
        let ordersTab = JSON.parse(localStorage.getItem('orders') || '[]');

        
        console.log('u can reserve product ');
        // create order object
        let order = {
            id: idOrder,
            qty: reservePr,
            userId: getConnectedUserFromLS(),
            productId: selectedProductId,
            status:false
        }

        // increment id
        localStorage.setItem('keyOrder', idOrder + 1);

        // insert users object into user
        ordersTab.push(order);

        // set users array into LS

        localStorage.setItem('orders', JSON.stringify(ordersTab));
        // updateProductStock that update stock of product by : qty 
        updateProductStock(selectedProductId, reservePr);

        location.replace("./basket.html");

    } else {
        // document.getElementById('notAvailableError').innerHTML = 'stock is not available ';
        // document.getElementById('notAvailableError').style.color = 'red';
        alert('stock is not available');

    }


}

// updateProductStock that update stock of product by : qty 
function updateProductStock(id, qty) {
    let products = getObjectsFromLS('products');

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].stock = Number(products[i].stock) - Number(qty);
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}

// function userOrders(orders, userIdParam) that display all orders of user
function userOrders(orders, userIdParam) {
    let myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId == userIdParam) {
            myOrders.push(orders[i]);
        }
    }
    return myOrders;
}
//  function that returns position of order into orders
function getObjectPositionById(id, object) {
    let pos;

    for (let i = 0; i < object.length; i++) {
        if (object[i].id == id) {
            pos = i;
            break;
        }
    }
    return pos;
}


//  basket function that dislay all user order into basket page
function basket() {
    let orders = getObjectsFromLS('orders');
    let myOrders = userOrders(orders, getConnectedUserFromLS());
    let subTotal = 0;
    let bloc =  ``
         
    if (myOrders.length == 0) {
					
        bloc =  `<div class="text-center">
        <h2>No reserved Product</h2>
        </div>`
         
    }else{
        bloc = `<thead> 
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
    
        </tr>
    </thead>
    <tbody >`;
        for (let i = 0; i < myOrders.length; i++) {
        
            let total = (searchProductById(myOrders[i].productId).price) * (myOrders[i].qty)
            subTotal += total;
    
            bloc += `<tr>
            <td>
                <div class="media">
                    <div class="d-flex">
                        <img src="img/cart.jpg" alt="">
                    </div>
                    <div class="media-body">
                        <p>${searchProductById(myOrders[i].productId).name}</p>
                    </div>
                </div>
            </td>
            <td>
            <h5>${searchProductById(myOrders[i].productId).price}</h5>
            <h5></h5>
    
            </td>
            <td>
                <h5>${myOrders[i].qty}</h5>
            </td>
            <td>
                <h5>${total}</h5>
            </td>`
        if(myOrders[i].status){
            bloc +=  `<td>                                                      
            <button class="btn btn-danger" onclick=' deleteOrerAndUpdateStock(
                ${getObjectPositionById(myOrders[i].id, orders)},
                 "orders",
                 ${myOrders[i].productId},
                 ${myOrders[i].qty}
                 )' 
                 >Delete</button>
        </td>`
         }else{
           bloc +=   `
            <td> order is validated ! </td>`;

         }
        bloc +=   `</tr>`
    
        }
        bloc +=
            `<tr>
        <td>
    
        </td>
        <td>
    
        </td>
        <td>
            <h5>SubTotal</h5>
        </td>
        <td>
            <h5>$${subTotal} </h5>
        </td>
    </tr>
    <tr class="shipping_area">
        <td>
    
        </td>
        <td>
    
        </td>
        <td>
            <h5>Shipping</h5>
        </td>
        <td>
                 ${shippingPrice(subTotal)}
       
        </td>  
    </tr>
    <tr class="out_button_area">
        <td>
        </td>
        <td>
    
        </td>
        <td>
    
        </td>
        <td>
            <div class="checkout_btn_inner d-flex align-items-center">
                <a class="primary-btn" href="#">Proceed to checkout</a>
            </div>
        </td>
    </tr>  `  
    }
    
    document.getElementById('basket').innerHTML = bloc;
}
// function shippingPrice that return Free if total price> 300, else 7$
function shippingPrice(price) {

    if (price >= 300) {
        return 'free'
    } else {
        return '7$'
    }
}



// displayUserInfo that display user information into input by  connectedUserId

function displayUserInfo() {
    let connectedUserId = getConnectedUserFromLS();

    let findedUser = searchUserById(connectedUserId);
    console.log(findedUser)

    document.getElementById('fNameUser').value = findedUser.fName;
    document.getElementById('lNameUser').value = findedUser.lName;
    document.getElementById('email').value = findedUser.email;
    document.getElementById('tel').value = findedUser.tel;

}

// function displayEditUser() that display user information after click on button EditUser

function displayEditUser() {

    let connectedUserId = getConnectedUserFromLS();

    let findedUser = searchUserById(connectedUserId);
    console.log(findedUser);
    document.getElementById('editUser').style.display = 'block';

    document.getElementById('fName').value = findedUser.fName;
    document.getElementById('tel').value = findedUser.tel;

    // document.getElementById('lName').value = findedUser.lName;
    // document.getElementById('email').value = findedUser.email;


}
// validatUser that update users 
function validatUser() {
    // let name = document.getElementById('editPrName').value;
    let newName = document.getElementById('fName').value;
    let newTel = document.getElementById('tel').value;
    let selectConnectedId = getConnectedUserFromLS();
    let users = getObjectsFromLS('users');
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == selectConnectedId) {
            users[i].fName = newName;
            users[i].tel = newTel;

            break;
        }
    }

    localStorage.setItem('users', JSON.stringify(users));
}

// function to display Admin orders
function generateOrderTable() {
    //  get connected userId 
    let connectedUserId = getConnectedUserFromLS();
    // get all product of connectedUser Id

    let products = getObjectsFromLS('products')
    let findedProducts = getUserProducts(connectedUserId, products);
    // get all products
    let orders = getObjectsFromLS('orders');
    blockOrder = ``;
    blockOrder += `<table class="table">
    <thead>
      <tr>
        <th scope="col">name</th>
        <th scope="col">Price</th>
        <th scope="col">Qty</th>
        <th scope="col">Total</th>
        <th scope="col">Admin name</th>
        <th scope="col">acheteur name</th>
        <th scope="col">Action</th>

      </tr>
    </thead>
    <tbody  >`
    for (let i = 0; i < orders.length; i++) {
          
        
        for (let j = 0; j < findedProducts.length; j++) {
            
            if (orders[i].productId == findedProducts[j].id) {
                

                let total = ((searchProductById(orders[i].productId).price)) * Number(orders[i].qty)
        

                blockOrder += `<tr>
                <td>
                    <div class="media">
                        <div class="d-flex">
                            <img src="img/cart.jpg" alt="">
                        </div>
                        <div class="media-body">
                            <p>${searchProductById(orders[i].productId).name}</p>
                        </div>
                    </div>
                </td>
                <td>
                <h5>${searchProductById(orders[i].productId).price}</h5>
                <h5></h5>

                </td>
                <td>
                    <div class="product_count">
                    <h5>${orders[i].qty}</h5>
              
                    
                            
                    </div>
                </td>
                <td>
                <h5>${total}</h5>
                </td>
                <td>
                <h5>${searchUserById(searchProductById(orders[i].productId).userId).fName}, ${searchUserById(searchProductById(orders[i].productId).userId).lName}</h5>
                </td>
                <td>
                <h5>${searchUserById(orders[i].userId).fName},${searchUserById(orders[i].userId).lName} </h5>
                
                `;
                if(orders[i].status == false){
                    blockOrder +=   `
                    <td><button class="btn btn-primary"type="submit" onclick="confirmOrder( ${orders[i].id} )">confirm </button> </td>`;

                }else{
                    
                    blockOrder +=   `
                    <td> order is validated ! </td>`;
                }

               
           
            }
        }
    }
    blockOrder += ` </tr> </tbody>   </table>`
    document.getElementById('blockOrder').innerHTML = blockOrder;
}
//  function confirmReserve that  change status of order and hide button delete in basket
function confirmOrder(id) {
    // update order status
    let orders = getObjectsFromLS('orders');
    for (let i = 0; i < orders.length; i++) {
        if(orders[i].id ==  id){
            orders[i].status = true; 
        break;   
        }
    }
    localStorage.setItem('orders', JSON.stringify(orders));
} 


function goToLogin() {
    location.replace('../login.html');
    
}

function logout() {

    localStorage.removeItem('connectedUserId')
    location.reload();
}

// function setHeader
function setHeader() {
    let connectedUserId = getConnectedUserFromLS();
    let orders = getObjectsFromLS('orders');
    let wishlist = getObjectsFromLS('wishlist');
    console.log(connectedUserId);
    let allOrdersUser = userOrders(orders, connectedUserId) ;
    console.log(allOrdersUser ,'userOrders jjno');
    console.log(allOrdersUser.length,'userOrders.length');
    let headerContent = "";
    
    if (connectedUserId ) {
        console.log('user is connected ', connectedUserId);
        let connectedUser = searchUserById(connectedUserId);
        if (connectedUser.role == "admin") {
            headerContent = `
            <ul class="nav navbar-nav menu_nav ml-auto">
              <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item submenu dropdown">
                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                   aria-expanded="false">Products</a>
                  <ul class="dropdown-menu">
                      <li class="nav-item"><a class="nav-link" href="products.html">Products list </a></li>
                      <li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>
                      <li class="nav-item"><a class="nav-link" href="add-category.html">Add Category</a></li>
                    
                     
                  </ul>
              </li>
              <li class="nav-item active"><a class="nav-link" href="store-orders.html">Orders</a></li>
              <li class="nav-item active"><a class="nav-link" href="profile.html">welcome ${connectedUser.fName} ${connectedUser.lName}</a></li>
              <li class="nav-item active"><a class="nav-link"  href="index.html"  onclick='logout()' >logout</a></li>
                           
            </ul>  `
        } else {
            headerContent = `
            <ul class="nav navbar-nav menu_nav ml-auto">
         
                <li class="nav-item"><a class="nav-link" href="shop.html">Shop  </a></li>
                <li class="nav-item"><a class="nav-link" href="basket.html">Basket(${userOrders(orders, connectedUserId).length}) </a></li>
                <li class="nav-item"><a class="nav-link" href="wishlist.html">Whishlist(${userObject(wishlist, connectedUserId).length})</a></li>           
              <li class="nav-item active"><a class="nav-link" href="profile.html">welcome ${connectedUser.fName} ${connectedUser.lName}</a></li>
              <li class="nav-item active"><a class="nav-link"  href="index.html"  onclick='logout()' >logout</a></li>

              
            </ul>  `

        }

    } else {
        console.log('user is not connected')
        headerContent = 
    `
      <ul class="nav navbar-nav menu_nav ml-auto">
             <li class="nav-item"><a class="nav-link" href="index.html">Home  </a></li>
            <li class="nav-item"><a class="nav-link" href="shop.html">Shop  </a></li>
            <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>           
            <li class="nav-item active"><a class="nav-link"  href="login.html"   >login</a></li>
           
                
            <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">SignUp</a>
                <ul class="dropdown-menu">
                    <li class="nav-item"><a class="nav-link" href="sign-up.html">Simple User  </a></li>
                    <li class="nav-item"><a class="nav-link" href="store-signup.html">Admin</a></li>
                </ul>
            </li>
        </ul>
     `
    }
    document.getElementById('navbarSupportedContent').innerHTML = headerContent;
}

function addToWishlist(idProduct) {
    // localStorage.setItem('selectedProductId', idProduct);
    let idWishlist = JSON.parse(localStorage.getItem('keyWishlist') || '1');
    let wishlistTable = getObjectsFromLS('wishlist');
    let connectedUserId = getConnectedUserFromLS()



    let wishlist = {
        id: idWishlist,
        idProduct: idProduct,
        userId: connectedUserId
    }
    // insert wishlist into Tab 

    wishlistTable.push(wishlist);
    // set categoyTab into LS
    localStorage.setItem('wishlist', JSON.stringify(wishlistTable))
    localStorage.setItem('keyWishlist', idWishlist + 1);
    location.replace('../wishlist.html');

}
function displayWishlist() {

    let wishlist = getObjectsFromLS('wishlist');
    let myWishlist = userObject(wishlist, getConnectedUserFromLS());
    let block = ``;
    if (myWishlist.length == 0) {

        block += `<h1 class='center'>No Wishlist Product</h1>`
        document.write('');

    } else {

        block += `
        <thead>
                            <tr>
                                <th scope="col">Product Name </th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">delete</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody >
        `
        for (let i = 0; i < myWishlist.length; i++) {


            let product = searchProductById(myWishlist[i].idProduct);

            block += `
        <tr>
        <th scope="row">${searchProductById(myWishlist[i].idProduct).name}</th>
        <td>${searchProductById(myWishlist[i].idProduct).price}</td>
        <td>${searchProductById(myWishlist[i].idProduct).category}</td>

        <td>

        <button class="btn btn-danger" onclick='deleteObject(${getObjectPositionById(myWishlist[i].id, wishlist)}, "wishlist")' >Delete</button>
        </td>

        <td>
        <button" class="btn btn-success" onclick=' goToDisplay(${product.id})'>Reserve</button>

        </>
    `
        }
        block += `</tbody>`;

    }
    document.getElementById('wish').innerHTML = block;


}

// function that display all object  of user => example: all orders  of user or 
function userObject(object, userIdParam) {
    let myobject = [];
    for (let i = 0; i < object.length; i++) {
        if (object[i].userId == userIdParam) {
            myobject.push(object[i]);
        }
    }
    return myobject;
}

// search page
// function searchByProductName  that  search product by='name '> return list of product
function searchByProductName() {
    let products = getObjectsFromLS("products");
    console.log(products);
    let searchValue = document.getElementById('searchName').value;
    let searchName =  searchValue.toLowerCase();
    console.log('searchName', searchName)
    //    let resultat =[];
    // let resultat = products.find(product =>
      
    //     product.name === searchValue
     
    // );
    // console.log(resultat);
     let filterProduct = products.filter(product =>
      
        product.name ==  searchName
    );
    console.log(filterProduct ,'filterProduct');
    //  return  filterProduct;

    let searchBloc = ``;
    if(filterProduct.length != 0){
        for (let i = 0; i < filterProduct.length; i++) {

            console.log('filterProduct.name',filterProduct[i].name);
            searchBloc += `<div class="col-lg-3 col-md-6">
            <div class="single-product">
                <img class="img-fluid" src="img/product/p1.jpg" alt="">
                <div class="product-details">
                    <h6> ${filterProduct[i].name}</h6>
                    <div class="price">
                        <h6>$${filterProduct[i].price}</h6>
                        <h6 class="l-through">$210.00</h6>
                    </div>
                    <div class="prd-bottom">
    
                        <div class="social-info">
                            <span class="ti-bag"></span>
                            <p class="hover-text" onclick="goToDisplay(${filterProduct[i].id})"> Display</p>
                        </div>
                         
                    
                        </div>
                        <a href="" class="social-info">
                            <span class="lnr lnr-sync"></span>
                            <p class="hover-text">compare</p>
                        </a>
                        <a href="" class="social-info">
                            <span class="lnr lnr-move"></span>
                            <p class="hover-text">view more</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>`
        }// end for
    }else{
        searchBloc +=`<div class="text-center">
        <h2>No Product</h2>
        </div>`
    }
    document.getElementById('blockk').innerHTML = searchBloc;
}

// function displaySearchProduct(){
//     let filterProduct = searchByProductName();
//     let searchBloc = ``;
//     if(filterProduct.length != 0){
//         for (let i = 0; i < filterProduct.length; i++) {

//             console.log('filterProduct.name',filterProduct[i].name);
//             searchBloc += `<div class="col-lg-3 col-md-6">
//             <div class="single-product">
//                 <img class="img-fluid" src="img/product/p1.jpg" alt="">
//                 <div class="product-details">
//                     <h6> ${filterProduct[i].name}</h6>
//                     <div class="price">
//                         <h6>$${filterProduct[i].price}</h6>
//                         <h6 class="l-through">$210.00</h6>
//                     </div>
//                     <div class="prd-bottom">
    
//                         <div class="social-info">
//                             <span class="ti-bag"></span>
//                             <p class="hover-text" onclick="goToDisplay(${filterProduct[i].id})"> Display</p>
//                         </div>
                         
                    
//                         </div>
//                         <a href="" class="social-info">
//                             <span class="lnr lnr-sync"></span>
//                             <p class="hover-text">compare</p>
//                         </a>
//                         <a href="" class="social-info">
//                             <span class="lnr lnr-move"></span>
//                             <p class="hover-text">view more</p>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>`
//         }// end for
//     }else{
//         searchBloc +=`<div class="text-center">
//         <h2>No Product</h2>
//         </div>`
//     }
//     document.getElementById('blockk').innerHTML = searchBloc;
// }
function generateProductsTest() {

    // get all products
    let products = getObjectsFromLS('products');
    block = '';
    for (let i = 0; i < products.length; i++) {
        block += `
        <tr>
        <th scope="row">${products[i].id}</th>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].stock}</td>
        <td>
        <div
        >`
       
        block += ` <input type="checkbox" name="num" id="nour" onclick='pos(${i})'; id=""> `
    //     if (checkedBox(nour)) {

    //    }
       
        //   ici
        block += isConfirmedProduct(products[i]);
        
        block += `
        </div>

        </td>

      </tr>
        `;

        // <button  class="btn btn-danger" onclick="">delete</button>
        // deleteProduct(${i})

    }
    document.getElementById('block').innerHTML = block;
   console.log();

}
function pos(pos){
    let checke =getObjectsFromLS('check')
   
    checke.push(pos);

    localStorage.setItem('check', JSON.stringify(checke) );
  
    return checke;

}


function newDelete(key, key2) {
    let object2 =getObjectsFromLS(key2);
    let object = getObjectsFromLS(key);
    for (let i = 0; i < object2.length; i++) {
        object.splice(object[i], 1);
    }
   
    localStorage.setItem(key, JSON.stringify(object));
    location.reload();

}