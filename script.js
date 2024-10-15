const showPasswordCheckbox = document.getElementById("showPassword");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");

if (showPasswordCheckbox && passwordField && confirmPasswordField) {
    showPasswordCheckbox.addEventListener("change", function () {
        const type = this.checked ? "text" : "password";
        passwordField.type = type;
        confirmPasswordField.type = type;
    });
}

if (passwordField) {
    passwordField.addEventListener('input', () => {
        const strength = checkPasswordStrength(passwordField.value);
        updatePasswordStrength(strength);
    });
}

function checkPasswordStrength(password) {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongPasswordPattern.test(password)) {
        return 'Strong';
    } else if (password.length >= 6) {
        return 'Moderate';
    } else {
        return 'Weak';
    }
}

function updatePasswordStrength(strength) {
    const strengthDisplay = document.getElementById('password-strength');
    if (strengthDisplay) {
        strengthDisplay.textContent = `Password Strength: ${strength}`;
        strengthDisplay.style.color = strength === 'Strong' ? '#1DB954' : (strength === 'Moderate' ? '#FFA500' : '#FF0000');
    }
}

const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let slideIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

if (slides.length > 0) {
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => changeSlide(1));
        prevButton.addEventListener('click', () => changeSlide(-1));
    }
    showSlide(slideIndex);
}

function changeSlide(direction) {
    slideIndex = (slideIndex + direction + slides.length) % slides.length;
    showSlide(slideIndex);
}

const stars = document.querySelectorAll('.album-rating .star');

if (stars.length > 0) {
    stars.forEach(star => {
        star.addEventListener('click', () => rateAlbum(star.dataset.rating));
    });
}

function rateAlbum(rating) {
    stars.forEach(star => {
        star.classList.toggle('selected', star.dataset.rating <= rating);
    });
    alert(`You rated this album ${rating} stars!`);
}

let reviewIndex = 0;
const reviewSlider = document.querySelectorAll('.review-slider p');

function slideReviews() {
    if (reviewSlider.length > 0) {
        reviewSlider.forEach((review, index) => {
            review.style.display = index === reviewIndex ? 'block' : 'none';
        });
        reviewIndex = (reviewIndex + 1) % reviewSlider.length;
    }
}

if (reviewSlider.length > 0) {
    setInterval(slideReviews, 5000);
}

const reviewForm = document.querySelector('.add-review form');
if (reviewForm) {
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitReview(this);
    });
}

function submitReview(form) {
    const reviewText = form.querySelector('input').value.trim();
    if (reviewText) {
        const newReview = document.createElement('p');
        newReview.textContent = `"${reviewText}" - You`;
        document.querySelector('.review-slider').appendChild(newReview);
        form.querySelector('input').value = '';
    }
}

const testEmail = 'test@example.com';
const testPassword = 'password123';

function login() {
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (emailInput === testEmail && passwordInput === testPassword) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = '/home.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

function checkLoginStatus() {
    if (localStorage.getItem('loggedIn')) {
        window.location.href = 'home.html';
    }
}

checkLoginStatus();
