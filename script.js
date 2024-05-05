var model;
async function findFaces() {
  const status = document.getElementById("status");
  status.style = "display:block";
  status.innerText = "Loading model ...";
  if (!model) model = await blazeface.load();
  const img = document.querySelector("img");
  status.innerText = "Predicting...";
  const predictions = await model.estimateFaces(img, false);
  if (predictions.length > 0) {
    console.log(predictions);
    document.getElementById("status").innerText = "Face found!";
    const canvas = document.getElementById("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(250,225,6,0.5)";
    for (let i = 0; i < predictions.length; i++) {
      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
      ctx.fillRect(start[0], start[1], size[0], size[1]);
    }
  } else {
    document.getElementById("status").innerText = "No Face Found";
  }
}
document.getElementById("file").onchange = function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    const img = document.getElementById("image");
    img.src = reader.result;
    img.onload = function () {
      findFaces();
    };
  };
};
