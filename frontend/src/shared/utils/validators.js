
export function VALIDATOR_REQUIRE(){
    return {type: 'REQUIRE'}
};

export function VALIDATOR_MINLENGTH(val){
    return {type: 'MINLENGTH', val}
}

export function VALIDATOR_EMAIL(){
    return {type: 'EMAIL'}
}

export function validate(value, validators){
    let isValid = true;
    for (const validator of validators){
        if (validator.type === 'REQUIRE'){
            return isValid && value.trim().length > 0;
        }
        if (validator.type === 'MINLENGTH'){
            return isValid && value.trim().length > validator.val;
        }
        if (validator.type === 'EMAIL') {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
}