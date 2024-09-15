import {log_debug} from "./logging";
import {colorize} from "./colorize";

const processURL = (url: string) => {
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

export { processURL };