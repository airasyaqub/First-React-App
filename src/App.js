import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert';
import './App.css';
const uuidv1 = require('uuid/v1');



function Login(props){
    return(
      <div className='cardLogin'>
        <div className="row">
          <div className="col s12 m7 centerCard">
            <div className="card">
              <div className="card-image">
                <div className='overlay'></div>
                <img alt="" src="images/bg-01.jpg"/>
                <span className="card-title">Admin Panel</span>
              </div>
              <div className="card-content center">
                <form onSubmit={props.login}>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">account_circle</i>
                      <input id="email" type="email" className="validate" required/>
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">fiber_pin</i>
                      <input id="password" type="password" className="validate" required/>
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <button className="btn waves-effect waves-light" type='submit'>login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

function Table(props){
  const list=props.list;
  return(
    <div className='dataTable'>
      <div className='buttonsTable center'>
        <button className="waves-effect waves-light btn-small blue accent-3 add" onClick={props.form}>Add Employee</button>
        <button className="waves-effect waves-light btn-small blue-grey darken-2 logout" onClick={props.logout}>logout</button>
      </div>
      <table className='striped centered responsive-table'>
      <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Start date</th>
        </tr>
      </thead>

      <tbody>
        {list.map((e,i)=>{
          //console.log(e.id);
          return(
            <tr key={e.id}>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.salary}</td>
              <td>{e.date}</td>
              <td><button className="waves-effect waves-light btn-small green accent-3 update" onClick={()=>props.update(e)}>update</button></td>
              <td><button className="waves-effect waves-light btn-small red darken-4 delete" onClick={()=>props.delete(e)}>delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}


function Form(props){
  const {update,updatedElement}=props.parentState;
    if(updatedElement){
      var firstName=updatedElement.firstName;
      var lastName=updatedElement.lastName;
      var salary=updatedElement.salary;
      var email=updatedElement.email;
      var date=updatedElement.date;
    }
    return(
      <div className='employeeForm'>
        <h2>Employee Form</h2>
        <form onSubmit={update?(e)=>props.finishUpdate(updatedElement.id,e):props.add}>
        <div className="row">
          <div className="input-field col s6">
            <input id="first_name" type="text" className="validate" defaultValue={firstName} required/>
            <label className={update&&"active"} htmlFor="first_name">First Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="last_name" type="text" className="validate" defaultValue={lastName} required/>
            <label className={update&&"active"} htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="empEmail" type="email" className="validate" defaultValue={email} required/>
            <label className={update&&"active"} htmlFor="empEmail">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="salary" type="number" className="validate" defaultValue={salary} required/>
            <label className={update&&"active"} htmlFor="salary">Salary</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id="date" type="date" className="validate" defaultValue={date} required/>
            <label className={update&&"active"} htmlFor="date">Date</label>
          </div>
        </div>
        <button className="waves-effect waves-light btn" type='submit'>{update?'Update employee':'Add employee'}</button>
        </form>
      </div>
    )
}

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      user:false,
      addForm:false,
      list:[],
      update:false,
      updatedElement:null
    }
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.add = this.add.bind(this);
    this.form = this.form.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.finishUpdate = this.finishUpdate.bind(this);
  }

  /*componentDidMount=()=>{
    console.log('in mount');
    var regex = /^[\w\-\.\+]+\@[button-zA-Z0-9\. \-]+\.[button-zA-z0-9]{2,4}$/;
    const admin={
      email:'admin@domain.com',
      password:'123'
    } 
    $('.cardLogin button').click((e)=>{
      console.log('clicked');
      e.preventDefault();
      let email=$('#email').val();
      let passwd=$('#password').val();

      if(email.length===0||passwd.length===0||!(email.match(regex))||email!==admin.email||passwd!==admin.password){
        swal("Error!", "Wrong credentials!", "error");
      } else{
        this.setState({user:true});
      }
      

    })
  }*/

  logIn(e){
    //const regex = /^[\w\-\.\+]+\@[button-zA-Z0-9\. \-]+\.[button-zA-z0-9]{2,4}$/;
    e.preventDefault();
    const admin = {
      email:'admin@domain.com',
      password:'123'
    }     
      //console.log('clicked');
      //e.preventDefault();
    let email = $('#email').val();
    let passwd = $('#password').val();

    if(/*email.length === 0 || passwd.length === 0 || !(email.match(regex)) ||*/ email !== admin.email ||passwd !== admin.password){
      swal("Error!", "Wrong credentials!", "error");
    } else {
      this.setState({user:true});
    }
  }

  add(e){

    e.preventDefault();
    const{list} = this.state;
    //const regex = /^[\w\-\.\+]+\@[button-zA-Z0-9\. \-]+\.[button-zA-z0-9]{2,4}$/;
    let firstName = $('.employeeForm #first_name').val();
    let lastName = $('.employeeForm #last_name').val();
    let email = $('.employeeForm #empEmail').val();
    let salary = $('.employeeForm #salary').val();
    let date = $('.employeeForm #date').val();

    /*if(firstName.length === 0 || lastName.length === 0 || email.length === 0 || (email.match(regex)) || salary.length === 0 || date.length === 0){
      swal("Error!", "Missing field", "error");
    }*/
    //else{
    let employee = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      salary : salary,
      date : date,
      id : uuidv1()
    }

    list.push( employee );
    let addForm = false;
    this.setState( { list,addForm } );

  }

  update(elem){
    this.setState( { update:true,
    updatedElement:elem,
    addForm:true
  })
  }

  finishUpdate(id,e){

    e.preventDefault();
    const{list}=this.state;
    //const regex = /^[\w\-\.\+]+\@[button-zA-Z0-9\. \-]+\.[button-zA-z0-9]{2,4}$/;
    let firstName=$('.employeeForm #first_name').val();
    let lastName=$('.employeeForm #last_name').val();
    let email=$('.employeeForm #empEmail').val();
    let salary=$('.employeeForm #salary').val();
    let date=$('.employeeForm #date').val();

    /*if(firstName.length===0||lastName.length===0||email.length===0||!(email.match(regex))||salary.length===0||date.length===0){
      swal("Error!", "Missing field", "error");
    }*/
    //else{
    list.forEach((e,i)=>{
      if(e.id===id){
        e.firstName=firstName;
        e.lastName=lastName;
        e.email=email;
        e.salary=salary;
        e.date=date;
      }
    })
    let addForm=false;
    let update=false;
    let updatedElement=null;
      this.setState({list,addForm,update,updatedElement});

  }

  delete(element){
    const {list}=this.state;
    list.forEach((e,i)=>{
      if(e.id===element.id){
        list.splice(i,1);
      }
    })
    this.setState({list});
  }

  form(){
    this.setState({addForm:true})
  }

  logOut(){
    this.setState({
      user:false
    });
  }


  render() {
    const {user,addForm}=this.state;
    return (
      <div className="App container">
        {!user&&<Login login={this.logIn}/>}
        {user&&!addForm&&<Table list={this.state.list} form={this.form} logout={this.logOut} update={this.update} delete={this.delete}/>}
        {user&&addForm&&<Form parentState={this.state} finishUpdate={this.finishUpdate} add={this.add}/>}
      </div>
    );
  }
}

export default App;

