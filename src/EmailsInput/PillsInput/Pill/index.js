import PillTemplate from './Pill.html';
import { bem } from '../../index';

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
    this.pill.querySelector(`.${bem}--pill-label`).innerHTML = this.label;
  }

  _validate() {
    const invalid = !this.validator(this.label.trim());
    if (invalid) this.pill.classList.add(`${bem}--pill-invalid`);
  }

  _initRemove() {
    this.pill
      .querySelector(`.${bem}--pill-remove`)
      .addEventListener('click', () => {
        this.parent.removeChild(this.pill)
        this.removeEvent(`Remove - ${this.pill.innerText.trim()}`)
      });
  }
}
