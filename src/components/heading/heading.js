import './heading.scss';
import React from 'react';
import PropTypes from 'prop-types';
import HeadingCategory from '../headingCategory/headingCategory';
import Logo from '../../resources/logo transparent.png';
import CurrencyLogo from '../../resources/CurrencyLogo.png';
import Cart from '../../resources/Empty Cart.png';

export default class Heading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0
        };
    }

    _setSelected = (index) => {
        this.setState({selectedIndex: index});
    };

    renderCategories = () => {
        return this.props.categories.map((elem, index) => <HeadingCategory name={elem.name.toUpperCase()}
            key={index}
            index={index}
            selectedIndex={this.state.selectedIndex}
            setSelected={this._setSelected}/>);
    };

    render() {
        return (
            <>
                <header className={'heading'}>
                    <nav className={'categories'}>
                        {
                            this.renderCategories()
                        }
                        <div className="dot"></div>
                    </nav>
                    <img src={Logo} alt="Logo" className="logo"/>
                    <section className="actions">
                        <button className={'currency'}>
                            <img src={CurrencyLogo} alt="Currency Logo"/>
                        </button>
                        <button className={'cart'}>
                            <img src={Cart} alt="Cart"/>
                        </button>
                    </section>
                </header>
            </>
        );
    }
}

Heading.propTypes = {
    categories: PropTypes.array
};