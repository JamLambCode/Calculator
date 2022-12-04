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
    return (b==0) ? "ERROR" : a/b;
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
const screen = document.querySelector(".screen");
const text = document.createElement("p");
const answer = document.createElement("p");
screen.append(text);
screen.append(answer);
let secondHalf = false;
let value1 = "";
let value2 = "";
let operator = "";


btns.forEach(btn => btn.addEventListener("click", function(){
    //alert(btn.value);
    if(isNaN(btn.value) && btn.value != "."){
        //if it is not a number (meaning that it is an operator)
        //we want to then check if there are numbers in text already
        if(btn.value == "=" || (isNaN(btn.value) &&  (value2 != "") && btn.value != "AC")){
            //we just check if it operates a string first and foremost bc that means its an error
            if(typeof(operate(Number(value1), Number(value2), operator)) != "string"){
                (Number.isInteger((operate(Number(value1), Number(value2), operator)))) 
                ? answer.textContent = (operate(Number(value1), Number(value2), operator))
                : answer.textContent = (operate(Number(value1), Number(value2), operator)).toFixed(2);
            }
            else{
                answer.textContent = (operate(Number(value1), Number(value2), operator));
            }
            if(btn.value != "="){ //this is to evaluate if you continue evaluating
                value1 = answer.textContent;
                answer.textContent="";
                text.textContent =""
                value2 = "";
                operator = `${btn.value}`;
                text.textContent += value1 +  " " + operator + " ";

            }
        }
        else if(btn.value == "AC"){
            value1 = "";
            value2 = "";
            operator = "";
            text.textContent ="";
            answer.textContent="";
            secondHalf = false;

        }
        else if(isNaN(screen.firstChild.textContent) || screen.firstChild.textContent == ""){
            //this catches an error if you try and type 2 operators back to back
            //also catches if you begin with an operator
            alert("ERROR,2");
        }
        else if(screen.firstChild){
            //this checks if it atleast has 1 child
            //if it does we want to store this value as value 1
            value1 = screen.firstChild.textContent;
            text.textContent += ` ${btn.value} `
            operator = `${btn.value}`;
            //alert(value1);
            secondHalf=true;
        }
    }
    else{
        //maybe have a boolean to see if it is second half of eqn
        if(secondHalf == true){
            text.textContent += `${btn.value}`
            value2 += btn.value;
            //alert(value2);
        }
        else{
            text.textContent += `${btn.value}`
            //screen.append(text);
        }
    }
}));
/*
const specialBtns = document.querySelectorAll(".specialBtn");
specialBtns.forEach(btn => btn.addEventListener("click", function(){
    if(btn.value == "="){
        alert(operator, value1,value2)
        //alert(operate(parseInt(value1), parseInt(value2), operator));
    }
}));
*/



//i guess i can implement all of this into a stack?
//and then through the stack I can check if there are enough
//numbers to do the operation with and if there aren't then 
//idk
//i guess i can implement it with two stack
//one stack with the numbers and the other stack with all of
// the operators