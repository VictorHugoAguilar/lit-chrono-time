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
      autoExecuting: {
        type: Boolean,
      }

    };
  }

  constructor() {
    super();
    this.timeExercice = 5;
    this.timeRest = 5;
    this.autoExecuting = false;
  }

  static get styles() {
    return css ``;
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
        <header-component main-title="Workout time"></header-component>
        <div class="main">
          <main-chrono 
            time-exercice="${this.timeExercice}" 
            time-rest="${this.timeRest}" 
            ?auto-running="${ this.autoExecuting}"
          ></main-chrono>
        </div>
      </div>
    `;
  }
}

customElements.define("main-app", MainApp);