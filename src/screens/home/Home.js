import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import { Typography, FormControl, InputLabel, Input, Button, GridListTile } from '@material-ui/core';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

/**
 * Home page
 * @Author Sundar Srinivasan
 */

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    gridListMain: {
        transform: 'translateZ(0)',
    },
    card: {
      maxWidth: 560,
      margin: 10,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    title: {
        fontWeight: 'strong',
        color: 'red',
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginRight: -8,
      },
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  });

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userImages: [],
            likes: 0,
            likeIcon: <FavoriteBorder />,
            comments: ""
        }
    }
    
    //Using Fetch with async and await to get json data
    async componentDidMount() {
        const response = await fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=9204272757.f8594e7.25756c2b57804b6b8b1cb08b48e45566`);
        const json = await response.json();
        this.setState({ userImages: json.data});
    }

    likesClickHandler = () => {
        this.setState({likes: 1});
        this.setState({likeIcon: <Favorite color="secondary"/>})
    }

    commentAddHandler = (e) => {
        this.setState({comments: e})
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.userImages);

        return (
            <div>
                <Header />
                <div className="main-body-container">
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={2}>
                        {this.state.userImages.map(userImages => (
                            <GridListTile>
                                <Card key={userImages.id} className="image-post">
                                    <CardHeader className="card-header"
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                            <img src={userImages.user.profile_picture} alt={userImages.user.username}/>
                                            </Avatar>
                                        }
                                        title={userImages.user.username}
                                        subheader={new Date(userImages.created_time * 1000).toLocaleString()}
                                        />
                                    <CardContent>
                                        <img src={userImages.images.standard_resolution.url} />
                                        <hr />
                                        <Typography>
                                            <p>{userImages.caption.text}</p>
                                            {userImages.tags.map(tags =>(
                                                <span className="tags">#{tags} </span>
                                            ))}
                                        </Typography>
                                        <div onClick={() => this.likesClickHandler()}>
                                                {this.state.likeIcon}
                                                {userImages.likes.count + this.state.likes}   likes
                                        </div>
                                        <div>
                                            <p>
                                                <b>{userImages.user.username}: </b> {this.state.comments}
                                            </p>
                                        </div>
                                        <div>
                                            <FormControl>
                                                <InputLabel htmlFor="addAComment">Add a Comment</InputLabel>
                                                <Input id="addAComment" />
                                            </FormControl>
                                            <FormControl>
                                                <Button variant="contained" color="primary" onClick={() => this.commentAddHandler(document.getElementById('addAComment').value)}>
                                                    ADD
                                                </Button>
                                            </FormControl>
                                        </div>                               
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>                    
                </div>
            </div>
        )
    } 
}


export default withStyles(styles)(Home);