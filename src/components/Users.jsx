import React,{useEffect} from 'react';
import axios from 'axios';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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

function Users(props) {
    const classes = useStyles();

    {console.log("LOS PROPSSSSS",props)}
    useEffect(()=> {
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then(response => {
            props.setUsers(response.data)
        })
    },[])
    return(
        <Grid container>
            {props.users && props.users.map(user => {
                    return(
                            <Grid style={{"margin": "5px", "cursor": "pointer"}} item lg={2} m={2} key={user.id} onClick={() => props.setSelectedUser(user.id)}>
                                <Card m={3}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {user.name}
                                        </Typography>
                                            <p><strong>Email:</strong> {user.email}</p>
                                            <p><strong>Address:</strong> {user.address?.street}</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                    )
                })}
        </Grid>
    )
}

const mapStateToProps = state => ({
    users: state.users,
    selectedUser: state.selectUser
})
const mapDispatchToProps = dispatch => ({
    setUsers(users){
        dispatch({
            type: 'SET_USERS',
            users
        })
    },
    setSelectedUser(userId){
        dispatch({
            type: 'SET_SELECTED',
            userId
        })
    },
  
   
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);