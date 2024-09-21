import {log_info} from "../utils/logging";

export class BotCommands {

    private bot: any

    constructor(bot: any) {
        this.bot = bot;
    }


    async init() {
        log_info("Init Bot Commands");
    }

    async process_command(command: string | any, ctx: any) {
        switch (command) {
            case "!setactivetopic": {
                await this.bot.botContext.send_in_group_topic(ctx.message.chat.id, "Hello!", ctx.message.message_thread_id);
                break;
            }
            case "!listCacheKeys": {
                await this.bot.botContext.send_in_group_topic(
                    ctx.message.chat.id,
                    JSON.stringify({
                        keys: this.bot.lruCache.keys(),
                        length: Object.keys(this.bot.lruCache.keys()).length
                    }),
                    ctx.message.message_thread_id);
                await this.bot.botContext.send_in_group_topic(
                    ctx.message.chat.id,
                    Object.keys(this.bot.lruCache.keys()).length.toString(),
                    ctx.message.message_thread_id);
                break;
            }
            case "!quit": {
                await this.bot.botContext.send_in_group_topic(ctx.message.chat.id, "Bye!", ctx.message.message_thread_id);
                await ctx.leaveChat()
                break;
            }
        }
    }
}