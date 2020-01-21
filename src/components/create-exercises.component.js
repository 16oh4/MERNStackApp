import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {
    constructor(props) {
        super(props);

        //bind statement makes sure the method will refer to parent and not child!
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //lifecycle method from REACT
    //called before anything loads on the page!!!
    componentDidMount() {
        axios.get('/users')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map( user => user.username),
                    username: res.data[0].username
                })
            }
        })
    }

    //For getting the input from a textbox
    onChangeUsername(e) {
        e.persist();
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        e.persist();
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        e.persist();
        this.setState({
            duration: e.target.value
        });
    }

    //Why is there no SyntheticEvent "e" used here?... maybe because of library DatePicker
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        //Prevent default HTML submit for forms
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        //Here is where we connect to database
        console.log(exercise);

        //send request to backend to save exercise in database
        axios.post('/exercises/add', exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Send user back to homepage
        window.location = '/exercises';
    }

    render() {
        return (
            //FORM CODE
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                            ref="userInput" 
                            required className="form-control" 
                            value={this.state.username} 
                            onChange={this.onChangeUsername}
                        >
                            {
                                //Array of users coming from MongoDB
                                //.map allows us to return something for each element in array
                                this.state.users.map( (user) => {
                                    return(
                                        <option key={user} value={user}>{user}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    {/*DURATION PICKER*/}
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                required
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Create Exercise log"
                            className="btn btn-outline-primary"
                        />
                    </div>

                </form>
            </div>
        )
    }
}