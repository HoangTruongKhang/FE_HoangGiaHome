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

// model thêm phòng:
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addRoomModal1").style.display = "none";
});

// Mở modal
function showAddRoomModal11() {
  document.getElementById("addRoomModal1").style.display = "flex";
}

// Đóng modal
function closeModal() {
  document.getElementById("addRoomModal1").style.display = "none";
}

// model cập nhật phòng:
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("updateRoomModal2").style.display = "none";
});

// Mở modal
function openEditModal2() {
  document.getElementById("updateRoomModal2").style.display = "flex";
}

// Đóng modal
function closeModa2() {
  document.getElementById("updateRoomModal2").style.display = "none";
}

/////////////////////////////////////////////////////////////////

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
  const roomList = document.querySelector(".room-list");
  roomList.innerHTML = ""; // Xóa danh sách cũ

  // Nếu không có dữ liệu, hiển thị thông báo
  if (data.length === 0) {
    roomList.innerHTML = `<p style="text-align: center;">Không tìm thấy dữ liệu nào!</p>`;
    return;
  }

  data.forEach((room) => {
    const roomItem = document.createElement("div");
    roomItem.className = "room-item";

    // Kiểm tra nếu có khách
    if (room?.customers?.length > 0) {
      roomItem.style.backgroundColor = "#7bed9f"; // Màu nền xanh
    }

    roomItem.innerHTML = `
        <div class="room-name-icon">
          <i class="fas fa-door-closed room-icon"></i>
          <p class="room-name">${room.room_name}</p>
        </div>
        <div class="customer-name-icon">
          <i class="fas fa-user customer-icon"></i>
          <p class="customer-name">${
            room?.customers[0]?.full_name || "Chưa có khách"
          }</p>
        </div>
        <p class="price">Giá: ${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(room.price)}</p>
        <button class="btn-checkout" ${
          room?.customers?.length > 0 ? "" : "disabled"
        } data-id="${room.room_id}">Trả phòng</button>
        <div class="room-buttons">
          <button class="btn-edit"  data-id="${room.room_id}">
            Chỉnh sửa
          </button>
          <button class="btn-delete"  data-id="${room.room_id}">Xóa</button>
        </div>
      `;

    roomList.appendChild(roomItem);
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
    ? `${API_BASE_URL}/rooms?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/rooms`; // Nếu không tìm kiếm, lấy tất cả khách hàng

  const data = await fetchData(url);
  updateTable(data?.content || []); // Cập nhật bảng khách hàng
}

async function searchFunction() {
  const searchValue = document.getElementById("search-id").value.trim();
  fetchDataTable(searchValue);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataTable();
});

/// Thêm mới:
async function addNewData(event) {
  event.preventDefault();
  const room_name = document.getElementById("room-name").value;
  const image_media_url = document.getElementById("room-image").value;
  const price = document.getElementById("room-price").value;
  const area = document.getElementById("room-area").value;
  const description = document.getElementById("room-description").value;
  const branchBranch_id = document.getElementById("branch").value;
  const newData = {
    room_name,
    image_media_url,
    price,
    area,
    description,
    branchBranch_id,
  };
  console.log(newData);

  try {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Thêm mới thành công!", "success");
    closeModal();
    fetchDataTable();
  } catch (error) {
    console.error(error);
    showNotification("Đã xảy ra lỗi khi thêm mới!", "error");
  }
}

document.getElementById("addRoomForm").addEventListener("submit", addNewData);

async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
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
    // Hiển thị modal
    document.getElementById("edit-id").value = data.room_id;
    document.getElementById("edit-room-name").value = data.room_name;
    document.getElementById("edit-room-image").value = data.image_media_url;
    document.getElementById("edit-room-price").value = data.price;
    document.getElementById("edit-room-area").value = data.area;
    document.getElementById("edit-room-description").value = data.description;
    document.getElementById("edit-branch").value = data.branchBranch_id;
    document.getElementById("edit-roomStatus").value = data.roomStatus;

    openEditModal2();
  }
}

function attachRowActions() {
  const editButtons = document.querySelectorAll(".btn-edit");
  const deleteButtons = document.querySelectorAll(".btn-delete");

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
          const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
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

async function updateData(event) {
  event.preventDefault();
  const id = document.getElementById("edit-id").value;
  const room_name = document.getElementById("edit-room-name").value;
  const image_media_url = document.getElementById("edit-room-image").value;
  const roomStatus = document.getElementById("edit-roomStatus").value;
  const price = document.getElementById("edit-room-price").value;
  const area = document.getElementById("edit-room-area").value;
  const description = document.getElementById("edit-room-description").value;
  const branchBranch_id = document.getElementById("edit-branch").value;

  const dataUpdate = {
    room_name,
    image_media_url,
    roomStatus,
    price,
    area,
    description,
    branchBranch_id,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataUpdate),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Cập nhật thành công!", "success");
    closeModa2();
    fetchDataTable();
  } catch (error) {
    console.error("Lỗi:", error);
    showNotification("Đã xảy ra lỗi", "error");
  }
}

document.getElementById("editRoomForm").addEventListener("submit", updateData);
