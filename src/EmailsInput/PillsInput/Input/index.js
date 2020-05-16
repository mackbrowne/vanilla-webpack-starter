import keycode from 'keycode';
import InputTemplate from './Input.html';

export default class Input {
  constructor(parent, placeholder = '', callback = () => {}) {
    this.parent = parent;
    this.placeholder = placeholder;
    this.callback = callback;

    this._renderTemplate();
    this._initListeners();

    this.parent.appendChild(this.inputElement);
  }

  _renderTemplate() {
    const template = document.createElement('template');
    template.innerHTML = InputTemplate;
    this.inputElement = template.content;
    this.input = this.inputElement.querySelector(`.input`);
    this.input.innerText = this.placeholder;
  }

  _initListeners() {
    this.input.addEventListener('focus', (e) => {
      this.input.innerText = '';
      this.input.classList.add(`input-active`);
    });

    this.input.addEventListener('blur', (e) => {
      const textValue = this.input.innerText;
      if (textValue) this._clear(textValue);

      this.input.contentEditable = false;
      this.input.innerHTML = this.placeholder;
      this.input.classList.remove(`input-active`);
    });

    this.input.addEventListener('paste', (e) => {
      e.preventDefault();
      (e.clipboardData || window.clipboardData)
        .getData('text')
        .split(',')
        .forEach((label) => this._clear(label));
    });

    this.input.addEventListener('keydown', (e) => {
      const key = keycode(e);
      if (['enter', ',', 'tab'].includes(key)) {
        e.preventDefault();
        this._clear(this.input.innerText);
      }
    });

    this.parent.addEventListener(
      'click',
      (e) => {
        this.input.contentEditable = true;
        this.input.focus();
      }
    );
  }

  _clear(label) {
    this.input.innerText = '';
    this.callback(label);
  }
}
