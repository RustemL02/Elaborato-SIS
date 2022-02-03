export class Command {
    /**
     *
     * @param cmnd
     * @param opts
     */
    constructor(cmnd, opts = []) {
        /**
         *
         */
        this.m_command = '';
        /**
         *
         */
        this.m_options = [];
        this.m_command = cmnd;
        this.m_options = opts;
    }
    /**
     *
     * @param cmnd
     */
    setCommand(cmnd) {
        this.m_command = cmnd;
    }
    /**
     *
     * @returns
     */
    command() {
        return this.m_command;
    }
    /**
     *
     * @param opts
     */
    setOptions(opts) {
        this.m_options = opts;
    }
    /**
     *
     * @param opts
     */
    addOptions(opts) {
        this.m_options = [
            ...this.m_options, ...opts
        ];
    }
    /**
     *
     * @returns
     */
    options() {
        return this.m_options;
    }
    /**
     *
     * @returns
     */
    toString() {
        let res = `${this.m_command}`;
        for (const [i, opt] of this.m_options.entries()) {
            if ((i + 1) <= this.m_options.length) {
                res += ' ';
            }
            res += opt.toString();
        }
        return res;
    }
}
;
