window.onload = function() {
    
    HuePreviewer.call(HuePreviewer);
};

function HuePreviewer() {
    
    this.ImageTexture = null;
    this.Presets      = [];
    
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
    
    this.ButtonResetValues = document.getElementById('button-reset-values');
    this.ButtonResetValues.addEventListener('click', this.ButtonResetValues_Click.bind(this));
    
    this.ButtonSavePreset = document.getElementById('button-save-preset');
    this.ButtonCopyPreset = document.getElementById('button-copy-preset');
    this.SavedPresets     = document.getElementById('saved-presets');
    
    this.ButtonSavePreset.addEventListener('click', this.ButtonSavePreset_Click.bind(this));
    this.ButtonCopyPreset.addEventListener('click', this.ButtonCopyPreset_Click.bind(this));
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

HuePreviewer.UpdateFromPreset = function(preset) {
    
    this.InputRed.value   = this.InputRedNumber.value   = preset[0];
    this.InputGreen.value = this.InputGreenNumber.value = preset[1];
    this.InputBlue.value  = this.InputBlueNumber.value  = preset[2];
    this.InputGray.value  = this.InputGrayNumber.value  = preset[3];
    
    if (!this.View)
        return;
    
    this.View.SetTint(
        preset[0],
        preset[1],
        preset[2],
        preset[3]
    );
};

HuePreviewer.ButtonResetValues_Click = function(e) {
    
    this.InputRed.value   = this.InputRedNumber.value   = 0;
    this.InputGreen.value = this.InputGreenNumber.value = 0;
    this.InputBlue.value  = this.InputBlueNumber.value  = 0;
    this.InputGray.value  = this.InputGrayNumber.value  = 0;
    
    if (!this.View)
        return;
    
    this.View.SetTint(0, 0, 0, 0);
};

HuePreviewer.ButtonSavePreset_Click = function(e) {
    
    var preset = [
        Number(this.InputRed.value),
        Number(this.InputGreen.value),
        Number(this.InputBlue.value),
        Number(this.InputGray.value)
    ];
    
    HuePreviewer.AddPreset(preset);
};

HuePreviewer.ButtonCopyPreset_Click = function(e) {
    
    if (this.Presets.length === 0) {
        
        alert("There's no any saved presets yet.");
        return;
    }
    
    var result = '';
    var position = 1;
    
    for (var palette of this.Presets) {
        
        result += position + ' : \n';
        result += palette.ToString() + '\n\n';
        
        position++;
    }
    
    var clipboard = document.createElement('textarea');
    clipboard.value = result;
    document.body.appendChild(clipboard);

    clipboard.select();
    document.execCommand("copy");
    document.body.removeChild(clipboard);
    
    alert('Copied all presets information to clipboard.');
};

HuePreviewer.AddPreset = function(preset) {
    
    var palette = new Preset(preset);
    
    this.Presets.push(palette);
    this.SavedPresets.appendChild(palette.Element);
};

function Preset(preset) {
    
    this.Preset = preset;
    
    this.Element = document.createElement('button');
    this.Element.style.background = this.ToCssColor();
    this.Element.addEventListener('click', this.Element_Click.bind(this));
}

Preset.prototype.Element_Click = function(e) {
    
    HuePreviewer.UpdateFromPreset(this.Preset);
};

Preset.prototype.ToString = function() {
    
    return '  Red : ' + this.Preset[0] + '\n'
         + 'Green : ' + this.Preset[1] + '\n'
         + ' Blue : ' + this.Preset[2] + '\n'
         + ' Gray : ' + this.Preset[3];
};

Preset.prototype.ToCssColor = function() {
    
    var red   = ((this.Preset[0] + 255) / 510 * 255);
    var green = ((this.Preset[1] + 255) / 510 * 255);
    var blue  = ((this.Preset[2] + 255) / 510 * 255);
    var gray = this.Preset[3];
    
    return 'linear-gradient(to right, ' + 
           'rgb(' + red + ', 0, 0), ' + 
           'rgb(' + red + ', 0, 0) 25%, ' + 
           'rgb(0, ' + green + ', 0) 25%, ' + 
           'rgb(0, ' + green + ', 0) 50%, ' + 
           'rgb(0, 0, ' + blue + ') 50%, ' + 
           'rgb(0, 0, ' + blue + ') 75%, ' + 
           'rgb(' + gray + ', ' + gray + ', ' + gray + ') 75%, ' + 
           'rgb(' + gray + ', ' + gray + ', ' + gray + '))';
};