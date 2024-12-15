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

// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addcustomerServiceModal").style.display = "none";
});
// Hiển thị form modal
document
  .querySelector(".add-customer-service-button")
  .addEventListener("click", () => {
    document.getElementById("addcustomerServiceModal").style.display = "flex";
  });

// Đóng form modal
function closeModal() {
  document.getElementById("addcustomerServiceModal").style.display = "none";
}

// cập nhật
document.addEventListener("DOMContentLoaded", function () {
  // Ensure modal is hidden when page loads
  document.getElementById("updatecustomerServiceModal1").style.display = "none";
});

// Function to open the modal for editing
function openEditModal1() {
  document.getElementById("updatecustomerServiceModal1").style.display =
    "block"; // Show modal
}

// Function to close the modal
function closeModal1() {
  document.getElementById("updatecustomerServiceModal1").style.display = "none"; // Hide modal
}

const API_BASE_URL = "https://879a-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

function updateTable(data) {
  const tableBody = document.querySelector(".customer-service-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy dữ liệu nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.customerService_id}</td>
            <td>${item.customerFull_name}</td>
            <td>${item.serviceServiceName}</td>
               <td>${item.quantity}</td>
            <td>${new Date(item.registerDate).toLocaleDateString("en-GB")}</td>
            <td>
                 <button class="edit-button" data-id="${
                   item.customerService_id
                 }">Sửa</button>
            <button class="delete-button" data-id="${
              item.customerService_id
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
    ? `${API_BASE_URL}/customerservices?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/customerservices`; // Nếu không tìm kiếm, lấy tất cả khách hàng

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

async function addNewData(event) {
  event.preventDefault();
  console.log(event);

  const customerCustomer_id = document.getElementById(
    "customerCustomer_id"
  ).value;
  const serviceService_id = document.getElementById("serviceService_id").value;
  const quantity = document.getElementById("add-quantity").value;

  const newData = {
    customerCustomer_id,
    serviceService_id,
    quantity,
  };
  console.log(newData);

  try {
    const response = await fetch(`${API_BASE_URL}/customerservices`, {
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
  .getElementById("addcustomerServiceForm")
  .addEventListener("submit", addNewData);

async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/customerservices/${id}`, {
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
    document.getElementById("updatecustomerServiceModal1").style.display =
      "flex";
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
          const response = await fetch(
            `${API_BASE_URL}/customerservices/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "ngrok-skip-browser-warning": "true",
              },
            }
          );

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
  const id = document.getElementById("update-id").value;
  const serviceName = document.getElementById("update-serviceName").value;
  const price = document.getElementById("update-price").value;
  const quantity = document.getElementById("update-quantity").value;
  const unit = document.getElementById("update-unit").value;
  const updateData = {
    serviceName,
    price,
    quantity,
    unit,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateData),
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
  .getElementById("updateSeviceForm")
  .addEventListener("submit", updateData);
