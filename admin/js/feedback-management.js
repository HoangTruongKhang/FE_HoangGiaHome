// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll(".admin-dashboard nav ul li a");
const API_BASE_URL = "https://879a-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach((link) => {
  if (link.href.includes(currentPage)) {
    link.classList.add("active"); // Thêm lớp "active" cho mục hiện tại
  } else {
    link.classList.remove("active"); // Loại bỏ lớp "active" cho các mục còn lại
  }
});

const modal = document.getElementById("replyModal");
// Hàm đóng Modal
function closeModal() {
  modal.style.display = "none";
}

// Hàm lưu phản hồi
function saveResponse() {
  const response = document.getElementById("response").value;
  const responder = document.getElementById("responder").value;

  if (response && responder) {
    // Cập nhật lại trạng thái phản hồi trong bảng (có thể gửi lên server)
    alert("Phản hồi đã được lưu!");

    // Đóng modal
    closeModal();
  } else {
    alert("Vui lòng nhập đủ thông tin!");
  }
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

function updateTable(data) {
  const tableBody = document.querySelector(".feedback-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy tài khoản nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
             <td>${item.feedback_id}</td>
                        <td>${item.full_name}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.email}</td>
                        <td>${item.content}</td>
                        <td>${new Date(item.createDate).toLocaleDateString(
                          "en-GB"
                        )}</td>
                        <td>${
                          item.feedbackStatus === "CHUA_PHAN_HOI"
                            ? '<span class="status pending">Chưa phản hồi</span>'
                            : '<span class="status replied">Đã phản hồi</span>'
                        }</td>
                        <td>
                            <button class="reply-button" data-id="${
                              item.feedback_id
                            }">Phản hồi</button>
                            <button class="delete-button" data-id="${
                              item.feedback_id
                            }">Xóa</button>
                        </td>
            `;
    tableBody.appendChild(row);
  });
  attachRowActions();
}

async function fetchDataTable(search = "") {
  const url = search
    ? `${API_BASE_URL}/feedbacks?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/feedbacks`; // Nếu không tìm kiếm, lấy tất cả khách hàng

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

async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/feedbacks/${id}`, {
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

async function openUpdateModal(id) {
  const data = await getDataById(id);
  if (data) {
    document.getElementById("feedback_id").value = data.feedback_id;
    document.getElementById("feedback-content").value = data.content;
    // Hiển thị modal
    document.getElementById("replyModal").style.display = "flex";
  }
}

function attachRowActions() {
  const editButtons = document.querySelectorAll(".reply-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      openUpdateModal(id);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      if (confirm(`Bạn có chắc muốn xóa: ${id}?`)) {
        try {
          const response = await fetch(`${API_BASE_URL}/feedbacks/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          showNotification("Xóa thành công!", "success");
          fetchDataTable();
        } catch (error) {
          console.error("Lỗi:", error);
          showNotification("Đã xảy ra lỗi khi xóa tài khoản!", "error");
        }
      }
    });
  });
}
async function saveResponse() {
  const feedbackFeedback_id = document.getElementById("feedback_id").value;
  const content = document.getElementById("response").value;
  const accountAccount_id = 1;
  const dataUpdate = {
    feedbackFeedback_id,
    content,
    accountAccount_id,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/replys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(dataUpdate),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Cập nhật thành công!", "success");
    closeModal();
    fetchDataTable();
  } catch (error) {
    console.error("Lỗi:", error);
    showNotification("Đã xảy ra lỗi", "error");
  }
}
