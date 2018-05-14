import React, {Component} from 'react'
import './SearchResults.css';
import { Link } from 'react-router-dom'
import loader from "../../assets/loader.gif"
import FontIcon from 'material-ui/FontIcon'
import Pagination from "react-js-pagination"
import IconButton from 'material-ui/IconButton'
import image from '../../assets/logo3.png'



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
      isLoaderOn:false, 
      activePage:1,
      results:1,
      pages:1
    }
  }

  componentDidMount(){
    this.setState({isLoaderOn:true , activePage:1})
  
    if( localStorage.getItem("genre-id"))
    {
      let name = localStorage.getItem("genre-name")
      let id = localStorage.getItem("genre-id")
  

      this.setState({
        isLoaderOn:true,
        name : name,
        id : id
      })
    }
  
    this.fetchGenreMovies(this.state.activePage);
    
   
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
  fetchGenreMovies(num)
  {
    fetch('https://api.themoviedb.org/3/genre/'+ localStorage.getItem("genre-id") +'/movies?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&include_adult=false&sort_by=created_at.asc&page=' + num  )
    .then(response => response.json())
    .then(data => data.results.map(movies =>(
      {
        title :`${movies.original_title}`,
        date: `${movies.release_date}`,
        image: `http://image.tmdb.org/t/p/w185//${movies.poster_path}`,
        id: `${movies.id}`,
        pages : data.total_pages , 
        results : data.total_results,
      }
    )))
    .then(data => {
      this.setState({
      top_rated: data,
      pages: data[0].pages,
      results: data[0].results,
      isLoaderOn:false
    })

  })

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
  //pagination handle
  handlePageChange = (pageNumber) =>
  {
    this.setState({
      activePage : pageNumber,
      isLoaderOn:true
    })

    console.log(this.state.total_pages)
    this.fetchGenreMovies(pageNumber)
    
  }


  render()
  {

    return(
      <div className="second_screen">
        <div className="wrapper">
            <div className="search_header">
              <Link to="/results"><img src={image} className="home_image" alt="arrow"/></Link>
              <h1>{this.state.name} movies . . .</h1>
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

                           <IconButton 
                            onClick={this.ButtonHandle}  
                            className="favourite"
                            style = { this.props.mymovies.includes(movies.id) ? styles.success : styles.fail}
                             >
                            <FontIcon id={movies.id} className="material-icons "  color = { this.props.mymovies.includes(movies.id) ? styles.success : styles.fail}>
                                 favorite
                            </FontIcon>
                                
                           </IconButton>
                     </div>
                   </div>
        }
      )
  }

  </div>

  <div className="pagination">
    <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={888}
          totalItemsCount={this.state.results}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      
     </div> 
  </div>


</div>


    );
  }
}

export default SearchResults;
