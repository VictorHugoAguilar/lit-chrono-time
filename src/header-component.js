import {
  LitElement,
  html,
  css
} from "lit";

import {
  config,
  replay
} from "./icons.js";

import './index.js'

export class HeaderComponent extends LitElement {
  static get properties() {
    return {
      mainTitle: {
        type: String,
        attribute: 'main-title',
      },
      hiddenConfig: {
        type: Boolean,
        attribute: 'hidden-config',
        reflect: true
      },
      timeExercice: {
        type: Number,
        attribute: 'time-exercice',
      },
      timeRest: {
        type: Number,
        attribute: 'time-rest',
      },
      autoRunning: {
        type: Boolean,
        attribute: 'auto-running',
        reflect: true
      },
    }
  }

  static get styles() {
    return css `
    :host {
      display: inline-block;
      user-select: none;
      width: 100%;
    }
    .container {
      // border: thin solid yellow;
      display: flex;
      background-color: rgb(59, 57, 57);
      flex-direction: column;
    }
    
    .main{
      padding: 10px 0px;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      /* border: thin solid red; */
    }
    
    .title {
      width: 80%;
      text-align: center;
      font-size: 2.5em;
      color: white;
      /* border: thin solid red; */
    }
    .icon{
      width: 10%;
      /* border: thin solid red; */
    }
    
    .icon-config{
      width: 40px;
      height: 40px;
      color: greenyellow;
      border: 2px solid greenyellow;
      border-radius: 50%; 
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-config svg {
      width: 24px;
      height: 24px;
    }

    .config{
      height: 90px;
      background-color: rgb(150, 148, 148);
    }

    .main-config {
      display: flex;
      flex-direction: column;
      justify-content:  space-around;
      align-items: start;
      padding: 10px;
    }

    .input-time {
      border-radius: 10px;
      width: 30px;
      height: 20px;
      background-color: greenyellow;
    }

    .input-check {
      background-color: greenyellow;
    }
  
  `;
  }

  constructor() {
    super();
    this.mainTitle = ''
    this.hiddenConfig = false;
    this.timeExercice = 0;
    this.timeRest = 0;
    this.autoRunning = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html `
    <div class="container">
      <div class="main">
        <div class="icon">
          <span class="icon-config" @click="${ () => this._hiddenConfig() }">
          ${config}
          </span>
        </div>
        <div class="title">
          <round-component></round-component>
        </div>
        <div class="icon">
          <span class="icon-config" @click="${ () => this._hiddenConfig() }">
          ${replay}
          </span>
        </div>
      </div>
      <div class="config" ?hidden=${!this.hiddenConfig}>
        <div class="main-config" >
          <div class="options">
            <span class="title-options">Time of exercice </span>
            <input name="time-exercice" class="input-time" type="number" value="${this.timeExercice}" @keyup="${this._changeValue}">
          </div>
          <div class="options">
            <span class="title-options">Time of rest </span>
            <input name="time-rest" class="input-time" type="number" value="${this.timeRest}" @keyup="${this._changeValue}"> 
          </div>
          <div class="options">
            <span class="title-options">Auto-Executing </span>
            <input name="auto-executing" class="input-check" type="checkbox" ?checked="${this.autoRunning}" @change="${this._changeValue}">
          </div>  
        </div>
      </div>
    </div>
  `;
  }

  _hiddenConfig() {
    this.hiddenConfig = !this.hiddenConfig
  }

  _changeValue(e) {
    const targetName = e.target.name;
    if (targetName === 'time-exercice') {
      this.timeExercice = Math.abs(e.target.value);
    }
    if (targetName === 'time-rest') {
      this.timeRest = Math.abs(e.target.value);
    }
    if (targetName === 'auto-executing') {
      this.autoRunning = e.target.checked;
    }

    this._fireEvent('change-properties', {
      timeExercice: this.timeExercice,
      timeRest: this.timeRest,
      autoRunning: this.autoRunning
    });
  }

  _fireEvent(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: detail,
      bubbles: true,
      composed: true
    }));
  }


}

customElements.define('header-component', HeaderComponent);