import React from 'react';
import './errorBoundary.scss';
import PropTypes from 'prop-types';
import Error from '../../resources/Error.png';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return (
                <>
                    <section className="errorBoundarySection">
                        <img src={Error} alt="Error image"/>
                        <div className="errorBoundaryButtonSection">
                            <h2>
                                Something went wrong
                            </h2>
                            <button className={'greenButton'}
                                    onClick={() => window.location.reload()}>
                                RELOAD PAGE
                            </button>
                        </div>
                    </section>
                </>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element
};