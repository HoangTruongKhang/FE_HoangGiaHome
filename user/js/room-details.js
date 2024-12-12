// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "room-details.html" || currentPage === "") {
    document.getElementById('chitietphong').classList.add('active');
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

// cuộn ảnh thủ công 
function scrollGallery(distance) {
    const gallery = document.querySelector('.image-gallery');
    gallery.scrollBy({ left: distance, behavior: 'smooth' });
}

// lấy chi tiết phòng từ 1 phòng bất kỳ
// Lấy tham số room từ URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('room');

// Ẩn tất cả các chi tiết phòng trước
document.querySelectorAll('.room-detail').forEach(room => {
    room.style.display = 'none';
});

// Hiển thị chi tiết phòng tương ứng với roomId
const selectedRoom = document.querySelector(`.room-detail[data-room="${roomId}"]`);
if (selectedRoom) {
    selectedRoom.style.display = 'block';
} else {
    // Nếu không tìm thấy phòng, bạn có thể hiển thị một thông báo lỗi
    alert('Thực hiện lại sau');
    window.location.href = 'index.html';
}

