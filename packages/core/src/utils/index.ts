export const Colors: NUtils.Colors = {
    ErrorText: (text: string) => `\x1b[31m${text}\x1b[0m`,
    WarningText: (text: string) => `\x1b[33m${text}\x1b[0m`,
    InfoText: (text: string) => `\x1b[36m${text}\x1b[0m`,
    SuccessText: (text: string) => `\x1b[32m${text}\x1b[0m`
};