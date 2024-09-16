import {log_debug, log_info} from "./utils/logging";
import {processTextCenter} from "./utils/TextUtils";
import {colorize} from "./utils/colorize";
import {BotE6Watcher} from "./class/BotE6Watcher";
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {

    log_info("Starting Bot");
    log_debug("test center Text");
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

    log_info("Start Bot Controller");
    //const botController = new BotController();
    //await botController.init();

    log_info("Start E6 Watcher");
    const botE6Watcher = new BotE6Watcher();
    await botE6Watcher.init();
}

void main();