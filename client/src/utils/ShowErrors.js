//pass as props to Login and Register

export const showError = (errors, name) => {
    const exist = errors.find(err => err.param === name); //param is the key that is given in errors array see in console, errors is state name
    if (exist) {
        return exist.msg;  //msg is the key that is given in errors array see in console
    }
    else {
        return false;
    }
}