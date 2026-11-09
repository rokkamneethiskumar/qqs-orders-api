let orders = [
    { id: 1, item: 'Laptop', quantity: 2 },
    { id: 2, item: 'Keyboard', quantity: 5 }
  ];
  
  function list() {
    return orders;
  }
  
  function create(order) {
    const newOrder = {
      id: orders.length + 1,
      ...order
    };
  
    orders.push(newOrder);
    return newOrder;
  }
  
  module.exports = { list, create };