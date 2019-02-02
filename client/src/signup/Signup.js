import React, { Component } from 'react';
import axios from 'axios'

class signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Sky',
            password: 'Griffin24',
            department: 'sales'
        };
    }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="username" >Username</label>
                <input name='username' value={this.state.username} onChange={this.handleInputChange} type="text" /></div>
            <div><label htmlFor="password">Password</label>
                <input name='password' value={this.state.password} onChange={this.handleInputChange} type="password" />
            </div>
            <div><label htmlFor="department">Department</label>
            <input name='department' value={this.state.department} onChange={this.handleInputChange} type="department" />
            </div>
            <div>
                <button type="submit">Sign in</button>
            </div>
        </form>

    );
}
handleInputChange = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value})
}

handleSubmit = event => {
    event.preventDefault();

    const endpoint = 'http://localhost:3300/api/register';
    console.log(this.state)

    axios.post(endpoint, this.state)

        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            console.log(res.data);
        }).catch(err => {
            console.error('ERROR', err);
        })
}

}



export default signup;