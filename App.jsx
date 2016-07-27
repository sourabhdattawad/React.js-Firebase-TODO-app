import React from 'react';
import ReactDOM from 'react-dom';
import { Button,FormControl,ControlLabel,FormGroup,Col } from 'react-bootstrap';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:[]
    }

    this.firebaseRef =  new Firebase('https://your-firebase-url/items');

    this.firebaseRef.on("value",(dataSnapshot)=>{
        var arr =[];
      dataSnapshot.forEach(function(eachItem) {
        var key = eachItem.key();
        var temp ={};
        var temp =eachItem.val();
        temp.key = key;
        arr.push(temp);


      })

      this.setState({data:arr})

    })

  }
  getItem(e){
    var item =  ReactDOM.findDOMNode(this.refs.itemInput).value;
    var temp = this.state.data;
    temp.push(item);
    /*this.setState({data:temp});*/
    this.firebaseRef.push({name:item})
    ReactDOM.findDOMNode(this.refs.itemInput).value = "";

  }


   render() {
     var mystyle  = {
       fontSize:50,
       marginTop:50
     }
      return (
        <div>
         <div className="container">
           <h4 style={mystyle} className="text-center">TODO App!</h4>
           <FormGroup >
            <Col  className="center-block" sm={6}>
                <FormControl ref="itemInput" placeholder="Your Item"/>
            </Col>
            <br/>
            <Button bsStyle="success" className="center-block" onClick={this.getItem.bind(this)} bsSize="large">Add</Button>

           </FormGroup>
         </div>
           <Col  className="center-block" sm={6}>
             <ul>
              {this.state.data.map((item, i)=><List data={item} key={i}/>)}
             </ul>
        </Col>
         </div>
      )
   }

}

class List extends React.Component{
  constructor(){
    super();
    this.firebaseRef =  new Firebase('https://your-firebase-url/items');


  }
  deleteItem(key){
    this.firebaseRef.child(key).remove();
  }

  doneItem(key){
    this.firebaseRef.child(key).update({done:"done"});

  }

  render (){
    var liStyle={
      fontSize:20
    }

    return(
      <div>
         <li className={this.props.data.done} style={liStyle}>{this.props.data.name}</li><Button bsStyle="success" bsSize="xsmall" onClick={this.doneItem.bind(this,this.props.data.key)}>Done</Button>
         <Button bsStyle="danger" bsSize="xsmall" onClick={this.deleteItem.bind(this,this.props.data.key)}>Delete</Button>
      </div>

    )
  }




}
export default App;
