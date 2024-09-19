import {log_debug, log_info} from "../utils/logging";
import {colorize} from "../utils/colorize";
import {WebProcessing} from "../utils/web_processing";
import {E6Post} from "../Objects/E6Post";
import {Other_utils} from "../utils/Other_utils";
import { LRUCache } from "lru-cache"

export class BotE6Watcher {

    posts: Array<E6Post>;
    private rescan_frequency: number = 60;
    lru_cache: LRUCache<any,any>;

    async init() {
        log_info(`[${colorize.blue_e("E6 Watcher")}] Init E621 Watcher`);
        await this.init_cache();
        await this.process_posts()

        setInterval(async () => {
            await this.process_posts()
        }, this.rescan_frequency * 1000)
    }

    async api_get_posts() {
        const url_path = "/posts.json?limit=50";
        const wp = new WebProcessing()

        const test_post = await this.api_get(url_path)
        const posts = await test_post.json();
        const http_status_code: number = test_post.status;
        log_debug(`http status: ${wp.process_http_status_codes(http_status_code)}`);
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

    async process_posts() {
        const ou = new Other_utils();
        const posts = await this.api_get_posts();
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            let e6post = new E6Post(post);
            if (this.lru_cache.has(e6post.id)) {
                log_info(`[${colorize.blue_e("E6 Watcher")}] [${i}] Post already in cache: ${e6post.id}`)
            } else {
                log_info(`[${colorize.blue_e("E6 Watcher")}] [${i}] Processing post: ${e6post.id}`)
                log_info(`[${colorize.blue_e("E6 Watcher")}] Description: ${e6post.description}`)
                log_info(`[${colorize.blue_e("E6 Watcher")}] File: ${e6post.file.url}`)
                log_info(`[${colorize.blue_e("E6 Watcher")}] Preview: ${e6post.preview.url}`)
                log_info(`[${colorize.blue_e("E6 Watcher")}] Type: ${this.is_video(e6post) ? "Video" : "Image"}`)
                this.lru_cache.set(e6post.id, e6post);
                await ou.sleep(10)
            }
        }
    }

    is_video = (post: E6Post) => {
        const file_types = ["mp4", "mov", "webm", "mkv"];
        return file_types.includes(post.file.ext);
    }

    private async init_cache() {
        const seconds = 1000;
        const minute = seconds * 60;
        const hour = minute * 60;
        const options = {
            max: 500,
            // keep in cache for 2 days
            ttl: hour * 48,
            allowStale: false,
            updateAgeOnGet: false,
            updateAgeOnHas: false,
        }
        this.lru_cache = new LRUCache(options);
    }
}