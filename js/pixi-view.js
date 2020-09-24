function PIXIView() {
    
    this.Instance = new PIXI.Application({ forceCanvas: false, width: 1280, height: 720, transparent: true });
    this.Element  = this.Instance.view;
    this.Stage    = this.Instance.stage;
    this.Loader   = this.Instance.loader;
    this.Filter   = new ToneFilter();
    this.View     = null;
    this.Palette  = null;
    this.OnLoad   = null;
}

PIXIView.prototype.AddAssetToLoader = function(name, base64) {
    
    this.Loader.add(name, base64);
};

PIXIView.prototype.Initialize = function(name, load) {
    
    this.OnLoad = load;
    this.Loader.load(this.OnLoadAssets.bind(this, name));
};

PIXIView.prototype.OnLoadAssets = function(name) {
    
    this.View = new PIXI.Sprite(this.Loader.resources[name].texture);
    this.View.filters = [ this.Filter ];
    
    this.Stage.addChild(this.View);
    
    this.Palette = new PIXI.Sprite.from('./img/palette.png');
    this.Palette.filters = [ this.Filter ];
    
    this.Palette.x = 1280 - 76;
    this.Palette.y = 720  - 116;
    
    this.Stage.addChild(this.Palette);
    
    if (this.OnLoad)
        this.OnLoad();
};

PIXIView.prototype.SetTint = function(r, g, b, gray) {
    
    this.Filter.reset();
    this.Filter.adjustTone(r, g, b);
    this.Filter.adjustSaturation(-gray);
};

PIXIView.prototype.Dispose = function() {
    
    this.Loader.reset();
    this.Instance.destroy(true);
    
    this.Instance = null;
    this.Element  = null;
    this.Stage    = null;
    this.Loader   = null;
    this.View     = null;
    this.Palette  = null;
    this.OnLoad   = null;
};