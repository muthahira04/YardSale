document.addEventListener('DOMContentLoaded', () => {
    // Initialize the HTML5 QR Code scanner
    const html5QrCode = new Html5Qrcode("reader");

    const onScanSuccess = (decodedText, decodedResult) => {
        // Handle the result here
        document.getElementById("result").textContent = `Barcode scanned: ${decodedText}`;
        // Optionally, stop scanning after a successful scan
        html5QrCode.stop().catch(err => {
            console.error("Failed to stop the scanner", err);
        });
    };

    const onScanError = (errorMessage) => {
        // Handle the error here
        console.error(errorMessage);
    };

    // Start scanning with the camera
    html5QrCode.start(
        { facingMode: "environment" }, // Use the rear camera
        {
            fps: 10, // Frame rate
            qrbox: 250 // Size of the scan box
        },
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error("Unable to start the scanner", err);
    });
});
