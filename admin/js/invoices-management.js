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

/// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Hàm mở modal chi tiết hóa đơn
function openInvoiceDetails() {
  document.getElementById("invoiceModal").style.display = "flex"; // Hiển thị modal
}

// Hàm đóng modal chi tiết hóa đơn
function closeInvoiceModal() {
  document.getElementById("invoiceModal").style.display = "none"; // Ẩn modal
}

// Hàm lưu hóa đơn dưới dạng PDF (giả sử bạn có hàm này)
function saveInvoiceAsPDF() {
  alert("Lưu hóa đơn dưới dạng PDF!");
}

// /// thêm mới invoice
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addInvoiceModal").style.display = "none";
});

// Mở modal khi nhấn vào nút "Thêm hóa đơn"
function openModal() {
  document.getElementById("addInvoiceModal").style.display = "flex";
}

// Đóng modal khi nhấn nút đóng
function closeModal() {
  document.getElementById("addInvoiceModal").style.display = "none";
}

// /// Update invoice
// Khi trang tải, ẩn modal
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("updateInvoiceModal").style.display = "none";
});

// Mở modal khi nhấn vào nút "sửa"
function openEditModal() {
  document.getElementById("updateInvoiceModal").style.display = "flex";
}

// Đóng modal khi nhấn nút đóng
function closeModal1() {
  document.getElementById("updateInvoiceModal").style.display = "none";
}

// Danh sách các options cho invoice_name
let invoiceOptions = [
  { id: 1, value: "Dịch vụ 1" },
  { id: 2, value: "Dịch vụ 2" },
  { id: 3, value: "Dịch vụ 3" },
];

// Biến lưu giá trị đã chọn của combobox
let lastSelectedInvoiceId = 1; // Mặc định chọn Invoice 1

// Hàm thêm row mới
function add_row() {
  const newFields = [
    "branchBranch_id",
    "roomRoom_id",
    "customerCustomer_id",
    "serviceService_id",
    "oldElectricNumber",
    "newElectricNumber",
    "quantity",
    "totalPrice",
    "note",
  ];

  const newValues = newFields.map((field) => {
    const input = document.getElementById(field);
    const value = input.value;
    input.value = ""; // Xóa giá trị sau khi thêm
    return value;
  });

  const table = document.getElementById("data_table");
  const tableLen = table.rows.length - 1;

  let rowHTML = `<tr id='row${tableLen}'>`;

  // Tạo combobox cho invoice_name
  rowHTML += `
    <td id="invoice_name_row${tableLen}">
      <select class="invoice_name-select" id="invoice_name${tableLen}">
        ${invoiceOptions
          .map(
            (option) => `<option value="${option.id}">${option.value}</option>`
          )
          .join("")}
      </select>
    </td>
  `;

  newFields.forEach((field, index) => {
    rowHTML += `<td id='${field}_row${tableLen}'>${newValues[index]}</td>`;
  });

  rowHTML += `
    <td class='action-table-create'>
      <input type='button' id='edit_button${tableLen}' value='Edit' class='edit-button' onclick='edit_row(${tableLen})'>
      <input type='button' id='save_button${tableLen}' value='Save' class='edit-button' style='display:none;' onclick='save_row(${tableLen})'>
      <input type='button' value='Delete' class='delete-button' onclick='delete_row(${tableLen})'>
    </td>
  </tr>`;

  table.insertRow(tableLen).outerHTML = rowHTML;
}

// Hàm chỉnh sửa hàng
function edit_row(no) {
  document.getElementById("edit_button" + no).style.display = "none";
  document.getElementById("save_button" + no).style.display = "block";

  // Lấy giá trị hiện tại của combobox và lưu vào biến lastSelectedInvoiceId
  const invoiceSelect = document.getElementById(`invoice_name${no}`);
  lastSelectedInvoiceId = Number(invoiceSelect.value);

  // Chuyển các ô còn lại sang chế độ chỉnh sửa
  const fields = [
    "branchBranch_id",
    "roomRoom_id",
    "customerCustomer_id",
    "serviceService_id",
    "oldElectricNumber",
    "newElectricNumber",
    "quantity",
    "totalPrice",
    "note",
  ];

  fields.forEach((field) => {
    const cell = document.getElementById(`${field}_row${no}`);
    const data = cell.innerHTML;
    cell.innerHTML = `<input type='text' id='${field}_text${no}' value='${data}'>`;
  });
}

// Hàm lưu hàng sau khi chỉnh sửa
function save_row(no) {
  document.getElementById("edit_button" + no).style.display = "block";
  document.getElementById("save_button" + no).style.display = "none";

  // Cập nhật giá trị của combobox vào biến lastSelectedInvoiceId
  const invoiceSelect = document.getElementById(`invoice_name${no}`);
  lastSelectedInvoiceId = Number(invoiceSelect.value);

  // Lấy giá trị từ input và cập nhật vào các ô
  const fields = [
    "branchBranch_id",
    "roomRoom_id",
    "customerCustomer_id",
    "serviceService_id",
    "oldElectricNumber",
    "newElectricNumber",
    "quantity",
    "totalPrice",
    "note",
  ];

  fields.forEach((field) => {
    const inputValue = document.getElementById(`${field}_text${no}`).value;
    document.getElementById(`${field}_row${no}`).innerHTML = inputValue;
  });
}

// Hàm xóa hàng
function delete_row(no) {
  document.getElementById("row" + no).outerHTML = "";
}

function get_table_data() {
  const table = document
    .getElementById("data_table")
    .getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");
  const data = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowData = {
      invoice_name: row.querySelector(`#invoice_name${i}`)?.value || "", // Dùng .value để lấy giá trị combobox
      branchBranch_id:
        row.querySelector(`#branchBranch_id_row${i}`)?.innerText || "",
      roomRoom_id: row.querySelector(`#roomRoom_id_row${i}`)?.innerText || "",
      customerCustomer_id:
        row.querySelector(`#customerCustomer_id_row${i}`)?.innerText || "",
      serviceService_id:
        row.querySelector(`#serviceService_id_row${i}`)?.innerText || "",
      oldElectricNumber:
        row.querySelector(`#oldElectricNumber_row${i}`)?.innerText || "",
      newElectricNumber:
        row.querySelector(`#newElectricNumber_row${i}`)?.innerText || "",
      quantity: row.querySelector(`#quantity_row${i}`)?.innerText || "",
      totalPrice: row.querySelector(`#totalPrice_row${i}`)?.innerText || "",
      note: row.querySelector(`#note_row${i}`)?.innerText || "",
    };
    data.push(rowData);
  }

  return data;
}

function submitModal() {
  const data = get_table_data();
  console.log(data); // Kiểm tra dữ liệu
}

function submitModal() {
  const data = get_table_data();
  console.log(data);
}
