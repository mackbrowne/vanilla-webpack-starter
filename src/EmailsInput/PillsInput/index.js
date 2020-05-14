import PillsInputTemplate from './PillsInput.html';
import keycode from 'keycode';
import { bem } from '../index';
import Pill from './Pill';

export default class PillsInput {
  constructor(parent, validator) {
    this.parent = parent;
    this.validator = validator;

    this._renderTemplate();

    this.input = this.pillsInput.querySelector(`.${bem}--input`);
    this.container = this.pillsInput.querySelector(`.${bem}--pills-group`);

    this._initTextArea();
    this._initKeypress();
    this._initPaste();
    this._initFocus();

    this.parent.appendChild(this.pillsInput);
  }

  _renderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = PillsInputTemplate;
    this.pillsInput = template.content;
  }

  _initPaste() {
    this.input.addEventListener('paste', (e) => {
      e.preventDefault();
      (e.clipboardData || window.clipboardData)
        .getData('text')
        .split(',')
        .forEach((label) => this.addPill(label));
    });
  }

  _initKeypress() {
    this.input.addEventListener('keydown', (e) => {
      const key = keycode(e);
      if (['enter', ',', 'tab'].includes(key)) {
        e.preventDefault();
        this.addPill(this.input.value);
      }
    });
  }

  _initFocus() {
    this.input.addEventListener('blur', (e) => {
      const textValue = this.input.value;
      if (textValue) this.addPill(textValue);
    });
  }

  _initTextArea() {
    const textarea = this.pillsInput.querySelector(`.${bem}--textarea`);
    textarea.addEventListener('click', () => {
      this.input.focus();
    });
  }

  addPill(label) {
    this.input.value = '';
    new Pill(this.container, label.trim(), this.validator);
  }

  values() {
    const tags = this.container.innerText.trim();
    if (!tags.length) return [];
    else return tags.split(' ');
  }

  size() {
    return this.values().length;
  }
}
