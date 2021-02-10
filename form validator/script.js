const form     = document.getElementById('form');
const username = document.getElementById('username');
const email    = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input Error message
function showError(input, message){
 const formControl = input.parentElement;
 formControl.className = 'form-control error';
 const small = formControl.querySelector('small');  
 small.innerText = message;  
}

//Show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

// Email validation
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else{
        showError(input,'Email is not valid');
    }
}

//Check Required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input Length
function checkLength(input, min, max) {
    if(input.value.length  < min ){
        console.log(input.value.length );
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Check Passwords Match
function checkPasswordMatch(input1,input2){
    if(input1.value != input2.value){
        showError(input2, 'Passwords do not match');
    }
}


// Get fieldname 
//Function declarations in JavaScript are
// hoisted to the top of the enclosing function 
//or global scope.  You can use the function
// before you declared it:
// BUT FUNCTION EXPRESSION are NOT HOISTED :p
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
     checkRequired([username , email , password , password2]);
     checkLength(username, 3, 15);
     checkLength(password, 6, 25);
     checkEmail(email);
     checkPasswordMatch(password,password2);
});