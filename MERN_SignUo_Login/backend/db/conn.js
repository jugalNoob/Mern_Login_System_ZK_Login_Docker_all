const mongoose=require("mongoose")

const DB = "mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority";


(async () => {
  try {
    if (!DB) {
      throw new Error("Database URL not provided. Please set the DATAS environment variable.");
    }

    await mongoose.connect(DB, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });

    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();





