interface IFrame {
	tag: string;
	attribs: { [index: string]: string };
	text: string;
	tagPosition: number;
	name?: string;
	innerText: string;
}

export class StackFrame implements IFrame {
	public tag: string;
	public attribs: { [index: string]: string };
	public text: string;
	public tagPosition: number;
	public mediaChildren: any[];
	public innerText: string = "";
	public name?: string;
	constructor(private _stack: any[], tag: string, attribs: { [index: string]: string }) {
		this.tag = tag;
		this.attribs = attribs || {};
		this.tagPosition = 0;
		this.text = ""; // Node inner text
		this.mediaChildren = [];
	}

	public updateParentNodeText() {
		if (this._stack.length) {
			const parentFrame = this._stack[this._stack.length - 1];
			parentFrame.text += this.text;
		}
	}
	public updateParentNodeMediaChildren() {
		if (this._stack.length) {
			const parentFrame = this._stack[this._stack.length - 1];
			parentFrame.mediaChildren.push(this);
		}
	}
}
