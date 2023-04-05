import { LitElement, html, css } from "lit";

import "./index.js";

export class MainChrono extends LitElement {
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
        type: Boolean,
        attribute: 'auto-running',
        reflex: true
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
    this.autoRunning = false;
  }

  static get styles() {
    return css `
      :host{
        font-family: "JetBrains Mono", monospace;
      },
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
    console.info("start manual", detail);
    this.execute(detail);
  }

  executeLaunch({
    detail
  }) {
    console.info("start automatic", detail);
    this.execute(detail);
  }

  /**
   * Dependiendo del nombre evento que viene se ejecuta y restaura 
   * el componente secundario.
   * @param {String} nameEvent 
   */
  execute(nameEvent) {
    this.executing = nameEvent;
    console.info('executing -> ', this.executing)
    if (this.executing === "exercise") {
      console.info('start manual exercise')
      this.shadowRoot.querySelector("#exercise").start();
      this.shadowRoot.querySelector("#exercise").reset();
      this.shadowRoot.querySelector("#rest").stop();
    }
    if (this.executing === "rest") {
      console.info('start manual rest')
      this.shadowRoot.querySelector("#rest").reset();
      this.shadowRoot.querySelector("#rest").start();
      this.shadowRoot.querySelector("#exercise").stop();
    }
    if (this.autoRunning && this.executing === "finished-exercise") {
      console.info('finished-exercise start rest')
      this.shadowRoot.querySelector("#rest").reset();
      this.shadowRoot.querySelector("#rest").start();
      this.shadowRoot.querySelector("#exercise").stop();
    }
    if (this.autoRunning && this.executing === "finished-rest") {
      console.info('finished-exercise start exercise')
      this.shadowRoot.querySelector("#exercise").start();
      this.shadowRoot.querySelector("#exercise").reset();
      this.shadowRoot.querySelector("#rest").stop();
    }
  }

  updated(changedProperties) {
    if (changedProperties && changedProperties.get('timeExercice')) {
      console.info('changes', this.timeExercice)
      this.requestUpdate();
    }
  }

  render() {
    return html `
      <div class="container">
        <my-chrono id="exercise" class="exercise" duration=${this.timeExercice} name="exercise"></my-chrono>
        <my-chrono id="rest" class="rest" duration=${this.timeRest} name="rest"></my-chrono>
      </div>
    `;
  }
}

customElements.define("main-chrono", MainChrono);