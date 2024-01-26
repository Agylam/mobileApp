export const worder = (count: number, naming: string[]) => {
    count = Math.abs(count) % 100;
    let count_ = count % 10;
    if (count > 10 && count < 20) return naming[2];
    if (count_ > 1 && count_ < 5) {
        return naming[1];
    }
    if (count_ == 1) {
        return naming[0];
    }
    return naming[2];
}