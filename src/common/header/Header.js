import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/Search';
import React, { Component } from 'react';
import './Header.css';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            userData: "",
            displayMenu: "disp-none"
        }
    }

    //Using Fetch with async and await to get json data
    async componentDidMount() {
        if (this.state.loggedIn) {
            const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=9204272757.f8594e7.25756c2b57804b6b8b1cb08b48e45566`);
            const json = await response.json();
            this.setState({ userData: json.data });
        }
    }

    onProfileIconClickHandler = () => {
        this.setState({ displayMenu: "disp-block" });
    }

    onMyAccountClickHandler = () => {
        this.props.history.push("/profile");
    }

    /**
     * Clear Session Storage on Logout.
     */
    onLogoutClickHandler = () => {
        sessionStorage.setItem("access-token", null);
        sessionStorage.setItem("uuid", null);
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="header-bg">
                <div className="header-logo">
                    Image Viewer
                    {
                        this.state.loggedIn &&
                        <div>
                            <div className="right">
                                <div className="searchBox">
                                    <Search className="searchIcon" />
                                    <Input id="search" type="text" placeholder="Search…" disableUnderline={true}></Input>
                                </div>
                                <div className="profile-picture">
                                    <IconButton color="default" onClick={this.onProfileIconClickHandler}>
                                        <Icon><img src={this.state.userData.profile_picture} alt="profile_picture" /></Icon>
                                    </IconButton>
                                    <div className={this.state.displayMenu}>
                                        <MenuItem key="1" value="My Account">
                                            <ListItemText primary="My Account" onClick={this.onMyAccountClickHandler} />
                                        </MenuItem>
                                        <hr />
                                        <MenuItem key="2" value="Logout">
                                            <ListItemText primary="Logout" onClick={this.onLogoutClickHandler} />
                                        </MenuItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Header;