# Bridor Parts Parser

https://jpdengler.github.io/Bridor-Parts-Parser/

## Overview
A web-based tool to parse and display parts data from `Devicelist_DRAFT.xlsx` currently. Users can select a production line, filter/search data, and view sortable tables with hyperlinks. Project is a work in progress and in a early / development state with useless and missing code.

## Features
- Loads Excel data automatically.
- Sheet selection for different lines.
- Search and sorting functionality.
- Retains embedded hyperlinks.

## How to Run
1. Clone the repo:
   ```sh
   git clone https://github.com/YOUR_GITHUB/Bridor-Parts-Parser.git
   ```
2. Start a local server:
   ```sh
   python -m http.server 8000
   ```
3. Open in browser:
   ```
   http://127.0.0.1:8000/index.html
   ```

## Deployment
Enable **GitHub Pages** in repo settings to host online.

## TODO
- Restore hyperlink functionality from excel worksheet to generated table.
- Improve sorting cabilities on all columns, some work some do not. Sorting can be buggy as well.
- Fix querying, results vary; sometimes shows too many entries. ie. Searching for device id 1, shows any row with 1 in it.
- Improve UI layout and feedback.
     - Fix formatting issues.
- Make it look pretty.

---
**Maintainer**: *Joseph Dengler / Automation Technician / Bridor Maintenance Team*

