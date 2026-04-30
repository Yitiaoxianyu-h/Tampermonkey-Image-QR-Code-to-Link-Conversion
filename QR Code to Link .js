// ==UserScript==
// @name         图片二维码转链接工具
// @namespace    https://example.com/
// @version      1.0
// @description  右键点击页面时显示右下角悬浮按钮，识别图片二维码并复制链接
// @author       Yitiaoxianyu
// @match        *://*/*
// @grant        GM_setClipboard
// @require      https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js
// ==/UserScript==

(function() {
    'use strict';

    const floatBtn = document.createElement('button');
    floatBtn.textContent = '🔗 转为链接';
    floatBtn.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 999999;
        padding: 10px 16px;
        background: #1677ff;
        color: white;
        border: none;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        user-select: none;
        display: none;
    `;
    document.body.appendChild(floatBtn);

    let hideTimer = null;
    let isSelecting = false;

    floatBtn.addEventListener('mouseenter', () => {
        floatBtn.style.background = '#4096ff';
        floatBtn.style.transform = 'scale(1.05)';
        clearTimeout(hideTimer);
    });
    floatBtn.addEventListener('mouseleave', () => {
        floatBtn.style.background = '#1677ff';
        floatBtn.style.transform = 'scale(1)';
        autoHide();
    });

    document.addEventListener('contextmenu', (e) => {
        floatBtn.style.display = 'block';
        clearTimeout(hideTimer);
        autoHide();
    });

    function autoHide() {
        hideTimer = setTimeout(() => {
            if (!isSelecting) {
                floatBtn.style.display = 'none';
            }
        }, 3000);
    }

    async function recognizeQrFromImg(imgElement) {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.crossOrigin = 'anonymous';
            img.src = imgElement.src;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                GM_setClipboard(code.data);
                alert(`✅ 二维码链接已复制到剪贴板！\n链接内容：${code.data}`);
            } else {
                alert('❌ 该图片中未识别到有效二维码');
            }
        } catch (err) {
            console.error('二维码识别失败：', err);
            alert(`⚠️ 识别失败\n错误原因：${err.message}`);
        } finally {
            exitSelectMode();
        }
    }

    function enterSelectMode() {
        if (isSelecting) return;
        isSelecting = true;
        floatBtn.textContent = '点击图片识别';
        floatBtn.style.background = '#faad14';
        clearTimeout(hideTimer);
        alert('请点击页面中包含二维码的图片');

        document.querySelectorAll('img').forEach(img => {
            img.dataset.qrSelect = '1';
            img.style.cursor = 'crosshair';
            img.addEventListener('click', imgClickHandler);
        });

        document.addEventListener('click', documentClickHandler);
    }

    function exitSelectMode() {
        isSelecting = false;
        floatBtn.textContent = '🔗 转为链接';
        floatBtn.style.background = '#1677ff';
        floatBtn.style.display = 'none';

        document.querySelectorAll('img[data-qr-select="1"]').forEach(img => {
            delete img.dataset.qrSelect;
            img.style.cursor = '';
            img.removeEventListener('click', imgClickHandler);
        });

        document.removeEventListener('click', documentClickHandler);
    }

    function imgClickHandler(e) {
        e.stopPropagation();
        recognizeQrFromImg(e.currentTarget);
    }

    function documentClickHandler(e) {
        if (e.target !== floatBtn && !e.target.closest('img[data-qr-select="1"]')) {
            exitSelectMode();
        }
    }

    floatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        !isSelecting ? enterSelectMode() : exitSelectMode();
    });

})();