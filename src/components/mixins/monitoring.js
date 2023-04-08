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
        console.error(name, detail);
        return true;
      }
      if (type === 'info') {
        console.info(name, detail);
        return true;
      }
      if (type === 'table') {
        console.warn(name);
        console.table(detail);
        return true;
      }
      console.log(getFormat(name), detail)
      return true;
    }
  }

/**
 * Get format:  Wed Apr 05 2023 17:55:10 :: name ::
 * @param {*} name 
 * @returns {String} name formatting with date
 */
function getFormat(name) {
  const date = new Date().toString();
  const splitAt = date.indexOf('GMT');
  const dateSplit = date.substring(0, splitAt);
  return `${dateSplit}:: ${name}::`
}