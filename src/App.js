import React, { Component } from 'react';
import './App.css';
import Value from './Value.js'

class App extends Component {
  constructor(props)
  {
    super(props);
  let  button= [
              [9, 8, 7, "C","<-"],
              [4, 5, 6,"/","*"], 
              [1, 2, 3, "+","-"], 
              [0, ".",  "=", "(",")"]]
    this.state={
      button :button,
      expr:[],
      answer:0,
    };
    this.handlevalue = this.handlevalue.bind(this);
    this.expressionEvaluate = this.expressionEvaluate.bind(this);
    this.applyOp = this.applyOp.bind(this);
    this.show = this.show.bind(this);
    this.hasPrecedence = this.hasPrecedence.bind(this);

  }
   applyOp(a,b,c)
  {
    let temp=b;
    b=c;
    c=temp;
    switch(a)
    {
      case '+':
            return b + c;
        case '-':
            return b - c;
        case '*':
            return b* c;
        case '/':
            return a / b;
          default:
              console.log("wrong input");

    }
  }

   hasPrecedence(op1,op2)
    {
        if (op2 === '(' || op2 === ')')
            return false;
        if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-'))
            return false;
        else
            return true;
    }
  expressionEvaluate()
  {
    let i;
    let flag =0;

    let expr = this.state.expr;
    let stackValues=[];
    let stackOperand=[];
    let buffer=[];
    let length=stackValues.length;
    let len1=stackOperand.length-1;
    for(i=0; i<expr.length;i++)
    {
      let a="";
      if(expr[i] >=0 && expr[i]<=9)
      {
         while (i < expr.length && expr[i] >= 0 && expr[i] <= 9)
         {
           a = a + expr[i];
           i = i + 1;
           flag=1;
            
          }
          if(flag==1)
          {
            i--;
            flag=0;
          }
        stackValues.push(parseInt(a));
      }
      else if (expr[i] === '(')
                stackOperand.push(expr[i]);
        else if (expr[i] === ')')
            {
              len1 = stackOperand.length-1;
                while (len1 > -1 && stackOperand[len1] !== '(')
                {
                  stackValues.push(this.applyOp(stackOperand.pop(), stackValues.pop(), stackValues.pop()));
                  len1=len1-1;
                }
                stackOperand.pop();
            }
            else if (expr[i] === '+' || expr[i] === '-' || expr[i] === '*' || expr[i] === '/')
            {
                len1=stackOperand.length-1;

                while ((len1>-1) && this.hasPrecedence(expr[i], stackOperand[len1]))
                {
                  len1=len1 -1;
                  stackValues.push(this.applyOp(stackOperand.pop(), stackValues.pop(), stackValues.pop()));
    
                }
 
                stackOperand.push(expr[i]);
            }
    }
      len1 = stackOperand.length-1;
       while (len1>-1)
       {
         let t=this.applyOp(stackOperand.pop(), stackValues.pop(), stackValues.pop());
         stackValues.push(t);
         len1 =len1-1;
       }
       let a;
       if(stackValues.length!==0)
       {
        a=stackValues.pop();
       }
        this.setState({answer:a,expr:[]});
  }
  show()
  {
    let a="";
    let i;
    let arr=this.state.expr;
    let answer=this.state.answer;
    let length=arr.length;
    if(length === 0)
    {
      return answer;
    }
    else
    {

      for(i=0;i<length;i++)
      {
        a+=arr[i];
      }
    }
    return a;
  }
 
  handlevalue(value)
  {
    let arr = this.state.expr;
    console.log("in");
    if(value === "=")
    {
      this.expressionEvaluate();
    }
    else if(value==="C"){
      this.setState({expr:[],answer:0});
    }
    else if(value === "<-")
    {
      arr.pop(value);
      this.setState({expr:arr});
    }
    else{
      let arr=this.state.expr;
      arr.push(value);
      this.setState({expr:arr});
    }
     
    }
  getbutton(data)
  {
      let temp=<Value data={data} key={data} handlevalue={this.handlevalue} />
      return temp;
  }
  render() {
    let row = [];
    let i,j;
    let temp;

    let button = this.state.button;
    for(i=0;i<4;i++)
    {

      for(j=0;j<button[i].length;j++)
      {
        temp=this.getbutton(button[i][j]);
        row.push(temp);
      }

    }
    return (
      <div className="main">
      <div className="Calculator">
        <input type="text" value={this.show()} />
        <div className="row">
        {row}
        </div>
      </div>
      </div>
  );
}
}
export default App;
