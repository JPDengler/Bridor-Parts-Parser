document.addEventListener("DOMContentLoaded", function () {
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

            // Populate dropdown with sheet names
            sheetSelect.innerHTML = "";
            workbook.SheetNames.forEach(sheet => {
                excelData[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { defval: "", raw: false });

                const option = document.createElement("option");
                option.value = sheet;
                option.textContent = sheet;
                sheetSelect.appendChild(option);
            });

            // Load the first sheet by default
            sheetSelect.value = workbook.SheetNames[0];
            loadSheetData(sheetSelect.value);
        });

    sheetSelect.addEventListener("change", function () {
        loadSheetData(this.value);
    });

    filterInput.addEventListener("input", function () {
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

    function populateTable(data, sheet) {
        console.log("Populating table with data:", data);  // Debugging line
        console.log("Sheet reference:", sheet);  // Debugging line
    
        tableBody.innerHTML = "";
    
        if (!data || data.length === 0) {
            console.error("No data found for the selected sheet!");
            return;
        }
    
        data.forEach((row, rowIndex) => {
            const tr = document.createElement("tr");
            
            Object.keys(row).forEach((header, colIndex) => {
                const td = document.createElement("td");
                let cellValue = row[header] || "";
    
                // Verify if sheet[cellAddress] is accessible
                const cellAddress = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex + 2 });
                const cell = sheet ? sheet[cellAddress] : null;
    
                console.log(`Cell Address: ${cellAddress}, Value: ${cellValue}, Link:`, cell?.l?.Target); // Debugging line
    
                if (cell && cell.l && cell.l.Target) {
                    const link = document.createElement("a");
                    link.href = cell.l.Target;
                    link.textContent = cellValue || "Link";
                    link.target = "_blank";
                    td.appendChild(link);
                } else {
                    td.textContent = cellValue;
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
