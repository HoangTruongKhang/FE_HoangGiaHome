// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}
// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "booking.html" || currentPage === "") {
  document.getElementById("dichvu").classList.add("active");
  document.getElementById("dichvu1").classList.add("active");
} else {
  // Nếu không phải trang dịch vụ, áp dụng màu đen cho tất cả các mục
  document.querySelectorAll(".menu a").forEach((link) => {
    link.classList.remove("active");
  });

  // Tìm và áp dụng màu xanh cho mục hiện tại
  document.querySelectorAll(".menu a").forEach((link) => {
    if (link.href.includes(currentPage)) {
      link.classList.add("active");
    }
  });
}

// Xử lý hiển thị modal thanh toán online
function toggleOnlinePayment(isOnline) {
  const modal = document.getElementById("online-payment-modal");
  if (isOnline) {
    modal.style.display = "block"; // Hiển thị modal khi chọn thanh toán online
  } else {
    modal.style.display = "none"; // Ẩn modal khi chọn thanh toán trực tiếp
  }
}

const API_BASE_URL = "https://d8fc-117-5-34-35.ngrok-free.app/api/v1";
// Xử lý khi nhấn vào nút "Đã thanh toán"
function confirmPayment() {
  const modal = document.getElementById("online-payment-modal");
  modal.style.display = "none"; // Đóng modal khi thanh toán xong
}
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("room");
document
  .querySelector(".booking-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn form gửi dữ liệu mặc định

    // Lấy giá trị từng item
    const danhXung =
      document.querySelector('input[name="danh_xung"]:checked')?.value || "";
    const hoVaTen = document
      .querySelector('input[name="ho_va_ten"]')
      .value.trim();
    const soDienThoai = document
      .querySelector('input[name="so_dien_thoai"]')
      .value.trim();
    const tenPhong = document
      .querySelector('input[name="ten_phong"]')
      .value.trim();
    const chiNhanh = document.querySelector('select[name="chi_nhanh"]').value;
    const thoiGianThue = document.querySelector(
      'select[name="thoi_gian_thue"]'
    ).value;
    const ngayBatDau = document.querySelector(
      'input[name="ngay_bat_dau"]'
    ).value;
    const ngayKetThuc = document.querySelector(
      'input[name="ngay_ket_thuc"]'
    ).value;
    const payment =
      document.querySelector('input[name="payment"]:checked')?.value || "";
    const ghiChu = document
      .querySelector('textarea[name="ghi_chu"]')
      .value.trim();
    const mail = document.querySelector('input[name="mail"]').value.trim();

    const data = {
      salutation: "CHI",
      full_name: hoVaTen,
      phone_number: soDienThoai,
      bookingEmail: mail,
      rentalDuration: thoiGianThue,
      roomRoom_id: roomId,
      branchBranch_id: chiNhanh,
      start_date: ngayBatDau,
      end_date: ngayKetThuc,
      paymentMethod: payment,
      notes: ghiChu,
    };
    booking(data);
  });

async function booking(data) {
  console.log(data);

  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Thêm mới thành công!", "success");
  } catch (error) {
    console.error(error);
    showNotification("Đã xảy ra lỗi khi thêm mới!", "error");
  }
}
