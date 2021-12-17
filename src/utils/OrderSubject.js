/**
 * Class OrderSubject
 * @author Federico Garofalo <federico.garofalo@checkbox.ar>
 */
class OrderSubject {
  observers = [];
  beers = JSON.parse(localStorage.getItem('orderedBeers')) || [];

  /**
   * Attach new observer.
   * @param {func} observer observer
   */
  attach(observer) {
    this.observers.push(observer);
  }

  /**
   * Remove observer.
   * @param {func} observerToRemove observer
   */
  detach(observerToRemove) {
    this.observers = this.observers.filter(observer => observerToRemove !== observer);
  }

  /**
   * Update order.
   * @param {Array} beers ordered beers
   */
  updateOrder(beers) {
    this.beers = beers;
    localStorage.setItem('orderedBeers', JSON.stringify(beers));
    this.notify(beers);
  }

  /**
   * Notify observers that order changed.
   * @param {Array} beers ordered beers
   */
  notify(beers) {
    this.observers.forEach(observer => observer(beers));
  }
}

const orderSubject = new OrderSubject();

export default orderSubject;
