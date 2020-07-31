import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
	Button, Modal, ModalHeader, ModalBody,
	Form, FormGroup, Label, Input } from 'reactstrap';
	import { NavLink } from 'react-router-dom';

	class Header extends Component {

		constructor(props) {
			super(props);
			this.toggleNav = this.toggleNav.bind(this);
			this.state = {
				isNavOpen: false,
				isModalOpen: false
			};
			this.toggleNav = this.toggleNav.bind(this);
			this.toggleModal = this.toggleModal.bind(this);
			this.handleLogin = this.handleLogin.bind(this);
		}

		toggleNav() {
			this.setState({isNavOpen: !this.state.isNavOpen});
		}

		toggleModal() {
			this.setState({isModalOpen: !this.state.isModalOpen});
		}

		handleLogin(event) {
			const errors = this.validateLogin(this.username.value, this.password.value);
			var message = '';
			for(var key in errors){				
				if(errors[key] !== []){
					for(var i in errors[key]){
						message = message === '' ? errors[key][i] : message+"\n"+errors[key][i];
					}
				}
			}

			if(message === ''){
				this.toggleModal();
				alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
			}
			else{
				alert("Please correct the following messages:\n" + message);
			}
			event.preventDefault();
		}
		

		validateLogin(username, password) {
			const errors = {
				username: [],
				password: []
			};

			if(username.length < 6){
				errors.username.push('Username should be >= 6 charachters');
			}


			if(password.length < 8){
				errors.password.push("Password should be >= 8 charachters");
			}

			var reg = /[a-z]/;
			if(!reg.test(password)){
				errors.password.push("Password should contain at least one lower case charachter");
			}

			reg = /[A-Z]/;
			if(!reg.test(password)){
				errors.password.push("Password should contain at least one upper case charachter");
			}
			
			reg = /[0-9]/;
			if(!reg.test(password)){
				errors.password.push("Password should contain at least one digit");
			}

			return errors;
		}

		render () {

			return(
				<>
				<Navbar dark expand="md">
				<div className="container">
				<NavbarToggler onClick={this.toggleNav} />
				<NavbarBrand className="mr-auto" href="/">
				<img src="assets/images/logo.png" height="30" width="41" alt="h2gc" />
				</NavbarBrand>
				<Collapse isOpen={this.state.isNavOpen} navbar>
				<Nav navbar>
				<NavItem>
				<NavLink className="nav-link" to="/home">
				<span className="fa fa-home fa-lg"></span> Home
				</NavLink>
				</NavItem>
				<NavItem>				
				<NavLink className="nav-link" to="/search">
				<span className="fa fa-address-card fa-lg"></span> Search				
				</NavLink>
				</NavItem>
				<NavItem>
				<NavLink className="nav-link" to="/aboutus">
				<span className="fa fa-info fa-lg"></span> About
				</NavLink>
				</NavItem>				
				</Nav>
				<Nav className="ml-auto">
				<NavItem>
				<Button outline onClick={this.toggleModal}>
				<span className="fa fa-sign-in fa-lg"> Login</span>
				</Button>			
				</NavItem>
				</Nav>
				</Collapse>
				</div>
				</Navbar>
				<Jumbotron>
				<div className="container">
				<div className="row row-header">
				<div className="col-12 col-sm-6">
				<h1>Hitchhikers' guide to Cinema</h1>
				<h3>Easily perform complex searches on the history of cinema!!!</h3>
				</div>

				<div className="d-none d-sm-block col-12 col-sm-6 align-self-center">
				<div className="row row-header justify-content-center">
				<div className="col-12 col-sm-6 align-self-center">
				<img src="assets/images/logo.png" className="img-fluid" alt="logo" />
				</div>
				</div>
				</div>


				</div>
				</div>
				</Jumbotron>


				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
				<ModalHeader toggle={this.toggleModal} >Login</ModalHeader>
				<ModalBody>
				<Form onSubmit={this.handleLogin}>
				<FormGroup>
				<Label htmlFor="username">Username</Label>
				<Input type="text" id="username" name="username" innerRef={(input) => this.username = input} />
				</FormGroup>
				<FormGroup>
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" name="password" innerRef={(input) => this.password = input} />
				</FormGroup>
				<FormGroup check>
				<Label check>
				<Input type="checkbox" name="remember" innerRef={(input) => this.remember = input} />
				Remember me
				</Label>
				</FormGroup>
				<Button type="submit" value="submit" color="primary">Login</Button>
				</Form>
				</ModalBody>
				</Modal>

				</>
				);
			}
		}

		export default Header;