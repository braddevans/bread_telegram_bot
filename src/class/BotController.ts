import {BotContext} from "./BotContext";
import {log_debug, log_info} from "../utils/logging";
import * as dotenv from 'dotenv';
dotenv.config();
import { Telegraf, Context } from "telegraf";
import { message } from 'telegraf/filters';
import { InlineQueryResult } from "@telegraf/types";
import {BotListeners} from "./BotListeners";
import {BotCommands} from "./BotCommands";

export class BotController {
    context: BotContext;
    debug: boolean = false;
    telegraf: Telegraf;

    public constructor() {
        this.debug = process.env.DEBUG ? true : false;
        const BOT_TOKEN: string = String(process.env.BOT_TOKEN);
        this.telegraf = new Telegraf(BOT_TOKEN);
        this.context = new BotContext(this.telegraf);
    }

    async init_middleware(telegraf: Telegraf) {
        log_info("Init Middleware");
        telegraf.use(async (ctx, next) => {
            console.time(`Processing update ${ctx.update.update_id}`);
            await next() // runs next middleware
            // runs after next middleware finishes
            console.timeEnd(`Processing update ${ctx.update.update_id}`);
        })
    }

    async init() {
        const listeners = new BotListeners(this.telegraf);
        await listeners.init();
        const commands = new BotCommands(this.telegraf);
        await commands.init();
        await this.init_middleware(this.telegraf);
        log_info("LAUNCHING BOT AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        await this.telegraf.launch();
    }
}