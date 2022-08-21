import './headingCategory.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class HeadingCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {category, index, selectedIndex, setSelected, setActiveCategory} = this.props;

        return (
            <React.Fragment>
                <button className={`category ${index === selectedIndex ? 'active' : ''}`}
                    onClick={() => {
                        setSelected(index);
                        setActiveCategory(category);
                    }}>
                    {
                        category.name.toUpperCase()
                    }
                </button>
            </React.Fragment>
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
