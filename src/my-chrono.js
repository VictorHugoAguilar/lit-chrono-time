import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
/* playground-fold */
import { play, pause, replay } from "./icons.js";
/* playground-fold-end */

export class MyTimer extends LitElement {
  static properties = {
    duration: {},
    end: { state: true },
    remaining: { state: true },
    background: {},
  };
  static styles = css`
    /* playground-fold */
    :host {
      width: 100%;
      height: 800px;
      display: inline-block;
      text-align: center;
    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .time {
      background-color: greenyellow;
      font-size: 7em;
      padding-bottom: 15%;
      padding-top: 15%;
    }
    .control {
      user-select: none;
      background-color: #969494;
      padding: 20px 0px 20px 0px;
    }
    /* playground-fold-end */
  `;

  constructor() {
    super();
    this.duration = 60;
    this.end = null;
    this.remaining = 0;
  }

  render() {
    const { remaining, running } = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));
    return html`
      <div class="container">
        <div class="time">${min ? `${min}:${sec}` : `${sec}.${hun}`}</div>
        <div class="control">
          ${remaining === 0
            ? ""
            : running
            ? html`<span @click=${this.pause}>${pause}</span>`
            : html`<span @click=${this.start}>${play}</span>`}
          <span @click=${this.reset}>${replay}</span>
        </div>
      </div>
    `;
  }
  /* playground-fold */

  start() {
    this.end = Date.now() + this.remaining;
    this.tick();
  }

  pause() {
    this.end = null;
  }

  reset() {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running ? Date.now() + this.remaining : null;
  }

  tick() {
    if (this.running) {
      this.remaining = Math.max(0, this.end - Date.now());
      requestAnimationFrame(() => this.tick());
    }
  }

  get running() {
    return this.end && this.remaining;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  } /* playground-fold-end */
}
customElements.define("my-timer", MyTimer);
/* playground-fold */

function pad(pad, val) {
  return pad ? String(val).padStart(2, "0") : val;
} /* playground-fold-end */
