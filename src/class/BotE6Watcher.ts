import {log_debug, log_info} from "../utils/logging";
import {colorize} from "../utils/colorize";

export class BotE6Watcher {

    posts: Array<any>;

    public constructor() {
    }

    async init() {
        log_info(`[${colorize.blue_e("E6 Watcher")}] Init E621 Watcher`);
        this.posts = await this.api_get_posts()
        log_info(`[${colorize.blue_e("E6 Watcher")}] posts: ${this.posts.length}`)
    }

    async api_get_posts() {
        const url_path = "/posts.json";

        const test_post = await this.api_get(url_path)
        const posts = await test_post.json();
        const http_status_code: number = test_post.status;
        log_debug(`http status: ${http_status_code}`);
        log_debug(`posts length: ${posts["posts"].length}`);
        return posts["posts"];
    }

    async api_get(path: string) {
        const username = process.env.E6_USERNAME;
        const apiKey = process.env.E6_API_KEY;
        const base_url = "https://e621.net";

        log_debug(`username: ${username}`);
        log_debug(`apiKey: ${apiKey}`);
        log_debug(`base_url: ${base_url}`);
        log_debug(`path: ${path}`);

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
}