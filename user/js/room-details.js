// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "room-details.html" || currentPage === "") {
  document.getElementById("chitietphong").classList.add("active");
} else {
  // Nếu không phải trang dịch vụ, áp dụng màu đen cho tất cả các mục
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

const API_BASE_URL = "https://d8fc-117-5-34-35.ngrok-free.app/api/v1";
// cuộn ảnh thủ công
function scrollGallery(distance) {
  const gallery = document.querySelector(".image-gallery");
  gallery.scrollBy({ left: distance, behavior: "smooth" });
}

// lấy chi tiết phòng từ 1 phòng bất kỳ
// Lấy tham số room từ URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("room");

document.addEventListener("DOMContentLoaded", function () {
  const link = document.querySelector(".book-now"); // Chọn thẻ <a> có class "book-now"

  if (link && roomId) {
    link.href = `booking.html?room=${roomId}`;

    console.log("Updated href on load:", link.href);
  }
});
// Ẩn tất cả các chi tiết phòng trước
document.querySelectorAll(".room-detail").forEach((room) => {
  room.style.display = "none";
});

const selectedRoom = document.querySelector(`.room-detail`);
selectedRoom.style.display = "block";
// Hiển thị chi tiết phòng tương ứng với roomId
if (roomId) {
  console.log(roomId);
  displayData(roomId);
}

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

async function displayData(id) {
  const data = await getDataById(id);
  console.log(data);
  if (data) {
    // Hiển thị thông tin phòng
    document.getElementById("room-name").textContent = data.room_name;
    document.getElementById("room-name1").textContent = data.room_name;
    document.getElementById("room-price").textContent = data.price;
    document.getElementById("room-price1").textContent = data.price;
    document.getElementById("room-description").textContent = data.description;
    document.getElementById("branch-address").textContent = data.branchAddress;
    document.getElementById("bedrooms").src = data.bedrooms;
    document.getElementById("direction").src = data.direction;
    document.getElementById("maxPeople").src = data.maxPeople;
    document.getElementById("roomType").src = data.roomType;
    document.getElementById("furniture").textContent = data.furniture;
    document.getElementById("roomServices").textContent = data.roomServices;
  }
}
