import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/Search';
import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    render() {
        return (
            <div className="header-bg">
                <div className="header-logo">
                    Image Viewer
                    {
                        this.state.loggedIn &&
                        <div className="searchBox">
                            <Search className="searchIcon" />
                            <Input id="search" type="text" placeholder="Search…" disableUnderline={true}></Input>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Header;