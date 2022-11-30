function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(num1,num2,operator){

    //all the inputs are going to be strings

    if(operator == "+"){
        return add(num1, num2);
    } 
    else if(operator == "-") {
        return subtract(num1,num2);
    }
    else if(operator == "/"){
        return divide(num1,num2);
    }
    else if(operator == "*"){
        return multiply(num1,num2);
    }
    else{
        return "undefined";
    }

}

//i guess i can implement all of this into a stack?
//and then through the stack I can check if there are enough
//numbers to do the operation with and if there aren't then 
//idk
//i guess i can implement it with two stack
//one stack with the numbers and the other stack with all of
// the operators