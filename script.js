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
    } else {
        message.textContent = "Email not recognized. Please contact Uzair Sir.";
    }
}

function embedBlogger(url) {
    const frame = document.getElementById('blogger-frame');

    // Hide login container to simulate redirection
    document.getElementById('login-container').style.display = "none";

    // Configure iframe to appear full screen
    frame.src = url;
    frame.style.display = "block";
    frame.style.position = "fixed";
    frame.style.top = "0";
    frame.style.left = "0";
    frame.style.width = "100vw";
    frame.style.height = "100vh";
    frame.style.border = "none";
    frame.style.zIndex = "9999";

    // Handle iframe loading errors
    frame.onerror = function () {
        alert("Unable to load the page. Please try opening it directly.");
        window.open(url, "_blank"); // Open in a new tab if embedding fails
    };
}
