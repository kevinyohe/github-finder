import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom';

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login); //login is the route variable
        console.log(this.props.match.params.login)
    }
    
    
    render() {
        const { 
            name,
            avatar_url,
            location,
            bio,
            blog,
            login, 
            html_url, 
            follwers,
            following, 
            public_repos,
            public_gists, 
            hireable } = this.props.user;

        const { loading } = this.props;

        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
                Hireable: {' '}
        {hireable ? <i className="fas fa-check text-success" /> : <i className="fa fa-check text-danger" /> }

                
            </Fragment>
        )
    }
}

export default User
