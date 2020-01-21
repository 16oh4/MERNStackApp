import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercises extends Component {
    constructor(props) {
        super(props);

        //Allows the this keyword to be used inside the method specified!
        //this keyword is specified inside the constructor
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
            users: [],
        }
    }

    //runs before the component is rendered
    componentDidMount() {
        //Get the exercise from the backend endpoint by passing in the ID from the URL pulled from "match"
        //passed in by the Route component
        axios.get('/exercises/'+ this.props.match.params.id)
        .then( res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            });
        })
        .catch( err => console.log('Failed to get exercises ' + err) );

        //Need to fetch a list of users
        axios.get('/users')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    //For every user in the list from mongoDB, get its username 
                    //and build an array to store in users state
                    users: res.data.map(user => user.username),
                });
            }
        })
        .catch( err => console.log(err) );
    }

    //For getting the input from a textbox
    onChangeUsername(e) {
        //e.persist();
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        //e.persist();
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        //e.persist();
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
        axios.post('/exercises/update/'+this.props.match.params.id, exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Send user back to homepage
        window.location = '/exercises';
    }

    render() {
        return (
            //FORM CODE
            <div>
                <h3>Edit Exercise</h3>
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
                            value="Edit Exercise log"
                            className="btn btn-outline-primary"
                        />
                    </div>

                </form>
            </div>
        )
    }
}