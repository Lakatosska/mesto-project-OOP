export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(item => {
    this.addItem(item);
  })
}

  addItem(item, prepend) {
    const card = this._renderer(item);

    if (prepend) {
      this._container.prepend(card);
    } else {
    this._container.append(card);
    }
  }
}
