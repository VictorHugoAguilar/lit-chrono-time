/**
 * Mixin lauch event customs
 * @param {*} Base 
 */
export const FireEventMixin = Base =>
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

    /**
     * 
     * Launch custom event with bubbles and composed
     * @param {String} name 
     * @param {Object} detail 
     */
    fireEvent(name, detail) {
      console.warn('lauch event from mixin FireEvent', detail)
      this.dispatchEvent(
        new CustomEvent(name, {
          composed: true,
          bubbles: true,
          detail,
        })
      );
    }
  }