import EmailsInputTemplate from './EmailsInput.html';
import keycode from 'keycode';
import randomEmail from 'random-email';
import emailValidator from "email-validator";

import './main.scss';

const bem = 'emails-input';

export default class EmailsInput {
  constructor(node, options = {}) {
    this.node = node;
    this.options = options;
    this.node.innerHTML = EmailsInputTemplate;

    this.emails = [];

    this.PillTemplate = this.node.querySelector(`#${bem}--pill-template`);
    this.ButtonTemplate = this.node.querySelector(`#${bem}--button-template`);

    this.textAreaElement = this.node.querySelector(`.${bem}--textarea`);
    this.pillsGroupElement = this.node.querySelector(`.${bem}--pills-group`);

    this.inputElement = this.node.querySelector(`.${bem}--input`);
    this.inputElement.addEventListener('keydown', (e) => this._keyPressEvent(e));
    this.inputElement.addEventListener('paste', (e) => this._pasteEvent(e));
    this.inputElement.addEventListener('blur', (e) => {
      const textValue = this.inputElement.value;
      if (textValue) this._addPill(textValue);
    });

    this.primaryButton = this.node.querySelector(`.${bem}--button-primary`);
    this.primaryButton.addEventListener('click', () =>
      this._addPill(randomEmail())
    );

    this.secondaryButton = this.node.querySelector(`.${bem}--button-secondary`);
    this.secondaryButton.addEventListener('click', () => this._getCount());
  }

  _keyPressEvent(e) {
    const key = keycode(e);
    if (['enter', ',', 'tab'].includes(key)) {
      e.preventDefault();
      let pillLabel = this.inputElement.value;
      if(key === ',') pillLabel = pillLabel.slice(0, -1);
      this._addPill(pillLabel);
    }
  }

  _pasteEvent(e) {
    e.preventDefault();
    (e.clipboardData || window.clipboardData)
      .getData('text')
      .split(',')
      .forEach((email) => this._addPill(email.trim()));
  }

  _newPill(label, validator) {
    const pill = this.PillTemplate.content.cloneNode(true);
    const pillLabel = pill.querySelector(`.${bem}--pill-label`);
    pillLabel.innerHTML = label;

    const pillElement = pill.querySelector(`.${bem}--pill`);
    pill
      .querySelector('img')
      .addEventListener('click', () => {
        this._removePill(pillElement, label);
      }); 

    
    const validPill = validator(label);
    if(!validPill) pillElement.classList.add(`${bem}--pill-invalid`);
    
    return pill;
  }

  _addPill(email) {
    this._clearInput();
    this.emails.push(email);

    const newPill = this._newPill(email, emailValidator.validate);
    this.pillsGroupElement.appendChild(newPill);
  }

  _removePill(element, email) {
    this.pillsGroupElement.removeChild(element);
    this.emails.splice(this.emails.indexOf(email), 1);
  }

  _getCount() {
    alert(`Total Emails: ${this.emails.length}`);
  }

  _clearInput() {
    this.inputElement.value = '';
  }

  getEmails() {
    return this.emails;
  }
}
