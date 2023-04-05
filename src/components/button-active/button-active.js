import { LitElement, html, css } from "lit";

import { FireEventMixin, MonitoringMixin } from '../mixins/index.js';

import styles from './button-active-styles.js';

/**
 * Buttons actived
 * @description Buttons for actived or disable
 * @customElement button-play-stop
 * 
 * @property { String } name - name of buttons
 * @property { String } type - name of buttons posibility default| training | resting | preparing | cooling @default default 
 * @property { String } status - status of buttons @default disable
 * @property { Boolean } activate - activated or not button @default false
 * @property { String } size - sizr of buttons @default small
 * 
 * @fire change-status-button-active#click - launch event with new status
 * 
 * @author Victor Hugo Aguilar Aguilar
 */
export class ButtonActive extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'button-active';
  }

  static get properties() {
    return {
      /**
       * Name of buttons
       */
      name: {
        type: String,
        attribute: 'name',
      },
      /**
       * Type buttons type: default | training | resting | preparing | cooling
       * @description property name the button to show
       * @enum default | training | resting | preparing | cooling
       * @default default
       */
      type: {
        type: String,
        attribute: 'type'
      },
      /**
       * Status of buttons activated | disabled
       * @default disabled
       */
      status: {
        type: String,
        attribute: 'status'
      },
      /**
       * Size of check buttons
       * @default small
       */
      size: {
        type: String,
        attribute: 'size',
      },
      /**
       * Active or disabled buttons
       * @default false
       */
      activated: {
        type: Boolean,
        attribute: 'activated',
      }
    }
  };

  static get styles() {
    return [styles]
  }

  constructor() {
    super();
    this.name = '';
    this.type = 'default';
    this.size = 'small';
    this.activated = false;
    this.status = 'disabled'

  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.monitor('type of buttons ', this.type);
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('totalTime')) {
      this.requestUpdate();
    }
  }

  shouldUpdate() {
    super.shouldUpdate();
    return true
  }

  render() {
    return html `
      <div class="container">
          <input 
            type="checkbox" 
            class="toggle" 
            ?checked=${this.activated} 
            @change=${ (e) => this._changeStatus(e)}
            style=${this._styles}
          />
      </div>
    `;
  }


  get _styles() {
    if (this.activated) {
      return css `
        border-color: ${this._colorIcon[this.type]}
      `
    }
  }

  get _colorIcon() {
    return {
      default: css `#4EFF00`,
      training: css `#4EFF00`,
      resting: css `#EB0303`,
      preparing: css `#ECF80A`,
      cooling: css `#08E5FF`,
    }
  }

  _changeStatus(e) {
    const checked = e.target.checked;
    this.activated = checked;
    this.status = checked ? 'activated' : 'disabled';
    this.fireEvent('change-status-button-active', {
      name: this.name,
      status: this.status,
      activated: this.activated
    })
    return true;
  }

}

customElements.define(ButtonActive.is, ButtonActive);