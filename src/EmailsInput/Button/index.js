import ButtonTemplate from './Button.html';

export default class Button {
  constructor(parent, label, action) {
    this.parent = parent;
    this.label = label;
    this.action = action;

    this._renderTemplate();
    this._renderLabel();
    this._initClick();

    this.parent.appendChild(this.button);
  }

  _renderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = ButtonTemplate;
    this.button = template.content.firstChild;
  }

  _renderLabel() {
    this.button.innerHTML = this.label;
  }

  _initClick() {
    this.button.addEventListener('click', this.action);
  }
}
