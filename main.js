window.onload = () => {
  //get canvas and context, store in variables
  console.log("it worked!");
  const canvas = document.getElementById("sky");
  const ctx = canvas.getContext("2d");

  //set canvas dimensions to window height and width
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  //generate snowflakes and apply attributes
  const maxFlakes = 100;
  let flakes = []; // store snowflakes

  //loop through empty flakes and apply attributes
  for (let i = 0; i < maxFlakes; i++) {
    flakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 5 + 2, // min 2px, max 7px
      d: Math.random() * 1 //snowflake density

    });
  }

  let angle = 0;

  const moveFlakes = () => {
    angle += 0.01;
    for (let i = 0; i < maxFlakes; i++) {
      //store current snowflake
      let f = flakes[i];

      //update x and y coordinates for each snowflake
      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 2;

      //if snowflake reaches bottom, make new one on top
      if (f.y > h) {
        flakes[i] = {
          x: Math.random() * w,
          y: 0,
          r: f.r,
          d: f.d
        };
      }
    }
  }

  //draw flakes on to canvas
  const drawFlakes = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < maxFlakes; i++) {
      let f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  setInterval(drawFlakes, 25);

}
