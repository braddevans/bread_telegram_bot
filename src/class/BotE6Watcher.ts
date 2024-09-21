import {log_debug, log_info} from "../utils/logging";
import {colorize} from "../utils/colorize";
import {WebProcessing} from "../utils/web_processing";
import {E6Post} from "../Objects/E6Post";

export class BotE6Watcher {

    posts: Array<E6Post>;
    rescan_frequency: number = 60;
    bot: any;


    constructor(bot: any) {
        this.bot = bot;
        this.posts = [];
    }


    async init() {
        log_info(`[${colorize.blue_e("E6 Watcher")}] Init E621 Watcher`);
        await this.process_posts()

        setInterval(async () => {
            await this.process_posts()
        }, this.rescan_frequency * 1000)
    }

    async api_get_posts(limit: number = 100) {
        // max limit for posts is 320 in 1 request
        const url_path = `/posts.json?limit=${limit}`;
        const wp = new WebProcessing()

        const test_post = await wp.e6_api_get(url_path)
        const posts = await test_post.json();
        const http_status_code: number = test_post.status;
        log_debug(`http status: ${wp.process_http_status_codes(http_status_code)}`);
        log_debug(`posts length: ${posts["posts"].length}`);
        return posts["posts"];
    }

    async process_posts() {
        const posts = await this.api_get_posts(50);
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            let e6post = new E6Post(post);
            if (this.bot.lruCache.has(e6post.id)) {
                log_debug(`[${colorize.blue_e("E6 Watcher")}] [${i}] Post already in cache: ${e6post.id}`)
                log_info(`[${colorize.blue_e("E6 Watcher")}] [${i}] Post already in cache: ${e6post.id}`)
            } else {
                log_debug(`[${colorize.blue_e("E6 Watcher")}] [${i}] Processing post: ${e6post.id}`)
                log_debug(`[${colorize.blue_e("E6 Watcher")}] Description: ${e6post.description}`)
                log_debug(`[${colorize.blue_e("E6 Watcher")}] File: ${e6post.file.url}`)
                log_debug(`[${colorize.blue_e("E6 Watcher")}] Preview: ${e6post.preview.url}`)
                log_debug(`[${colorize.blue_e("E6 Watcher")}] Type: ${this.is_video(e6post) ? "Video" : "Image"}`)
                this.bot.lruCache.set(e6post.id, e6post);
            }
        }
    }

    is_video = (post: E6Post) => {
        const file_types = ["mp4", "mov", "webm", "mkv"];
        return file_types.includes(post.file.ext);
    }
}