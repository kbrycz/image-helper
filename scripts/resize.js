const inputImage = document.getElementById("inputImage");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const errorMessage = document.getElementById("errorMessage");
const resizeBtn = document.getElementById("resizeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let imageFile = null;

inputImage.addEventListener("change", (e) => {
  imageFile = e.target.files[0];
  checkInputs();
});

widthInput.addEventListener("input", checkInputs);
heightInput.addEventListener("input", checkInputs);

function checkInputs() {
  if (imageFile && widthInput.value && heightInput.value) {
    resizeBtn.classList.remove("disabled");
    resizeBtn.disabled = false;
  } else {
    resizeBtn.classList.add("disabled");
    resizeBtn.disabled = true;
  }
}

resizeBtn.addEventListener("click", async () => {
    try {
      const resizedBlob = await resizeImage(imageFile, parseInt(widthInput.value), parseInt(heightInput.value));
      const resizedImageURL = URL.createObjectURL(resizedBlob);
      downloadBtn.href = resizedImageURL;
      downloadBtn.download = `resized-${imageFile.name}`;
      downloadBtn.style.display = "block";
    } catch (error) {
      errorMessage.textContent = "An error occurred while resizing the image. Please try again.";
    }
  });

async function resizeImage(imageFile, width, height) {
  const img = new Image();
  img.src = URL.createObjectURL(imageFile);

  const loadedImage = await new Promise((resolve) => img.onload = resolve);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return new Promise((resolve) => canvas.toBlob(resolve, imageFile.type));
}
