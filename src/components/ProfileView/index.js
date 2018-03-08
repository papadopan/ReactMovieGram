import React,{Component} from 'react'
import './ProfileView.css'
import antonios from "../../assets/antonios.jpg"
import left from "../../assets/long-left.svg"
import { Link } from 'react-router-dom'



class ProfileView extends Component{

  constructor(props)
  {
    super(props);
    this.state={
      data:[]
    }
  }


componentDidMount(){
  this.setState({isLoaderOn:true})
  this.fetchMyMovies();
}
fetchMyMovies()
{

        this.props.movies.map(movie=>{
            return fetch('https://api.themoviedb.org/3/movie/'+movie+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
            .then(response=> response.json())
            .then(response =>{
              const data = this.state.data.slice()
              data.push(response)
              this.setState({
                data
              })
            })
            .catch(error=> console.log("error"))

      })
}


  render()
  {
    return (
      <div className="personal">
          <div className="go_back">
              <Link to ="/results"><img src={left} alt="arrow" /></Link>
          </div>
          <div className="timeline">
            <div className="personal_infos">
              <img src={antonios} alt="profile"/>
              <p>Papadopoulos Antonios</p>
              <p>25 years old</p>
              <span>#{this.props.movies.length} movies</span>
              <p>"I have passion with horror movies"</p>
            </div>
          </div>
          <div className="mymovies">

              {
                this.state.data.map(({ title, id, release_date, poster_path }) =>
                {
                  return                     <div className="box" key={`movie-${id}`}>
                                                    <img src={`http://image.tmdb.org/t/p/w185/${poster_path}`} alt="poster"/>
                                                    <div className="overlay">
                                                        <div>
                                                            <p className="overlay_title">{title}</p>
                                                            <p className="overlay_date"> {release_date}</p>
                                                        </div>
                                                      </div>
                                                  </div>
                })
              }


          </div>


</div>
    );
  }
}


export default ProfileView
