import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

const reducer = (sd, action) => {
    console.log(sd);
    switch(action.type){
        case 'SEARCH_TRACKS':
            return {
                ...sd,
                track_list: action.payload,
                heading: 'Search Results'
            };
        default:
            return sd;
    }
}
// function reducer(){
//     console.log('reducer');
// }
export class Provider extends Component {
    state = {
        track_list : [],
        heading : 'Top 10 Tracks',
        dispatch : action => this.setState(sd=>reducer(sd, action))
    }
    // dispatch(action){
    //     this.setState(function(state){
    //         reducer(state, action); 
    //     })
    // }
    
    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res=>{
                //console.log(res);
                this.setState({track_list:res.data.message.body.track_list})
            })
            .catch(err=>console.log(err));
    }

    render() { 
        return ( 
            <Context.Provider value={this.state}>
                {this.props.children}    
            </Context.Provider>
        );
    }
}
 
export const Consumer = Context.Consumer;