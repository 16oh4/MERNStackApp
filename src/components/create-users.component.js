import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        //bind statement makes sure the method will refer to parent and not child!
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',            
        }
    }

    onChangeUsername(e) {
        //store the SyntheticEvent before it's pooled
        let event = e;
        this.setState({
            username: event.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        //make a JSON object to log to console
        const user = {
            username: this.state.username
        }
        console.log(user);

        //send HTTP post request as JSON object to save user to database!!
        axios.post('/users/add', user)
        .then(res => console.log(res.data) )
        .catch( err => console.log(err) );

        //set username blank again to allow user to enter mmultiple usernames
        this.setState({
            username: ''
        });

    }
    
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text" 
                            required 
                            className="form-control" 
                            value={this.state.username} 
                            onChange={this.onChangeUsername} 
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}