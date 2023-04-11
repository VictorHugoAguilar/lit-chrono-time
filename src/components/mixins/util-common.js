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
        default: css `#4EFF00`,
        training: css `#4EFF00`,
        resting: css `#EB0303`,
        preparing: css `#ECF80A`,
        cooling: css `#08E5FF`,
      }
    }

    pad(pad, val) {
      return pad ? String(val).padStart(2, "0") : val;
    }

  }