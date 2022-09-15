import './itemAttribute.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default class ItemAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeValue: null
        };
    }

    _setSelectedValue = (e) => {
        this.setState({activeValue: e.target.value});
        if (!this.props.autoSelect) {
            this.props.setAttributeValue(e.target.value);
        }

    };

    _setCheckedValue = (elem) => {
        const {autoSelect, selectDefault, attributeData} = this.props;
        if (autoSelect) {
            return selectDefault.attributeId === attributeData.id && selectDefault.selectedValue === elem.value;
        }
        return elem.value === this.state.activeValue;
    };

    _getCheckBoxElem = (elem, style, selector, activeSelector) => {
        const {attributeData, itemId, disabled} = this.props;
        const condition = this._setCheckedValue(elem);

        return (
            <label
                className={`attributeItem ${selector} ${condition ? activeSelector : ''}`}
                style={style}
                key={elem.id}
            >
                <input type="radio" name={itemId + attributeData.id}
                       value={elem.value}
                       onChange={this._setSelectedValue}
                       checked={condition}
                       disabled={disabled}
                />
                <p>
                    {elem["displayValue"]}
                </p>
            </label>
        );
    };

    renderTextAttributes = () => {
        const {attributeData, textAttributeItemWidth, textAttributeItemHeight, textAttributeItemFontSize} = this.props;
        const style = {
            minWidth: textAttributeItemWidth,
            height: textAttributeItemHeight,
            fontSize: textAttributeItemFontSize
        };

        return attributeData.items.map((elem) => {
            return this._getCheckBoxElem(elem, style, 'typeText', 'typeTextActive');
        });
    };

    renderColorAttributes = () => {
        const {attributeData, colorAttributeItemWidth, colorAttributeItemHeight} = this.props;
        return attributeData.items.map((elem) => {
            const style = {
                backgroundColor: elem.value,
                width: colorAttributeItemWidth,
                height: colorAttributeItemHeight
            };
            return this._getCheckBoxElem(elem, style, 'typeColor', 'typeColorActive');
        });
    };

    renderAttributes = () => {
        if ("text") return this.renderTextAttributes();
        else if ("swatch") return this.renderColorAttributes();
    };

    render() {
        const {attributeData, labelUpperCase, labelFontSize, labelFontWeight, labelFontFamily} = this.props;
        const labelStyle = {
            fontSize: labelFontSize,
            fontWeight: labelFontWeight,
            fontFamily: labelFontFamily
        };

        return (
            <>
                <section className="attributeSection">
                        <h3 style={labelStyle}>
                            {
                                `${labelUpperCase ? attributeData.name.toUpperCase(): attributeData.name}:`
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
    labelFontSize: PropTypes.string,
    labelFontWeight: PropTypes.string,
    labelFontFamily: PropTypes.string,
    textAttributeItemWidth: PropTypes.string,
    textAttributeItemHeight: PropTypes.string,
    textAttributeItemFontSize: PropTypes.string,
    colorAttributeItemWidth: PropTypes.string,
    colorAttributeItemHeight: PropTypes.string,
    disabled: PropTypes.bool,
    autoSelect: PropTypes.bool,
    labelUpperCase: PropTypes.bool,
    setAttributeValue: PropTypes.func
};