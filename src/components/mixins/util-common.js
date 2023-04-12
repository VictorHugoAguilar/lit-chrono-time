/**
 * Util Mixin
 * @param { Object } Base 
 */
export const UtilMixin = Base =>
  class FireEvent extends Base {

    /**
     * Declared properties and their corresponding attributes
     */
    static get properties() {
      return {};
    }

    /**
     * Instance of the element is created/upgraded. Useful for initializing
     * state, set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
      super();
    }


    get _colorForPhase() {
      return {
        default: css `${DEFAULT}`,
        training: css `${TRAINING}`,
        resting: css `${RESTING}`,
        preparing: css `${PREPARING}`,
        cooling: css `${COOLING}`,
      }
    }

    pad(pad, val) {
      return pad ? String(val).padStart(2, "0") : val;
    }

  }

const DEFAULT = '#4EFF00';
const TRAINING = '#4EFF00';
const RESTING = '#EB0303';
const PREPARING = '#ECF80A';
const COOLING = '#08E5FF';