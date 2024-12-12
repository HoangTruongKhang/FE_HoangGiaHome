// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "services.html" || currentPage === "") {
    document.getElementById('dichvu').classList.add('active');
    document.getElementById('dichvu2').classList.add('active');
} else {
    // Nếu không phải trang dịch vụ, áp dụng màu đen cho tất cả các mục
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Tìm và áp dụng màu xanh cho mục hiện tại
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}