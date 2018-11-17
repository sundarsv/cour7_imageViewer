import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../../common/header/Header';

//For the modal to fit the inside content perfectly.
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Login extends Component {

    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            validatedCredentials: "dispNone"
        }
    }

    openModalHandler = () => {
        this.setState({
            isModalOpen: true,
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false });
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
    }

    /**
     * This card must be displayed horizontally in center of the page.
     * Red color error message.
     */
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className="flex-container">
                    <div className="center">
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textPrimary">
                                    LOGIN
                                </Typography>
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
                                <br /><br />
                                <FormHelperText className={this.state.validatedCredentials}>
                                    <span className="red">Incorrect username and/or password</span>
                                </FormHelperText>
                                <FormControl className={classes.formControl}>
                                    <Button variant="contained" color="primary">
                                        LOGIN
                                  </Button>
                                </FormControl>
                            </CardContent>
                        </Card >
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
