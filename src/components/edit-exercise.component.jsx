import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// State is how variables are created and managed in React

export default class EditExercise extends Component{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // automatically called before anything is rendered on the page
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value // username is updated within the state
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value // description is updated within the state
        })
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value // duration is updated within the state
        })
    }

    onChangeDate(date){
        this.setState({
            date: date // date is updated within the state
        })
    }

    onSubmit(e){
        e.preventDefault(); // prevents default html submit form behavior

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/update/'+ this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        // submit the exercise to the database 
        console.log(exercise);

        window.location = '/';
    }

    render(){
        return(
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={ this.state.username }
                                onChange={ this.onChangeUserName }>
                                {
                                    this.state.users.map(function(user){
                                        return <option 
                                                key={ user }
                                                value={ user }>
                                            { user }
                                        </option>;
                                    })
                                }

                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.description }
                               onChange={ this.onChangeDescription } />
                    </div>

                    <div className="form-group">
                        <label>Duration (Minutes): </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.duration }
                               onChange={ this.onChangeDuration } />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={ this.state.date }
                                onChange={ this.onChangeDate }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Execise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}