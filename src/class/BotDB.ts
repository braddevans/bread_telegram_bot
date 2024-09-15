import {log_debug} from "../utils/logging";
import { JsonDB, Config } from "node-json-db";

export class BotDB {
    public database_file: string = "./db.json";
    public db: JsonDB;

    public constructor() {
        this.database_file = "./db.json";
        this.db = new JsonDB(new Config(this.database_file, true, false, '/', true));
    }

}