const Product = require('../models/product');
const taxConfig = require('../config/tax');

exports.disableProducts = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { isActive: false }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

// calculate order tax amount
exports.caculateTaxAmount = order => {
  const taxRate = taxConfig.stateTaxRate;

  order.totalTax = 0;

  if (order.products && order.products.length > 0) {
    order.products.map(item => {
      if (item.product.taxable && item.priceWithTax === 0) {
        const price = Number(item.product.price).toFixed(2);
        const quantity = item.quantity;
        item.totalPrice = price * quantity;

        const taxAmount = price * (taxRate / 100) * 100;
        item.totalTax = taxAmount * quantity;
        item.priceWithTax = item.totalPrice + taxAmount * quantity;

        order.totalTax += item.totalTax;
      } else {
        order.totalTax += item.totalTax;
      }
    });
  }

  order.totalWithTax = order.total + order.totalTax;

  order.total = parseFloat(Number(order.total.toFixed(2)));
  order.totalTax = parseFloat(
    Number(order.totalTax && order.totalTax.toFixed(2))
  );
  order.totalWithTax = parseFloat(Number(order.totalWithTax.toFixed(2)));
  return order;
};

// calculate order tax amount
exports.caculateItemsSalesTax = items => {
  const taxRate = taxConfig.stateTaxRate;

  const products = items.map(item => {
    item.priceWithTax = 0;
    item.totalPrice = 0;
    item.totalTax = 0;
    const price = item.price;
    const quantity = item.quantity;
    item.totalPrice = parseFloat(Number((price * quantity).toFixed(2)));

    if (item.taxable) {
      const taxAmount = price * (taxRate / 100) * 100;
      item.totalTax = parseFloat(Number((taxAmount * quantity).toFixed(2)));
      item.priceWithTax = parseFloat(
        Number((item.totalPrice + taxAmount * quantity).toFixed(2))
      );
    }

    return item;
  });

  return products;
};
