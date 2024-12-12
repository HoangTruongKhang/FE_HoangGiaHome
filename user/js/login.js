closeLoginForm.addEventListener('click', function () {
    window.location.href = 'home.html';
});




// // Đóng form khi nhấn ra ngoài vùng form
// window.addEventListener('click', function (event) {
//     if (event.target === loginFormContainer) {
//         loginFormContainer.style.display = 'none';
//     }
// });



// eye pass
$(document).ready(function () {
    $('#eye').click(function () {
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if ($(this).hasClass('open')) {
            $(this).prev().attr('type', 'text');
        } else {
            $(this).prev().attr('type', 'password');
        }
    });

});