closeLoginForm.addEventListener("click", function () {
  window.location.href = "login.html";
});
const API_BASE_URL = "https://1ceb-117-5-34-35.ngrok-free.app/api/v1";
// Lấy các phần tử cần thiết
const form = document.getElementById("form-login");
const usernameInput = document.querySelector(
  'input[placeholder="Tên đăng nhập"]'
);
const lastNameInput = document.querySelector('input[placeholder="Họ của bạn"]');
const firstNameInput = document.querySelector(
  'input[placeholder="Tên của bạn"]'
);
const phoneInput = document.querySelector(
  'input[placeholder="Nhập số điện thoại"]'
);
const email = document.querySelector('input[placeholder="Nhập Email"]');
const passwordInput = document.querySelector(
  'input[placeholder="Nhập mật khẩu"]'
);
const confirmPasswordInput = document.querySelector(
  'input[placeholder="Nhập lại mật khẩu"]'
);
const eyeToggle = document.getElementById("eye");
const eyeToggle1 = document.getElementById("eye1");
const closeForm = document.getElementById("closeLoginForm");

// Hàm hiển thị/ẩn mật khẩu
function togglePasswordVisibility(input, icon) {
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

eyeToggle.addEventListener("click", () => {
  const icon = eyeToggle.querySelector("i");
  togglePasswordVisibility(passwordInput, icon);
});

eyeToggle1.addEventListener("click", () => {
  const icon = eyeToggle1.querySelector("i");
  togglePasswordVisibility(confirmPasswordInput, icon);
});

// Đóng form
closeForm.addEventListener("click", () => {
  document.getElementById("wrapper").style.display = "none";
});

async function register(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const firstName = firstNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Kiểm tra dữ liệu đầu vào
  if (
    !username ||
    !lastName ||
    !firstName ||
    !phone ||
    !password ||
    !confirmPassword ||
    !email
  ) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  if (!/^[\w.]{4,20}$/.test(username)) {
    alert("Tên đăng nhập phải từ 4-20 ký tự và không chứa ký tự đặc biệt.");
    return;
  }

  if (!/^\d{10,11}$/.test(phone)) {
    alert("Số điện thoại không hợp lệ.");
    return;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu nhập lại không khớp.");
    return;
  }

  // Dữ liệu hợp lệ, gửi thông tin đăng ký
  const userData = {
    username,
    password,
    last_name: lastName,
    first_name: firstName,
    full_name: lastName + firstName,
    phone_number: phone,
    accountEmail: email,
    branchBranch_id: 1,
  };

  console.log("Gửi dữ liệu:", userData);
  // Giả sử có API endpoint là /api/register
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
}
document.getElementById("form-register").addEventListener("submit", register);
