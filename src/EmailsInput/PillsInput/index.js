import PillsInputTemplate from './PillsInput.html';
import keycode from 'keycode';
import { bem } from '../index';
import Pill from './Pill';

export default class PillsInput {
  constructor(parent, validator, errorMessage) {
    this.parent = parent;
    this.validator = validator;
    this.errorMessage = errorMessage;

    this._renderTemplate();

    this.input = this.pillsInput.querySelector(`.${bem}--input`);
    this.container = this.pillsInput.querySelector(`.${bem}--pills-group`);
    this.errorMessageContainer = this.pillsInput.querySelector(`.${bem}--error-message`);
    this.errorContainer = this.pillsInput.querySelector(`.${bem}--error-container`);

    this._initError();
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

  _initError() {
    this.errorMessageContainer.innerHTML = this.errorMessage;
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

  addPill(rawLabel) {
    this.input.value = '';
    const label = rawLabel.trim();
    new Pill(this.container, label, this.validator, detail => this._dispatchEvent(detail));
    this._dispatchEvent(`Add - ${label}`);
  }

  _dispatchEvent(detail) {
    this._validate();
    document.dispatchEvent(
      new CustomEvent(`${bem}--input-change`, { detail })
    );
  }

  _validate() {
    const hasInvalid = this.container.querySelector(`.${bem}--pill-invalid`);
    if(hasInvalid){
      this.errorMessageContainer.classList.add(`${bem}--error-message-active`);
      this.errorContainer.classList.add(`${bem}--error-container-active`)
    }else{
      this.errorMessageContainer.classList.remove(`${bem}--error-message-active`);
      this.errorContainer.classList.remove(`${bem}--error-container-active`)
    }
  }

  clear() {
    this.container.innerHTML = '';
    this._dispatchEvent(`Clear All`);
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
