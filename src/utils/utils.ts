export const botLogic = (stateLength: number, maxPick: number): number => {
    if (!stateLength) return 0;
    const oddLogic = () => {
        for (let i = 1; i <= maxPick; ++i)
            if (
                (stateLength - i) % (maxPick + 1) === 0 ||
                (stateLength - i) % (maxPick + 1) === 1
            ) {
                return i;
            }
        return 1;
    };
    const evenLogic = () => {
        for (let i = 1; i <= maxPick; ++i)
            if (
                (stateLength - i) % (maxPick / 2 + 1) === 0 ||
                (stateLength - i) % (maxPick / 2 + 1) === 1
            ) {
                return i;
            }
        return 1;
    };
    if (maxPick % 2 !== 0) return oddLogic();
    if (maxPick % 2 === 0) return evenLogic();
    return 1;
};

export function raise(error: Error): never {
    throw error;
}
