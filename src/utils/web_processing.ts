import {log_debug, log_info} from "./logging";
import {colorize} from "./colorize";
import config from "../../config.json";
import {Other_utils} from "./Other_utils";

export class WebProcessing {
    ou: Other_utils = new Other_utils();

    constructor() {
    }

    async e6_api_get(path: string) {
        log_info(`[${colorize.blue_e("Web Processing")}] E6 API GET: ${path}`);
        // the api rate limit is 2 per second, but I have set it hard limited to 1 per 2 seconds
        await this.ou.sleep(config.ratelimits.E621);

        const username = process.env.E6_USERNAME;
        const apiKey = process.env.E6_API_KEY;
        const base_url = "https://e621.net";
        if (process.env.DEBUG) {
            log_debug(`username: ${username}`);
            log_debug(`apiKey: ${apiKey}`);
            log_debug(`base_url: ${base_url}`);
            log_debug(`path: ${path}`);
        }

        return await fetch(base_url + path, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + btoa(`${username}:${apiKey}`),
                "User-Agent": `E6TGBotPostWatcher/1.0 (by ${username}; on e621)`,
            },
        }).then((response) => {
            return response;
        });
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