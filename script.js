document.addEventListener("DOMContentLoaded", function() {
    const sheetSelect = document.getElementById("sheetSelect");
    const filterInput = document.getElementById("filterInput");
    const tableBody = document.getElementById("tableBody");
    const tableHeaders = document.getElementById("tableHeaders");
    let excelData = {};
    let currentSortColumn = null;
    let sortAscending = true;

    fetch("Devicelist_DRAFT.xlsx")
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
            workbook.SheetNames.forEach(sheet => {
                excelData[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "" });
                const option = document.createElement("option");
                option.value = sheet;
                option.textContent = sheet;
                sheetSelect.appendChild(option);
            });
            loadSheetData(sheetSelect.value);
        });

    sheetSelect.addEventListener("change", function() {
        loadSheetData(this.value);
    });

    filterInput.addEventListener("input", function() {
        const filterText = this.value.toLowerCase();
        Array.from(tableBody.children).forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(filterText) ? "" : "none";
        });
    });

    function loadSheetData(sheetName) {
        tableHeaders.innerHTML = "";
        tableBody.innerHTML = "";

        if (!excelData[sheetName] || excelData[sheetName].length === 0) return;

        const headers = Object.keys(excelData[sheetName][0]);
        headers.forEach((header, index) => {
            const th = document.createElement("th");
            th.textContent = header;
            th.classList.add("sortable");
            th.addEventListener("click", () => sortTableByColumn(index));
            tableHeaders.appendChild(th);
        });

        populateTable(excelData[sheetName]);
    }

    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach(row => {
            const tr = document.createElement("tr");
            Object.keys(row).forEach(header => {
                const td = document.createElement("td");
                const cellValue = row[header];
                
                if (typeof cellValue === "string" && cellValue.includes("http")) {
                    const linkMatch = cellValue.match(/(http[^\s]+)/);
                    if (linkMatch) {
                        const a = document.createElement("a");
                        a.href = linkMatch[0];
                        a.target = "_blank";
                        a.textContent = cellValue.replace(linkMatch[0], "").trim() || "Link";
                        td.appendChild(a);
                    } else {
                        td.textContent = cellValue;
                    }
                } else {
                    td.textContent = cellValue || "";
                }
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    function sortTableByColumn(columnIndex) {
        const sheetName = sheetSelect.value;
        const data = excelData[sheetName];

        if (currentSortColumn === columnIndex) {
            sortAscending = !sortAscending;
        } else {
            currentSortColumn = columnIndex;
            sortAscending = true;
        }

        data.sort((a, b) => {
            const aValue = Object.values(a)[columnIndex] || "";
            const bValue = Object.values(b)[columnIndex] || "";
            if (!isNaN(aValue) && !isNaN(bValue)) {
                return sortAscending ? aValue - bValue : bValue - aValue;
            } else {
                return sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });

        populateTable(data);
    }
});
