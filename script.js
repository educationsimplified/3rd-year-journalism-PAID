// Function to check email and handle login
function checkEmail() {
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message');
    const allowedEmails = ["uzairatwork02@gmail.com", "kahkashazabreen@gmail.com", "m.malik2106@gmail.com", "anusingh02102003@gmail.com", "diksha03mishra@gmail.com", "34ahmad2003@gmail.com"];
    const gmailFormat = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Validate email format
    if (!gmailFormat.test(email)) {
        message.textContent = "Please enter a valid Gmail address.";
        message.style.color = "red";
        return;
    }

    // Check if email is allowed
    if (allowedEmails.includes(email)) {
        message.textContent = "Login successful!";
        message.style.color = "green";
        document.getElementById('subject-buttons').style.display = "block"; // Show subject buttons
        sessionStorage.setItem('isLoggedIn', 'true'); // Mark the user as logged in
    } else {
        message.textContent = "Email not recognized. Please contact Uzair Sir.";
        message.style.color = "red";
    }
}

// Function to embed the blogger iframe in full-screen
function embedBlogger(url) {
    // Hide the login and buttons container
    document.getElementById('login-container').style.display = "none";
    document.getElementById('subject-buttons').style.display = "none";

    // Show the iframe and set the URL
    const frame = document.getElementById('blogger-frame');
    frame.src = url;
    frame.style.display = "block"; // Ensure iframe is visible
    frame.style.position = "fixed";  // Make it fixed to the viewport
    frame.style.top = "0";           // Align to top
    frame.style.left = "0";          // Align to left
    frame.style.width = "100vw";     // Full width of viewport
    frame.style.height = "100vh";    // Full height of viewport
    frame.style.border = "none";     // Remove any borders to make it seamless
    frame.style.zIndex = "9999";     // Make sure it stays on top of everything

    // Store the URL for session persistence
    sessionStorage.setItem('currentIframeURL', url);

    // Push a new history state to allow back navigation
    window.history.pushState({ iframeURL: url }, '', url);
}

// Function to handle the back button
function goBack() {
    // Show the login and subject buttons again
    document.getElementById('login-container').style.display = "block";
    document.getElementById('subject-buttons').style.display = "block";

    // Hide the iframe
    document.getElementById('blogger-frame').style.display = "none";
}

// Handle page load and session restoration
window.onload = function () {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const savedIframeURL = sessionStorage.getItem('currentIframeURL');

    if (isLoggedIn) {
        document.getElementById('subject-buttons').style.display = "block";
    }

    // Ensure buttons are hidden if not logged in
    if (!isLoggedIn) {
        document.getElementById('subject-buttons').style.display = "none";
    }

    // Restore the iframe if it was previously loaded
    if (savedIframeURL) {
        embedBlogger(savedIframeURL);
    }

    // Handle the back button navigation
    window.onpopstate = function (event) {
        if (event.state && event.state.iframeURL) {
            embedBlogger(event.state.iframeURL);
        } else {
            goBack(); // Return to subject buttons if no URL is in history state
        }
    };
};

// Ensure session is cleared on full reload
window.addEventListener('beforeunload', function () {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentIframeURL');
});
