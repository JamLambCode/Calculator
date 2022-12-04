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
    return (b==0) ? "you do know you can't do that... right?" : a/b;
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
    //since this is checked first we want the answer to be assessed as blank
    if(btn.value == "~" && answer.textContent == ""){
        if(value2 != ""){ //this checks if value2 has been set or not to decide which value we must switch the sign for
            //this means that we are changing the sign of value 2
            (Number(value2) > 0 ) ? value2 = "-" + value2 : value2 = Math.abs(value2); 
            
            //we change value 2 and then update the screen
            text.textContent = `${value1} ${operator} ${value2}`;
        }
        else{
            //we need to make sure that we still don't have an operator so we know we are working on the first number
            if(operator == ""){
                alert(value1);
                (Number(value1) > 0 ) ? value1 = "-" + value1 : value1 = Math.abs(value1); 
                text.textContent = `${value1}`;
            }
        }
    }
    else{
        if(isNaN(btn.value) && btn.value != "."){
            //if it is not a number (meaning that it is an operator)
            //we want to then check if there are numbers in text already
            if(btn.value == "=" || (isNaN(btn.value) &&  (value2 != "") && btn.value != "AC")){
                
                if(value2 == ""){
                    //we want to do nothing if we don't have 2 values to operate on
                }
                else{
                    //we just check if it operates a string first and foremost bc that means its an error
                    if(typeof(operate(Number(value1), Number(value2), operator)) != "string"){
                        (Number.isInteger((operate(Number(value1), Number(value2), operator)))) 
                        ? answer.textContent = (operate(Number(value1), Number(value2), operator))
                        : answer.textContent = (operate(Number(value1), Number(value2), operator)).toFixed(2);
                    }
                    else{
                        answer.textContent = (operate(Number(value1), Number(value2), operator));
                    }
                    if(btn.value != "=" && btn.value != "~" && !(isNaN(answer.textContent))){ //this is to evaluate if you continue evaluating
                        value1 = answer.textContent;
                        answer.textContent="";
                        text.textContent =""
                        value2 = "";
                        operator = `${btn.value}`;
                        text.textContent += value1 +  " " + operator + " ";

                    }
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
                alert("ERROR");
            }
            else if(screen.firstChild){
                //this checks if it atleast has 1 child
                //if it does we want to store this value as value 1
                //value1 = screen.firstChild.textContent;
                text.textContent += ` ${btn.value} `
                operator = `${btn.value}`;
                //alert(value1);
                secondHalf=true;
            }
        }
        else{
            //maybe have a boolean to see if it is second half of eqn
            if(secondHalf == true && answer.textContent == ""){
                if(btn.value == "."){
                    if(!(value2.includes("."))){ //we are ignoring if it already has a decimal
                        value2 += btn.value
                        text.textContent += `${btn.value}`;
                    }
                }
                else{
                    value2 += btn.value;
                    text.textContent += `${btn.value}`
                    
                //alert(value2);
                }
            }
            else{ //this is value1
                if(answer.textContent == "") { //making sure that we don't allow value2 to change once we have the answer
                    if(btn.value == "."){
                        if(!(value1.includes("."))){ //we are ignoring if it already has a decimal
                            value1 += btn.value
                            text.textContent += `${btn.value}`;
                        }
                    }
                    else{
                        value1 += btn.value;
                        text.textContent += `${btn.value}`
                    }
                }
            }
        }
    }
}));

addEventListener("keydown", (e) => {
    //this.alert(e.key);
    if(e.key == 'Backspace' && text.textContent != "" && answer.textContent == ""){
        if(value2 != ""){
            value2 = value2.slice(0, -1);
            text.textContent = `${value1} ${operator} ${value2}`;
        }
        else if(operator != ""){
            operator = "";
            text.textContent = `${value1}`;
        }
        else{
            value1 = value1.slice(0, -1);
            text.textContent = `${value1}`;
        }
    }
    else if(e.key == "+" || e.key == "/" || e.key == "*" || e.key == "-"){
        if(value1 == ""){

        }
        else{
            if(operator == ""){
                operator = e.key;
                text.textContent = `${value1} ${operator}` 
            }
            else if(value2 != "" && !(isNaN(answer.textContent))){ //add the nan stuff if the output is error you can't operate anymore
                if(typeof(operate(Number(value1), Number(value2), operator)) != "string"){
                    (Number.isInteger((operate(Number(value1), Number(value2), operator)))) 
                    ? answer.textContent = (operate(Number(value1), Number(value2), operator))
                    : answer.textContent = (operate(Number(value1), Number(value2), operator)).toFixed(2);
                }
                else{
                    answer.textContent = (operate(Number(value1), Number(value2), operator));
                }
                //this is to evaluate if you continue evaluating
                
                value1 = answer.textContent;
                answer.textContent="";
                text.textContent =""
                value2 = "";
                operator = `${e.key}`;
                text.textContent = value1 +  " " + operator + " ";
                
                
                }
        }
        
    }
    else if(e.key == "Enter" &&  (value2 != "")){
        
        if(typeof(operate(Number(value1), Number(value2), operator)) != "string"){
            (Number.isInteger((operate(Number(value1), Number(value2), operator)))) 
            ? answer.textContent = (operate(Number(value1), Number(value2), operator))
            : answer.textContent = (operate(Number(value1), Number(value2), operator)).toFixed(2);
        }
        else{
            answer.textContent = (operate(Number(value1), Number(value2), operator));
        }

    }
    else if(e.key == "."){
        if(secondHalf == true && answer.textContent == ""){
            if(btn.value == "."){
                if(!(value2.includes("."))){ //we are ignoring if it already has a decimal
                    value2 += e.key;
                    text.textContent += `${e.key}`;
                }
            }
            else{
                value2 += e.key;
                text.textContent += `${e.key}`
                
            //alert(value2);
            }
        }
        else{ //this is value1
            if(answer.textContent == "") { //making sure that we don't allow value2 to change once we have the answer
                if(e.key == "."){
                    if(!(value1.includes("."))){ //we are ignoring if it already has a decimal
                        value1 += e.key;
                        text.textContent += `${e.key}`;
                    }
                }
                else{
                    value1 += e.key;
                    text.textContent += `${e.key}`
                }
            }
        }
     }
    else{
        if(isFinite(e.key) && e.key != " "){
            if(value2 == "" && operator == ""){
                value1 += e.key;
                text.textContent = value1;
            }
            else{
                if(answer.textContent == ""){
                    value2 += e.key;
                    text.textContent = `${value1} ${operator} ${value2}`;
                }
            }

        }
    }
    


})
