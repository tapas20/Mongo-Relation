const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// One to Many (Approach - 1)
const userSchema = new Schema({
  username: String,
  address: [
    {
      _id: false,
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "Tapas Jyoti",
    address: [
      {
        location: "91A khuntapingu",
        city: "Keonjhar",
      },
    ],
  });
  user1.address.push({ location: "p32 jharkhand", city: "darzelling" });
  let result = await user1.save();
  console.log(result);
};

addUsers();
