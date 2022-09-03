import React from 'react';
import './fetchDataError.scss';
import serverError from '../../resources/serverError.png';

export default class FetchDataError extends React.Component {
    render() {
        return (
            <>
                <section className="fetchDataSection">
                    <img src={serverError} alt="Server error"/>
                    <div className="fetchDataCaption">
                        <h2>
                            Could`t fetch data
                        </h2>
                        <h2>
                            Try in later
                        </h2>
                    </div>
                </section>
            </>
        );
    }
}