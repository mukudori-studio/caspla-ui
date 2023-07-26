export const validateCasplaId = (value: string) => {
    if (value.length < 16 && value.length >= 4) {
        let checkLetters = !value.includes('caspla') && !value.includes('admin') && !value.includes('root')
        if (checkLetters && value.search(/[\W]/g) === -1) {
            return 3;
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}

export const isValidateFurigana = (str: string): boolean => {
    str = (str == null) ? "" : str;
    if (str.match(/^[ァ-ヶー　]+$/)) {   //The character after "ー" is a double-byte space.
        return true;
    } else {
        return false;
    }
}