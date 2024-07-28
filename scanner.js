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
    const database = [
        { key: 220578,value: 'Aqsah' },
        { key: 2, value: 'Value 2' },
        { key: 3, value: 'Value 3' },
        { key: 4, value: 'Value 4' },
        { key: 5, value: 'Value 5' }
      ];
      function binarySearch(array, key) {
        let low = 0;
        let high = array.length - 1;
      
        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
          const guess = array[mid].key;
      
          if (guess === key) {
            return array[mid].value;
          }
          if (guess > key) {
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }
      
        return null; // Key not found
      }
      
      // Function to get value for a given key
      function getValueForKey(key) {
        return binarySearch(database, key);
      }
      
      // Example usage
      
      const keyToFind = data.codeResult.code;
    const value = getValueForKey(keyToFind);
    console.log(`\n${value}`);
});
