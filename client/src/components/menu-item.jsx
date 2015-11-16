"use strict";

import * as React from "react/addons";
import * as styler from "classnames";

import * as hasValue from "../utils/hasValue";

export const MenuItem = React.createClass({
    displayName: "MenuItem",

    propTypes: {
        depth: React.PropTypes.number.isRequired,
        getSubmenu: React.PropTypes.func.isRequired,
        isActive: React.PropTypes.bool.isRequired,
        isFavorite: React.PropTypes.bool.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        magic: React.PropTypes.bool.isRequired,
        onFavorite: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        url: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {favorite: false};
    },

    getCount() {
        const count = this.props.tag.count;
        const doneCount = this.props.tag.doneCount;
        const todoCount = count - doneCount;
        const showDifference = todoCount !== count && todoCount !== 0;

        return showDifference ? `${todoCount} / ${count}` : count;
    },

    getTitle() {
        const label = this.props.tag.label;
        const count = this.props.tag.count;
        const doneCount = this.props.tag.doneCount;
        const todoCount = count - doneCount;

        const options = {
            label: label,
            todoCount: todoCount,
            smart_count: doneCount //eslint-disable-line camelcase
        };
        return t("tag title", options);
    },

    onFavorite(event) {
        event.preventDefault();
        this.props.onFavorite();
    },

    render() {
        const label = this.props.tag.label;
        const canBeFav = hasValue(this.props.onFavorite) &&
                         this.props.depth === 0;

        const classNames = styler({
            "menu-tag": true,
            "active": this.props.isActive,
            "selected": this.props.isSelected,
            "magic": this.props.magic
        });

        const linkStyle = {paddingLeft: (this.props.depth + 1) * 20};
        const linkClasses = styler({
            "favorite": canBeFav && this.props.tag.isFavorite
        });

        const submenuBlock = this.props.getSubmenu(this.props.depth + 1);

        let favoriteBlock = null;
        if(canBeFav) {
            favoriteBlock = (
                <i className="fa fa-star" onClick={this.onFavorite} />
            );
        }

        return (
            <li className={classNames}>
                <a className={linkClasses} href={this.props.url}
                   style={linkStyle} title={this.getTitle()}>
                    <i className="fa fa-tag" />
                    <span>`${label} (${this.getCount()})`</span>
                    {favoriteBlock}
                </a>
                {submenuBlock}
            </li>
        );
    }
});