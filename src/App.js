import '../src/App.scss';
import store from './store'
import { Provider } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Users from './components/Users';
import Posts from './components/Posts';


const useStyles = makeStyles({
  title: {
   textAlign: 'center',
   fontSize: '30px',
   fontFamily: 'Tahoma',
  },
  container: {
    backgroundColor: '#efefef'
  }
 
});

function App(props) {
  const classes = useStyles();

  return (
    <Provider store={ store }>
      <Grid container className={classes.container}>
        <Grid item md={12}>
          <h1 className={classes.title}>Geduca Test</h1>
        </Grid>
        <Grid item md={12} mb={5} p={3}>
          <Users/>
          <Posts/>
        </Grid>
      </Grid>
    </Provider>
  );
}

export default App;
