// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "booking.html" || currentPage === "") {
    document.getElementById('dichvu').classList.add('active');
    document.getElementById('dichvu1').classList.add('active');
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




// Xử lý khi nhấn nút "Đặt phòng"
document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngừng việc gửi form
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    if (paymentMethod === 'online') {
        toggleOnlinePayment(true); // Hiển thị modal nếu chọn thanh toán online
    } else {
        alert("Đặt phòng thành công!"); // Thông báo đặt phòng thành công nếu thanh toán trực tiếp
    }
});
// // Xử lý khi nhấn nút "Đặt phòng"
// document.querySelector(".booking-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Ngừng việc gửi form
//     const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
//     if (paymentMethod === 'online') {
//         toggleOnlinePayment(true); // Hiển thị modal nếu chọn thanh toán online
//     } else {
//         alert("Đặt phòng thành công!"); // Thông báo đặt phòng thành công nếu thanh toán trực tiếp
//     }
// });


// Xử lý hiển thị modal thanh toán online
function toggleOnlinePayment(isOnline) {
    const modal = document.getElementById("online-payment-modal");
    if (isOnline) {
        modal.style.display = "block"; // Hiển thị modal khi chọn thanh toán online
    } else {
        modal.style.display = "none"; // Ẩn modal khi chọn thanh toán trực tiếp
    }
}

// Xử lý khi nhấn vào nút "Đã thanh toán"
function confirmPayment() {
    const modal = document.getElementById("online-payment-modal");
    modal.style.display = "none"; // Đóng modal khi thanh toán xong
}





