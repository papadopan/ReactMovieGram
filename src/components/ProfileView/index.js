import React,{Component} from 'react'
import './ProfileView.css'
import StarRatingComponent from 'react-star-rating-component'
import FontAwesome from 'react-fontawesome'
import firebase from '../../firebase'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import SelectField from 'material-ui/SelectField'
import loader from "../../assets/loader.gif"
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'




class ProfileView extends Component{

  constructor(props)
  {
    super(props);
    this.state={
      data:[],
      MyMovies:[],
      rating: 1,
      internet:[],
      modal_comments:[],
      open:false,
      genres:[],
      all_movies_genres:[]
      
    }
  }
  
componentDidMount(){

  this.setState({isLoaderOn:true})

  const itemsRef = firebase.database().ref('movies_list')
    itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let movies = []
    let tags =[]
    
    
    for (let item in items)
    {
      movies.push(items[item])

    }
    for (let item in items)
    {
      if(items[item].tag === "all")
        continue
        
      if(!tags.includes(items[item].tag))
      {
        tags.push(items[item].tag)
      }
    }
    
    function compare(a,b) {
      if (a.stars < b.stars)
        return 1;
      if (a.stars > b.stars)
        return -1;
      return 0;
    }
    movies.sort(compare);
    
    this.setState({
      internet:[],
      all_movies:[],
      time : 0,
      tags : tags
    })

    
    movies.map(movie =>
    {
      return      fetch('https://api.themoviedb.org/3/movie/'+movie.data+'?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
                  .then(response=> response.json())
                  .then(response=>{
                    var d = {
                      title :response.title,
                      id: response.id,
                      date: response.release_date,
                      path : response.poster_path,
                      stars: movie.stars,
                      firebase_id : movie.uid,
                      time : response.runtime,
                      comments : movie.comments,
                      tag : movie.tag,
                      genre: response.genres
                    }
                    var movie_genres = this.state.genres.slice()
                    var all = this.state.internet.slice();
                    var t = this.state.time + d.time;
                  
                    all.push(d)
                    movie_genres.push(d.genre)

                    this.setState({
                      internet:all,
                      all_movies: all,
                      time:t,
                      genres:movie_genres
                    })

                    this.updategenre()
                  })
                  .catch(error=> console.log("error"))
                })

    
    });

    this.setState({isLoaderOn:false})

    
}

updategenre = () =>
{
  var all_genres = []
  this.state.genres.map( genre=>
  {
    genre.map( every=>{
      all_genres.push(every.name)
    })
  })

  var max = -1;
  var max_element = ""
  

  for (var i =0 ; i< all_genres.length ; i++)
  {
    var count=0;
    for( var j=i ; j < all_genres.length ; j++)
    {
      if(all_genres[i] === all_genres[j])
        count++
      if( max < count)
      {
        max =count
        max_element = all_genres[i]
      }

    }
  }

this.updateMaxElement(max_element)

}
updateMaxElement = (element) =>
{
  this.setState({
    max_element : element
  })
}

onDragStart = (e) => 
{
  
  this.setState({
    transfer_id : e.target.id
  })

}
onDragOver = (e) =>
{
    e.preventDefault();
}
onDrop = (e) =>
{
  e.preventDefault();
  this.props.deleted_id(this.state.transfer_id)
  
}

onStarClick(nextValue, prevValue, name) 
{
  firebase.database().ref('movies_list/'+ name).update({stars : nextValue})
}
addComments = (e , comments) =>
{
  this.setState({
    modal_comments : comments,
    modal_id : e.target.id,
    modal_title: e.target.title
  })
  

}
handleCommentInput = (e)=>
{
  this.setState({
    new_comment : e.target.value
  })
}
saveComment = () =>
{
  if(this.state.new_comment === "" || this.state.new_comment=== " ")
  {

  }
  else
  {
    var new_comments = this.state.modal_comments.slice()
    new_comments.push(this.state.new_comment)
  
    firebase.database().ref('movies_list/'+ this.state.modal_id).update({comments : new_comments})
  }
}
commentTrash = (e)=>
{
  var com = this.state.modal_comments.slice()

  if( e.target.id>0 && e.target.id < com.length)
  {
    com.splice(e.target.id , 1)
  }
  

  this.setState({
    modal_comments: com
  })

  firebase.database().ref('movies_list/'+ this.state.modal_id).update({comments : com})
}
handleTagInput = (e)=>
{
  
  this.setState({
    new_tag : e.target.value
  })


}
handleTagClick = (e) =>
{
  e.preventDefault();
  this.setState({
    open:false
  })
  firebase.database().ref('movies_list/'+ this.state.tag_movie).update({tag : this.state.new_tag})  
}

handleClick = (event , id) => {
  // This prevents ghost click.
  event.preventDefault();

  this.setState({
    open: true,
    anchorEl: event.currentTarget,
    tag_movie : id
  })
  
};

handleListTag =(name) =>
{
  this.setState({
    open:false
  })
  firebase.database().ref('movies_list/'+ this.state.tag_movie).update({tag : name})  

}

handleRequestClose = () => {
  this.setState({
    open: false,
  });
};
handleFilter = (tag) =>
{
  let filtered = []
  let time =0

  if ( tag === "all")
  {
    this.setState({
      internet:this.state.all_movies
    })
    for (let i=0 ; i< this.state.all_movies.length ; i++)
    {
      time += this.state.all_movies[i].time
    }
    this.setState({
      time:time
    })
  }
  else
  {
    for (let i =0 ; i< this.state.all_movies.length ; i++)
    {
      if( this.state.all_movies[i].tag === tag)
        filtered.push(this.state.all_movies[i])
    }
    

    for (let i=0; i< filtered.length ; i++)
    {
      time += filtered[i].time
    }
    this.setState({
      internet : filtered,
      time:time
    })

  }
}
mobile_delete = (e) =>
{
  e.preventDefault();
  this.props.deleted_id(e.target.id)
}

  render()
  {
    
    const styles = {
      floatingLabelStyle: {
        color: "#818181",
        borderColor: "#962A38"
      },
      floatingLabelFocusStyle: {
        color: "#962A38",
        textAlign: "center"
      },
      add:{
        border: "1px solid #962A38",
      },
      white:{
        color: "#FFFFFF"
      },
      tagFocusStyle: {
        color: "#141414",
        borderColor:"#141414",
        textAlign: "center"
      }
    }
    return (
      <div className="personal">
          <div className="timeline">          
              <div className="timeline_title">
                <p>My Profile</p>
              </div>

              <div className="personal_stats">
                <div className="watch_time">
                <div>
                    <p className="small">favourite genre</p>
                    <p className="big">{this.state.internet.length === 0 ? "wait to add" : this.state.max_element}</p>
                  </div>
                </div>
                <div className="favourite_genre">
                <div>
                    <p className="small">watch time</p>
                    <p className="big">{this.state.time} min</p>
                  </div>
                </div>
                <div className="movies_count">
                  <div>
                    <p className="small">movies</p>
                    <p className="big">#{this.state.internet.length}</p>
                  </div>
                </div>
              </div>

          </div>
          <div className="selection_div">
            <div>
            <SelectField
                floatingLabelText=" t a g s"
                value={this.state.value}
                floatingLabelStyle={{
                  color:"#962A38"          
                }}
                listStyle={{
                  background:"#962A38",          
                }}
            >

                  <MenuItem 
                    value={-1} 
                    primaryText="all" 
                    onClick={() =>this.handleFilter("all")}
                    />
                  {
                    this.state.tags === undefined ? "" :
                  this.state.tags.map( (tag , index)  =>
                  {
                      return <MenuItem 
                                key={index} 
                                value={index} 
                                primaryText={tag} 
                                onClick={() =>this.handleFilter(tag)}
                                />
                    })
                  }

            </SelectField>
            </div>
          </div>
          <div className="tabs">
             <div className="mymovies">
             <div className={this.state.isLoaderOn ? "loader showing" :"loader hiding"}>
                 <img src={loader} alt="loader"  />
               </div>
                    {
                      this.state.internet.map(movie =>
                      {
                        return        <div 
                                            key={movie.id}
                                            className="box1" 
                                            draggable
                                            onDragStart ={(e ) => this.onDragStart(e)}
                                            title= {movie.title}
                                            onDragOver = { (e) => this.onDragOver(e)}
                                            >
                                            <img src={`http://image.tmdb.org/t/p/w185/${movie.path}`} id={movie.id} title={movie.title} className="movie_poster" alt="poster"/>
                                            <div className="stars" >
                                              <StarRatingComponent                                               
                                                name={movie.firebase_id} 
                                                starCount={5}
                                                value={movie.stars}
                                                onStarClick={this.onStarClick.bind(this)}
                                                starColor="#962A38"
                                                editing={true}
                                                />
                                              
                                              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id={movie.firebase_id} title={movie.title} onClick={(e) =>this.addComments(e , movie.comments)}>Comments</button>
                                            </div>
                                            <p className="tag_text">tag: {movie.tag}</p>
                                            <div className="delete_movie">
                                              <IconButton 
                                              onClick={(e)=>this.mobile_delete(e)} 
                                              >
                                                <FontIcon id={movie.id}color="#962A38" className="material-icons ">
                                                    delete
                                                </FontIcon>
                                                
                                              </IconButton>
                                               </div>
                                            <div className="tag_button">
                                                <RaisedButton
                                                    id={movie.title}
                                                    onClick={(event) =>this.handleClick(event , movie.firebase_id)}
                                                    label="tags +"
                                                    buttonStyle={{
                                                    background:"#962A38"
                                                    }}
                                                  />
                                              
                                                  <Popover
                                                    open={this.state.open}
                                                    anchorEl={this.state.anchorEl}
                                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                    onRequestClose={this.handleRequestClose}
                                                    animated={true}
                                                    style={{
                                                      background:"#962A38"
                                                    }}

                                                  >
                                                  <p className="tag_list"> List of tags</p>
                                                  <Divider key={movie.firebase_id} />
                                                    <Menu
                                                      disableAutoFocus={true}

                                                    >
                                                    <MenuItem  primaryText="all" onClick={() => this.handleListTag("all")}/>
                                                      {
                                                        this.state.tags.map( (tag , index) =>
                                                        {
                                                          return <MenuItem key={index} primaryText={tag} onClick={() => this.handleListTag(tag)}/>
                                                        })
                                                      }
                                                    </Menu>
                                                    <Divider key={movie.id} />
                                                    <TextField
                                                      floatingLabelText="add a new tag . . ."
                                                      floatingLabelStyle={styles.floatingLabelStyle}
                                                      floatingLabelFocusStyle={styles.tagFocusStyle}
                                                      underlineFocusStyle={styles.tagFocusStyle}
                                                      inputStyle={styles.tagFocusStyle}
                                                      onChange = {this.handleTagInput}
                                                      
                                                    />
                                                     <button type="button" className="btn add_tag_button"  onClick={(e) =>this.handleTagClick(e)}>a d d</button>
                                                     
                                                  </Popover>
                                                </div>
                                       </div>
                      })
                    }


                    </div>
          </div>
          <div
           className="trash"
           onDragOver = { (e) => this.onDragOver(e)}
           onDrop = { (e) => this.onDrop( e)}
           >
                    <div>
                      <FontAwesome
                        className="far fa-trash-alt"
                        size="2x"
                        name="trash"
                      />
                    </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">  {this.state.modal_title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                {
                  this.state.modal_comments.map( (comment , index)=>
                  {
                    return <div className={index === 0   ? " none " : "comment_boxes block"} key={index} >
                             <p >{comment}</p>
                             <div className="trash_icon">
                               <IconButton 
                                 onClick={(e)=>this.commentTrash(e)} 
                                 id={index}
                                 >
                                    <FontIcon id={index} color="#962A38" className="material-icons ">
                                        delete
                                    </FontIcon>                    
                                 </IconButton>
                              </div>
                             {/* <button  className={index === 0 ? " none " : " trash_icon block  "} id={index} onClick={(e) => this.commentTrash(e)}>
                                <FontAwesome
                                    className="far fa-trash-alt"
                                    name="comment_trash"
                                    id={index} 
                                  />
                             </button> */}
                            </div>
                  })
                }
                  
                </div>
                <div className="modal-footer">
                 <div className="modal_form">
                    <TextField
                        floatingLabelText=" add a comment . . . "  
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.floatingLabelStyle}
                        inputStyle={styles.floatingLabelFocusStyle}
                        onChange = {this.handleCommentInput}
                      />
                      <div className="modal_buttons">
                        <RaisedButton label="e x i t" data-dismiss="modal"  backgroundColor="#962A38"/>
                        <RaisedButton label="a d d"  onClick={this.saveComment} buttonStyle={styles.add} data-dismiss="modal" backgroundColor="#141414" labelStyle={styles.white}/>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</div>
    );
  }
}


export default ProfileView
