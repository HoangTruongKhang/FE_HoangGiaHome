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

const API_BASE_URL = "https://e609-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

function updateTable(data) {
  const tableBody = document.querySelector(".service-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy dữ liệu nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.branch_id}</td>
          <td>${item.branch_name}</td>
          <td>${item.address}</td>
          <td>
               <button class="edit-button" data-id="${item.branch_id}">Sửa</button>
          <button class="delete-button" data-id="${item.branch_id}">Xóa</button>
          </td>
        `;
    tableBody.appendChild(row);
  });
  attachRowActions();
}

document.querySelector(".add-service-button").addEventListener("click", () => {
  document.getElementById("addServiceModal").style.display = "flex";
});

function clearForm() {
  const form = document.getElementById("addServiceForm");
  form.reset();
}
function closeModal() {
  document.getElementById("addServiceModal").style.display = "none";
  clearForm();
}
function closeBranchModal() {
  document.getElementById("addServiceModal").style.display = "none";
  clearForm();
}
function closeupdateServiceModal() {
  document.getElementById("updateServiceModal").style.display = "none";
  clearForm();
}
function closeUpdateModal() {
  document.getElementById("updateServiceModal").style.display = "none";
}
/// get data
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
    ? `${API_BASE_URL}/services?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/services`; // Nếu không tìm kiếm, lấy tất cả khách hàng

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
  console.log(event);

  const branch_name = document.getElementById("branch_name").value;
  const address = document.getElementById("address").value; // Assuming there's an input field for CMND

  const newData = {
    branch_name,
    address,
  };
  console.log(newData);

  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
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

document.getElementById("addServiceForm").addEventListener("submit", addNewData);

/// Update data
async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
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
    document.getElementById("update_branch_id").value = data.branch_id;
    document.getElementById("update_branch_name").value = data.branch_name;
    document.getElementById("uppate_address").value = data.address;

    // Hiển thị modal
    document.getElementById("updateServiceModal").style.display = "block";
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
          const response = await fetch(`${API_BASE_URL}/services/${id}`, {
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
  const id = document.getElementById("update_branch_id").value;
  const updatedCustomerData = {
    branch_name: document.getElementById("update_branch_name").value,
    address: document.getElementById("uppate_address").value,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedCustomerData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Cập nhật tài khoản thành công!", "success");
    closeUpdateModal();
    fetchDataTable(); // Lấy lại danh sách tài khoản để hiển thị
  } catch (error) {
    console.error("Lỗi:", error);
    showNotification("Đã xảy ra lỗi", "error");
  }
}

document
  .getElementById("updateBranchForm")
  .addEventListener("submit", updateData);
