// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll(".admin-dashboard nav ul li a");

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach((link) => {
  if (link.href.includes(currentPage)) {
    link.classList.add("active"); // Thêm lớp "active" cho mục hiện tại
  } else {
    link.classList.remove("active"); // Loại bỏ lớp "active" cho các mục còn lại
  }
});

const API_BASE_URL = "https://d84e-117-5-34-35.ngrok-free.app/api/v1";
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

function updateTable(data) {
  const tableBody = document.querySelector(".reply-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy tài khoản nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.reply_id}</td>
              <td>${item.content}</td>
              <td>${item.feedbackContent}</td>
              <td>${item.accountUsername}</td>
                 <td>${new Date(item.createDate).toLocaleDateString(
                   "en-GB"
                 )}</td>
              <td>
                <button class="delete-button">Xóa</button>
              </td>
          `;
    tableBody.appendChild(row);
  });
  attachRowActions();
}

async function fetchDataTable(search = "") {
  const url = search
    ? `${API_BASE_URL}/replys?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/replys`; // Nếu không tìm kiếm, lấy tất cả khách hàng

  const data = await fetchData(url);
  updateTable(data || []); // Cập nhật bảng khách hàng
}

async function searchFunction() {
  const searchValue = document.getElementById("search-id").value.trim();
  fetchDataTable(searchValue);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataTable();
});
