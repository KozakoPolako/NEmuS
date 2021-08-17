

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

export default class Screen {
    
    constructor(canvas) {

        this.w = canvas.width/SCREEN_WIDTH;
        this.h = canvas.height/SCREEN_HEIGHT;
        this.cnv = canvas;
        this.ctx = this.cnv.getContext("2d");


        this.tempCnv = document.createElement('canvas');
        this.tempCnv.width = SCREEN_WIDTH;
        this.tempCnv.height = SCREEN_HEIGHT;
        this.tempCtx = this.tempCnv.getContext("2d");
        this.ctx.scale(this.w, this.h);
        //this.ctx.scale( this.w, this.h);

        this.imageData = this.ctx.getImageData(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); 

        this.buf = new ArrayBuffer(this.imageData.data.length);

        this.buf8 = new Uint8ClampedArray(this.buf);
        this.buf32 = new Uint32Array(this.buf);

        console.log("////// ",this.w, " x ",this.h);

        for (var i = 0; i < this.buf32.length; ++i) {
            this.buf32[i] = 0xff000000;
        }
    }
    // async rezsizeImageData (imageData, width, height) {
    //     const resizeWidth = width >> 0
    //     const resizeHeight = height >> 0
    //     const ibm = await window.createImageBitmap(imageData, 0, 0, imageData.width, imageData.height, {
    //       resizeWidth, resizeHeight
    //     })
    //     const canvas = document.createElement('canvas')
    //     canvas.width = resizeWidth
    //     canvas.height = resizeHeight
    //     const ctx = canvas.getContext('2d')
    //     ctx.scale(resizeWidth / imageData.width, resizeHeight / imageData.height)
        
    //     ctx.drawImage(ibm, 0, 0);
    //     return ctx.getImageData(0, 0, resizeWidth, resizeHeight)
    //   }

    setBuffer = buffer => {
        var i = 0;
        for (var y = 0; y < SCREEN_HEIGHT; ++y) {
          for (var x = 0; x < SCREEN_WIDTH; ++x) {
            i = y * 256 + x;
            // Convert pixel from NES BGR to canvas ABGR
            this.buf32[i] = 0xff000000 | buffer[i]; // Full alpha
          }
        }
        
      };
    
    writeBuffer = () => {
        
        this.imageData.data.set(this.buf8);
       
        //this.imageData = this.rezsizeImageData(this.imageData,this.w,this.h);
        this.tempCtx.putImageData(this.imageData, 0, 0);
        //newCanv.getContext("2d").putImageData(imagedata, 0, 0)
        //tempCtx.scale(this.w, this.h);
        
        this.ctx.drawImage(this.tempCnv,0,0);
        
        
        
        
        //this.ctx.drawImage(this.cnv, 0, 0);
        //console.log("działam");
    };
}