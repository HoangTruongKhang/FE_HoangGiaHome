// // Lấy tên trang hiện tại từ URL
// const currentPage = window.location.pathname.split('/').pop();

// // Lấy tất cả các liên kết trong menu
// const menuLinks = document.querySelectorAll('.admin-dashboard nav ul li a');

// // Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
// menuLinks.forEach(link => {
//     if (link.href.includes(currentPage)) {
//         link.classList.add('active'); // Thêm lớp "active" cho mục hiện tại
//     } else {
//         link.classList.remove('active'); // Loại bỏ lớp "active" cho các mục còn lại
//     }
// });

// Lấy tên file hiện tại từ URL (không bao gồm đường dẫn)
const currentPage = window.location.pathname.split("/").pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll(".admin-dashboard nav ul li a");

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach((link) => {
  const linkPage = link.href.split("/").pop(); // Lấy tên file từ href

  if (linkPage === currentPage) {
    // So sánh chính xác tên file
    link.classList.add("active"); // Thêm lớp "active" cho mục hiện tại
  } else {
    link.classList.remove("active"); // Loại bỏ lớp "active" cho các mục còn lại
  }
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addRoomModal1").style.display = "none";
});

function closeModal1() {
  document.getElementById("add-room-modal1").style.display = "none";
}

// Mở modal
function showAddRoomModal11() {
  document.getElementById("addRoomModal1").style.display = "flex";
}

// Đóng modal
function closeModal() {
  document.getElementById("addRoomModal1").style.display = "none";
}
const API_BASE_URL = "https://91ae-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

function updateTable(data) {
  const tableBody = document.querySelector(".booking-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy dữ liệu nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
               <td>${item.booking_id}</td>
                        <td>${item.full_name}A</td>
                        <td>${item.phone_number}</td>
                        <td>${item.roomRoom_name}</td>
                        <td>${item.rentalDuration}</td>
                        <td>${item.paymentMethod}</td>
                        <td>${new Date(item.createDate).toLocaleDateString(
                          "en-GB"
                        )}</td>
                        <td class="view-detail" data-id="${
                          item.booking_id
                        }"><a class="detail-link">Xem chi tiết</a></td>
              <td>
              </td>
            `;
    tableBody.appendChild(row);
  });
  attachRowActions();
}

async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
  const data = await response.json();
  return data;
}

async function fetchDataTable(search = "") {
  const url = search
    ? `${API_BASE_URL}/bookings?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/bookings`; // Nếu không tìm kiếm, lấy tất cả khách hàng

  const data = await fetchData(url);
  updateTable(data.content || []); // Cập nhật bảng khách hàng
}

async function searchFunction() {
  const searchValue = document.getElementById("search-id").value.trim();
  fetchDataTable(searchValue);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataTable();
});

async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi:", error);
  }
}
function displayBookingDetails(data) {
  const detailsTable = document.querySelector(".details-table");

  // Cập nhật từng ô của bảng dựa vào data
  detailsTable.innerHTML = `
      <tr>
        <th>Mã đặt phòng</th>
        <td>${data.booking_id || ""}</td>
      </tr>
      <tr>
        <th>Tên phòng</th>
        <td>${data.roomRoom_name || ""}</td>
      </tr>
      <tr>
        <th>Tên chi nhánh</th>
        <td>${data.branchBranch_name || ""}</td>
      </tr>
      <tr>
        <th>Danh xưng</th>
        <td>${data.salutation || ""}</td>
      </tr>
      <tr>
        <th>Họ và tên</th>
        <td>${data.full_name || ""}</td>
      </tr>
      <tr>
        <th>Số điện thoại</th>
        <td>${data.phone_number || ""}</td>
      </tr>
      <tr>
        <th>Thời gian thuê phòng</th>
        <td>${
          data.rentalDuration === "TWENTY_FOUR_MONTHS"
            ? "24 tháng"
            : data.rentalDuration || ""
        }</td>
      </tr>
      <tr>
        <th>Ngày bắt đầu</th>
        <td>${new Date(data.start_date).toLocaleDateString("en-GB") || ""}</td>
      </tr>
      <tr>
        <th>Ngày kết thúc</th>
        <td>${new Date(data.end_date).toLocaleDateString("en-GB") || ""}</td>
      </tr>
      <tr>
        <th>Phương thức thanh toán</th>
        <td>${
          data.paymentMethod === "THANG_TOAN_ONLINE"
            ? "Online"
            : data.paymentMethod || ""
        }</td>
      </tr>
      <tr>
        <th>Trạng thái thanh toán</th>
        <td>${
          data.bookingStatus === "CHO_XU_LY"
            ? "Chờ xử lý"
            : data.bookingStatus || ""
        }</td>
      </tr>
      <tr>
        <th>Ghi chú</th>
        <td>${data.notes || ""}</td>
      </tr>
      <tr>
        <th>Ngày tạo</th>
        <td>${new Date(data.createDate).toLocaleString("en-GB") || ""}</td>
      </tr>
    `;
}

async function openUpdateModal(id) {
  const data = await getDataById(id);
  if (data) {
    displayBookingDetails(data);
    showAddRoomModal11();
  }
}

function attachRowActions() {
  const viewDetail = document.querySelectorAll(".view-detail");

  viewDetail.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      openUpdateModal(id);
    });
  });
}
