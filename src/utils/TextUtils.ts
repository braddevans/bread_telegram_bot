import {log_debug} from "./logging";

const processTextCenter = (message: string, length: number, multiline: boolean = false) => {
    let output = "\n";
    if (multiline) {
        for (const message_s of message.split("\n")) {
            output += "|" + processTextCenter(message_s, length, false) + "|\n";
        }
    } else {
        const messageLength = message.length;
        log_debug(`messageLength: ${messageLength}`)
        const spaces = length - messageLength;
        log_debug(`spaces: ${spaces}`)
        const leftSpaces = Math.floor(spaces / 2);
        log_debug(`leftSpaces: ${leftSpaces}`)
        const rightSpaces = Math.ceil(spaces / 2);
        log_debug(`rightSpaces: ${rightSpaces}`)
        return " ".repeat(leftSpaces) + message + " ".repeat(rightSpaces);
    }
    return output;
};
export {processTextCenter};
