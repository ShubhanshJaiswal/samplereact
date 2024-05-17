let holdTimeout;
let isHolding = false;

export function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const icon = document.getElementById('eyeIcon');

    if (!isHolding) {
        holdTimeout = setTimeout(() => {
            isHolding = true;
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }, 0); // Reduced delay for quicker response
    }
}

export function cancelToggle() {
    clearTimeout(holdTimeout);
    isHolding = false;
    const passwordInput = document.getElementById('passwordInput');
    const icon = document.getElementById('eyeIcon');
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
}

export function toggleiconVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const icon = document.getElementById('eyeIcon');
    
    if (passwordInput.value) {
        icon.style.display = 'block';
    } else {
        icon.style.display = 'none';
    }
}

// function togglePasswordVisibility() {
//     const passwordInput = document.getElementById('passwordInput');
//     const icon = document.querySelector('.toggle-password');
    
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//         icon.classList.remove('fa-eye');
//         icon.classList.add('fa-eye-slash');
//     } else {
//         passwordInput.type = 'password';
//         icon.classList.remove('fa-eye-slash');
//         icon.classList.add('fa-eye');
//     }
// }