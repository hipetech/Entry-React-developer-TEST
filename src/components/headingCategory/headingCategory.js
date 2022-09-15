import './headingCategory.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class HeadingCategory extends React.Component {
    _setCategory = () => {
        const {setSelected, setActiveCategory, index, category} = this.props;

        setSelected(index);
        setActiveCategory(category);
    };

    render() {
        const {category, index, selectedIndex} = this.props;

        return (
            <Link to={'/'}>
                <button className={`category ${index === selectedIndex ? 'active' : ''}`}
                        onClick={this._setCategory}>
                    {
                        category.name.toUpperCase()
                    }
                </button>
            </Link>
        );
    }
}

HeadingCategory.propTypes = {
    category: PropTypes.object,
    index: PropTypes.number,
    selectedIndex: PropTypes.number,
    setActiveCategory: PropTypes.func,
    setSelected: PropTypes.func
};
