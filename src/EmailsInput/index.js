import EmailsInputTemplate from './EmailsInput.html';
import keycode from 'keycode';
import randomEmail from 'random-email';

export default class {
  constructor(node, options = {}) {
    this.node = node;
    this.options = options;
    this.node.innerHTML = EmailsInputTemplate;

    this.emails = [];

    this.PillTemplate = this.node.querySelector('#emails-input--pill-template');
    this.ButtonTemplate = this.node.querySelector(
      '#emails-input--button-template'
    );

    this.textAreaElement = this.node.querySelector('.emails-input--textarea');
    this.pillsGroupElement = this.node.querySelector(
      '.emails-input--pills-group'
    );

    this.inputElement = this.node.querySelector('input');
    this.inputElement.addEventListener('keyup', (e) => this._keyPressEvent(e));
    this.inputElement.addEventListener('paste', (e) => this._pasteEvent(e));
    this.inputElement.addEventListener('blur', (e) => {
      const textValue = this.inputElement.value;
      if (textValue) this._addPill(textValue);
    });

    this.primaryButton = this.node.querySelector(
      '.emails-input--button-primary'
    );
    this.primaryButton.addEventListener('click', () =>
      this._addPill(randomEmail())
    );

    this.secondaryButton = this.node.querySelector(
      '.emails-input--button-secondary'
    );
    this.secondaryButton.addEventListener('click', () => this._getCount());
  }

  _keyPressEvent(e) {
    const key = keycode(e);
    if (['enter', ','].includes(key)) {
      this._addPill(this.inputElement.value.slice(0, -1));
    }
  }

  _pasteEvent(e) {
    e.preventDefault();
    (e.clipboardData || window.clipboardData)
      .getData('text')
      .split(',')
      .forEach((email) => this._addPill(email.trim()));
  }

  _addPill(email) {
    this._clearInput();
    this.emails.push(email);

    const newPill = this.PillTemplate.content.cloneNode(true);

    const pillElement = newPill.querySelector('.emails-input--pill');
    newPill
      .querySelector('img')
      .addEventListener('click', () => this._removePill(pillElement));

    newPill.querySelector('.emails-input--pill-label').innerHTML = email;

    this.pillsGroupElement.appendChild(newPill);
  }

  _removePill(element) {
    this.pillsGroupElement.removeChild(element);
  }

  _getCount() {
    alert(`Total Emails: ${this.emails.length}`);
  }

  _clearInput() {
    this.inputElement.value = '';
  }
}
