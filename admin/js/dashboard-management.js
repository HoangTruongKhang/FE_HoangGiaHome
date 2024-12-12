// Lấy tên trang hiện tại từ URL
const currentPage = window.location.pathname.split('/').pop();

// Lấy tất cả các liên kết trong menu
const menuLinks = document.querySelectorAll('.admin-dashboard nav ul li a');

// Kiểm tra và áp dụng màu nền cho mục "Dashboard" khi trang là dashboard.html
menuLinks.forEach(link => {
    if (link.href.includes(currentPage)) {
        link.classList.add('active'); // Thêm lớp "active" cho mục hiện tại
    } else {
        link.classList.remove('active'); // Loại bỏ lớp "active" cho các mục còn lại
    }
});


// Revenue Chart

// Dữ liệu cho biểu đồ doanh thu
const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'], // Tháng
    datasets: [{
        label: 'Doanh thu (VND)',
        data: [5000000, 6000000, 7000000, 6500000, 8000000, 9000000], // Doanh thu trong từng tháng
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true
    }]
};

// Dữ liệu cho biểu đồ số lượng khách hàng
const customerData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'], // Tháng
    datasets: [{
        label: 'Số lượng khách hàng',
        data: [10, 12, 15, 13, 17, 20], // Số lượng khách hàng trong từng tháng
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 1,
        fill: true
    }]
};

// Tạo biểu đồ doanh thu
const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
new Chart(ctxRevenue, {
    type: 'line', // Kiểu biểu đồ đường
    data: revenueData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true
            }
        }
    }
});

// Tạo biểu đồ số lượng khách hàng
const ctxCustomer = document.getElementById('customerChart').getContext('2d');
new Chart(ctxCustomer, {
    type: 'bar', // Kiểu biểu đồ cột
    data: customerData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true
            }
        }
    }
});



