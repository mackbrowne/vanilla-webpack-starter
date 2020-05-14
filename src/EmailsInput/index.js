import EmailsInputTemplate from './EmailsInput.html';
import keycode from 'keycode';
import randomEmail from 'random-email';
import emailValidator from 'email-validator';

import './main.scss';
import Pill from './Pill';

export const bem = 'emails-input';

export default class EmailsInput {
  constructor(node, options = {
    buttons: []
  }) {
    this.node = node;
    this.options = options;
    this.node.innerHTML = EmailsInputTemplate;

    this.ButtonTemplate = this.node.querySelector(`#${bem}--button-template`);

    this.textAreaElement = this.node.querySelector(`.${bem}--textarea`);
    this.pillsGroupElement = this.node.querySelector(`.${bem}--pills-group`);

    this.inputElement = this.node.querySelector(`.${bem}--input`);
    this.inputElement.addEventListener('keydown', (e) =>
      this._keyPressEvent(e)
    );
    this.inputElement.addEventListener('paste', (e) => this._pasteEvent(e));
    this.inputElement.addEventListener('blur', (e) => {
      const textValue = this.inputElement.value;
      if (textValue) this._addEmail(textValue);
    });

    this.primaryButton = this.node.querySelector(`.${bem}--button-primary`);
    this.primaryButton.addEventListener('click', () =>
      this._addEmail(randomEmail())
    );

    this.secondaryButton = this.node.querySelector(`.${bem}--button-secondary`);
    this.secondaryButton.addEventListener('click', () => this._getCount());
  }

  _keyPressEvent(e) {
    const key = keycode(e);
    if (['enter', ',', 'tab'].includes(key)) {
      e.preventDefault();
      this._addEmail(this.inputElement.value);
    }
  }

  _pasteEvent(e) {
    e.preventDefault();
    (e.clipboardData || window.clipboardData)
      .getData('text')
      .split(',')
      .forEach((email) => this._addEmail(email.trim()));
  }

  _addEmail(email) {
    this._clearInput();
    new Pill(
      this.pillsGroupElement,
      email.trim(),
      emailValidator.validate
    );
  }

  _getCount() {
    const pills = this.node.querySelectorAll(`.${bem}--pill`);
    alert(`Total Emails: ${pills.length}`);
  }

  _clearInput() {
    this.inputElement.value = '';
  }

  getEmails() {
    const pills = this.node.querySelectorAll(`.${bem}--pill`);
    return this.emails;
  }
}
