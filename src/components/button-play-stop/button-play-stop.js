import {
  LitElement,
  html,
  svg
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import styles from './button-play-stop-styles.js';

import '../button-play-stop/progressbar.js';

export class ButtonPlayStop extends LitElement {
  static get properties() {
    return {
      name: {
        type: String,
        attribute: 'name'
      },
      totalTime: {
        type: Number,
        attribute: 'total-time',
      },
      totalElapsed: {
        type: Number,
        attribute: 'total-elapsed',
      },
      status: {
        type: 'String',
        attribute: 'status'
      },
      widthButton: {
        type: String,
        attribute: 'width-button'
      },
      heightButton: {
        type: String,
        attribute: 'height-button'
      },
      progressBarBackgroundColor: {
        type: String,
        attribute: 'progress-bar-background-color',
      },
      progressBarColor: {
        type: String,
        attribute: 'progress-bar-color',
      }
    }
  };

  static get styles() {
    return [styles]
  }

  constructor() {
    super();
    this.name = 'default';
    this.totalTime = 0;
    this.totalElapsed = 0;
    this.status = 'stopped';

    this.widthButton = '100';
    this.heightButton = '100';

    this.progressBarBackgroundColor = '#7F7E7E';
    this.progressBarColor = this._colorIcon[this.name];

    this.circleBar = null;
    this.circleProgress = '0';
  }

  connectedCallback() {
    super.connectedCallback();

    this.progressBarColor = this._colorIcon[this.name];

    setInterval(() => {
      this.totalElapsed++
    }, 1000)
  }

  firstUpdated() {
    this.circleBar = new ProgressBar.Circle(this.renderRoot.querySelector('#progress-bar'), {
      strokeWidth: 9,
      trailWidth: 10,
      color: this.progressBarColor,
      trailColor: this.progressBarBackgroundColor,
      easing: 'easeInOut'
    });

    this.circleBar.animate(this.circleProgress, {
      duration: 1500
    });

    this._calculteProgress();
  }

  updated(changedProperties) {
    super.updated(changedProperties)
    if (changedProperties && changedProperties.get('totalTime')) {
      console.log('progress change atribute totalTime ')
      this._calculteProgress();
      this.requestUpdate();
    }
    if (changedProperties && changedProperties.get('totalElapsed')) {
      console.log('progress change atribute totalElapsed ')
      this._calculteProgress();
      this.requestUpdate();
    }
  }

  shouldUpdate() {
    super.shouldUpdate();
    return true
  }

  render() {
    return html `
      <div class="container" style="width: ${this.widthButton}px; height: ${this.heightButton}px;">
        <div class="main-icon">
          <div 
            id="progress-bar" 
            class="progress-bar" 
            style="width: ${this.widthButton}px; height: ${this.heightButton}px;"
            @click=${ () => this._changeStatus() }
          ></div>  
          <div 
            class="icon" 
            style="width: ${this.widthButton}px; height: ${this.heightButton}px;"
          > ${ this._containerIcon} </div>
        </div>
      </div>
    `;
  }

  get _containerIcon() {
    return svg `<svg
        xmlns="http://www.w3.org/2000/svg"
        height="${this.heightButton * 0.8}px"
        width="${this.widthButton * 0.8}px"
        viewBox="0 0 24 24"
        fill="${this._colorIcon[this.name]}"
        >${this._icon}</svg>`
  }

  get _icon() {
    if (this.status === 'playing') {
      return svg `
        <title>Pause</title>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      `
    }
    if (this.status === 'stopped') {
      return svg `
        <title>Play</title>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
      `
    }
  }

  get _colorIcon() {
    return {
      default: '#4EFF00',
      training: '#4EFF00',
      resting: '#EB0303',
      preparing: '#ECF80A',
      cooling: '#08E5FF',
    }
  }

  _changeStatus() {
    this.status = this.status === 'playing' ? 'stopped' : 'playing'
    console.log('cambiando', this.status)
    return true;
  }

  _calculteProgress() {
    this.circleProgress = ((this.totalElapsed * 100) / this.totalTime) / 100;
    console.log(this.circleProgress)
    console.log('circlepprogress', Math.round(this.circleProgress * 100) / 100)
    if (this.circleProgress <= 1) {
      this.circleBar.animate(this.circleProgress, {
        duration: 1000
      });
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

customElements.define("button-play-stop", ButtonPlayStop);