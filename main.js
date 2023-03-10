(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);
  class PhotoEditor {
    constructor() {
      this.container = get("main");
      this.canvas = get(".canvas");
      this.ctx = this.canvas.getContext("2d");
      this.width = 700;
      this.height = 411;
      this.minSize = 20; // 크롭한 이미지의 최소 사이즈 설정
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx.lineWidth = 4; // 크롭할때의 선굵기 설정
      this.ctx.strokeStyle = "#ff0000";
      this.targetImage = get(".image_wrap");
      this.targetCanvas = document.createElement("canvas");
      this.targetCtx = this.targetCanvas.getContext("2d");
      this.targetWidth;
      this.targetHeight;
      this.sourceX;
      this.sourceY;
      this.sourceWidth;
      this.img = new Image();
      this.btnFlip = get(".btn_flip");
      this.btnSepia = get(".btn_sepia");
      this.btnGray = get(".btn_gray");
      this.btnSave = get(".btn_save");
      this.fileDrag = get(".drag_area");
      this.fileInput = get(".drag_area input");
      this.fileImage = get(".file_image");
      this.clickEvent();
      this.fileEvent();
      this.drawEvent();
    }
    clickEvent() {}
    flipEvent() {}
    sepiaEvent() {}
    grayEvent() {}
    saveEvent() {}
    fileEvent() {
      this.fileInput.addEventListener("change", (e) => {
        const fileName = URL.createObjectURL(e.target.files[0]);
        const img = new Image();
        img.addEventListener("load", (e) => {
          this.width = e.path[0].naturalWidth;
          this.height = e.path[0].naturalHeight;
        });
        this.fileImage.setAttribute("src", fileName);
        img.setAttribute("src", fileName);
      });
    }
    drawEvent() {
      const canvasX = this.canvas.getBoundingClientRect().left;
      const canvasY = this.canvas.getBoundingClientRect().top;
      let sX, sY, eX, eY; // start X, Y & end X, Y 지점 선언
      let drawStart = false; // draw를 시작했는지에 대한 여부를 지정해준다

      this.canvas.addEventListener("mousedown", (e) => {
        sX = parseInt(e.clientX - canvasX, 10); // e.clientX 는 마우스의 X 좌표를 불러온다, 10은 10진수로 표현하기 위함
        sY = parseInt(e.clientY - canvasY, 10);
        drawStart = true;
      });

      this.canvas.addEventListener("mousemove", (e) => {
        if (!drawStart) return;
        eX = parseInt(e.clientX - canvasX, 10); // e.clientX 는 마우스의 X 좌표를 불러온다, 10은 10진수로 표현하기 위함
        eY = parseInt(e.clientY - canvasY, 10);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeRect(sX, sY, eX - sX, eY - sY);
      });

      this.canvas.addEventListener("mouseup", () => {
        drawStart = false;

        if (
          Math.abs(eX - sX) < this.minSize ||
          Math.abs(eY - sY) < this.minSize
        )
          return;

        this.drawOutput(sX, sY, eX - sX, eY - sY);
      });
    }

    drawOutput(x, y, width, height) {
      this.targetImage.innerHTML = "";
      if (Math.abs(width) <= Math.abs(height)) {
        this.targetHeight = this.height;
        this.targetWidth = (this.targetHeight * width) / height;
      } else {
        this.targetWidth = this.width;
        this.targetHeight = (this.targetWidth * height) / width;
      }
      this.targetCanvas.width = this.targetWidth;
      this.targetCanvas.height = this.targetHeight;

      this.img.addEventListener("load", () => {
        const buffer = this.img.width / this.width;
        this.sourceX = x * buffer;
        this.sourceY = y * buffer;
        this.sourceWidth = width * buffer;
        this.sourceHeight = height * buffer;
        this.targetCtx.drawImage(
          this.img,
          this.sourceX,
          this.sourceY,
          this.sourceWidth,
          this.sourceHeight,
          0,
          0,
          this.targetWidth,
          this.targetHeight
        );
      });

      this.img.src = this.fileImage.getAttribute("src");
      this.targetImage.appendChild(this.targetCanvas);
    }
  }

  new PhotoEditor();
})();
