import {
  LitElement,
  html,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import {
  play,
  pause,
  replay
} from "./icons.js";

export class MyChrono extends LitElement {
  static get properties() {
    return {
      name: {
        type: String
      },
      duration: {
        type: Number,
        attribute: 'duration',
      },
      end: {
        state: true
      },
      remaining: {
        state: true,
      },
      executing: {
        state: true
      },
      _titleTime: {
        type: String
      }
    }
  };

  static get styles() {
    return css `
      :host {
        display: inline-block;
        width: 100%;
      }
      .my-chrono-container {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: thin solid yellow;
      }
      .my-chrono-main {
        border: thin solid red;
        user-select: none;
      }
      .my-chrono-main-title{
        border: thin solid red;
        font-size: 3em;
        text-transform: uppercase;
      }
      .my-chrono-main-time {
        border: thin solid red;
        padding: 25px 0px 10px 0px;
        font-size: 7em;
      }
      .my-chrono-control {
        user-select: none;
        background-color: #969494;
        padding: 10px 0px 10px 0px;
        color: white;
      }
  `;
  }

  constructor() {
    super();
    this.duration = 0;
    this.end = null;
    this.remaining = 0;
    this.name = "";
    this.executing = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('duration')) {
      this.reset();
      this.requestUpdate();
    }
  }

  shouldUpdate() {
    super.shouldUpdate();
    return true
  }

  render() {
    const {
      remaining,
      running
    } = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));

    const mainColor = remaining <= 5000 ? this._warningStyle : css `background-color: greenyellow`;

    return html `
      <div class="my-chrono-container">
        <div class="my-chrono-main" style="${mainColor}">
          <div class="my-chrono-main-title">
            ${this._titleTime}
          </div>
          <div class="my-chrono-main-time">
            ${min ? `${min}:${sec}` : `${sec}.${hun}`}
          </div>
        </div>
        <div class="my-chrono-control">
          ${remaining === 0
            ? ""
            : running
            ? html`<span @click=${this.pause}>${pause}</span>`
            : html`<span @click=${ () => {this.start(); this.startManual()} }>${play}</span>`}
          <span @click=${this.reset}>${replay}</span>
        </div>
      </div>
    `;
  }

  set remaining(val) {
    let oldVal = this._remaining;
    this._remaining = val;
    this.requestUpdate("remaining", oldVal);
  }

  get remaining() {
    if (this._remaining < 20 && this._remaining > 0 && this.executing) {
      this.fireEvent("launch", `finished-${this.name}`);
      this.executing = false;
    }
    return this._remaining;
  }

  get _warningStyle() {
    const refreshTime = Math.round(this.remaining / 100) % 3;
    return this._colorRefresh[refreshTime]
  }

  get _colorRefresh() {
    return {
      0: css `background-color: red; color: black`,
      1: css `background-color: yellow; color: black`,
      2: css `background-color: greenyellow; color: black `,
    }
  }

  get running() {
    return this.end && this.remaining;
  }

  start() {
    this.end = Date.now() + this.remaining;
    this.tick();
    this.executing = true;
  }

  startManual() {
    this.fireEvent('start', this.name)
  }

  pause() {
    this.end = null;
  }

  reset() {
    const running = this.running;
    this.remaining = this.duration * 1000;
    this.end = running ? Date.now() + this.remaining : null;
  }

  stop() {
    this.end = null;
    this.remaining = this.duration * 1000;
    this.executing = false;
  }

  tick() {
    if (this.running) {
      this.remaining = Math.max(0, this.end - Date.now());
      requestAnimationFrame(() => this.tick());
    }
  }

  get _titleTime() {
    return this._traductionTitleTime[this.name];
  }

  get _traductionTitleTime() {
    return {
      exercise: 'Entrenar',
      rest: 'Descansar',
      prepare: 'Preparar',
      cooling: 'Enfriamiento',
    }
  }

  fireEvent(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, {
        composed: true,
        bubbles: true,
        detail,
      })
    );
  }
}
customElements.define("my-chrono", MyChrono);

function pad(pad, val) {
  return pad ? String(val).padStart(2, "0") : val;
}