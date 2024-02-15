const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Url");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      showSpinner();

      setTimeout(() => {
        const saveUrl = qr.querySelector("canvas").toDataURL();

        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

const showScanner = () => {
  const scanner = document.getElementById("qrCodeContainer");
  scanner.style.display = "block";
};

const showSpinner = () => {
  const scanner = document.getElementById("spinner");
  scanner.style.display = "block";
};

const hideSpinner = () => {
  const scanner = document.getElementById("spinner");
  scanner.style.display = "none";
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "bg-red-500 hover:bg-red-400 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.innerHTML = "Save Img";

  link.href = saveUrl;
  link.download = "qrcode.png";

  document.getElementById("generated").appendChild(link);
  spinner.style.display = "none";
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
