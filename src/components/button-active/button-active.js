import {
  LitElement,
  html,
  css,
  svg
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import {
  FireEventMixin
} from '../mixins/fire-events.js';

import '../button-play-stop/progressbar.js';

import styles from './button-active-styles.js';

/**
 * Buttons play stop
 * @description Buttons play stop
 * @customElement button-play-stop
 * 
 * @property { String } name - name of buttons posibility default| training | resting | preparing | cooling @default default 
 * @property { Number } totalTime - total time
 * @property { Number } totalElapsed - total time elapsed
 * @property { String } status - status of buttons @default stopped
 * @property { String } widthButton - width of buttons @default 100px
 * @property { String } heightButton - heightButton of buttons @default 100px
 * @property { String } progressBarBackgroundColor - background progress bar @default #7F7E7E
 * @property { String } progressBarColor - color progress bar @default #4EFF00
 * @property { Boolean } _demo - active demo @default false
 * 
 * @fire button-play-stop#change-status - launch event with new status
 * 
 * @author Victor Hugo Aguilar Aguilar
 */
export class ButtonActive extends FireEventMixin(LitElement) {
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
       * Active or Desactive buttons
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
    console.log('this.type', this.type)
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