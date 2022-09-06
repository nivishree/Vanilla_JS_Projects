// const { check } = require("yargs");

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');
const email = document.getElementById('email');


function showError(input, message){
    //show input error message
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const errorMessage = formControl.querySelector('small');
    errorMessage.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        showSuccess(email);
    }else{
        showError(email, 'Email is invalid');
    }
}

function getMessage(item){
    return item.id.charAt(0).toUpperCase() + item.id.slice(1);
}

function validateInput(inputArray){
    inputArray.forEach(function(item){
        if(item.value === ''){
            showError(item, `${getMessage(item)} is required`);
        }else{
            showSuccess(item);
        }
    })

}

function checkConfirmPassword(input, input2){
    if(input.value !== input2.value){
        showError(input2, 'password mismatch')
    }
    else{
        showSuccess(input2);
    }
}
function checkLength(input, min, max){
    if(input.value.length > max){
        showError(input, `${getMessage(input)} should be maximum ${max}`);
    }else if(input.value.length < min){
        showError(input, `${getMessage(input)} should be minimum ${min}`);
    }else{
        showSuccess(input);
    }
}

//Event Listener
form.addEventListener('submit', function(e) {

    e.preventDefault();

    validateInput([username, email, password, confirmPassword]);
    checkLength(username, 3, 29);
    checkLength(password, 5, 10);
    checkEmail(email);
    checkConfirmPassword(password, confirmPassword);
});


