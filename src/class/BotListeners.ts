import {InlineQueryResult} from "@telegraf/types";
import {log_debug, log_info} from "../utils/logging";
import {colorize} from "../utils/colorize";
import {message} from "telegraf/filters";

export class BotListeners {
    private bot: any;

    constructor(bot: any) {
        this.bot = bot;
    }

    async init() {
        log_info(`[${colorize.blue_e("Bot Listeners")}]: Init Bot Listeners`);

        this.bot.TGBot.telegraf.on(message('text'), async (ctx: any) => {
            // Explicit usage
            const topic = ctx.message.is_topic_message ? ctx.message.message_thread_id : undefined;
            // @ts-ignore
            if (ctx.text.startsWith("!")) {
                log_debug(`Processing command: ${ctx.text}`)
                await this.bot.botCommands.process_command(ctx.text, ctx)
            }
            log_debug(`Chat id: ${ctx.chat.id}`)
            log_debug(`username: ${ctx.message.from.username}`)
            log_debug(`text: ${ctx.text}`)
            log_debug(`message id: ${ctx.message.message_id}`)
            log_debug(`topic id: ${topic}`)
        })

        this.bot.TGBot.telegraf.on(message("sticker"), async (ctx: any) => {
            const topic = ctx.message.is_topic_message ? ctx.message.message_thread_id : undefined;
            await ctx.telegram.sendSticker(ctx.chat.id, ctx.message.sticker.file_id, {message_thread_id: topic});
        })

        this.bot.TGBot.telegraf.on('callback_query', async (ctx: any) => {
            // Explicit usage
            await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

            // Using context shortcut
            await ctx.answerCbQuery()
        })

        this.bot.TGBot.telegraf.on('inline_query', async (ctx: any) => {
            const result: InlineQueryResult[] = []
            // Explicit usage
            await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

            // Using context shortcut
            await ctx.answerInlineQuery(result)
        })
    }
}