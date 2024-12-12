
function sendMessage() {
    const name = document.getElementById("userName").value;
    const phone = document.getElementById("userPhone").value;
    const message = document.getElementById("userMessage").value;

    // Kiểm tra độ dài và ký tự của số điện thoại
    const phonePattern = /^[0-9]{10}$/; // Chỉ chấp nhận 10 chữ số

    if (name && phone && message) {
        if (!phonePattern.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại số điện thoại của bạn.");
            return;
        }

        alert(`Tên: ${name}\nSố điện thoại: ${phone}\nLời nhắn: ${message}`);
        // Xử lý thêm: Gửi dữ liệu đến server, lưu vào cơ sở dữ liệu, v.v...
        document.getElementById("userName").value = "";
        document.getElementById("userPhone").value = "";
        document.getElementById("userMessage").value = "";
    } else {
        alert("Vui lòng điền đầy đủ thông tin.");
    }
}


// Hàm để chuyển đổi hiển thị câu trả lời khi người dùng nhấp vào câu hỏi
function toggleAnswer(index) {
    var faqItems = document.querySelectorAll('.faq-item');
    var faqItem = faqItems[index];

    // Nếu câu trả lời đã được mở, đóng nó lại
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
    } else {
        // Nếu chưa mở, mở câu trả lời và xoay icon
        faqItem.classList.add('active');
    }
}


// màu trang hiện tại
// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Kiểm tra xem trang hiện tại có phải là trang chủ hay không
if (currentPage === "home.html" || currentPage === "") {
    document.getElementById('home').classList.add('active'); // Áp dụng lớp active cho "Trang Chủ"
} else {
    // Nếu không phải trang chủ, áp dụng màu đen cho tất cả các mục
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Tìm và áp dụng màu xanh cho mục hiện tại
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}


// Hàm để tìm kiếm


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















