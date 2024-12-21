function sendMessage() {
  const name = document.getElementById("userName").value;
  const phone = document.getElementById("userPhone").value;
  const message = document.getElementById("userMessage").value;

  // Kiểm tra độ dài và ký tự của số điện thoại
  const phonePattern = /^[0-9]{10}$/; // Chỉ chấp nhận 10 chữ số

  if (name && phone && message) {
    if (!phonePattern.test(phone)) {
      alert(
        "Số điện thoại không hợp lệ. Vui lòng nhập lại số điện thoại của bạn."
      );
      return;
    }

    alert(`Tên: ${name}\nSố điện thoại: ${phone}\nLời nhắn: ${message}`);
    // Xử lý thêm: Gửi dữ liệu đến server, lưu vào cơ sở dữ liệu, v.v...
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("userMessage").value = "";
  } else {
    alert("Vui lòng điền đầy đủ thông tin.");
  }
}

// Hàm để chuyển đổi hiển thị câu trả lời khi người dùng nhấp vào câu hỏi
function toggleAnswer(index) {
  var faqItems = document.querySelectorAll(".faq-item");
  var faqItem = faqItems[index];

  // Nếu câu trả lời đã được mở, đóng nó lại
  if (faqItem.classList.contains("active")) {
    faqItem.classList.remove("active");
  } else {
    // Nếu chưa mở, mở câu trả lời và xoay icon
    faqItem.classList.add("active");
  }
}

// màu trang hiện tại
// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "home.html" || currentPage === "") {
  document.getElementById("home").classList.add("active"); // Áp dụng lớp active cho "Trang Chủ"
} else {
  // Nếu không phải trang chủ, áp dụng màu đen cho tất cả các mục
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

// Hàm để tìm kiếm

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

const API_BASE_URL = "https://d8fc-117-5-34-35.ngrok-free.app/api/v1";
function updateTable(data) {
  const tableBody = document.querySelector(".room-list");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    roomList.innerHTML = `<p style="text-align: center;">Không tìm thấy dữ liệu nào!</p>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <a href="room-details.html?room=${item.room_id}">
            <div class="room-item">
                <img src="../../images/atm1.jpg" alt="Phòng 1" class="room-image">
                <div class="room-price">
                    <i class="fas fa-dollar-sign"></i> ${item.price} VND
                </div>
                <div class="room-name">
                    <i class="fa-solid fa-house"></i>
                    <strong>${item.room_name}</strong>
                </div>
                <div class="room-location">
                    <i class="fas fa-map-marker-alt"></i> ${item.branchBranch_name}
                </div>
                <div class="room-description">
                    ${item.description}
                </div>
            </div>
        </a>
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
  const url = `${API_BASE_URL}/rooms?roomStatus=TRONG`;
  const data = await fetchData(url);
  updateTable(data?.content || []); // Cập nhật bảng khách hàng
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataTable();
});
