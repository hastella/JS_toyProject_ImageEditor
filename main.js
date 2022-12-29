(() => {
  ("use strict");

  const get = (element) => document.querySelector(element);
  class PhotoEditor {
    constructor() {
      this.container = get("main");
      this.canvas = get("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.width = 700;
      this.height = 400;
      this.minSize = 20; // 크롭한 이미지의 최소 사이즈 설정
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx.lineWidth = 4; // 크롭할때의 선굵기 설정
      this.ctx.strokeStyle = "red";
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
    fileEvent() {}
    sepiaEvent() {}
    grayEvent() {}
    saveEvent() {}
    fileEvent() {
      this.fileInput.addEventListener("change", (event) => {
        const fileName = URL.createObjectURL(event.target.files[0]);
        const img = new Image();
        img.addEventListener("load", (e) => {
          this.width = e.path[0].naturalWidth;
          this.height = e.path[0].naturalHeight;
        });
        this.fileImage.setAttribute("src", fileName);
        img.setAttribute("src", fileName);
      });
    }
    drawEvent() {}
    drawOutput() {}
  }

  new PhotoEditor();
})();
