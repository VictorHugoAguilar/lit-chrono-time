/**
 * Mixin monitoring
 * @param { Object } Base 
 */
export const MonitoringMixin = Base =>
  class FireEvent extends Base {

    /**
     * Declared properties and their corresponding attributes
     */
    static get properties() {
      return {
        /**
         * monitor for activated or disabled monitoring
         * @default false
         */
        monitor: {
          type: Boolean,
          attribute: 'monitor',
          reflect: true,
        }
      };
    }

    /**
     * Instance of the element is created/upgraded. Useful for initializing
     * state, set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
      super();
      this.monitor = false;
    }

    /**
     * 
     * Launch monitoring
     * @param {String} name 
     * @param {Object} detail 
     */
    monitoring(name, type = 'default', detail = {}) {
      if (!this.monitor) {
        return false;
      }
      if (type === 'warn') {
        console.warn(name, detail);
        return true;
      }
      if (type === 'error') {
        console.warn(name, detail);
        return true;
      }
      if (type === 'info') {
        console.warn(name, detail);
        return true;
      }
      if (type === 'table') {
        console.warn(name);
        console.table(detail);
        return true;
      }
      console.log(name, detail)
      return true;
    }
  }