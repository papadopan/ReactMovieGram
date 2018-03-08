import React, { Component } from 'react';
import {MainView, ResultsView,ActorsView, ProfileView,SearchResults,MovieList} from './components'
import { BrowserRouter, Route, Link } from 'react-router-dom'
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
      myMovies:[]
    };
  }
//add the movies to my list
addmymovies = (parameter)=>{
  var myMovies = this.state.myMovies.slice()
  myMovies.push(parameter)
  this.setState({
    myMovies: myMovies
  });
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
  this.fetchActorid(param)
}
updateMovie = (param) =>
{
  this.setState({movie_query:param})
  this.fetchActorid(param)
}
fetchActorid(param)
{

    fetch('https://api.themoviedb.org/3/search/person?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query=' + param)
    .then(response => response.json())
    .then(response=>this.setState({
        actor_name: response.results[0].name,
        actor_id : response.results[0].id
      }
    ))
    .catch(error => console.log("Problem loading data"))

//Show the results from the dropdown menu
}
  render()
  {
    return(
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
                                />
                        )}
                        />
                        <Route path="/searchresults" render={(props) => (
                          <SearchResults
                                   name = {this.state.dropdown_name}
                                   id = {this.state.dropdown_id}
                                   AddMyMovies={this.addmymovies}
                                   mymovies={this.state.myMovies}
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
                        <Route path="/movie" render={(props) => (
                          <MovieList
                          value= {this.state.movie_query}
                          AddMyMovies={this.addmymovies}
                          mymovies={this.state.myMovies}
                          />
                              )}
                        />
                        <Route path="/profile" render={(props) => (
                          <ProfileView
                                movies={this.state.myMovies}

                                  />
                              )}
                        />
          </div>
      </BrowserRouter>

    );
  }
}

export default App;
