import React, {Component} from 'react'
import './MovieList.css';
import FontIcon from 'material-ui/FontIcon'
import loader from "../../assets/loader.gif"
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import image from '../../assets/logo3.png'

//styles about the hearts of the movies
//if they want to add them to their profile or not
//the feedback that users have is the color of the heart icon
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
      this.fetchMoviesInfo();
    
  }

  //fetch movies info to display 
  fetchMoviesInfo()
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

  //handling the click of the heart 
  //There is a check if the movie already existed it will be deleted and the color of the heart will change 
  //If the movie did not existed in the database it will be added and  the color of the heart will change 
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
 
  render()
  {

    if( !this.state.error)
    {
      return(
        <div className="second_screen">
          <div className="go_back">
             {/* <Link to="/results"><img src={image} alt="arrow"/></Link> */}
          </div>

          <div className="wrapper">
            <div className="search_header">
              <Link to="/results"><img src={image} className="home_image" alt="arrow"/></Link>
               <h1>movies about . . . {localStorage.getItem("movie-query")}</h1>
            </div>
           </div>
           <div className="results_list">
             <div className={this.state.isLoaderOn ? "loader showing" :"loader hiding"}>
               <img src={loader} alt="loader"  />
             </div>
            {
              this.state.top_rated.map(movies =>
                {
                  return   <div key={movies.id} className="movie_slides">
                             <div className="card" >
                              <Link to={`movie/${movies.id}`}>
                                <div  data-toggle="modal" data-target="#myModal">
                                  <img id={movies.id} src={movies.image} alt="movie"/>
                                </div>
                              </Link>
                              <div className="info">
                                <p>{movies.title}({movies.date})</p>
                              </div>
                              <IconButton 
                                onClick={this.ButtonHandle}  
                                className="favourite"
                                style = { this.props.mymovies.includes(movies.id) ? styles.success : styles.fail}
                              >
                                <FontIcon id={movies.id} className="material-icons "  color = { this.props.mymovies.includes(movies.id) ? "#962A38" : "#FFF"}>
                                   favorite
                                </FontIcon>            
                              </IconButton>
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
              <div>  
                 <Link to="/results"><img className="home_image" src={image} alt="arrow" /></Link>
              </div>
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
