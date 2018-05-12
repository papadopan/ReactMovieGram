import React, {Component} from 'react'
import './MovieList.css';
import FontIcon from 'material-ui/FontIcon'
import loader from "../../assets/loader.gif"
import { Link } from 'react-router-dom'
const styles = {

  success :{
    color:"#962A38", 
    fontSize: "30px"
  },
  fail :{
    borderColor : "#962A38",
    color: "white", 
    fontSize: "25px"
  } 

}


class MovieList extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      showingSideBar : false,
      top_rated: [],
      id:"",
      title:"",
      date:" ",
      overview:"",
      original_language:"",
      image_path:"",
      spoken_languages: [],
      movie_details:[],
      isLoaderOn:false,
      error:false
    }
  }
  componentDidMount(){
  
      this.setState({isLoaderOn:true})
      this.fetchGenreMovies();
    
  }

  fetchGenreMovies()
  {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query='+ localStorage.getItem("movie-query") )
    .then(response => response.json())
    .then(data => data.results.map(movies =>(
      {
        title :`${movies.original_title}`,
        date: `${movies.release_date}`,
        image: `http://image.tmdb.org/t/p/w185//${movies.poster_path}`,
        id: `${movies.id}`
      }
    )))
    .then(data => {
      
      if(data.length === 0)
      {
        this.setState({error:true})
      }
      else
      {
        this.setState({
          top_rated: data,
          isLoaderOn:false
        })

      }
  })
    .catch( ()=> this.setState({error:true})) 
  }

  //handling functions
  ButtonHandle= (e)=>
  {
    
    if (this.props.mymovies.indexOf(e.target.id) > -1)
    {
      this.props.deleted_id(e.target.id)
    }
    else{
      if(e.target.id === "" || e.target.id ===" " || e.target.id === undefined)
      {
  
      }
      else{
        this.props.AddMyMovies(e.target.id);
      }
      
    }
  
  }
 
  handleULClick = (event) =>
  {
    this.setState({drop:event.target.className})
  }
  render()
  {

    if( !this.state.error)
    {
          return(
            <div className="second_screen">
            <div className="go_back">
              {/* <Link to="/results"><img src={left} alt="arrow"/></Link> */}
            </div>

              <div className="wrapper">
                  <div className="search_header">
                    <h1>movies about . . . {this.props.value}</h1>
                  </div>
              </div>
              <div className="results_list">
                <div className={this.state.isLoaderOn ? "loader showing" :"loader hiding"}>
                 <img src={loader} alt="loader"  />
                 </div>

                  {
                    this.state.top_rated.map(movies =>
                    {
                      return      <div key={movies.id} className="movie_slides">
                            <div className="card" >
                            <Link to={`movie/${movies.id}`}>
                              <div  data-toggle="modal" data-target="#myModal">
                                <img id={movies.id} src={movies.image} alt="movie"/>
                              </div>
                            </Link>
                            <div className="info">
                              <p>{movies.title}({movies.date})</p>
                            </div>
                            <button className="btn favorite"  onClick={this.ButtonHandle}  id={movies.id}>
                              <FontIcon className="material-icons" style = { this.props.mymovies.includes(movies.id) ? styles.success : styles.fail}>
                                 favorite
                              </FontIcon>
                            </button>

                            </div>
                          </div>
                      })
                    }

  </div>
      </div>
          );
      }
    else
    {
      return(
          <div className="error_screen">

          <div className="back_button">
              {/* <Link to="/results"><img src={left} alt="arrow" /></Link> */}
          </div>

          <div className="error_message">
              <h1>There is a problem with your search , please try again  </h1>
          </div>

          </div>
      );
    }
  }
}
export default MovieList;
