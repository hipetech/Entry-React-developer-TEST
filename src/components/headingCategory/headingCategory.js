import './headingCategory.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class HeadingCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, index, selectedIndex, setSelected} = this.props;

        return (
            <React.Fragment>
                <button className={`category ${index === selectedIndex ? 'active' : ''}`}
                    onClick={() => setSelected(index)}>
                    {
                        name
                    }
                </button>
            </React.Fragment>
        );
    }
}

HeadingCategory.propTypes = {
    name: PropTypes.string,
    index: PropTypes.number,
    selectedIndex: PropTypes.number,
    setSelected: PropTypes.func
};
