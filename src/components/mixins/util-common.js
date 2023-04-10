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


  }