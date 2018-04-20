import React, {Component} from 'react'
import './SearchResults.css';
import left from "../../assets/long-left.svg"
import { Link } from 'react-router-dom'
import loader from "../../assets/loader.gif"


class SearchResults extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      showingSideBar : false,
      top_rated: [],
      title:"",
      date:"",
      overview:"",
      original_language:"",
      image_path:"",
      spoken_languages:[],
      isLoaderOn:false
    }
  }

  componentDidMount(){
        this.setState({isLoaderOn:true})
    this.fetchGenreMovies();

  }
  fetchMovieDetails(id){
    fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
    .then(response => response.json())
    .then(data=> this.setState({
        title: data.title,
        date: data.release_date,
        overview:data.overview,
        original_language:data.original_language,
        image_path: "http://image.tmdb.org/t/p/w185//" +data.poster_path,
        isLoaderOn:false
    }))
    .catch("There is an error with the API")

  }
  fetchGenreMovies()
  {
    fetch('https://api.themoviedb.org/3/genre/'+this.props.id+'/movies?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&include_adult=false&sort_by=created_at.asc' )
    .then(response => response.json())
    .then(data => data.results.map(movies =>(
      {
        title :`${movies.original_title}`,
        date: `${movies.release_date}`,
        image: `http://image.tmdb.org/t/p/w185//${movies.poster_path}`,
        id: `${movies.id}`
      }
    )))
    .then(data => this.setState({
      top_rated: data,
      isLoaderOn:false
    }))

    .catch("There is an error with the API")

  }
  handleImageClick = (e)=>
  {
    this.setState({
      id: e.target.id,
      isLoaderOn:true
    })
    this.fetchMovieDetails(e.target.id);
  }

  handleULClick = (event) =>
  {
    this.setState({drop:event.target.className})

  }
  ButtonHandle= (e)=>
  {
    this.props.AddMyMovies(e.target.id)
  }



  render()
  {
    return(
      <div className="second_screen">
      <div className="go_back">
          <Link to="/results"><img src={left} alt="arrow" /></Link>
      </div>
        <div className="wrapper">
            <div className="search_header">
              <h1>{this.props.name} movies . . .</h1>
            </div>
        </div>

        <div className="results_list">
        <div className={this.state.isLoaderOn ? "loader showing" : "loader hiding"}>
          <img src={loader} alt="loader"  />
        </div>

            {
                this.state.top_rated.map(movies =>
                  {
                    return      <div key={movies.id} className="movie_slides" >
                                      <div className="card">
                                      <Link to={`movie/${movies.id}`}>
                              <div  data-toggle="modal" data-target="#myModal">
                                <img id={movies.id} src={movies.image} alt="movie"/>
                              </div>
                            </Link>
                                      <div className="info">
                                        <p>{movies.title}({movies.date})</p>
                                      </div>
                                      <button className="btn" onClick={this.ButtonHandle}  id={movies.id}>{this.props.mymovies.includes(movies.id) ? "Added!!!" : "Add"}</button>
                                      </div>
                                    </div>
                  }
                )
            }

  </div>

</div>


    );
  }
}

export default SearchResults;
