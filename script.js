// Load the COCO-SSD model.
let model;
async function loadModel() {
    model = await cocoSsd.load();
}

// Perform object detection on the selected image.
async function detectObjects() {
    const imageInput = document.getElementById("imageInput");
    const outputCanvas = document.getElementById("outputCanvas");
    const objectList = document.getElementById("objectList");

    const image = document.createElement("img");
    image.src = URL.createObjectURL(imageInput.files[0]);

    image.onload = async () => {
        const predictions = await model.detect(image);

        const ctx = outputCanvas.getContext("2d");
        ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
        ctx.drawImage(image, 0, 0, outputCanvas.width, outputCanvas.height);

        objectList.innerHTML = ""; // Clear previous object list

        predictions.forEach((prediction) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${prediction.class} (${Math.round(
                prediction.score * 100
            )}%)`;
            objectList.appendChild(listItem);

            ctx.beginPath();
            ctx.rect(
                prediction.bbox[0],
                prediction.bbox[1],
                prediction.bbox[2],
                prediction.bbox[3]
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
            ctx.stroke();
        });

        outputCanvas.style.display = "block";
    };
}

// Attach event listener to the Detect Objects button.
const detectButton = document.getElementById("detectButton");
detectButton.addEventListener("click", detectObjects);

// Load the model when the page loads.
loadModel();