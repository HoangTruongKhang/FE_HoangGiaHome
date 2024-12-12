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

// Thêm mới hợp đồng
// Hàm mở modal thêm hợp đồng
function openAddModal() {
    document.getElementById("add-contract-modal").style.display = "block";
}

// Hàm đóng modal thêm hợp đồng
function closeModal1() {
    document.getElementById("add-contract-modal").style.display = "none";
}





// cập nhật hợp đồng
// Mở modal
function openEditModal() {
    document.getElementById("edit-contract-modal").classList.add("show");
}

// Đóng modal
function closeModal() {
    document.getElementById("edit-contract-modal").classList.remove("show");
};
