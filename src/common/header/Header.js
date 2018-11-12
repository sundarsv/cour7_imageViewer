import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header-bg">
                <div className="header-logo">
                    Image Viewer
                </div>
            </div>
        )
    }
}

export default Header;