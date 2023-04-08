import {
  LitElement,
  html,
  css
} from "lit";

import {
  FireEventMixin,
  MonitoringMixin
} from '../mixins/index.js';

import styles from './chrono-view-style.js';

/**
 * ChronoView
 * @description ChronoView for show time
 * @customElement chrono-view
 * 
 * @property { String } name - name of component
 * @property { String } fase - fase of chrono-view posibility default | training | resting | preparing | cooling @default default 
 * @property { String } faseTitle - title of fase
 * @property { Number } faseTime - time of fase
 * @property { String } reduce - is reducer view for show options normal or reducer @default false
 * 
 * @author Victor Hugo Aguilar Aguilar
 */
export class ChronoView extends MonitoringMixin(FireEventMixin(LitElement)) {
  static get is() {
    return 'chrono-view';
  }

  static get properties() {
    return {
      /**
       * Name of components
       */
      name: {
        type: String,
        attribute: 'name',
      },
      /**
       * fase of chrono view: default | training | resting | preparing | cooling
       * @default default
       */
      fase: {
        type: String,
        attribute: 'fase'
      },
      /**
       * Title of fase
       */
      faseTitle: {
        type: String,
        attribute: 'fase-title'
      },
      /**
       * Time of fase
       */
      faseTime: {
        type: Number,
        attribute: 'fase-time',
      },
      /**
       * Version to show normal | reducer
       * @default false
       */
      reduce: {
        type: Boolean,
        attribute: 'reduce'
      }
    }
  };

  static get styles() {
    return [styles]
  }

  constructor() {
    super();
    this.name = '';
    this.fase = 'default';
    this.faseTitle = '';
    this.faseTime = '1';

    this.reduce = false;

    // this.monitor = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.monitoring('fase of components [chrono-view] ', 'default', this.fase);
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('faseTime')) {
      this.requestUpdate();
    }
  }

  shouldUpdate() {
    super.shouldUpdate();
    return true
  }

  render() {
    return !this.reduce ? this._versionNormal : this._versionReduce;
  }

  get _versionNormal() {
    const {
      faseTime
    } = this;

    const min = Math.floor(faseTime / 60000);
    const sec = pad(min, Math.floor((faseTime / 1000) % 60));
    const hun = pad(true, Math.floor((faseTime % 1000) / 10));

    return html `
      <div class="container" style=${this._addStyle}>
        <div class="container-fase-title">
          <div class="title" >${this.faseTitle}</div>
        </div>
        <div class="container-fase-time">
          <div class="fase-time">${min ? `${min}:${sec}` : `${sec}.${hun}`}</div>
        </div>
      </div>
    `
  }

  get _versionReduce() {
    const {
      faseTime
    } = this;

    const min = Math.floor(faseTime / 60000);
    const sec = pad(min, Math.floor((faseTime / 1000) % 60));
    const hun = pad(true, Math.floor((faseTime % 1000) / 10));

    return html `
      <div class="container-reduce" style=${this._addStyle}>
        <div class="container-fase-title-reduce">
          <div class="title-reduce" >${this.faseTitle}</div>
        </div>
        <div class="container-fase-time-reduce">
          <div class="fase-time-reduce">${min ? `${min}:${sec}` : `${sec}.${hun}`}</div>
        </div>
      </div>
    `
  }

  get _addStyle() {
    return css `background-color: ${this._colorBackground[this.fase]};
                color: ${this._colorForeground[this.fase]} `;
  }

  get _colorBackground() {
    return {
      default: css `#4EFF00`,
      training: css `#4EFF00`,
      resting: css `#EB0303`,
      preparing: css `#ECF80A`,
      cooling: css `#08E5FF`,
    }
  }

  get _colorForeground() {
    return {
      default: css `#000000`,
      training: css `#000000`,
      resting: css `#FFFFFF`,
      preparing: css `#000000`,
      cooling: css `#FFFFFF`,
    }
  }

}

function pad(pad, val) {
  return pad ? String(val).padStart(2, "0") : val;
}

customElements.define(ChronoView.is, ChronoView);