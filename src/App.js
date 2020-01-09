import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import About from "./components/pages/About";
import User from "./components/users/User";
import GithubState from "./context/github/GithubState";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      "https://api.github.com/search/users?q=kevinyohe"
    );
    console.log(res.data.items);

    console.log("mounted sic");
    this.setState({ users: res.data.items, loading: false });
  }
  // Github Search for users
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);

    console.log("mounted sic");
    this.setState({ users: res.data.items, loading: false }); //res.data.items.whatever?
    console.log(text);
  };

  // Get a single Github User
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  //clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //Set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading } = this.state;
    return (
      <GithubState>
        <Router>
          <div className='App'>
            <Navbar title='Github Finder'></Navbar>
            <div className='container'>
              <Alert alert={this.state.alert}></Alert>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={props => (
                    <Fragment>
                      <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                      />
                      <Users loading={loading} users={users}></Users>
                    </Fragment>
                  )}
                />
                <Route exact path='/about' component={About} />
                <Route
                  exact
                  path='/user/:login'
                  render={props => (
                    <User
                      {...props}
                      getUser={this.getUser}
                      user={user}
                      loading={loading}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    );
  }
}

export default App;
