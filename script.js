// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const qrDataInput = document.getElementById('qr-data');
    const generateBtn = document.getElementById('generate-btn');
    const qrCanvas = document.getElementById('qr-canvas');
    // const qrImage = document.getElementById('qr-image'); // Uncomment if using <img>
    const errorMessageDiv = document.getElementById('error-message');
    const qrContainer = document.getElementById('qr-container'); // Get the container

    generateBtn.addEventListener('click', generateQRCode);
    qrDataInput.addEventListener('keypress', function(event) {
        // Check if the key pressed was 'Enter'
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault(); // Prevent default form submission if applicable
            generateQRCode();
        }
    });


    function generateQRCode() {
        const data = qrDataInput.value.trim(); // Get data and remove whitespace
        errorMessageDiv.textContent = ''; // Clear previous errors
        qrContainer.style.display = 'none'; // Hide container while generating/if error

        // --- Clear Previous QR Code ---
        // For Canvas: Clear the canvas
        const ctx = qrCanvas.getContext('2d');
        ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
        qrCanvas.style.display = 'none'; // Hide canvas initially

        // For Image: Clear the src (Uncomment if using <img>)
        // qrImage.src = '';
        // qrImage.style.display = 'none';


        if (!data) {
            errorMessageDiv.textContent = 'Please enter data to generate a QR code.';
            qrDataInput.focus();
            return; // Stop if input is empty
        }

        // --- QR Code Generation Options ---
        const qrCodeOptions = {
            errorCorrectionLevel: 'H', // High error correction (L, M, Q, H)
            type: 'image/png',        // Output type (used for toDataURL)
            quality: 0.92,            // Image quality (for JPEG/WEBP)
            margin: 1,                // Margin around QR code (units depend on context)
            width: 200,               // Desired width of the QR code output in pixels
            color: {
                dark: "#000000",      // Color of the dark modules (black)
                light: "#FFFFFF"      // Color of the light modules (white)
            }
        };

        // --- Method 1: Generate to Canvas ---
        QRCode.toCanvas(qrCanvas, data, qrCodeOptions, function (error) {
            if (error) {
                console.error('QR Code Generation Error:', error);
                errorMessageDiv.textContent = 'Error generating QR code. Check console for details.';
                qrContainer.style.display = 'none'; // Keep hidden on error
            } else {
                console.log('QR Code generated successfully on canvas!');
                qrCanvas.style.display = 'block';  // Show the canvas
                qrContainer.style.display = 'flex'; // Show the container again
            }
        });

        /*
        // --- Method 2: Generate as Data URL for <img> tag ---
        // Uncomment this block and comment out the QRCode.toCanvas block above
        // Also, make sure the <img> tag is present in the HTML and the <canvas> is commented out or removed.

        QRCode.toDataURL(data, qrCodeOptions, function (error, url) {
            if (error) {
                console.error('QR Code Generation Error:', error);
                errorMessageDiv.textContent = 'Error generating QR code. Check console for details.';
                qrContainer.style.display = 'none'; // Keep hidden on error
            } else {
                console.log('QR Code generated successfully as Data URL!');
                qrImage.src = url;                  // Set the image source
                qrImage.style.display = 'block';    // Show the image
                qrContainer.style.display = 'flex'; // Show the container again
            }
        });
        */
    }
});
