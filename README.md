### **Bridor Vineland Plant Hub**

[**Live Version**](https://jpdengler.github.io/Bridor-Vineland-Plant-Hub/)

* * * * *

**Overview**
------------

A web-based tool designed to assist Bridor's maintenance team by providing quick access to cabinet component details, shift reports, and inventory data. The platform parses and displays parts information from Excel spreadsheets, allowing users to search, sort, and interact with embedded data.

The project is still in an **early development phase**, with several functionalities being refined and new tools planned for implementation.

* * * * *

**Features**
------------

✅ **Cabinet ID Search** - Lookup any marked component in a cabinet.\
✅ **Shift Reports** - View maintenance shift logs retrieved from emails.\
✅ **Inventory Parts Master** *(Coming Soon)* - Manage and search part data efficiently.\
✅ **Excel Parsing** - Reads `Devicelist_DRAFT.xlsx` & `Shift_Reports.xlsx` dynamically.\
✅ **Search & Sort** - Users can filter results by component, cabinet, model, or other relevant fields.\
✅ **Hyperlink Support** *(WIP)* - Embedded hyperlinks for datasheets in the **Model** and **Schematics** columns.\
✅ **Dynamic Table Rendering** - Displays data based on selected production lines.

* * * * *

**How to Run Locally**
----------------------

1.  **Clone the repository:**

    `git clone https://github.com/YOUR_GITHUB/Bridor-Vineland-Plant-Hub.git`

2.  **Start a local server:**

    `python -m http.server 8000`

3.  **Open in browser:**

    `http://127.0.0.1:8000/index.html`

* * * * *

**Current Issues & Improvements**
---------------------------------

🔄 **Hyperlink Mapping (WIP)** - Links extracted from Excel are not correctly matched to their respective components.\
🔄 **Table Formatting Adjustments** - Some tables, especially for **V6**, overflow and need a **responsive UI fix**.\
🔄 **Sorting Bugs** - Some columns do not sort correctly, and **numerical sorting behaves inconsistently**.\
🔄 **Filtering Issues** - Searching for **"Device ID 1"** returns any row containing a `1`, rather than an exact match.\
🔄 **General UI Improvements** - Enhancements for **better readability and responsiveness**.

* * * * *

**Upcoming Features & TODO**
----------------------------

📌 **Fix Hyperlink Matching** - Ensure links from **Model** and **Schematics** columns map to the correct part.\
📌 **Improve Table Formatting** - Ensure proper table sizing **across different screen resolutions**.\
📌 **Optimize Search Filtering** - Implement **exact-match searching** to avoid unintended results.\
📌 **Inventory Parts Master Tool** - Implement the **new inventory tracking feature**.\

* * * * *

**ROADMAP**
----------------------------

### 🔐 Authentication & Security
- [ ] Require **login for all users** before accessing the site  
- [ ] Implement **JWT-based authentication** with secure session storage  
- [ ] Create **User Model** (username, email, password, role)  
- [ ] Setup **login, logout, and user management API routes**  
- [ ] Enforce **role-based access** (Admin vs. User)  

### ⚙️ Backend API Development
- [ ] Convert **Cabinet ID Search & Parts Master** to pull data from **MongoDB** instead of Excel  
- [ ] Create API routes for **/api/cabinets**, **/api/parts**, and **/api/users**  
- [ ] Restrict API access to **authenticated users only**  

### 🎨 Frontend Integration
- [ ] Build a **login page & authentication flow**  
- [ ] Redirect users to login if not authenticated  
- [ ] Modify **script.js** to fetch data from the API  

### 🔒 Security Enhancements
- [ ] Secure passwords with **bcrypt.js**  
- [ ] Protect routes with **JWT middleware**  
- [ ] Implement **input validation & brute-force protection**  

* * * * *

**Maintainer**
--------------

🛠 **Joseph Dengler** - Automation Technician, Bridor Maintenance Team
