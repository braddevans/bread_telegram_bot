import {log_debug} from "../utils/logging";
import {Config, JsonDB} from "node-json-db";
import {colorize} from "../utils/colorize";

export class BotDB {
    public database_file: string = "./db.json";
    public db: JsonDB = new JsonDB(new Config(this.database_file, true, false, '/', true));

    public get(key: string): any {
        log_debug(`[${colorize.green_e("JSON_DB")}]: getting ${key} from db...`);
        return this.db.getData(key);
    }

    public set(key: string, value: any): void {
        log_debug(`setting ${key} in db...`);
        this.db.push(key, value).then(out => {
            log_debug(`[${colorize.green_e("JSON_DB")}]: ${out}`);
        });
    }

    async init() {
        log_debug(`[${colorize.green_e("JSON_DB")}]: Initializing...`);
    }

    getInstance(): BotDB {
        return this;
    }
}