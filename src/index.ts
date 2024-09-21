import {log_debug, log_info} from "./utils/logging";
import {processTextCenter} from "./utils/TextUtils";
import {colorize} from "./utils/colorize";
import * as dotenv from 'dotenv';
import {BotContext} from "./class/BotContext";
import {BotTelegramConnector} from "./class/BotTelegramConnector";
import {BotListeners} from "./class/BotListeners";
import {BotE6Watcher} from "./class/BotE6Watcher";
import {BotDB} from "./class/BotDB";
import {LRUCache} from "lru-cache";
import {BotCommands} from "./class/BotCommands";
import {E6Post} from "./Objects/E6Post";


dotenv.config();

export class Main {
    TGBot: BotTelegramConnector;
    botContext: BotContext;
    botDB: BotDB;
    botE6Watcher: BotE6Watcher;
    botCommands: BotCommands;
    botListeners: BotListeners;
    lruCache: LRUCache<Number, E6Post>;

    async init() {
        log_info("Init Main");
        log_info(`[${colorize.blue_e("Main")}]: Starting Bot`);
        const headerText1 = "" +
            ".    ____                      __   _            _____                      \n" +
            "   / __ )________  ____ _____/ /  ( )  _____   / ___/__  ______________  __\n" +
            "  / __  / ___/ _ \\/ __ `/ __  /   |/  / ___/   \\__ \\/ / / / ___/ ___/ / / /\n" +
            " / /_/ / /  /  __/ /_/ / /_/ /       (__  )   ___/ / /_/ (__  |__  ) /_/ / \n" +
            "/_____/_/   \\___/\\__,_/\\__,_/       /____/   /____/\\__,_/____/____/\\__, /  \n" +
            "                                                                  /____/   ";
        const headerText2 = "" +
            ".   ______     __                                   __          __ \n" +
            " /_  __/__  / /__  ____ __________ _____ ___     / /_  ____  / /_\n" +
            "  / / / _ \\/ / _ \\/ __ `/ ___/ __ `/ __ `__ \\   / __ \\/ __ \\/ __/\n" +
            " / / /  __/ /  __/ /_/ / /  / /_/ / / / / / /  / /_/ / /_/ / /_  \n" +
            "/_/  \\___/_/\\___/\\__, /_/   \\__,_/_/ /_/ /_/  /_.___/\\____/\\__/  \n" +
            "                /____/                                           ";
        log_info(processTextCenter(colorize.blue_e(headerText1 + "\n" + headerText2), 158, true));



        log_info(`[${colorize.blue_e("Main")}]: Init Bot`);

        log_info(`[${colorize.blue_e("Main")}]: Init LRU Cache`);
        this.lruCache = new LRUCache({max: 1000000});


        log_info(`[${colorize.blue_e("Main")}]: Init DB`);
        this.botDB = new BotDB();
        await this.botDB.init();

        log_info(`[${colorize.blue_e("Main")}]: Start Bot Controller`);
        this.TGBot = new BotTelegramConnector();

        log_info(`[${colorize.blue_e("Main")}]: Init Bot Context`);
        this.botContext = new BotContext(this);
        this.botListeners = new BotListeners(this);
        this.botCommands = new BotCommands(this);
        await this.botListeners.init();

        log_info(`[${colorize.blue_e("Main")}]: Start E6 Watcher`);
        this.botE6Watcher = new BotE6Watcher(this);
        await this.botE6Watcher.init();

        setInterval(async () => {
            log_debug(`[${colorize.blue_e("Main")}]: lruCache length: ${this.lruCache.calculatedSize}`);
        }, 1000 * 15);

        log_info(`[${colorize.blue_e("Main")}]: Start Bot Controller`);
        await this.TGBot.init();
    }

}

const main = new Main();
main.init().then(null);