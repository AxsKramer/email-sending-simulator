// Variables
const sendBtn = document.querySelector('#sendBtn');
const resetBtn = document.querySelector('#resetBtn');
const form = document.querySelector('#send-mail');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
const spinnerBox = document.querySelector('#spinner-box');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Listeners
document.addEventListener('DOMContentLoaded', initApp);
email.addEventListener('blur', validarform);
subject.addEventListener('blur', validarform);
message.addEventListener('blur', validarform);
form.addEventListener('submit', sendEmail);
resetBtn.addEventListener('click', resetApp);

//Functions
function initApp() {
    sendBtn.disabled = true;
    sendBtn.classList.add('opacity');
}

function validarform(e) {
    if(e.target.value !== '' ) {
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        e.target.classList.remove('alert', 'alert-danger');
        e.target.classList.add('alert', 'alert-success');
    } else {
        e.target.classList.remove('alert', 'alert-success');
        e.target.classList.add('alert', 'alert-danger');
        showError('Todos los campos son obligatorios');
        sendBtn.disabled = true;
        sendBtn.classList.add('opacity');
    }

    if(e.target.type === 'email') {
        if( er.test( e.target.value ) ) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            e.target.classList.remove('alert', 'alert-danger');
            e.target.classList.add('alert', 'alert-success');
        } else {
            e.target.classList.remove('alert', 'alert-success');
            e.target.classList.add('alert', 'alert-danger');
            showError('Email no válido');
        }
    }
    if( er.test( email.value ) && subject.value !== '' && message.value !== '') {
        sendBtn.disabled = false;
        sendBtn.classList.remove( 'opacity')
    }  
}

function showError(message) {
    const messageError = document.createElement('p');
    const errores = document.querySelectorAll('.error');
    messageError.textContent = message;
    messageError.classList.add('alert', 'alert-danger', 'error', 'text-center','text-uppercase', 'font-weight-bold');
    if(errores.length === 0) {
        spinnerBox.appendChild(messageError);
    }
}

function sendEmail(e) {
    e.preventDefault();    
    if( !er.test( email.value ) || subject.value === '' || message.value === ''){
        showError('Algún campo esta vacio');
        sendBtn.disabled = true;
        sendBtn.classList.add( 'opacity')
    }else{
        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'flex';

        setTimeout( () => {
            spinner.style.display = 'none';
            const parrafo = document.createElement('p');
            parrafo.textContent = 'El mensaje se envió correctamente';
            parrafo.classList.add('alert', 'alert-success', 'text-center', 'text-uppercase', 'font-weight-bold' );
            spinnerBox.appendChild(parrafo);

            setTimeout(() => {
                parrafo.remove(); 
                resetApp();
            }, 5000);
        }, 3000 );
    }
}

function resetApp(){
    form.reset();
    initApp();
    email.classList.remove('alert', 'alert-success', 'alert-danger');
    subject.classList.remove('alert', 'alert-success', 'alert-danger');
    message.classList.remove('alert', 'alert-success', 'alert-danger');
    const error = document.querySelector('p.error') ;
    error.remove();
}