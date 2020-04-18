import Container = PIXI.Container;
import { Loader, Sprite } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1500;
	public static readonly HEIGHT:number = 900;
	private _background:Sprite;

	constructor() {
		super();
		this.initImages();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("background", "background.jpg");
		loader.on("complete", ()=> {
			this.initBackground();
		});
		loader.load();
	}

	private initBackground():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);
	}
}