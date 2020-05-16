import PillTemplate from './Pill.html';

export default class Pill {
  constructor(parent, label, validator, removeEvent) {
    this.parent = parent;
    this.label = label;
    this.validator = validator;
    this.removeEvent = removeEvent;

    this._renderTemplate();
    this._renderLabel();
    this._validate();
    this._initRemove();

    this.parent.appendChild(this.pill);
  }

  _renderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = PillTemplate;
    this.pill = template.content.firstChild;
  }

  _renderLabel() {
    this.pill.querySelector(`.pill-label`).innerHTML = this.label;
  }

  _validate() {
    const invalid = !this.validator(this.label.trim());
    if (invalid) this.pill.classList.add(`pill-invalid`);
  }

  _initRemove() {
    this.pill
      .querySelector(`.pill-remove`)
      .addEventListener('click', e => {
        e.stopPropagation();
        this.parent.removeChild(this.pill);
        this.removeEvent(`Remove - ${this.pill.innerText.trim()}`);
      });
  }
}