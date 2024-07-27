document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const result = document.getElementById('result');

    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: video, // Or '#video' (this might work for some setups)
            constraints: {
                facingMode: "environment" // Or "user" for the front camera
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        result.textContent = `Barcode: ${data.codeResult.code}`;
        Quagga.stop();
    });
});
