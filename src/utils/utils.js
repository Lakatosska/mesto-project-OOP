export function setCards(item) {
  const card = new Card(item, ".template-card");
  card.generate();
  this.addItem(card);
}
