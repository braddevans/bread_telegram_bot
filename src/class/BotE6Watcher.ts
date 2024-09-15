import {Telegraf} from "telegraf";
import {message} from "telegraf/filters";
import {InlineQueryResult} from "@telegraf/types";
import {log_debug, log_info} from "../utils/logging";
import {json} from "node:stream/consumers";

export class BotE6Watcher {

    public constructor() {
    }

    async init() {
        log_info("Init E621 Watcher");

    }
}