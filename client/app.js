

(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
})();


const btnSubmit = document.getElementById("formContact");
btnSubmit.addEventListener('submit', sendInformation)

function sendInformation(e){

  e.preventDefault()
  const data = new FormData(e.target);
  data.append("address", "fernandoleonett@gmail.com");
  data.append("owner", "Fernando J H Leonett");
  btnSubmit.reset()

  const values = Object.fromEntries(data);

  try {
   
    fetch("/api/contact", {
       headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body:JSON.stringify(values)
    });

    Toastify({
      text: "Mensaje Enviado",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #007a6c, #75b703)",
      },
    }).showToast();


    
  } catch (error) {

    Toastify({
      text: "Ocurrió un error",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(#cc0d0d, #750b0b)",
      },
    }).showToast();
    

  }


}

// const btnLink = document.getElementById("file");
// btnLink.addEventListener("click", () =>
//   DownloadFile("CVEN.pdf"
//   )
// );


function DownloadFile(fileName) {
    console.log("download file");
            //Set the File URL.
            // var url = "Files/" + fileName;
            var url = "./img/"+fileName;
 
            //Create XMLHTTP Request.
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.responseType = "blob";
            req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/octetstream" });
 
                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName);
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            };
            req.send();

          }