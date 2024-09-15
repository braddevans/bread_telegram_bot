import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";
import {InlineQueryResult} from "@telegraf/types";
import {BotContext} from "./BotContext";
import {log_info} from "../utils/logging";

export class BotCommands {
    bot: Telegraf
    context: BotContext

    public constructor(bot: Telegraf) {
        this.bot = bot;
        this.context = new BotContext(bot);
    }

    async init() {
        log_info("Init Bot Commands");
        this.bot.command('quit', async (ctx) => {
            // Explicit usage
            await ctx.telegram.leaveChat(ctx.message.chat.id)

            // Using context shortcut
            await ctx.leaveChat()
        });
        this.bot.command('SetActiveTopic', async (ctx) => {
            // Explicit usage
            // @ts-ignore
            return this.context.send_in_group_topic(ctx.message.chat.id, "Active Topic", ctx.message.message_thread_id);
        })
    }
}