import React from 'react';
import PropTypes from 'prop-types';
import { findWhere as _findWhere } from 'underscore';

import BookCover from '../BookCover/BookCover.jsx';
import BookListItem from '../Isotopes/BookListItem.jsx';
import appConfig from '../../../../appConfig.js';

import {
  titleAuthorShortener,
  createDate,
  createEncoreLink,
  mapLanguageCode,
} from '../../utils/utils.js';

const { appFilters, itemTitleLength } = appConfig;
const formatData = appFilters.formatData.data;

class CatalogItems extends React.Component {
  render() {
    const bookCoverItems = this.props.items || [];

    if (bookCoverItems.length === 0) {
      return (
        <div className="catalogItem noResults">
          <p aria-label="No items found.">No items found with the selected filters.</p>
        </div>
      );
    }

    const books = bookCoverItems.map((element, i) => {
      const langCode = mapLanguageCode(element.language);
      const target = createEncoreLink(element.bibNumber);
      const {
        title,
        author,
      } = titleAuthorShortener(element.title, element.author, itemTitleLength);
      const bookCover = (
        <BookCover
          imgSrc={element.imageUrl[0] ? element.imageUrl[0] : undefined}
          id={element.bibNumber}
          name={title}
          ref={`item-${i}`}
          author={author}
          format={element.format}
          target={target}
          genre={element.genres ? element.genres[0] : ''}
          linkClass="item"
          simple={false}
          displayType={this.props.displayType}
          lang={langCode.code}
        />
      );
      const simpleBookCover = (
        <BookCover
          imgSrc={element.imageUrl[0] ? element.imageUrl[0] : undefined}
          id={element.bibNumber}
          name={title}
          target={target}
          format={element.format}
          linkClass="item"
          displayType={this.props.displayType}
          lang={langCode.code}
          tab={false}
        />
      );
      const format = _findWhere(formatData, { id: element.format });
      const formatLabel = format ? `${format.label}` : '';
      const publishYear = element.publishYear ? `, ${element.publishYear}` : '';
      const date = createDate(element.createdDate);
      const bookListItem = (
        <BookListItem
          bookCover={simpleBookCover}
          title={element.title}
          target={target}
          ref={`item-${i}`}
          author={element.author}
          format={formatLabel}
          publishYear={publishYear}
          callNumber={element.callNumber}
          description={element.description}
          date={date}
          lang={langCode.code}
        />
      );

      return (
        <li key={i} className={`catalogItem ${this.props.displayType}`}>
          {this.props.displayType === 'grid' ? bookCover : bookListItem}
        </li>
      );
    });

    return (<ul className="catalogItems">{books}</ul>);
  }
}

CatalogItems.propTypes = {
  items: PropTypes.array,
  displayType: PropTypes.string,
};

export default CatalogItems;
