const API_BASE_URL = "https://879a-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}

async function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // Lưu thông tin vào localStorage
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);

    // Hiển thị thông tin người dùng
    displayUserInfo(response.user);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

const displayUserInfo = (user) => {
  userInfo.innerHTML = `
        <h2>Welcome, ${user.name}</h2>
        <p>Email: ${user.email}</p>
        <p>User ID: ${user.id}</p>
        <button id="logoutButton">Logout</button>
      `;

  // Thêm sự kiện logout
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.clear();
    userInfo.innerHTML = "";
  });
};
