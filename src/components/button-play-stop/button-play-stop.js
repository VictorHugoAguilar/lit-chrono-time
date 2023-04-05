import { LitElement, html, svg } from "lit";

import { FireEventMixin } from '../mixins/fire-events.js';

import '../button-play-stop/progressbar.js';

import styles from './button-play-stop-styles.js';

/**
 * Buttons play stop
 * @description Buttons play stop
 * @customElement button-play-stop
 * 
 * @property { String } name - name of component buttons
 * @property { String } type - type of buttons posibility default| training | resting | preparing | cooling @default default 
 * @property { Number } totalTime - total time
 * @property { Number } totalElapsed - total time elapsed
 * @property { String } status - status of buttons @default stopped
 * @property { String } widthButton - width of buttons @default 100px
 * @property { String } heightButton - heightButton of buttons @default 100px
 * @property { String } progressBarBackgroundColor - background progress bar @default #7F7E7E
 * @property { String } progressBarColor - color progress bar @default #4EFF00
 * 
 * @fire button-play-stop#change-status - launch event with new status
 * 
 * @author Victor Hugo Aguilar Aguilar
 */
export class ButtonPlayStop extends FireEventMixin(LitElement) {
  static get is() {
    return 'button-play-stop';
  }

  static get properties() {
    return {
      /**
       * Name of component buttons
       */
      name: {
        type: String,
        attribute: 'name',
      },
      /**
       * Type buttons: default | training | resting | preparing | cooling
       * @description property name the button to show
       * @enum default | training | resting | preparing | cooling
       * @default default
       */
      type: {
        type: String,
        attribute: 'type',
      },
      /**
       * Total time
       */
      totalTime: {
        type: Number,
        attribute: 'total-time',
      },
      /**
       * Total time elapsed
       */
      totalElapsed: {
        type: Number,
        attribute: 'total-elapsed',
      },
      /**
       * Status of buttons stopped | playing
       * @default stopped
       */
      status: {
        type: 'String',
        attribute: 'status'
      },
      /**
       * Width buttons
       * @default 100px
       */
      widthButton: {
        type: String,
        attribute: 'width-button'
      },
      /**
       * Height buttons
       * @default 100px
       */
      heightButton: {
        type: String,
        attribute: 'height-button'
      },
      /**
       * Background color progress bar
       * @default #7F7E7E
       */
      progressBarBackgroundColor: {
        type: String,
        attribute: 'progress-bar-background-color',
      },
      /**
       * Forecolor progress bar
       * @default #4EFF00
       */
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
    this.name = '';
    this.type = 'default';
    this.totalTime = 0;
    this.totalElapsed = 0;
    this.status = 'stopped';

    this.widthButton = '100';
    this.heightButton = '100';

    this.progressBarBackgroundColor = '#7F7E7E';
    this.progressBarColor = this._colorIcon[this.type];

    this.circleBar = null;
    this.circleProgress = '0';
  }

  connectedCallback() {
    super.connectedCallback();
    this.progressBarColor = this._colorIcon[this.type];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
      console.warn('progress change atribute totalTime ', {
        totalTime: this.totalTime,
        totalTimeElapsed: this.totalElapsed
      })
      this._calculteProgress();
      this.requestUpdate();
    }
    if (changedProperties && changedProperties.get('totalElapsed')) {
      console.warn('progress change atribute totalElapsed ', {
        totalTime: this.totalTime,
        totalTimeElapsed: this.totalElapsed
      })
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
        fill="${this._colorIcon[this.type]}"
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
    this.fireEvent('change-status', {
      name: this.name,
      status: this.status
    })
    this.fireEvent('click-status', {
      name: this.name,
    })
    return true;
  }

  _calculteProgress() {
    const percentCalculate = Math.round(((this.totalElapsed * 100) / this.totalTime) * 100) / 10000;
    this.circleProgress = percentCalculate;
    if (this.circleProgress <= 1) {
      this.circleBar.animate(this.circleProgress, {
        duration: 1000
      });
    }
  }
}

customElements.define(ButtonPlayStop.is, ButtonPlayStop);