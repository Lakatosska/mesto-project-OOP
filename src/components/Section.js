export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  addItem(element, prepend) {
    if (prepend) {
      this._container.prepend(element);
    } else {
    this._container.append(element);
    }
  }
}
