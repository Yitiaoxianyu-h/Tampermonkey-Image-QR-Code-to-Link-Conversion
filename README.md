# 图片二维码转链接工具 | Image QR Code Converter
轻量油猴脚本，右键唤起悬浮按钮，**离线识别图片二维码**并自动复制链接，不篡改浏览器原生右键菜单。
Lightweight Tampermonkey script. Show floating button on right-click, **offline QR code recognition**, auto copy link, no conflict with native right menu.

## ✨ 功能 Features
- 右键触发按钮，闲置自动隐藏 | Button shows on right-click, auto hide
- 纯本地离线解析，不上传图片 | 100% local offline decoding, no upload
- 保留浏览器原生右键 | Keep original browser right menu
- 识别结果一键复制剪贴板 | One-click copy QR content to clipboard
- 极简交互，一键开关识别模式 | Simple switch for recognition mode

## 📦 安装 Installation
1. 浏览器安装 Tampermonkey 扩展 | Install Tampermonkey
2. 新建油猴脚本，清空默认代码 | Create new userscript
3. 粘贴脚本代码并保存 | Paste & save script
4. 刷新网页即可使用 | Refresh page to use

## 📖 使用 Usage
1. 网页右键，右下角显示功能按钮 | Right-click to show bottom-right button
2. 点击按钮开启识别模式 | Click button to enable recognition
3. 点击含二维码的图片自动解析 | Click QR image to decode
4. 成功自动复制链接，失败弹窗提示 | Auto copy on success, alert on failure
5. 点击空白处关闭识别 | Click blank area to exit

## ⚠️ 注意 Notice
- 部分跨域图片存在识别限制 | CORS images may not be recognized
- 二维码需清晰完整 | Keep QR code clear & complete
- 首次运行加载依赖（仅一次）| First run load dependency once
- 需要剪贴板权限 | Require clipboard permission

## 📄 许可证 License
MIT
