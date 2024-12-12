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

/// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Hàm mở modal chi tiết hóa đơn
function openInvoiceDetails() {
    document.getElementById("invoiceModal").style.display = "flex"; // Hiển thị modal
}

// Hàm đóng modal chi tiết hóa đơn
function closeInvoiceModal() {
    document.getElementById("invoiceModal").style.display = "none"; // Ẩn modal
}

// Hàm lưu hóa đơn dưới dạng PDF (giả sử bạn có hàm này)
function saveInvoiceAsPDF() {
    alert("Lưu hóa đơn dưới dạng PDF!");
}


// /// thêm mới invoice
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('addInvoiceModal').style.display = 'none';
});

// Mở modal khi nhấn vào nút "Thêm hóa đơn"
function openModal() {
    document.getElementById('addInvoiceModal').style.display = 'flex';
}

// Đóng modal khi nhấn nút đóng
function closeModal() {
    document.getElementById('addInvoiceModal').style.display = 'none';
}

// /// Update invoice
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('updateInvoiceModal').style.display = 'none';
});

// Mở modal khi nhấn vào nút "sửa"
function openEditModal() {
    document.getElementById('updateInvoiceModal').style.display = 'flex';
}

// Đóng modal khi nhấn nút đóng
function closeModal1() {
    document.getElementById('updateInvoiceModal').style.display = 'none';
}






