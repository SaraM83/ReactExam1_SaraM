import React from "react";
import Form from "./components/budget/form";


export default class App extends React.Component {
    newTotal = 0; 

    getTotalNumber = (total) => { 
        console.log(total); 
        if(localStorage.getItem('total')) { 
            localStorage.setItem('total', parseInt(localStorage.getItem('total')) + total)
        } else {
            localStorage.setItem('total', total)  
        }
        window.location.reload(); 
    }

    getExpenseData = (arrayMap, inputExpenseAmount) => {
        console.log(arrayMap);  
        localStorage.arrayMap = JSON.stringify(Array.from(arrayMap.entries()));
        console.log(localStorage.arrayMap = JSON.stringify(Array.from(arrayMap.entries()))); 
        if(localStorage.getItem('withdraw')) {  
            localStorage.setItem('withdraw', parseInt(localStorage.getItem('withdraw')) + inputExpenseAmount)
        } else {
            localStorage.setItem('withdraw', inputExpenseAmount) 
        }
        
        window.location.reload(); 
    }


    render() {
        const inbalans = localStorage.getItem('total') ? localStorage.getItem('total') : 0; 
        const withdraw = localStorage.getItem('withdraw') ? localStorage.getItem('withdraw') : 0; 
        let balans = inbalans - withdraw;
       
        return (
            <>
                <h1>Budget: {inbalans}</h1>  
                <Form getExpenseData = {this.getExpenseData} getTotalNumber={this.getTotalNumber}/>
                <h1>Utgifter: {withdraw}</h1>
                <h1>Balans: {balans}</h1>
            </>
        )
    }
}