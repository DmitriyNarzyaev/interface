import Container = PIXI.Container;
import { Loader, Sprite } from "pixi.js";

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1500;
	public static readonly HEIGHT:number = 900;
	private _background:Sprite;
	private _screenBorder:Sprite;
	private _borderLineSize:number = 5;
	private _pictureArray:Sprite[] = [];
	private _personagesNameArray:string[] = [
		"Rocket Bot",		"Rocket Bot 2",
		"Saboteur",			"Army Bot",
		"Rhinoceros",		"Bastion",
		"Shark",			"Nautilus",
		"Gunner"
	];
	private _personagesContainer:Container;

	constructor() {
		super();
		this.initImages();
	}

	private initImages():void {
        const loader:Loader = new Loader();
		loader.add("background", "background.jpg");
		loader.add("border", "border.png");
		loader.add(this._personagesNameArray[0], "robot-1.jpg");
		loader.add(this._personagesNameArray[1], "robot-2.jpg");
		loader.add(this._personagesNameArray[2], "robot-3.jpg");
		loader.add(this._personagesNameArray[3], "robot-4.jpg");
		loader.add(this._personagesNameArray[4], "robot-5.jpg");
		loader.add(this._personagesNameArray[5], "robot-6.jpg");
		loader.add(this._personagesNameArray[6], "robot-7.jpg");
		loader.add(this._personagesNameArray[7], "robot-8.jpg");
		loader.add(this._personagesNameArray[8], "robot-9.jpg");
		loader.on("complete", ()=> {
			this.initBackground();
			this.initPersonagesChangeWindow();
			this.initPersonagesContainer();
			this.invitePersonagesInContainer();
		});
		loader.load();
	}

	private initBackground():void {
		this._background = Sprite.from("background");
		this.addChild(this._background);
	}

	private initPersonagesChangeWindow():void {
		this._screenBorder = Sprite.from("border");
		this._screenBorder.width /= 2;
		this._screenBorder.height /= 2;
		this._screenBorder.x = Main_Container.WIDTH/2 - this._screenBorder.width/2;
		this._screenBorder.y = Main_Container.HEIGHT/2 - this._screenBorder.height/2;
		this.addChild(this._screenBorder);
	}

	private initPersonagesContainer():void {
		this._personagesContainer = new Container;
		this._personagesContainer.interactive = true;
		this._personagesContainer.buttonMode = true;
		this._personagesContainer.x = this._screenBorder.x + this._borderLineSize;
		this._personagesContainer.y = this._screenBorder.y + this._borderLineSize;
		this.addChild(this._personagesContainer);
	}

	private invitePersonagesInContainer():void {
		let personageX:number = 0;
		for (let iterator:number = 0; iterator < this._personagesNameArray.length; iterator++) {
			const personage:Sprite = Sprite.from(this._personagesNameArray[iterator]);
			this._personagesContainer.addChild(personage);
			personage.width /= 2;
			personage.height /= 2;
			personage.x = personageX;
			personageX += personage.width;
			this._pictureArray.push(personage);
		}
	}
}