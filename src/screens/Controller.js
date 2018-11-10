import React, {Component} from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super ();
        this.baseUrl = "https://api.instagram.com/v1/users/self/";
      }

    render() {
        return (
            <Router>
                <div>
                    <Route path='/home' render={(props) => <Home {...props} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;