const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// One to Many (Approach - 2)
const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
  let cust1 = new Customer({
    name: "Tapas Jyoti",
  });
  let order1 = await Order.findOne({ item: "Chips" });
  let order2 = await Order.findOne({ item: "Chocolate" });

  cust1.orders.push(order1);
  cust1.orders.push(order2);

  let result = await cust1.save();
  console.log(result);

  // let result = await Customer.find({});
  //   console.log(result);
};

// addCustomer();

//-----------------Using Populate----------------

//Functions
const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};

// findCustomer();

const addOrders = async () => {
  let res = await Order.insertMany([
    { item: "Somasa", price: 5 },
    { item: "Chips", price: 20 },
    { item: "Chocolate", price: 50 },
  ]);
  console.log(res);
};

// addOrders();

const addCust = async () => {
  let newCust = new Customer({
    name: "Karan Arjun",
  });

  let newOrder = new Order({
    item: "pizza",
    price: 250,
  });

  newCust.orders.push(newOrder);

  await newOrder.save();
  await newCust.save();

  console.log("added new customer");
};

const delCust = async () => {
  let data = await Customer.findByIdAndDelete("6636451c5d2c232e8fa004a7");
  console.log(data);
};

// addCust();
delCust();
