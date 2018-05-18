import React, {Component} from 'react'
import './ActorsView.css'
import loader from "../../assets/loader.gif"
import image from '../../assets/logo3.png'
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
      isLoaderOn:false,
      error: false
    };
  }

  componentDidMount(){

    if(this.props.actor !=="")
    {
      this.setState({isLoaderOn:true})
      this.fetchActorsData()
      this.fetchKnownMovies()
    }
    console.log(localStorage.getItem("actor-query"))
  }

  //fetch known movies for the actor that the user searched for
  fetchKnownMovies()
  {
      fetch('https://api.themoviedb.org/3/search/person?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query=' + localStorage.getItem("actor-query"))
      .then(response => response.json())
      .then(response=>response.results[0].known_for.map(known_movies=>(
        {
          title : `${known_movies.original_title}`,
          date : `${known_movies.release_date}`,
          image: `http://image.tmdb.org/t/p/w185//${known_movies.poster_path}`,
          id: `${known_movies.id}`
        }
      )))
      .then(data=> this.setState({
        known:data,
        isLoaderOn:false
      }))
      .catch(()=> this.setState({error:true}))
  }
  //fetch actor data based on the actor's id
  fetchActorsData()
  {
      fetch('https://api.themoviedb.org/3/person/'+ localStorage.getItem("actor-id")+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
      .then(response => response.json())
      .then(response=>{
        this.setState({
          birthday:response.birthday,
          biography:response.biography,
          place : response.place_of_birth,
          name : response.name,
          profile : 'http://image.tmdb.org/t/p/w185//' + response.profile_path,
          isLoaderOn:false
        })
        
        if (response.profile_path === null ){
          this.setState({error:true})
        }
       })
      .catch(()=> this.setState({error:true}))
  }

  // in the render method it will check if there is an error, if there is then a static screen will be displayed with the proper message
  //otherwise the screen will display the information in the proper way 
  // When an error will occur : a) if there is a network problem with the fetching data from API b) if the user's query has no results

  render()
  {
    if( !this.state.error)
    {
      return(
        <div className="profile">
             <div className="back_button">
               <div>
               <Link to="/results"><img src={image} className="home_image" alt="arrow"/></Link>
              </div>
            </div>
            <div className="profile_info">
              <div className="infos">
                <img src={this.state.profile} alt="actor "/>
                  <p>{this.state.name}</p>
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
                                <Link to={`movie/${movies.id}`}>
                                  <img src={movies.image} alt="movie"/>
                                  
                                  <div className="overlay">
                                    <div>
                                      <p className="overlay_title">{movies.title}</p>
                                      <p className="overlay_date"> {movies.date}</p>
                                    </div>
                                  </div>
                                  </Link>
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
          <div>
            <Link to="/results"><img src={image} alt="arrow" /></Link>
          </div>
        </div>
        <div className="error_message">
            <h1>There is a problem with your search , please try again </h1>
        </div>
        </div>
      );
    }
  }
}

export default ActorsView;
