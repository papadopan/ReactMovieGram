import React, { Component } from 'react';
import {MainView, ResultsView,ActorsView, ProfileView,SearchResults,MovieList , MovieView} from './components'
import { BrowserRouter, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from './firebase'
import './App.css';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      movie_id:" ",
      dropdown_name:" ",
      dropdown_id: " ",
      actor_query: " ",
      movie_query:" ",
      actor_name:"",
      actor_id: "",
      myMovies:[],
      uids:[],
      internet:[]
    };
  }

  componentDidMount()
  {
    const itemsRef = firebase.database().ref('movies_list')
    itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let movies = []
    let uids = []
    
    
    for (let item in items)
    {
      movies.push(items[item].data)

    }
  
    for (let item in items)
    {
      uids.push(items[item].uid)
    }

    this.setState({
      myMovies: movies,
      uids : uids
    })

    });

  }

  
//add the movies to my list
addmymovies = (parameter)=>{

  var mymovies = this.state.myMovies.slice()
  mymovies.push(parameter)
  
  


  this.setState({
    myMovies: mymovies
  });
  

  var uid = firebase.database().ref().child('movies_list').push().key


  var data ={
    uid : uid,
    data : parameter,
    category : "mymovies",
    stars : 1,
    comments:["Insert comments for the movie"],
    tag : "all"
  }

  
  this.setState({
    uids: uid,
  })

  var updates = {}
  updates['/movies_list/'+uid] = data
  firebase.database().ref().update(updates)

  
}
  movetomovie= (parameter)=>
  {
    this.setState={
        movie_id:parameter
    };
  }
  //keep record of the gerne name and id
  AppDropDownInfo = (name,id)=>
  {
    this.setState({
      dropdown_name:name,
      dropdown_id:id
    });
  }

//fetch the name of the actor and call the API
updateActor = (param) =>
{
  this.setState({actor_query:param})
  this.fetchActorid( localStorage.getItem("actor-query") )
  
}
updateMovie = (param) =>
{
  this.setState({movie_query:param})
  this.fetchActorid(param)
  // localStorage.setItem("actor-id" , this.state.actor_id)
  // console.log(localStorage.getItem("actor-id"))
}
//delete movie
delete_movie = (delete_uid) =>
{

  let uid = this.state.uids[this.state.myMovies.indexOf(delete_uid)]
  firebase.database().ref().child('/movies_list/' + uid).remove();

}
fetchActorid(param)
{

    fetch('https://api.themoviedb.org/3/search/person?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query=' + param)
    .then(response => response.json())
    .then(response=>{
        localStorage.setItem("actor-id" , response.results[0].id)
    })
    .catch(error => console.log("Problem loading data"))

//Show the results from the dropdown menu
}
  render()
  {
    return(
      <MuiThemeProvider>
        <BrowserRouter>
        <div>
            <Route path="/" exact component={MainView} />
            <Route path="/results" render={(props) => (
              <ResultsView
                                  MovieQuery = {this.updateMovie}
                                  ActorQuery={this.updateActor}
                                  ResultsDropDownInfo={this.AppDropDownInfo}
                                  MoveToMovie={this.movetomovie}
                                  AddMyMovies={this.addmymovies}
                                  mymovies = {this.state.myMovies}
                                  uids = {this.state.uids}
                                  deleted_id = {(id) => this.delete_movie(id)}
                                  />
                          )}
                          />
                          <Route path="/searchresults" render={(props) => (
                            <SearchResults
                                    name = {this.state.dropdown_name}
                                    id = {this.state.dropdown_id}
                                    AddMyMovies={this.addmymovies}
                                    mymovies={this.state.myMovies}
                                    deleted_id = {(id) => this.delete_movie(id)}
                                    uids = {this.state.uids}
                                />
                                )}
                          />

                          <Route path="/movie/:movieID" exact render={(props) => (
                            <MovieView
                                    name = {this.state.dropdown_name}
                                    id = {this.state.dropdown_id}
                                    AddMyMovies={this.addmymovies}
                                    mymovies={this.state.myMovies}
                                    {...props}
                                />
                                )}
                          />

                          <Route path="/actor" render={(props) => (
                                    <ActorsView
                                      actor = {this.state.actor_query}
                                      id = {this.state.actor_id}
                                    />
                                )}
                          />
                          <Route path="/movies" render={(props) => (
                            <MovieList
                            value= {this.state.movie_query}
                            AddMyMovies={this.addmymovies}
                            mymovies={this.state.myMovies}
                            deleted_id = {(id) => this.delete_movie(id)}
                            />
                                )}
                          />
                          <Route path="/profile" render={(props) => (
                            <ProfileView
                                  movies={this.state.myMovies}
                                  mr = {this.state.internet}
                                  deleted_id = {(id) => this.delete_movie(id)}
                                  
                              />
                            )}
                          />
            </div>
        </BrowserRouter>
      </MuiThemeProvider>

    );
  }
}

export default App;
