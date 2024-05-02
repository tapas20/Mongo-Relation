const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

// One to Many (Approach - 3)-->{one to squillions}
const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//   let user = new User({
//     username: "Tapas Jyoti",
//     email: "tapasjyoti@gmail.com",
//   });


//   let post1 = new Post({
//     content: "Hello World",
//     likes: 10,
//   });

//   let post2 = new Post({
//     content: "Bye Bye :)",
//     likes: 99,
//   });

  
//   post1.user = user;
//   post2.user = user;

//   await user.save();
//   await post1.save();
//   await post2.save();
// };

// addData();


const getData = async () => {
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);
}
getData();