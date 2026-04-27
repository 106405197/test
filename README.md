# 個人網頁作品集 (Personal Portfolio)

這是一個為傳播領域、影像創作者及內容企劃打造的現代靜態網頁作品集。網站使用深色系（Dark Mode）與毛玻璃（Glassmorphism）設計風格，突顯出視覺敘事與數位工具整合的氛圍。

## 專案結構

- `index.html` - 主要網頁架構與內容
- `style.css` - 網站設計樣式與動畫效果
- `main.js` - 滑動特效與互動邏輯

## 本地開發與運行

這個專案只包含純前端靜態檔案（HTML / CSS / JS），不需要依賴複雜的伺服器。你有幾種方式可以預覽它：

1. **直接開啟**：在檔案總管中雙擊 `index.html`。
2. **使用 VS Code 擴充功能**：如果你使用 VS Code 開發，可以安裝 `Live Server` 擴充套件，右鍵點擊 `index.html` 選擇 "Open with Live Server"。
3. **使用 Python 伺服器**：如果你有安裝 Python，可以在終端機的專案目錄下執行 `python -m http.server`，然後在瀏覽器開啟 `http://localhost:8000`。

## 程式碼品質與提交規範 (Pre-commit)

本專案使用 `pre-commit` 來確保程式碼在提交前的品質與格式一致性。

### 安裝與設定

1. 請確保你進入了先前建立的虛擬環境：
   ```powershell
   .venv\Scripts\activate
   ```
2. 安裝 `pre-commit`：
   ```bash
   pip install pre-commit
   # 或者是如果你使用 uv： uv pip install pre-commit
   ```
3. 安裝 pre-commit 的 git hook：
   ```bash
   pre-commit install
   ```

未來當你執行 `git commit` 時，`pre-commit` 就會自動執行 `.pre-commit-config.yaml` 裡設定好的檢查與排版（例如移除多餘空白、確保檔案結尾、Prettier 排版等）。
