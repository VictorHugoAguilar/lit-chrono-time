import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import './index.js';

export class MainApp extends LitElement {

  static get properties() {
    return {
      titleHead: {
        type: String,
        attribute: 'title-head',
      },
      timeExercice: {
        type: Number,
      },
      timeRest: {
        type: Number,
      },
      autoRunning: {
        type: Boolean,
      }
    };
  }

  constructor() {
    super();
    this.titleHead = 'Workout time'
    this.timeExercice = 30;
    this.timeRest = 90;
    this.autoRunning = true;
  }

  static get styles() {
    return css `
    :host {
      font-family: "JetBrains Mono", monospace;
    }`;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html `
      <div>
        <header-component 
          main-title=${this.titleHead}
          @change-properties=${(e) => this._changesProperties(e)}
          time-exercice=${this.timeExercice}
          time-rest=${this.timeRest}
          ?auto-running=${ this.autoRunning}
        ></header-component>
        <div class="main">
          ${this._tlpChrono}
        </div>
      </div>
    `;
  }

  _changesProperties({
    detail
  }) {
    const {
      timeExercice,
      timeRest,
      autoRunning
    } = detail;
    this.timeExercice = timeExercice;
    this.timeRest = timeRest;
    this.autoRunning = autoRunning;
  }

  get _tlpChrono() {
    return html ` <main-chrono 
    time-exercice=${this.timeExercice}
    time-rest=${this.timeRest}
    ?auto-running=${ this.autoRunning}
  ></main-chrono>`
  }

  // updated(changedProperties) {
  //   if (changedProperties && changedProperties.get('timeExercice')) {
  //     this.requestUpdate();
  //   }
  //   if (changedProperties && changedProperties.get('timeRest')) {
  //     this.requestUpdate();
  //   }
  //   if (changedProperties && changedProperties.get('autoRunning')) {
  //     this.requestUpdate();
  //   }
  // }
}

customElements.define("main-app", MainApp);