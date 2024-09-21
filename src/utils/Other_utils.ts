export class Other_utils {
    async sleep(seconds: number) {
        return new Promise(resolve => setTimeout(resolve, (1000) * seconds));
    }
}