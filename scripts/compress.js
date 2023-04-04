(function() {
    const inputImage = document.getElementById("inputImage");
    const errorMessage = document.getElementById("errorMessage");
    const compressBtn = document.getElementById("compressBtn");
    const downloadBtn = document.getElementById("downloadBtn");
  
    inputImage.addEventListener('change', handleFileInputChange);
  
    function handleFileInputChange(e) {
        const file = e.target.files[0];
        if (!file) return;
      
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          errorMessage.textContent =
            "Invalid file format. Please upload a JPEG or PNG image.";
          compressBtn.disabled = true;
          compressBtn.classList.remove('enabled');
          compressBtn.classList.add('disabled');
        } else {
          errorMessage.textContent = "";
          compressBtn.disabled = false;
          compressBtn.classList.remove('disabled');
          compressBtn.classList.add('enabled');
        }
      }
      
  
    compressBtn.addEventListener("click", () => {
      const file = inputImage.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
          const compressedDataUrl = canvas.toDataURL(file.type, 0.5);
          downloadBtn.href = compressedDataUrl;
          downloadBtn.download =
            "compressed-image." + (file.type === "image/jpeg" ? "jpg" : "png");
          downloadBtn.style.display = "inline-block";
        };
      };
    });
  })();
  