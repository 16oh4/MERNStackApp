import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

//functional component (stateless) and no lifecycle methods (no componentDidMount())
//can do const Exercise = (props) => ()
function Exercise(props) {

    return(
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            {/*Using 0,10 because date contains date, time, and timezone */}
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                {/*Link is a component from react-router-dom */}
                <Link to={"/edit/"+props.exercise._id}>
                    <button type="button" className="btn btn-secondary">
                        <span>Edit</span>
                    </button>       
                </Link>
                
                <button type="button" className="btn btn-danger" onClick={ () => {
                    props.deleteExercise(props.exercise._id);
                }} >Delete</button>
            </td>
        </tr>
    );
}

//class component
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: [],
        }
    }

    /*
    deleteExercise() {
        const listEx = this.state.exercises.map(currentExercise => {
            return <Exercise 
                    exercise={currentExercise} 
                    deleteExercise={this.deleteExercise}
                    key={currentExercise._id}
                    />
        });

        return listEx;
    }
    */

    //Called as soon as component is mounted! (before it is rendered)
    componentDidMount() {
        /*
        //get all exercises from mongoDB
        let exercises = [];

        axios.get('/exercises')
        .then( res => {
            exercises = res.data;
            console.log('Got exercises from Server ' + res.data)
        })
        .catch( err => console.log('Could not fetch exercises ' + err));

        this.setState({
            exercises: exercises
        });
        */

        axios.get('/exercises/')
        .then( res => {
            this.setState({
                exercises: res.data
            });
        })
        .catch( err => {
            console.log(err);
        })
    }

    //Takes in object ID from mongoDB for exercise
    deleteExercise(id) {
        axios.delete('/exercises/'+id)
        .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter( element => (element._id !== id) )
                //if the id is not found, return it
                //this means the exercises will return all those without the id of interest
        });
    }

    exerciseList() {
        const exercises = this.state.exercises.map( element => {
            const exerciseElement = (
                <Exercise exercise={element} deleteExercise={this.deleteExercise} key={element._id}/>
            );
            return exerciseElement;
        });

        return exercises;
    }


    render() {

        /*
        //Return list of exercises as <ul>
        const list = this.state.exercises;
        const exerList = list.map( (val, index, arr) => {

            let uniqueKeys = Array.of(0,0,0,0);
            let uniqueKeysArr = uniqueKeys.map( (val2, index2) => {
                return index+'_'+index2;                
            });

            return (
                <div key={uniqueKeysArr[0]+'arr'}>
                <h3>Exercise by: {val.username}</h3>
                    <ul>
                        <li key={uniqueKeysArr[1]}>Description: {val.description}</li>
                        <li key={uniqueKeysArr[2]}>Duration: {val.duration}</li>
                        <li key={uniqueKeysArr[3]}>Date: {val.date}</li>
                    </ul>
                </div>
            );
        });
        */

        return (
            /*
            <div>
                {exerList}
            </div>
            */
           <div>
               <h3>Logged Exercises</h3>
               <table className="table">

                   <thead className="thead-light">
                       <tr>
                           <th>Username</th>
                           <th>Description</th>
                           <th>Duration</th>
                           <th>Date</th>
                           <th>Actions</th>
                       </tr>
                   </thead>

                   <tbody>
                       {this.exerciseList()}
                   </tbody>
               </table>
           </div>
        )
    }
}