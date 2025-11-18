const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
let qrReady = false;

// Generate QR
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generateQRCode();
});

// Change size
sizes.addEventListener('change', (e) => {
    size = e.target.value;
    if (qrText.value.trim() !== "") generateQRCode();
});

// Download handler
downloadBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!qrReady) {
        alert("Generate the QR code first!");
        return;
    }

    const pngBlob = await convertQRToPNG();
    const url = URL.createObjectURL(pngBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "QR_Code.png";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Generate QR
function generateQRCode() {
    if (!qrText.value.trim()) {
        alert("Enter some text or URL");
        return;
    }

    qrContainer.innerHTML = "";
    qrReady = false;

    new QRCode(qrContainer, {
        text: qrText.value,
        width: size,
        height: size,
        colorLight: "#ffffff",
        colorDark: "#000000"
    });

    // ensure QR fully rendered
    setTimeout(() => {
        qrReady = true;
    }, 300);
}

// Convert QR to PNG (always works)
async function convertQRToPNG() {
    return new Promise((resolve) => {
        const img = qrContainer.querySelector("img");
        const canvas = qrContainer.querySelector("canvas");

        // If canvas already exists → convert directly
        if (canvas) {
            canvas.toBlob(resolve, "image/png");
            return;
        }

        // If image exists → draw on an OFFSCREEN canvas (mobile fix)
        if (img) {
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;

            const ctx = tempCanvas.getContext("2d");

            ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

            tempCanvas.toBlob(resolve, "image/png");
        }
    });
}
