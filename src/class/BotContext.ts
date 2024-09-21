import {log_debug} from "../utils/logging";

export class BotContext {
    private bot;

    constructor(bot: any) {
        this.bot = bot;
    }

    public async send_in_group_topic(id: number, text: string, message_thread_id: number) {
        log_debug("Sending message");
        await this.bot.TGBot.telegraf.telegram.sendMessage(id, text, {message_thread_id: message_thread_id});
    }

}