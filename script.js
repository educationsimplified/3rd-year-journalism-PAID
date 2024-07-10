function checkPassword(subjectId, correctPassword, redirectUrl) {
    var inputId = 'password' + subjectId.replace('subject', '');
    var password = document.getElementById(inputId).value;
    var message = document.getElementById('message');
    
    if (password === correctPassword) {
        window.location.href = redirectUrl;
    } else {
        message.textContent = 'Wrong password. If you don’t have the password and want to access the files, contact the owner, Uzair.';
        setTimeout(function() {
            window.location.href = 'https://www.instagram.com/uzairvibes?igsh=MXEwczdtd290aXl0Zw==';
        }, 3000);
    }
}
