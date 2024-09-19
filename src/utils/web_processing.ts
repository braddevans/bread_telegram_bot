import {log_debug} from "./logging";
import {colorize} from "./colorize";

export class WebProcessing {

    constructor() {
    }

    processURL = (url: string) => {
        const startTime = new Date().getMilliseconds();
        log_debug(`(Processing URL): ${url}`);
        fetch(url, {
            method: "GET",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        })
            .then((response) => {
                    if (response.redirected) {
                        return response.url;
                    } else {
                        return response.url;
                    }
                }
            ).then((response) => {
                const endTime = new Date().getMilliseconds();
                const responseTime = (endTime - startTime);
                if (responseTime > 100) {
                    log_debug(`[${colorize.red_e(responseTime)} ms]: ${response}`);
                } else {
                    log_debug(`[${colorize.green_e(responseTime)} ms]: ${response}`);
                }
                return response;
            }
        )
    };

    process_http_status_codes = (status_code: Number) => {
        // @ts-ignore
        switch (status_code) {
            case 200:
                log_debug(`[200]: OK`);
                return `[200]: OK`;
            case 301:
                log_debug(`[301]: Moved Permanently`);
                return `[301]: Moved Permanently`;
            case 302:
                log_debug(`[302]: Found`);
                return `[302]: Found`;
            case 400:
                log_debug(`[400]: Bad Request`);
                return `[400]: Bad Request`;
            case 401:
                log_debug(`[401]: Unauthorized`);
                return `[401]: Unauthorized`;
            case 403:
                log_debug(`[403]: Forbidden`);
                return `[403]: Forbidden`;
            case 404:
                log_debug(`[404]: Not Found`);
                return `[404]: Not Found`;
            case 500:
                log_debug(`[500]: Internal Server Error`);
                return `[500]: Internal Server Error`;
            case 503:
                log_debug(`[503]: Service Unavailable`);
                return `[503]: Service Unavailable`;
            default:
                log_debug(`[unknown]: ${status_code}`);
                return `[unknown]: ${status_code}`
        }
    }

}