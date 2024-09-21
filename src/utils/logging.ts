import moment from "moment";
import {colorize} from "./colorize";
import config from "../../config.json";

const log_debug = (message: string) => {
    if (config.debug) {
        const buildMessage = `[${colorize.cyan_e(moment().format('L'))}] [${colorize.green_e(moment().format('h:mm:ss a'))}] [${colorize.blue_e('DEBUG')}] `;
        console.log(buildMessage + message);
    }
};
const log_info = (message: string) => {
    // @ts-ignore
    const buildMessage = `[${colorize.cyan_e(moment().format('L'))}] [${colorize.green_e(moment().format('h:mm:ss a'))}] [${colorize.green_e('INFO')}] `;
    console.log(buildMessage + message);
};

export {log_debug, log_info};