import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import "./my-chrono.js";

export class MainApp extends LitElement {
  static get properties() {
    return {
      timeExercice: {
        type: String,
        attribute: 'time-exercice',
      },
      timeRest: {
        type: String,
        attribute: 'time-rest',
      },
      listenerEvent: {},
    };
  }

  constructor() {
    super();
    this.timeExercice = 30;
    this.timeRest = 90;
  }

  static get styles() {
    return css `
      .container {
        width: 100%;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.listenerEvent = this.execute.bind(this);
    this.addEventListener("start", this.listenerEvent);
  }

  disconnectedCallback() {
    this.removeListener("start", this.listenerEvent);
    super.disconnectedCallback();
  }

  execute({
    detail
  }) {
    console.log("detailevent", detail);
    if (detail === "exercise") {
      this.shadowRoot.querySelector("#rest").reset();
      this.shadowRoot.querySelector("#rest").start();
    }
    if (detail === "rest") {
      this.shadowRoot.querySelector("#exercise").reset();
      this.shadowRoot.querySelector("#exercise").start();
    }
  }

  render() {
    return html `
      <div class="container">
        <my-timer id="exercise" class="exercise" duration=${this.timeExercice} name="exercise"></my-timer>
        <my-timer id="rest" class="rest" duration=${this.timeRest} name="rest"></my-timer>
      </div>
    `;
  }
}

customElements.define("main-app", MainApp);