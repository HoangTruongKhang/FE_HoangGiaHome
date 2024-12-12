const API_BASE_URL = "https://e609-117-5-34-35.ngrok-free.app/api/v1";
// Lấy tên trang hiện tại từ URL

function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}
const currentPage = window.location.pathname.split("/").pop();
function clearForm() {
  const form = document.getElementById("addCustomerForm");
  form.reset();
}
document
  .getElementById("updateCustomerForm")
  .addEventListener("submit", updateCustomer);
function closeCreateModal() {
  document.getElementById("addCustomerModal").style.display = "none";
  clearForm();
}
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

// Hiển thị form modal
<<<<<<< HEAD
document.querySelector('.add-customer-button').addEventListener('click', () => {
    document.getElementById('addCustomerModal').style.display = 'flex';
=======
document.querySelector(".add-customer-button").addEventListener("click", () => {
  document.getElementById("addCustomerModal").style.display = "flex";
>>>>>>> e22bbeeaa86597161b8b2e1ae7d4a8b700fa194c
});

// Đóng form modal
function closeModal() {
<<<<<<< HEAD
    document.getElementById('addCustomerModal').style.display = 'none';
}

// Xử lý form submit
document.getElementById('addCustomerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Dữ liệu gửi đi:', data);
    closeModal();
});

// Mở modal Cập nhật tài khoản khi click vào nút "Sửa"
document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-button");
    const updateModal = document.getElementById("updateCustomerModal");
    const closeModalButtons = document.querySelectorAll(".close, .close-button");

    // Lấy các trường trong modal để điền dữ liệu
    const customerIdField = document.getElementById("update-customer_id");
    const fullNameField = document.getElementById("full-name");
    const cmtCccdField = document.getElementById("cmt-cccd");
    const phoneNumberField = document.getElementById("phone-number");
    const emailField = document.getElementById("email");
    const birthDateField = document.getElementById("birth_date");
    const addressField = document.getElementById("address");
    const branchField = document.getElementById("branch");
    const roomField = document.getElementById("room");
    const createDateField = document.getElementById("create_date");

    // Hiển thị modal cập nhật với thông tin của khách hàng được chọn
    editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr"); // Lấy dòng (row) chứa khách hàng
            const cells = row.querySelectorAll("td"); // Lấy tất cả các ô (cell) trong dòng

            // Điền thông tin vào modal
            customerIdField.value = cells[0].textContent.trim(); // Mã khách hàng
            fullNameField.value = cells[1].textContent.trim(); // Tên khách hàng
            cmtCccdField.value = "123456789"; // Giả định dữ liệu mẫu
            phoneNumberField.value = cells[3].textContent.trim(); // Số điện thoại
            emailField.value = "example@gmail.com"; // Giả định dữ liệu mẫu
            birthDateField.value = "01/01/1990"; // Giả định dữ liệu mẫu
            addressField.value = "Hà Nội"; // Giả định dữ liệu mẫu
            branchField.value = "tp_hanoi"; // Giả định dữ liệu mẫu
            roomField.value = "Phòng 101"; // Giả định dữ liệu mẫu
            createDateField.value = cells[5].textContent.trim(); // Ngày tạo

            // Hiển thị modal
            updateModal.style.display = "flex";
        });
    });

    // Đóng modal khi nhấn "Thoát" hoặc "X"
    closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateModal.style.display = "none";
        });
    });

    // Đóng modal khi nhấn ra ngoài vùng modal
    window.addEventListener("click", (event) => {
        if (event.target === updateModal) {
            updateModal.style.display = "none";
        }
    });

    // Xử lý gửi dữ liệu cập nhật (Submit)
    const updateForm = document.getElementById("updateCustomerForm");
    updateForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Ngăn form gửi đi
        alert("Thông tin khách hàng đã được cập nhật thành công!");
        updateModal.style.display = "none"; // Đóng modal sau khi cập nhật
    });
});
=======
  document.getElementById("addCustomerModal").style.display = "none";
  clearForm();
}

// Xử lý form submit
document.getElementById("addCustomerModal").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log("Dữ liệu gửi đi:", data);
  closeModal();
});

function updateCustomerTable(customers) {
  const customerTableBody = document.querySelector(".customer-table tbody");
  customerTableBody.innerHTML = ""; // Clear existing rows
  if (customers.length === 0) {
    customerTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy tài khoản nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${customer.customer_id}</td>
        <td>${customer.full_name}</td>
        <td>${customer.phone_number}</td>
        <td>${customer.joinDate}</td>
        <td>
             <button class="edit-button" data-id="${customer.customer_id}">Sửa</button>
        <button class="delete-button" data-id="${customer.customer_id}">Xóa</button>
        </td>
      `;
    customerTableBody.appendChild(row);
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

async function fetchCustomerData(search = "") {
  const url = search
    ? `${API_BASE_URL}/customers?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/customers`; // Nếu không tìm kiếm, lấy tất cả khách hàng

  const data = await fetchData(url);
  updateCustomerTable(data?.content || []); // Cập nhật bảng khách hàng
}

async function searchFunction() {
  const searchValue = document.getElementById("search-id").value.trim();
  fetchCustomerData(searchValue);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCustomerData();
});

async function addNewCustomer(event) {
  event.preventDefault();
  console.log(event);

  const fullName = document.getElementById("full_name").value;
  const cmnd = document.getElementById("cmnd").value; // Assuming there's an input field for CMND
  const phoneNumber = document.getElementById("phone_number").value;
  const email = document.getElementById("email").value; // Assuming there's an input field for email
  const birthDate = document.getElementById("birth_date").value; // Assuming there's an input field for birth date
  const address = document.getElementById("address").value; // Assuming there's an input field for address
  const joinDate = document.getElementById("join_date").value; // Assuming there's an input field for join date
  const branch = document.getElementById("branchBranch_id").value;
  const room = document.getElementById("roomRoom_id").value; // Assuming there's an input field for room ID

  const newCustomerData = {
    full_name: fullName,
    cmnd,
    phone_number: phoneNumber,
    email,
    birth_date: birthDate,
    address,
    joinDate,
    branchBranch_id: branch,
    roomRoom_id: room,
  };
  console.log(newCustomerData);

  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCustomerData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    showNotification("Thêm tài khoản thành công!", "success");
    closeModal();
    fetchCustomerData();
  } catch (error) {
    console.error("Lỗi khi thêm tài khoản mới:", error);
    showNotification("Đã xảy ra lỗi khi thêm tài khoản mới!", "error");
  }
}

document
  .getElementById("addCustomerForm")
  .addEventListener("submit", addNewCustomer);

function attachRowActions() {
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const customerId = button.dataset.id;
      openUpdateModal(customerId);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const customerId = button.dataset.id;
      if (confirm(`Bạn có chắc muốn xóa tài khoản: ${customerId}?`)) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/customers/${customerId}`,
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

          showNotification("Xóa tài khoản thành công!", "success");
          fetchCustomerData();
        } catch (error) {
          console.error("Lỗi khi xóa tài khoản:", error);
          showNotification("Đã xảy ra lỗi khi xóa tài khoản!", "error");
        }
      }
    });
  });
}

function closeUpdateModal() {
  document.getElementById("updateCustomerModal").style.display = "none";
}
async function getCustomerById(accountId) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${accountId}`, {
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
    return await response.json(); // Trả về dữ liệu tài khoản
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
  }
}
async function openUpdateModal(customerId) {
  const customer = await getCustomerById(customerId);
  console.log(  );
  
  if (customer) {
    document.getElementById("update-customer_id").value = customer.customer_id;
    document.getElementById("update-full_name").value = customer.full_name;
    document.getElementById("update-cmnd").value = customer.cmnd;
    document.getElementById("update-phone_number").value = customer.phone_number;
    document.getElementById("update-email").value = customer.email;
    document.getElementById("update-birth_date").value = customer.birth_date;
    document.getElementById("update-address").value = customer.address;
    document.getElementById("update-join_date").value = customer.joinDate;
    document.getElementById("update-roomRoom_id").value = customer.roomRoom_id;

    // Hiển thị modal
    document.getElementById("updateCustomerModal").style.display = "block";
  }
}

async function updateCustomer(event) {
  event.preventDefault();
console.log();
const customerId = document.getElementById("update-customer_id").value;
  const updatedCustomerData = {
    full_name: document.getElementById("update-full_name").value,
    cmnd: document.getElementById("update-cmnd").value,
    phone_number: document.getElementById("update-phone_number").value,
    email: document.getElementById("update-email").value,
    birth_date: document.getElementById("update-birth_date").value,
    address: document.getElementById("update-address").value,
    joinDate: document.getElementById("update-join_date").value,
    branchBranch_id: document.getElementById("update-branchBranch_id").value,
    roomRoom_id: document.getElementById("update-roomRoom_id").value,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
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
    fetchCustomerData(); // Lấy lại danh sách tài khoản để hiển thị
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    showNotification("Đã xảy ra lỗi khi cập nhật tài khoản!", "error");
  }
}
>>>>>>> e22bbeeaa86597161b8b2e1ae7d4a8b700fa194c
