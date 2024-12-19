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

// Thêm mới hợp đồng
// Hàm mở modal thêm hợp đồng
function openAddModal() {
  document.getElementById("add-contract-modal").style.display = "block";
}

// Hàm đóng modal thêm hợp đồng
function closeModal1() {
  document.getElementById("add-contract-modal").style.display = "none";
}

// cập nhật hợp đồng
// Mở modal
function openEditModal() {
  document.getElementById("edit-contract-modal").classList.add("show");
}

// Đóng modal
function closeModal() {
  document.getElementById("edit-contract-modal").classList.remove("show");
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
  const tableBody = document.querySelector(".contract-table1 tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy dữ liệu nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${item.contract_id}</td>
              <td>${item.customerFull_name}</td>
              <td>${item.roomRoom_name}</td>
              <td>${item.contractDuration}</td>
              <td>${new Date(item.createDate).toLocaleDateString("en-GB")}</td>
            <td>
                 <button class="edit-button" data-id="${
                   item.contract_id
                 }">Sửa</button>
            <button class="delete-button" data-id="${
              item.contract_id
            }">Xóa</button>
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
    ? `${API_BASE_URL}/contracts?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/contracts`; // Nếu không tìm kiếm, lấy tất cả khách hàng

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

/// Thêm mới:
async function addNewData(event) {
  event.preventDefault();
  const contract_name = document.getElementById("contract-name").value;
  const customerCustomer_id = document.getElementById("customer-id").value;
  const roomRoom_id = document.getElementById("contract-name").value;
  const contractDuration = document.getElementById("rental-period").value;
  const start_date = document.getElementById("start-date").value;
  const end_date = document.getElementById("end-date").value;
  const rent_price = document.getElementById("rental-price").value;
  const room_deposit = document.getElementById("deposit").value;
  const contractStatus = document.getElementById("contract-status").value;
  const note = document.getElementById("notes").value;
  const newData = {
    contract_name,
    customerCustomer_id,
    roomRoom_id,
    contractDuration,
    start_date,
    end_date,
    rent_price,
    room_deposit,
    contractStatus,
    note,
  };
  console.log(newData);

  try {
    const response = await fetch(`${API_BASE_URL}/contracts`, {
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

document
  .getElementById("add-contract-form")
  .addEventListener("submit", addNewData);

async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
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
    document.getElementById("edit-id").value = data.contract_id;
    document.getElementById("edit-contract-name").value = data.contract_name;
    document.getElementById("edit-customer-id").value =
      data.customerCustomer_id;
    document.getElementById("edit-room-id").value = data.roomRoom_id;
    document.getElementById("edit-rental-period").value = data.contractDuration;
    document.getElementById("edit-start-date").value = new Date(data.start_date)
      .toISOString()
      .split("T")[0];
    document.getElementById("edit-end-date").value = new Date(data.end_date)
      .toISOString()
      .split("T")[0];
    document.getElementById("edit-rental-price").value = data.rent_price;
    document.getElementById("edit-deposit").value = data.room_deposit;
    document.getElementById("edit-contract-status").value = data.contractStatus;
    document.getElementById("edit-notes").value = data.note;
    // Hiển thị modal
    openEditModal();
  }
}

function attachRowActions() {
  const editButtons = document.querySelectorAll(".edit-button");
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
          const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
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
  const contract_name = document.getElementById("edit-contract-name").value;
  const customerCustomer_id = document.getElementById("edit-customer-id").value;
  const roomRoom_id = document.getElementById("edit-room-id").value;
  const contractDuration = document.getElementById("edit-rental-period").value;
  const start_date = document.getElementById("edit-start-date").value;
  const end_date = document.getElementById("edit-end-date").value;
  const rent_price = document.getElementById("edit-rental-price").value;
  const room_deposit = document.getElementById("edit-deposit").value;
  const contractStatus = document.getElementById("edit-contract-status").value;
  const note = document.getElementById("edit-notes").value;

  const dataUpdate = {
    contract_name,
    customerCustomer_id,
    roomRoom_id,
    contractDuration,
    start_date,
    end_date,
    rent_price,
    room_deposit,
    contractStatus,
    note,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
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
    closeModal();
    fetchDataTable();
  } catch (error) {
    console.error("Lỗi:", error);
    showNotification("Đã xảy ra lỗi", "error");
  }
}

document
  .getElementById("edit-contract-form")
  .addEventListener("submit", updateData);
