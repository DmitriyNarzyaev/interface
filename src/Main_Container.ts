import Container = PIXI.Container;
import { Loader, Sprite } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1500;
	public static readonly HEIGHT:number = 900;
	private _background:Sprite;
	private _screenBorder:Sprite;

	constructor() {
		super();
		this.initImages();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("background", "background.jpg");
		loader.add("border", "border.png");
		loader.on("complete", ()=> {
			this.initBackground();
			this.initPersonageChangeWindow();
		});
		loader.load();
	}

	private initBackground():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);
	}

	private initPersonageChangeWindow():void {

		this._screenBorder = Sprite.from("border");
		this._screenBorder.width /= 2;
		this._screenBorder.height /= 2;
		this._screenBorder.x = Main_Container.WIDTH/2 - this._screenBorder.width/2;
		this._screenBorder.y = Main_Container.HEIGHT/2 - this._screenBorder.height/2;
		this.addChild(this._screenBorder);
	}
}