import PillsInputTemplate from './PillsInput.html';
import Pill from './Pill';
import Input from './Input';

export default class PillsInput {
  constructor(parent, validator, errorMessage, id = '') {
    this.parent = parent;
    this.validator = validator;
    this.errorMessage = errorMessage;
    this.id = id;

    this._renderTemplate();

    const select = (name) => this.pillsInput.querySelector(`.${name}`);
    this.container = select('pills-group');
    this.errorMessageContainer = select('error-message');
    this.errorContainer = select('error-container');
    this.textarea = select('textarea');

    this._initInput();
    this._initError();

    this.parent.appendChild(this.pillsInput);
  }

  _renderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = PillsInputTemplate;
    this.pillsInput = template.content;
  }

  _initInput() {
    this.input = new Input(this.textarea, 'add more people...', (label) =>
      this.addPill(label)
    );
  }

  _initError() {
    this.errorMessageContainer.innerHTML = this.errorMessage;
  }

  _dispatchEvent(detail) {
    this._validate();
    document.dispatchEvent(
      new CustomEvent(`input${this.id}-change`, { detail })
    );
  }

  _validate() {
    const hasInvalid = this.container.querySelector(`.pill-invalid`);
    if (hasInvalid) {
      this.errorMessageContainer.classList.add(`error-message-active`);
      this.errorContainer.classList.add(`error-container-active`);
    } else {
      this.errorMessageContainer.classList.remove(`error-message-active`);
      this.errorContainer.classList.remove(`error-container-active`);
    }
  }

  addPill(label) {
    if (label) {
      new Pill(this.container, label, this.validator, (detail) =>
        this._dispatchEvent(detail)
      );
      this._dispatchEvent(`Add - ${label}`);
    }
  }

  clear() {
    this.container.innerHTML = '';
    this._dispatchEvent(`Clear All`);
  }

  values() {
    const tags = this.container.innerText.trim();
    if (!tags.length) return [];
    return tags.split('\n')
  }

  size() {
    return this.values().length;
  }
}
