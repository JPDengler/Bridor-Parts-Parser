document.addEventListener("DOMContentLoaded", function() {
    const filterInput = document.getElementById("filterInput");
    const tableBody = document.getElementById("tableBody");
    const tableHeaders = document.getElementById("tableHeaders");
    let excelData = [];
    let currentSortColumn = null;
    let sortAscending = true;

    fetch("PartsMaster.xlsx")
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
            const sheetName = workbook.SheetNames[0]; // Load first sheet
            excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });

            if (excelData.length === 0) {
                console.error("Excel file is empty or not properly formatted.");
                return;
            }

            loadTable();
        })
        .catch(error => console.error("Error loading Excel file:", error));

    function loadTable() {
        tableHeaders.innerHTML = "";
        tableBody.innerHTML = "";

        if (excelData.length === 0) return;

        // Create table headers
        const headers = Object.keys(excelData[0]);
        headers.forEach((header, index) => {
            const th = document.createElement("th");
            th.textContent = header;
            th.classList.add("sortable");
            th.addEventListener("click", () => sortTableByColumn(index));
            tableHeaders.appendChild(th);
        });

        populateTable(excelData);
    }

    function populateTable(data) {
        tableBody.innerHTML = "";
        data.forEach(row => {
            const tr = document.createElement("tr");
            Object.keys(row).forEach(header => {
                const td = document.createElement("td");
                td.textContent = row[header] || "";
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    filterInput.addEventListener("input", function() {
        const filterText = this.value.toLowerCase();
        const filteredData = excelData.filter(row => 
            Object.values(row).some(value => 
                String(value).toLowerCase().includes(filterText)
            )
        );
        populateTable(filteredData);
    });

    function sortTableByColumn(columnIndex) {
        if (currentSortColumn === columnIndex) {
            sortAscending = !sortAscending;
        } else {
            currentSortColumn = columnIndex;
            sortAscending = true;
        }

        excelData.sort((a, b) => {
            const aValue = Object.values(a)[columnIndex] || "";
            const bValue = Object.values(b)[columnIndex] || "";
            return sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });

        populateTable(excelData);
    }
});
