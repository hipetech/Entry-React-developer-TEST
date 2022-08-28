import './itemAttribute.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class ItemAttribute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValue: null
        };
    }

    _setSelectedValue = (e) => {
        this.setState({selectedValue: e.target.value});
    };

    _setCheckedValue = (elem) => {
        const {autoSelect, selectDefault, attributeData} = this.props;
        if (autoSelect) {
            return selectDefault.attributeId === attributeData.id && selectDefault.selectedValue === elem.value;
        }
        return elem.value === this.state.selectedValue;
    };

    checkBoxElem = (elem, style, selector, activeSelector) => {
        const {attributeData, itemId, disabled} = this.props;
        const condition = this._setCheckedValue(elem);

        return (
            <label
                className={`attributeItem ${selector} ${condition ? activeSelector : ''}`}
                style={style}
                key={elem.id}
            >
                <input type="radio" name={itemId + attributeData.id} value={elem.value}
                       onChange={this._setSelectedValue}
                       checked={condition}
                       disabled={disabled}
                />
                <p>
                    {elem.displayValue}
                </p>
            </label>
        );
    };

    _renderTextAttributes = () => {
        const {attributeData, textAttributeItemWidth, textAttributeItemHeight, textAttributeItemFontSize} = this.props;
        const style = {
            minWidth: textAttributeItemWidth,
            height: textAttributeItemHeight,
            fontSize: textAttributeItemFontSize
        };

        return attributeData.items.map((elem) => {
            return this.checkBoxElem(elem, style, 'typeText', 'typeTextActive');
        });
    };

    _renderColorAttributes = () => {
        const {attributeData, colorAttributeItemWidth, colorAttributeItemHeight} = this.props;
        return attributeData.items.map((elem) => {
            const style = {
                backgroundColor: elem.value,
                width: colorAttributeItemWidth,
                height: colorAttributeItemHeight
            };
            return this.checkBoxElem(elem, style, 'typeColor', 'typeColorActive');
        });
    };

    renderAttributes = () => {
        switch (this.props.attributeData.type) {
            case 'text':
                return this._renderTextAttributes();
            case 'swatch':
                return this._renderColorAttributes();
        }
    };

    render() {
        const {attributeData} = this.props;

        return (
            <>
                <section className="attributeSection">
                    <h3>
                        {
                            `${attributeData.name}:`
                        }
                    </h3>
                    <div className="attributeItems">
                        {
                            this.renderAttributes()
                        }
                    </div>
                </section>
            </>
        );
    }
}

ItemAttribute.propTypes = {
    attributeData: PropTypes.object,
    itemId: PropTypes.string,
    selectDefault: PropTypes.object,
    textAttributeItemWidth: PropTypes.string,
    textAttributeItemHeight: PropTypes.string,
    textAttributeItemFontSize: PropTypes.string,
    colorAttributeItemWidth: PropTypes.string,
    colorAttributeItemHeight: PropTypes.string,
    disabled: PropTypes.bool,
    autoSelect: PropTypes.bool
};