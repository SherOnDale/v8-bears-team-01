import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import axios from "axios";
import { fetchUser } from "../../actions/auth";

export class Navbar extends Component {
    state = {
        registerIsActive: false,
        loginIsActive: false,
        email: "",
        password: "",
        comfirmPassword: "",
        name: "",
        errorMsg: ""
    };
    handleRegisterToggle = () => {
        this.clearFields();
        this.setState(() => ({
            registerIsActive: !this.state.registerIsActive
        }));
    };
    handleLoginToggle = () => {
        this.clearFields();
        this.setState(() => ({ loginIsActive: !this.state.loginIsActive }));
    };
    handleRequestClose = () => {
        this.clearFields();
        this.setState(() => ({
            registerIsActive: false,
            loginIsActive: false
        }));
    };

    updateEmail = val => {
        this.setState({ email: val });
    };

    updatePassword = val => {
        this.setState({ password: val });
    };

    updateConfirmPassword = val => {
        this.setState({ comfirmPassword: val });
    };

    updateName = val => {
        this.setState({ name: val });
    };

    handleValidation = type => {
        const { email, password, comfirmPassword, name } = this.state;
        if (type === "signup") {
            if (!email || !password || !name) {
                this.setState({ errorMsg: "All fields are required" });
                return false;
            }
            if (password.length < 6 || password.length > 30) {
                this.setState({
                    errorMsg: "Password must be between 6 and 30 characters"
                });
                return false;
            }
            if (password.includes(" ")) {
                this.setState({ errorMsg: "Password cannot contain spaces" });
                return false;
            }
            if (comfirmPassword !== password) {
                this.setState({ errorMsg: "Passwords must match" });
                return false;
            }
        }

        if (type === "login") {
            if (!email || !password) {
                this.setState({ errorMsg: "All fields are required" });
                return false;
            }
        }

        if (!email.includes("@")) {
            this.setState({ errorMsg: "Invalid email address." });
            return false;
        }

        if (
            email.includes("'") ||
            email.includes('"') ||
            password.includes("'") ||
            password.includes('"')
        ) {
            this.setState({ errorMsg: "Fields cannot contain ' or \"" });
            return false;
        }
    };

    handleLogin = () => {
        let response = this.handleValidation("login");
        if (response === false) return;
        let email = this.state.email;
        let password = this.state.password;

        let obj = {
            email: email.trim(),
            password: password.trim()
        };

        axios
            .post(`/auth/login`, obj)
            .then(resp => {
                //   console.log(resp.data);
                this.clearFields();
                this.setState({ errMessage: "", loginIsActive: false });
                this.fetchUser();

                //push user to home page
                //this.props.history.push('/');
            })
            .catch(err => {
                err.response &&
                    this.setState({ errorMsg: err.response.data.errMessage });
            });
    };

    handleSignup = () => {
        let response = this.handleValidation("signup");
        if (response === false) return;
        let email = this.state.email;
        let password = this.state.password;
        let name = this.state.name;
        let obj = {
            email: email.trim(),
            password: password.trim(),
            name: name.trim()
        };

        axios
            .post(`/auth/signup`, obj)
            .then(resp => {
                //console.log(resp.data);
                this.clearFields();
                this.setState({ errMessage: "", registerIsActive: false });
                // this.props.history.push('/');
            })
            .catch(err => {
                err.response &&
                    this.setState({ errorMsg: err.response.data.errMessage });
            });
    };

    clearFields = () => {
        this.setState({
            email: "",
            password: "",
            name: "",
            errorMsg: "",
            comfirmPassword: ""
        });
    };

    renderContent() {
        if (this.props.auth) {
            return (
                <div>
                    {" "}
                    <a href="#" className="mr-4">
                        My Profile
                    </a>
                    <a href="/api/logout">Logout</a>
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        onClick={this.handleLoginToggle}
                        className="btn btn-outline-primary mr-2"
                    >
                        Log In
                    </button>
                    <button
                        onClick={this.handleRegisterToggle}
                        className="btn btn-danger"
                    >
                        Sign Up
                    </button>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">
                        <Link className="text-dark" to="/">
                            CodeCollab
                        </Link>
                    </h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        {this.renderContent()}
                    </nav>
                </div>
                <RegisterModal
                    email={this.state.email}
                    name={this.state.name}
                    password={this.state.password}
                    confirmPassword={this.state.comfirmPassword}
                    isOpen={this.state.registerIsActive}
                    handleRequestClose={this.handleRequestClose}
                    updateEmail={this.updateEmail}
                    updatePassword={this.updatePassword}
                    handleSignup={this.handleSignup}
                    updateName={this.updateName}
                    errorMsg={this.state.errorMsg}
                    updateConfirmPassword={this.updateConfirmPassword}
                />
                <LoginModal
                    email={this.state.email}
                    name={this.state.name}
                    password={this.state.password}
                    isOpen={this.state.loginIsActive}
                    handleRequestClose={this.handleRequestClose}
                    updateEmail={this.updateEmail}
                    updatePassword={this.updatePassword}
                    handleLogin={this.handleLogin}
                    errorMsg={this.state.errorMsg}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        { fetchUser }
    )(Navbar)
);
