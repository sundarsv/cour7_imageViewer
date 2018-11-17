import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import '../login/Login.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            validatedCredentials: "dispNone"
        }
    }

    checkCredentials(credentialsEntered) {
        if (this.state.username === "") {
            this.setState({ usernameRequired: "dispBlock" });
            credentialsEntered = false;
        }
        else {
            this.setState({ usernameRequired: "dispNone" });
        }
        if (this.state.password === "") {
            this.setState({ passwordRequired: "dispBlock" });
            credentialsEntered = false;
        }
        else {
            this.setState({ passwordRequired: "dispNone" });
        }
        return credentialsEntered;
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
        let credentialsEntered = true;
        credentialsEntered = this.checkCredentials(credentialsEntered);
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
        let credentialsEntered = true;
        credentialsEntered = this.checkCredentials(credentialsEntered);
    }

    loginClickHandler = () => {
        let credentialsEntered = true;
        credentialsEntered = this.checkCredentials(credentialsEntered);
        if (credentialsEntered) {
            if ("upgrad" === this.state.username && "upgrad" === this.state.password) {
                sessionStorage.setItem("access-token", "9204272757.f8594e7.25756c2b57804b6b8b1cb08b48e45566");
                sessionStorage.setItem("uuid", "f8594e7d52814efdb9bc81edcc43d158");
                console.log("Set Session Storage");
            } else {
                this.setState({ validatedCredentials: "dispBlock" });
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="login">
                    <Card className="cardStyle">
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                LOGIN
                            </Typography>
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" onChange={this.inputUsernameChangeHandler}></Input>
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" onChange={this.inputPasswordChangeHandler}></Input>
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <FormHelperText className={this.state.validatedCredentials}>
                                <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>
                            <br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                                LOGIN
                            </Button>
                        </CardContent>
                    </Card >
                </div>
            </div>
        );
    }
}

export default Login;
