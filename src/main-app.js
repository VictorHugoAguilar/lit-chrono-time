import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import './index.js';

export class MainApp extends LitElement {
  static get properties() {
    return {
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
    this.timeExercice = 30;
    this.timeRest = 90;
    this.autoRunning = true;
  }

  static get styles() {
    return css `
    * {
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
          main-title="Workout time"
          @change-properties="${(e) => this._changesProperties(e)}"
          time-exercice="${this.timeExercice}" 
          time-rest="${this.timeRest}" 
          ?auto-running="${ this.autoRunning}"
        ></header-component>
        <div class="main">
          <main-chrono 
            time-exercice="${this.timeExercice}" 
            time-rest="${this.timeRest}" 
            ?auto-running="${ this.autoRunning}"
          ></main-chrono>
        </div>
      </div>
    `;
  }

  _changesProperties({
    detail
  }) {
    console.log('_changesProperties', detail)
    const {
      timeExercice,
      timeRest,
      autoRunning
    } = detail;
    this.timeExercice = timeExercice;
    this.timeRest = timeRest;
    this.autoRunning = autoRunning;
    this.requestUpdate();
    console.log('this.timeExercice', this.timeExercice)
  }
}

customElements.define("main-app", MainApp);