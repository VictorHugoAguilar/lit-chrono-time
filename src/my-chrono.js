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

export class MyTimer extends LitElement {
  static properties = {
    duration: {},
    end: {
      state: true
    },
    remaining: {
      state: true,
      // hasChanged(newVal, oldVal) {
      //   if (newVal === 0 && oldVal < 20) {
      //     console.log("newVal", newVal);
      //     console.log("oldVal", oldVal);
      //     // this.fireEvent("start", this.name);
      //   }
      //   return newVal;
      // },
    },
    executing: {
      state: false
    },
    name: {
      type: String
    },
  };
  static styles = css `
    /* playground-fold */
    :host {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .time {
      font-size: 7em;
      padding-bottom: 15%;
      padding-top: 15%;
      user-select: none;
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
    this.name = "";
    this.executing = false;
  }

  render() {
    const {
      remaining,
      running
    } = this;
    const min = Math.floor(remaining / 60000);
    const sec = pad(min, Math.floor((remaining / 1000) % 60));
    const hun = pad(true, Math.floor((remaining % 1000) / 10));

    const mainColor = remaining <= 5000 ? this._warningStyle : css `greenyellow`;

    return html `
      <div class="container">
        <div class="time" style="background-color:${mainColor}">
          ${min ? `${min}:${sec}` : `${sec}.${hun}`}
        </div>
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
    this.executing = true;
  }

  pause() {
    this.end = null;
  }

  set remaining(val) {
    let oldVal = this._remaining;
    this._remaining = val;
    this.requestUpdate("remaining", oldVal);
    /* this.dosomething(); */
  }
  get remaining() {
    if (this._remaining < 20 && this._remaining > 0 && this.executing) {
      this.fireEvent("start", this.name);
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
      0: css `red`,
      1: css `yellow`,
      2: css `greenyellow`,
    }
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

  fireEvent(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, {
        composed: true,
        bubbles: true,
        detail,
      })
    );
  }

  get running() {
    return this.end && this.remaining;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reset();
  }

  update() {
    super.update();
  }

  /* playground-fold-end */
}
customElements.define("my-timer", MyTimer);

/* playground-fold */
function pad(pad, val) {
  return pad ? String(val).padStart(2, "0") : val;
}
/* playground-fold-end */