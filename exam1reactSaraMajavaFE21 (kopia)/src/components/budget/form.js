import React from "react";

export default class Form extends React.Component {
  inputDepositAmount = 0;
  inputExpenseAmount = 0;
  inputExpense = "";
  totalExpenses = 0;
  arrayMap = localStorage.getItem("arrayMap")
    ? new Map(JSON.parse(localStorage.getItem("arrayMap")))
    : new Map();

  getDepositAmount = (e) => {
    this.inputDepositAmount = parseInt(e.target.value);
  };

  getExpenseAmount = (e) => {
    this.inputExpenseAmount = parseInt(e.target.value);
  };

  getExpense = (e) => {
    this.inputExpense = e.target.value;
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.getTotalNumber(this.inputDepositAmount); /// function från app.js med parameter från form.js
  };

  onSubmitExpenses = (e) => {
    e.preventDefault();
    if (this.arrayMap.has(this.inputExpense)) {
      alert("Du kan inte lägga till ett objekt som redan finns");
      for (const item of e.target.children) { 
        if (item !== e.target.lastChild)
        item.value = "";
      }
    } else {
      let withDrawAmount = localStorage.getItem("withdraw") ?  parseInt(localStorage.getItem("withdraw")) : 0;

      if (
        parseInt(localStorage.getItem("total")) - withDrawAmount < this.inputExpenseAmount
      ) {
        alert("Du har inte nog med pengar på kontot");
        for (const item of e.target.children) { 
          if (item !== e.target.lastChild)
          item.value = "";
        }
        return;
      } else {
        this.arrayMap.set(this.inputExpense, this.inputExpenseAmount);
        this.props.getExpenseData(this.arrayMap, this.inputExpenseAmount);
      }
    }
  };

  render() {
    const parsedData = localStorage.getItem("arrayMap")
      ? JSON.parse(localStorage.getItem("arrayMap"))
      : [];
    return (
      <>
        {parsedData.map((value, index) => {
          return (
            <h3 key={index}>
              {value[0]}: {value[1]}
            </h3>
          );
        })}
        <form onSubmit={this.onSubmitHandler}>
          <input
            placeholder="Belopp"
            type="number"
            onChange={this.getDepositAmount}
          />
          <br></br>
          <input type="submit" value="submit" />
        </form>
        <br></br>
        <br></br>
        <form onSubmit={this.onSubmitExpenses}>
          <input placeholder="Utgift" type="text" onChange={this.getExpense} />
          <br></br>
          <input
            placeholder="Belopp"
            type="number"
            onChange={this.getExpenseAmount}
          />
          <input type="submit" value="submit" />
        </form>
      </>
    );
  }
}
