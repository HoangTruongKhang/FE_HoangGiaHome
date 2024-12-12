// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll('.admin-dashboard nav ul li a');

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add('active'); // Thêm lớp "active" cho mục hiện tại
    } else {
        link.classList.remove('active'); // Loại bỏ lớp "active" cho các mục còn lại
    }
});





// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('addcustomerServiceModal').style.display = 'none';
});
// Hiển thị form modal
document.querySelector('.add-customer-service-button').addEventListener('click', () => {
    document.getElementById('addcustomerServiceModal').style.display = 'flex';
});

// Đóng form modal
function closeModal() {
    document.getElementById('addcustomerServiceModal').style.display = 'none';
}

// cập nhật
document.addEventListener("DOMContentLoaded", function () {
    // Ensure modal is hidden when page loads
    document.getElementById('updatecustomerServiceModal1').style.display = 'none';
});

// Function to open the modal for editing
function openEditModal1() {
    document.getElementById("updatecustomerServiceModal1").style.display = 'block'; // Show modal
}

// Function to close the modal
function closeModal1() {
    document.getElementById('updatecustomerServiceModal1').style.display = 'none'; // Hide modal
}


