/**
 * Enable asnc searches to be called from several places
 * TODO use a queue to do this
 */
class SearchUtils {
  /**
   * Constructor.
   *
   * @param items
   * @param filters
   * @param filter
   * @param headers
   */
  constructor(items, filters, filter, headers) {
    this.items = items;
    this.filter = filter;
    this.headers = headers;
    this.filters = filters;
    this.filterCallbacks = {};
  }

  /**
   * Updates filter values.
   * @param filters filter´s object
   * @param val JSON chunk to be updated.
   * @returns {*}
   */
  static updateFilters(filters, val) {
    return Object.assign({}, filters, val);
  }

  /**
   * Adds a new filter
   * @param filterName The name of the filter from which the information will be extracted
   * @param filterCallback The callback that will apply the filter.
   */
  registerFilter(filterName, filterCallback) {
    this.filterCallbacks[filterName] = filterCallback;
  }

  /**
   * Run all filters.
   * @returns {*}
   */
  runFilters() {
    const self = this;
    let filteredItems = self.items;

    Object.entries(this.filterCallbacks).forEach(([entity, cb]) => {
      filteredItems = cb.call(self, self.filters[entity], filteredItems);
    });

    return filteredItems;
  }
}

// Vue plugin.
const SearchUtilsPlugin = {
  install(Vue, options) {
    Vue.prototype.$SearchUtils = SearchUtils;
  }
};

export default SearchUtilsPlugin;
