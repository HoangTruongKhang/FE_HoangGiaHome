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






// Hiển thị form modal
document.querySelector('.add-news-button').addEventListener('click', () => {
    document.getElementById('addNewsModal').style.display = 'flex';
});

// Đóng form modal
function closeModal() {
    document.getElementById('addNewsModal').style.display = 'none';
}

// Xử lý form submit
document.getElementById('addNewsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Dữ liệu tin tức:', data);
    closeModal();
});

// Hiển thị form modal Cập nhật tin tức
// Sử dụng sự kiện delegate cho các nút "Sửa"
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const newsId = row.querySelector('td:nth-child(1)').textContent;
        const title = row.querySelector('td:nth-child(2)').textContent;
        const image = row.querySelector('td:nth-child(3) img').src;
        const description = row.querySelector('td:nth-child(4)').textContent;

        // Điền thông tin vào các input trong modal
        document.getElementById('editTitle').value = title;
        document.getElementById('editImage').value = image;
        document.getElementById('editDescription').value = description;

        // Hiển thị modal cập nhật
        document.getElementById('editNewsModal').style.display = 'flex';
    });
});

// Đóng form modal Cập nhật tin tức
function closeEditModal() {
    document.getElementById('editNewsModal').style.display = 'none';
}

// Xử lý form submit Cập nhật tin tức
document.getElementById('editNewsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Dữ liệu tin tức cập nhật:', data);
    closeEditModal();
});



