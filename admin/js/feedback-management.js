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

// Mở Modal khi click vào nút "Phản hồi"
const replyButtons = document.querySelectorAll('.reply-button');
const modal = document.getElementById('replyModal');
const closeButton = document.querySelector('.close-button');
const saveButton = document.querySelector('.save-button');

// Hàm mở Modal và điền thông tin phản hồi
replyButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Lấy thông tin phản hồi từ dòng dữ liệu
        const row = button.closest('tr');
        const feedbackContent = row.cells[4].textContent;

        // Điền thông tin vào modal
        document.getElementById('feedback-content').value = feedbackContent;

        // Mở Modal
        modal.style.display = 'flex';
    });
});

// Hàm đóng Modal
function closeModal() {
    modal.style.display = 'none';
}

// Hàm lưu phản hồi
function saveResponse() {
    const response = document.getElementById('response').value;
    const responder = document.getElementById('responder').value;

    if (response && responder) {
        // Cập nhật lại trạng thái phản hồi trong bảng (có thể gửi lên server)
        alert('Phản hồi đã được lưu!');

        // Đóng modal
        closeModal();
    } else {
        alert('Vui lòng nhập đủ thông tin!');
    }
}
