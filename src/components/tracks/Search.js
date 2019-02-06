import React, { Component } from 'react';
import {Consumer} from '../../context';
import axios from 'axios';
import Spinner from './../layout/spinner';

class Search extends Component {
    state = { 
        trackTitle:''
    }

    handleChange = ({currentTarget:input}) => {
        this.setState({[input.name]:input.value});
    }

    handleSubmit = (dispatch,event)=>{
        event.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res=>{
            dispatch({
                type:"SEARCH_TRACKS",
                payload:res.data.message.body.track_list
            })
            this.setState({trackTitle:''});
        })
        .catch(err=>console.log(err));      
    }
    render() {
        return ( 
            <Consumer>
            {value=>{
                const {dispatch, loading} = value; 
                return (   
                    <div className="card p-4 mb-4">
                        <div className="card-body text-center">
                            <h1 className="display-4"><i className="fas fa-music" />Search for your favorite lyrics</h1>
                            <p className="card-text lead">Get for the lyric</p>
                            <form onSubmit={this.handleSubmit.bind(this,dispatch)}>
                                <div className="form-group">
                                    <input onChange={this.handleChange} className="form-control form-control-lg" type="text" placeholder="Song Title" name="trackTitle" value={this.state.trackTitle}/>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Get Song Lyric</button>
                            </form>
                        </div>
                    </div>                     
                )}          
            }
            </Consumer> 
        )
        
    }
}
 
export default Search;