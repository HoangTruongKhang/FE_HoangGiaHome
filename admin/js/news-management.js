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

const API_BASE_URL = "https://91ae-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

// Hiển thị form modal
document.querySelector(".add-news-button").addEventListener("click", () => {
  document.getElementById("addNewsModal").style.display = "flex";
});

// Đóng form modal
function closeModal() {
  document.getElementById("addNewsModal").style.display = "none";
}

// Đóng form modal Cập nhật tin tức
function closeEditModal() {
  document.getElementById("editNewsModal").style.display = "none";
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
  const tableBody = document.querySelector(".news-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Không tìm thấy tài khoản nào!</td></tr>`;
    return;
  }
  // Duyệt qua danh sách khách hàng và tạo các hàng cho bảng
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${item.new_id}</td>
              <td>${item.title}</td>
              <td>
                <img
                src=${item.image}
                  class="news-image"
                />
              </td>
              <td>${item.description}</td>
              <td>${item.accountUsername}</td>
              <td>${new Date(item.createDate).toLocaleDateString("en-GB")}</td>
            <td class="action-style">
                 <button class="edit-button" data-id="${
                   item.new_id
                 }">Sửa</button>
            <button class="delete-button" data-id="${item.new_id}">Xóa</button>
            </td>
          `;
    tableBody.appendChild(row);
  });
  attachRowActions();
}

async function fetchDataTable(search = "") {
  const url = search
    ? `${API_BASE_URL}/news?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/news`; // Nếu không tìm kiếm, lấy tất cả khách hàng

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
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const description = document.getElementById("description").value;
  const accountAccount_id = 1;
  const newData = {
    title,
    image,
    description,
    accountAccount_id,
  };
  console.log(newData);

  try {
    const response = await fetch(`${API_BASE_URL}/news`, {
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

document.getElementById("addNewsForm").addEventListener("submit", addNewData);

async function getDataById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
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
    document.getElementById("new_id").value = data.new_id;
    document.getElementById("edit_title").value = data.title;
    document.getElementById("edit_image").value = data.image;
    document.getElementById("edit_description").value = data.description;

    // Hiển thị modal
    document.getElementById("editNewsModal").style.display = "flex";
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
          const response = await fetch(`${API_BASE_URL}/news/${id}`, {
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
  const id = document.getElementById("new_id").value;
  const title = document.getElementById("edit_title").value;
  const image = document.getElementById("edit_image").value;
  const description = document.getElementById("edit_description").value;
  const accountAccount_id = 1;
  const dataUpdate = {
    title,
    image,
    description,
    accountAccount_id,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
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
    closeUpdateModal();
    fetchDataTable();
  } catch (error) {
    console.error("Lỗi:", error);
    showNotification("Đã xảy ra lỗi", "error");
  }
}

document.getElementById("editNewsForm").addEventListener("submit", updateData);
