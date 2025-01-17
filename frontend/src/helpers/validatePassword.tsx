
export const validatePassword = (string:string):boolean | null =>{
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&#^]{8,}$/;
    if(!regex.test(string)) {
        return false;
    }
    return true;
}
