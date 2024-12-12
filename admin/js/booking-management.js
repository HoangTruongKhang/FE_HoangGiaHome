// // Lấy tên trang hiện tại từ URL
// const currentPage = window.location.pathname.split('/').pop();

// // Lấy tất cả các liên kết trong menu
// const menuLinks = document.querySelectorAll('.admin-dashboard nav ul li a');

// // Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
// menuLinks.forEach(link => {
//     if (link.href.includes(currentPage)) {
//         link.classList.add('active'); // Thêm lớp "active" cho mục hiện tại
//     } else {
//         link.classList.remove('active'); // Loại bỏ lớp "active" cho các mục còn lại
//     }
// });

// Lấy tên file hiện tại từ URL (không bao gồm đường dẫn)
const currentPage = window.location.pathname.split('/').pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll('.admin-dashboard nav ul li a');

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach(link => {
    const linkPage = link.href.split('/').pop(); // Lấy tên file từ href

    if (linkPage === currentPage) { // So sánh chính xác tên file
        link.classList.add('active'); // Thêm lớp "active" cho mục hiện tại
    } else {
        link.classList.remove('active'); // Loại bỏ lớp "active" cho các mục còn lại
    }
});
