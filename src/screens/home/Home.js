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
        }
    }
        
    async componentWillMount() {
        const response = await fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=9204272757.f8594e7.25756c2b57804b6b8b1cb08b48e45566`);
        const json = await response.json();
        this.setState({ userImages: json.data});
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
                                <Card className="image-post">
                                    <CardHeader 
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                            <img src={userImages.user.profile_picture} alt={userImages.user.username}/>
                                            </Avatar>
                                        }
                                        title={userImages.user.username}
                                        subheader={new Date(userImages.created_time).toDateString()}
                                    />
                                    <CardContent className="image-post-image">
                                        <img width="540px" height="540px" src={userImages.images.standard_resolution.url} />
                                        <hr />
                                        <Typography>
                                            <p>{"userImages.caption.text"}</p>
                                            {/* {this.state.imageTags.map(tag => (
                                                <p>{tag + " "}</p>
                                            ))} */}
                                        </Typography>
                                        <div>
                                            <p>
                                                <FavoriteBorder />
                                                {userImages.likes.count}  likes
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <b>{userImages.user.username}: </b>Whatever Comment
                                            </p>
                                        </div>
                                        <div>
                                            <FormControl>
                                                <InputLabel htmlFor="addAComment">Add a Comment</InputLabel>
                                                <Input id="addAComment" />
                                            </FormControl>
                                            <FormControl>
                                                <Button variant="contained" color="primary">
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