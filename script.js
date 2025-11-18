const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;

// Generate button
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

// Size change
sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

// Download button (Mobile Safe)
downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let img = document.querySelector(".qr-body img");
    let canvas = document.querySelector(".qr-body canvas");

    if (img) {
        downloadImage(img.src);
        return;
    }

    if (canvas) {
        canvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            downloadImage(url);
        });
    }
});

// Helper: download function (works on all mobiles)
function downloadImage(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "QR_Code.png";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Check input
function isEmptyInput() {
    qrText.value.length > 0 
        ? generateQRCode() 
        : alert("Enter the text or URL to generate your QR code");
}

// Generate QR Code
function generateQRCode() {
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#ffffff",
        colorDark: "#000000",
    });
}
