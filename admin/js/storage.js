const API_BASE_URL = "https://879a-117-5-34-35.ngrok-free.app/api/v1";
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;
  setTimeout(() => {
    notification.className = "notification hidden";
  }, 3000);
}
const userData = JSON.parse(localStorage.getItem("user-info"));
// Nếu có username trong localStorage, hiển thị lên trang
if (userData) {
  document.getElementById("username").textContent = userData.username;
}
