import './headingCategory.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class HeadingCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {category, index, selectedIndex, setSelected, setActiveCategory} = this.props;

        return (
            <Link to={'/'}>
                <button className={`category ${index === selectedIndex ? 'active' : ''}`}
                        onClick={() => {
                            setSelected(index);
                            setActiveCategory(category);
                        }}>
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
