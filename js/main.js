window.onload = function() {
    
    HuePreviewer.call(HuePreviewer);
};

function HuePreviewer() {
    
    this.ImageTexture = null;
    
    this.ViewContainer = document.getElementById('view-container');
    
    this.InputImage = document.getElementById('input-image');
    this.InputImage.addEventListener('change', this.InputImage_Change.bind(this));
    
    this.InputRed   = document.getElementById('input-red');
    this.InputGreen = document.getElementById('input-green');
    this.InputBlue  = document.getElementById('input-blue');
    this.InputGray  = document.getElementById('input-gray');
    
    this.InputRed.addEventListener('input', this.InputRGBGray_Update.bind(this));
    this.InputGreen.addEventListener('input', this.InputRGBGray_Update.bind(this));
    this.InputBlue.addEventListener('input', this.InputRGBGray_Update.bind(this));
    this.InputGray.addEventListener('input', this.InputRGBGray_Update.bind(this));
    
    this.InputRedNumber   = document.getElementById('input-red-number');
    this.InputGreenNumber = document.getElementById('input-green-number');
    this.InputBlueNumber  = document.getElementById('input-blue-number');
    this.InputGrayNumber  = document.getElementById('input-gray-number');
    
    this.InputRedNumber.addEventListener('input', this.InputRGBGrayNumber_Update.bind(this));
    this.InputGreenNumber.addEventListener('input', this.InputRGBGrayNumber_Update.bind(this));
    this.InputBlueNumber.addEventListener('input', this.InputRGBGrayNumber_Update.bind(this));
    this.InputGrayNumber.addEventListener('input', this.InputRGBGrayNumber_Update.bind(this));
}

HuePreviewer.InputImage_Change = function(event) {
    
    var target = event.target || window.event.srcElement;
    var file = target.files[0];
    
    if (!file) {
        
        this.InputImage.value = null;
        alert("파일 잘못 선택함!!11");
        return;
    }
    
    this.ViewContainer.innerHTML = '';
    
    if (this.View)
        this.View.Dispose();
    
    this.View = new PIXIView();
    
    this.ViewContainer.appendChild(this.View.Element);
    
    if (FileReader) {
        
        var fileReader = new FileReader();
        fileReader.addEventListener('load', this.InputImage_Load.bind(this));
        fileReader.file = file;
        fileReader.readAsDataURL(file);
        
    } else {
        
        this.InputImage.value = null;
        alert("브라우저 지원 안함!!");
    }
}

HuePreviewer.InputImage_Load = function(e) {
    
    if (e.currentTarget instanceof FileReader) {
        
        this.ImageTexture = new Image();
        this.ImageTexture.file = e.currentTarget.file;
        this.ImageTexture.addEventListener('load', this.InputImage_Load.bind(this));
        this.ImageTexture.src = e.currentTarget.result;
        
    } else
        this.InitializeSprite();
}

HuePreviewer.InitializeSprite = function() {
    
    var name = this.ImageTexture.file.name + "?" + Date.now();
    
    if (!this.Canvas)
        this.Canvas = document.createElement("canvas");
    
    this.Canvas.width  = this.ImageTexture.width;
    this.Canvas.height = this.ImageTexture.height;
    
    if (!this.CanvasContext)
        this.CanvasContext = this.Canvas.getContext("2d");
    
    this.CanvasContext.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    this.CanvasContext.drawImage(this.ImageTexture, 0, 0);
    
    this.View.AddAssetToLoader(name, this.Canvas.toDataURL());
    this.View.Initialize(name, this.InitializeSprite_Done.bind(this));
}

HuePreviewer.InitializeSprite_Done = function() {
    
    if (this.View)
        this.View.SetTint(
            Number(this.InputRedNumber.value),
            Number(this.InputGreenNumber.value),
            Number(this.InputBlueNumber.value),
            Number(this.InputGrayNumber.value)
        );
};

HuePreviewer.InputRGBGray_Update = function() {
    
    this.InputRedNumber.value   = this.InputRed.value;
    this.InputGreenNumber.value = this.InputGreen.value;
    this.InputBlueNumber.value  = this.InputBlue.value;
    this.InputGrayNumber.value  = this.InputGray.value;
    
    if (!this.View)
        return;
    
    this.View.SetTint(
        Number(this.InputRed.value),
        Number(this.InputGreen.value),
        Number(this.InputBlue.value),
        Number(this.InputGray.value)
    );
};

HuePreviewer.InputRGBGrayNumber_Update = function() {
    
    this.InputRed.value   = this.InputRedNumber.value;
    this.InputGreen.value = this.InputGreenNumber.value;
    this.InputBlue.value  = this.InputBlueNumber.value;
    this.InputGray.value  = this.InputGrayNumber.value;
    
    if (!this.View)
        return;
    
    this.View.SetTint(
        Number(this.InputRedNumber.value),
        Number(this.InputGreenNumber.value),
        Number(this.InputBlueNumber.value),
        Number(this.InputGrayNumber.value)
    );
};