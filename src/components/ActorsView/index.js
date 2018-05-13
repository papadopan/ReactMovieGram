import React, {Component} from 'react'
import './ActorsView.css'
import loader from "../../assets/loader.gif"

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

  fetchKnownMovies()
  {
      fetch('https://api.themoviedb.org/3/search/person?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query=' + localStorage.getItem("actor-query"))
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
      .catch(()=> this.setState({error:true}))
  }

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

  render()
  {
    if( !this.state.error)
    {
      return(
        <div className="profile">

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
            {/* <Link to="/results"><img src={left} alt="arrow" /></Link> */}
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
