import React,{ useEffect} from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function Posts(props) {
    const classes = useStyles();

    useEffect(()=> {
        if(props.selectedUser){
            axios.get(`https://jsonplaceholder.typicode.com/users/${props.selectedUser}/posts`)
            .then(response => {
                props.setUserPosts(response.data)
            })
        }
    },[props.selectedUser])
    
    useEffect(()=> {
        if(props.selectedPostId){
            axios.get(`https://jsonplaceholder.typicode.com/posts/${props.selectedPostId}/comments`)
            .then(response => {
                props.setPostComments(response.data)
            })
        }
    },[props.selectedPostId])

    
    return(
        (props.selectedUser && props.posts) ? (
        <Grid container>
                        <Typography alignContent="center" gutterBottom variant="h5" component="h2">
                                                {"User Posts"}
                        </Typography>
            { props.posts && props.posts.map(post => {
                return(
                    <>
                        <Grid style={{"margin": "5px 0px"}} item xs={12} lg={12} key={post.id}>
                            <Card m={3}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                                {post.title}
                                    </Typography>
                                            <p>
                                                {post.body}
                                            </p>
                                </CardContent>
                                <CardActions alignContent="flex-end" justify='flex-end'>
                                    <button onClick={() => props.setSelectedPost(post.id)}>Show Comments</button>
                                    <button onClick={() => (console.log("props coments"),props.setPostComments([]),props.setSelectedPost(''))}>Hidde Comments</button>
                                </CardActions>
                            </Card>
                        </Grid>
                        { props.postComments && props.postComments.map(comment => {
                            return (
                                (comment.postId === post.id) ?
                             (
                                <Grid style={{"margin": "5px 0px"}} item xs={12} lg={12} key={comment.id}>
                                    <p style={{"margin": "5px 5px 5px 25px", "fontSize":"12px", "color":"#666666"}}>
                                        {comment.body} > <strong>Name:</strong> {comment.name} - <strong>Email:</strong> {comment.email}
                                    </p>
            
                                </Grid>
                             ) : null
                            )
                            
                        }) }
                    </>
                )
            }
            ) }
        </Grid>) : null

        
    )
}

const mapStateToProps = state => ({
    selectedUser: state.selectedUser,
    selectedPostId: state.selectedPostId,
    posts: state.posts,
    postComments: state.postComments
})
const mapDispatchToProps = dispatch => ({
    setUserPosts(posts){
        dispatch({
            type: 'SET_POSTS',
            posts
        })
    },
    setSelectedPost(postId){
        dispatch({
            type: 'SELECT_POST',
            postId
        })
    },
    setPostComments(comments){
        dispatch({
            type: 'SET_POSTS_COMMENTS',
            comments
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);