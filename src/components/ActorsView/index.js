import React, {Component} from 'react'
import './ActorsView.css'
import left from "../../assets/long-left.svg"
import loader from "../../assets/loader.gif"
import { Link } from 'react-router-dom'

class ActorsView extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      birthday:"",
      biography:"",
      place: "",
      image:"http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg",
      known: [],
      isLoaderOn:false
    };
  }

  componentDidMount(){

    if(this.props.actor !=="")
    {
      this.setState({isLoaderOn:true})
      this.fetchActorsData()
      this.fetchKnownMovies()
    }
  }

  fetchKnownMovies()
  {
      fetch('https://api.themoviedb.org/3/search/person?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query=' + this.props.actor)
      .then(response => response.json())
      .then(response=>response.results[0].known_for.map(known_movies=>(
        {
          title : `${known_movies.original_title}`,
          date : `${known_movies.release_date}`,
          image: `http://image.tmdb.org/t/p/w185//${known_movies.poster_path}`
        }
      )))
      .then(data=> this.setState({
        known:data,
        isLoaderOn:false
      }))
      .catch(error => console.log("Problem loading data"))
  }

  fetchActorsData()
  {
      fetch('https://api.themoviedb.org/3/person/'+this.props.id+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
      .then(response => response.json())
      .then(response=>this.setState({
        birthday:response.birthday,
        biography:response.biography,
        place : response.place_of_birth,
        profile : 'http://image.tmdb.org/t/p/w185//' + response.profile_path,
        isLoaderOn:false
      }))
      .catch(error => console.log("Problem loading data"))
  }

  render()
  {
    if(this.props.actor !=="")
    {
      return(
        <div className="profile">
        <div className="go_back">
            <Link to="/results"><img src={left} alt="arrow" /></Link>
        </div>
            <div className="profile_info">
              <div className="infos">
                <img src={this.state.profile} alt="actor "/>
                  <p>{this.props.actor}</p>
                <p>{this.state.birthday}</p>
                <p>{this.state.place}</p>
              </div>
            </div>

            <div className="personal_info">
              <div className="biography">
                  <p>{this.state.biography}</p>
              </div>
            </div>

            <div className="stats">
              <div className="box_header">
                <h1>Best known for...</h1>
              </div>
              <div className="box_office">
              <div className={this.state.isLoaderOn ? "loader showing" : "loader hiding"}>
                <img src={loader} alt="loader"  />
              </div>
              {
                this.state.known.map(movies=>
                {
                  return      <div key={movies.title} className="box">
                                  <img src={movies.image} alt="movie"/>
                                  <div className="overlay">
                                    <div>
                                      <p className="overlay_title">{movies.title}</p>
                                      <p className="overlay_date"> {movies.date}</p>
                                    </div>
                                  </div>
                                </div>
                })
              }
              </div>
            </div>
      </div>
      );
    }
    else{
      return(
        <div className="error_screen">
        <div className="back_button">
            <Link to="/results"><img src={left} alt="arrow" /></Link>
        </div>
        <div className="error_message">
            <h1>You search is empty </h1>
        </div>
        </div>
      );
    }
  }
}

export default ActorsView;
