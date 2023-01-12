export const validateCasplaId = (value:string) => {
    // if(value.length<16 && value.length>=4) {
    //     const strongCasplaId = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])')
    //     if(strongCasplaId.test(value) && value.search(/[\W]/g)===-1) {
    //         return 3;
    //     } else {
    //         return 2;
    //     }
    // } else {
    //     return 1;
    // }
    if(value.includes('caspla')||value.includes('admin')||value.includes('root')) {
        return 1;
    } else {
        return 3;
    }
}