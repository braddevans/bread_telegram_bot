import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";
import {InlineQueryResult} from "@telegraf/types";
import {log_debug, log_info} from "../utils/logging";
import {json} from "node:stream/consumers";

export class BotListeners {
    bot: Telegraf

    public constructor(bot: Telegraf) {
        this.bot = bot
    }

    async init() {
        log_info("Init Bot Listeners");


        this.bot.on("message", async (ctx) => {
            // Explicit usage
            const topic = ctx.message.is_topic_message ? ctx.message.message_thread_id : undefined;
            log_debug(`Chat id: ${ctx.chat.id}`)
            log_debug(`username: ${ctx.message.from.username}`)
            log_debug(`text: ${ctx.text}`)
            log_debug(`message id: ${ctx.message.message_id}`)
            log_debug(`topic id: ${topic}`)
        })

        this.bot.on('callback_query', async (ctx) => {
            // Explicit usage
            await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

            // Using context shortcut
            await ctx.answerCbQuery()
        })

        this.bot.on('inline_query', async (ctx) => {
            const result: InlineQueryResult[] = []
            // Explicit usage
            await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

            // Using context shortcut
            await ctx.answerInlineQuery(result)
        })
    }
}