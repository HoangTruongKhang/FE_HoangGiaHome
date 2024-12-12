// Hàm mở modal thêm phương tiện
function openModal() {
    // Hiển thị modal thêm phương tiện
    document.getElementById('addVehicleModal1').style.display = 'block';
    document.getElementById('updateVehicleModal').style.display = 'none'; // Đảm bảo modal cập nhật không hiển thị
}

// Hàm mở modal cập nhật phương tiện
function openEditModal() {
    // Hiển thị modal cập nhật phương tiện
    document.getElementById('updateVehicleModal').style.display = 'block';
    document.getElementById('addVehicleModal1').style.display = 'none'; // Đảm bảo modal thêm phương tiện không hiển thị
}

// Hàm đóng các modal
function closeModal() {
    // Ẩn cả hai modal khi nhấn thoát
    document.getElementById('addVehicleModal1').style.display = 'none';
    document.getElementById('updateVehicleModal').style.display = 'none';
}

// Đảm bảo khi tải lại trang, các modal không hiển thị
window.onload = function () {
    document.getElementById('addVehicleModal1').style.display = 'none';
    document.getElementById('updateVehicleModal').style.display = 'none';
};
