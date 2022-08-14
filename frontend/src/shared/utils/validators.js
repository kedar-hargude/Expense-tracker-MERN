
export function VALIDATOR_REQUIRE(){
    return {type: 'REQUIRE'}
};

export function validate(value, validators){
    let isValid = true;
    for (const validator of validators){
        if (validator.type === 'REQUIRE'){
            return isValid && value.trim().length > 0;
        }
    }
}