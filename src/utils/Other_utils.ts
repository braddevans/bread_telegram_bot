export class Other_utils {

    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}