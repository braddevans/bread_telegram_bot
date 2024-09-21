import {log_info} from "../utils/logging";
import {Telegraf} from "telegraf";
import {colorize} from "../utils/colorize";

export class BotTelegramConnector {
    debug: boolean = false;
    telegraf: Telegraf;

    public constructor() {
        this.debug = process.env.DEBUG ? true : false;
        const BOT_TOKEN: string = String(process.env.BOT_TOKEN);
        this.telegraf = new Telegraf(BOT_TOKEN);
    }

    async init_middleware(telegraf: Telegraf) {
        log_info(`[${colorize.blue_e("Telegram Bot")}]: Init Middleware`);
        telegraf.use(async (ctx, next) => {
            console.time(`Processing update ${ctx.update.update_id}`);
            await next() // runs next middleware
            // runs after next middleware finishes
            console.timeEnd(`Processing update ${ctx.update.update_id}`);
        })
    }

    async init() {
        await this.init_middleware(this.telegraf);
        log_info(`[${colorize.blue_e("Telegram Bot")}]: LAUNCHING BOT`)
        await this.telegraf.launch();
    }
}