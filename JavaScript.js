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

//Create the functions that populate the display when 
//you click the number buttons. You should be storing 
//the ‘display value’ in a variable somewhere for use 
//in the next step.

const btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.addEventListener("click", function(){
    alert(btn.value)
}));


//i guess i can implement all of this into a stack?
//and then through the stack I can check if there are enough
//numbers to do the operation with and if there aren't then 
//idk
//i guess i can implement it with two stack
//one stack with the numbers and the other stack with all of
// the operators