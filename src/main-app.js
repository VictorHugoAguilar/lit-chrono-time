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
      executing: {
        type: String,
      },
      autoRunning: {
        type: Boolean
      },
      listenerEventStart: {},
      listenerEventLaunch: {},

    };
  }

  constructor() {
    super();
    this.timeExercice = 30;
    this.timeRest = 90;
    this.executing = '';
    this.autoRunning = true;
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
    this.listenerEventStart = this.executeStart.bind(this);
    this.listenerEventLaunch = this.executeLaunch.bind(this);
    this.addEventListener("start", this.listenerEventStart);
    this.addEventListener("launch", this.listenerEventLaunch);
  }

  disconnectedCallback() {
    this.removeListener("start", this.listenerEventStart);
    this.removeListener("launch", this.listenerEventLaunch);
    super.disconnectedCallback();
  }

  executeStart({
    detail
  }) {
    console.log("start manual", detail);
    this.execute(detail);
  }

  executeLaunch({
    detail
  }) {
    console.log("start automatic", detail);
    this.execute(detail);
  }

  /**
   * Dependiendo del nombre evento que viene se ejecuta y restaura 
   * el componente secundario.
   * @param {String} nameEvent 
   */
  execute(nameEvent) {
    this.executing = nameEvent;
    console.log('executing -> ', this.executing)
    if (this.executing === "exercise") {
      console.log('start manual exercise')
      this.shadowRoot.querySelector("#exercise").start();
      this.shadowRoot.querySelector("#exercise").reset();
      this.shadowRoot.querySelector("#rest").stop();
    }
    if (this.executing === "rest") {
      console.log('start manual rest')
      this.shadowRoot.querySelector("#rest").reset();
      this.shadowRoot.querySelector("#rest").start();
      this.shadowRoot.querySelector("#exercise").stop();
    }
    if (this.autoRunning && this.executing === "finished-exercise") {
      console.log('finished-exercise start rest')
      this.shadowRoot.querySelector("#rest").reset();
      this.shadowRoot.querySelector("#rest").start();
      this.shadowRoot.querySelector("#exercise").stop();
    }
    if (this.autoRunning && this.executing === "finished-rest") {
      console.log('finished-exercise start exercise')
      this.shadowRoot.querySelector("#exercise").start();
      this.shadowRoot.querySelector("#exercise").reset();
      this.shadowRoot.querySelector("#rest").stop();
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