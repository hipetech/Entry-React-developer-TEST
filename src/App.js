import './App.scss';
import React from 'react';
import Heading from './components/heading/heading';
import GraphQlService from './services/graphQlService';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.service = new GraphQlService();
    }

    componentDidMount() {
        this.service.getCategories()
            .then(res => this.setState({categories: res.categories}))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <>
                <div className="contentBox">
                    <Heading categories={this.state.categories}/>
                </div>
            </>
        );
    }
}
