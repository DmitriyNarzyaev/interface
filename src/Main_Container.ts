import Container = PIXI.Container;
import { Loader, Sprite, IPoint } from "pixi.js";
import InteractionEvent = PIXI.interaction.InteractionEvent;

export default class Main_Container extends Container {
	public static readonly WIDTH:number = 1500;
	public static readonly HEIGHT:number = 900;
	private _background:Sprite;
	private _screenBorder:Sprite;
	private _maskForPersonagesContainer:PIXI.Graphics;
	private _borderLineSize:number = 5;
	private _personagesContainer:Container;
	private _touchDownPoint:IPoint;
	private _startDrag:number=0;
	private _dragDistance:number = 0;
	private _dragIterator:number = 0;
	private _drag1:number=0;
	private _drag2:number=0;
	private _pictureArray:Sprite[] = [];
	private _personagesNameArray:string[] = [
		"Rocket Bot",		"Rocket Bot 2",
		"Saboteur",			"Army Bot",
		"Rhinoceros",		"Bastion",
		"Shark",			"Nautilus",
		"Gunner"
	];

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
			this.initMaskForPersonagesContainer();
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
		this._personagesContainer
			.addListener('mousedown', this.onDragStart, this)
			.addListener('touchstart', this.onDragStart, this)
			.addListener('mouseup', this.onDragEnd, this)
			.addListener('mouseupoutside', this.onDragEnd, this)
			.addListener('touchend', this.onDragEnd, this)
			.addListener('touchendoutside', this.onDragEnd, this);
	}

	private initMaskForPersonagesContainer():void {
		const maskForPersonagesContainerWidth:number = this._screenBorder.width - this._borderLineSize*2;
		const maskForPersonagesContainerHeight:number =  this._screenBorder.height - this._borderLineSize*2;
		this._maskForPersonagesContainer = new PIXI.Graphics();
		this._maskForPersonagesContainer.beginFill(0x880000);
		this._maskForPersonagesContainer.drawRect(
			0,
			0,
			maskForPersonagesContainerWidth,
			maskForPersonagesContainerHeight
		);
		this._maskForPersonagesContainer.endFill();
		this._maskForPersonagesContainer.x = this._screenBorder.x + this._borderLineSize;
		this._maskForPersonagesContainer.y = this._screenBorder.y + this._borderLineSize;
		this.addChild(this._maskForPersonagesContainer);
		this._personagesContainer.mask = this._maskForPersonagesContainer;
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

	private onDragStart(event:InteractionEvent):void {
		this._touchDownPoint = this._personagesContainer.toLocal(event.data.global);
		this._personagesContainer.addListener('mousemove', this.onDragMove, this);
		this._personagesContainer.addListener('touchmove', this.onDragMove, this);
		this._startDrag = event.data.global.x;
	}

	private onDragMove(event:InteractionEvent):void {
		const newPosition:IPoint = this.toLocal(event.data.global);
		this._personagesContainer.x = newPosition.x - this._touchDownPoint.x;
		const maxX:number = this._screenBorder.x + this._borderLineSize;
		if (this._personagesContainer.x > maxX) {
			this._personagesContainer.x = maxX;
		}
		const minX:number = this._screenBorder.x +
			this._screenBorder.width -
			this._personagesContainer.width -
			this._borderLineSize;
		if (this._personagesContainer.x < minX) {
			this._personagesContainer.x = minX;
		}
	}

	private onDragEnd(event:InteractionEvent):void {
		this._personagesContainer.removeListener('mousemove', this.onDragMove, this);
		this._personagesContainer.removeListener('touchmove', this.onDragMove, this);
		this._dragDistance = Math.abs(this._startDrag - event.data.global.x);
		this._dragIterator++;
		if (this._drag1 !==0 && this._drag2 !==0) {
			if (this._dragIterator == 1) {
				this._drag1 = event.data.global.x;
			} else if (this._dragIterator == 2) {
				this._drag2 = event.data.global.x;
			}
		}
	}
}