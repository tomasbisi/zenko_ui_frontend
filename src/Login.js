import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './css/Login.css';


// add 'Forgot secret key' ?
// add 'Create new account'

class Login extends Component {
	constructor() {
		super();
		this.state = {
			login: {}
		}
	}

	handleSignIn(e) {
		if (this.refs.accessKeyID.value === '' || this.refs.secretAccessKey.value === '') {
			alert('Please fill out both Login and Password fields!');
		} else {
			this.setState({login: {
				accessKeyID: this.refs.accessKeyID.value,
				secretAccessKey: this.refs.secretAccessKey.value
			}}, function() {
				console.log(this.state.login);
				// send credentials to back end

				// if all works out go to bucketinfo page
				// otherwise error message has to be generated
				this.props.history.push("/info");
			});
		}
		e.preventDefault();
	}

	render() {
		return (
			<div className="login">
				<ReactCSSTransitionGroup
					transitionName="fade"
					transitionAppear={true}
					transitionAppearTimeout={1500}>
					<form onSubmit={this.handleSignIn.bind(this)}>
						<div className="form">
							<div>
								<label>Login</label><br />
								<input type="text" ref="accessKeyID" placeholder="access key id" required />
							</div>
							<div>
								<br />
								<label>Password</label><br />
								<input type="password" ref="secretAccessKey" placeholder="secret access key" required /><br />
							</div>
							<br />
							<input type="submit" value="Sign In" className="sign-in" />
						</div>
					</form>
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default Login;
