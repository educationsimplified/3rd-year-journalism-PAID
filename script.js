function checkEmail() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message');
    const allowedEmails = ["uzairatwork02@gmail.com", "kahkashazabreen@gmail.com"];
    const gmailFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Validate email format
    if (!gmailFormat.test(email)) {
        message.textContent = "Please enter a valid Gmail address.";
        return;
    }

    // Check if email is allowed
    if (allowedEmails.includes(email)) {
        message.textContent = "Login successful!";
        document.getElementById('subject-buttons').style.display = "block"; // Show subject buttons
        localStorage.setItem('email', email); // Store the email in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Mark the user as logged in
    } else {
        message.textContent = "Email not recognized. Please contact Uzair Sir.";
    }
}

function embedBlogger(url) {
    const frame = document.getElementById('blogger-frame');

    // Hide the login container and show iframe
    document.getElementById('login-container').style.display = "none";
    frame.src = url;
    frame.style.display = "block";

    // Store the current URL in sessionStorage to maintain it between refreshes
    sessionStorage.setItem('currentIframeURL', url);

    // Push a new history state to allow going back
    window.history.pushState({ iframeURL: url }, '', url);
}

// Restore session and handle back button navigation
window.onload = function () {
    const savedEmail = localStorage.getItem('email');
    const savedIframeURL = sessionStorage.getItem('currentIframeURL');

    // Check if user is already logged in
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('message').textContent = "Welcome back! You are already logged in.";
        document.getElementById('subject-buttons').style.display = "block";
    }

    // Restore the iframe URL if it was previously loaded
    if (savedIframeURL) {
        embedBlogger(savedIframeURL);
    }

    // Clear localStorage for a new session (only when opening a new tab or refreshing fully)
    window.addEventListener('beforeunload', function () {
        sessionStorage.removeItem('currentIframeURL'); // Clear iframe URL on page unload
    });

    // Handle the back button by restoring the subject list
    window.onpopstate = function (event) {
        if (event.state && event.state.iframeURL) {
            embedBlogger(event.state.iframeURL); // Restore the iframe when navigating back
        } else {
            document.getElementById('blogger-frame').style.display = "none"; // Hide iframe
            document.getElementById('subject-buttons').style.display = "block"; // Show subjects
            document.getElementById('login-container').style.display = "block"; // Show the login
        }
    };
};
