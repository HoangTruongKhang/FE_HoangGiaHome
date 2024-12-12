// Xóa nội dung trong ô tìm kiếm
function clearSearch() {
    document.getElementById("search-id").value = "";
    document.getElementById("search-id").focus();
}

// Hàm thực hiện tìm kiếm
function searchFunction() {
    const searchQuery = document.getElementById("search-id").value.trim();
    if (searchQuery) {
        // Lưu từ khóa vào lịch sử tìm kiếm và cập nhật gợi ý
        saveSearchQuery(searchQuery);
        updateSearchSuggestions();

        // Thực hiện tìm kiếm với query (có thể thêm logic tìm kiếm tại đây)
        console.log("Tìm kiếm:", searchQuery);
    } else {
        alert("Vui lòng nhập từ khóa để tìm kiếm.");
    }
}

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

// model thêm phòng:
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('addRoomModal1').style.display = 'none';
});

// Mở modal 
function showAddRoomModal11() {
    document.getElementById('addRoomModal1').style.display = 'flex';
}

// Đóng modal 
function closeModal() {
    document.getElementById('addRoomModal1').style.display = 'none';
}


// model cập nhật phòng:
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('updateRoomModal2').style.display = 'none';
});

// Mở modal 
function openEditModal2() {
    document.getElementById('updateRoomModal2').style.display = 'flex';
}

// Đóng modal 
function closeModa2() {
    document.getElementById('updateRoomModal2').style.display = 'none';
}

