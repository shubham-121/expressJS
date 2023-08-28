//connect to the DB
const DB =
  "mongodb+srv://shubhambhatt3006:Bhatt3006@cluster0.xtkuxqe.mongodb.net/?retryWrites=true&w=majority";
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((con) => {
      //console.log(con.connection);
      console.log("successfully connected to the database");
    });


//creating the Schema
const tourSchema = new mongoose.Schema({
  //creating a schema
  name: {
    type: String,
    required: [true, "Tour must have a name"], //validator
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: Number,
});

const Tour = mongoose.model("Tour", tourSchema); //creating a model to intearct with DB


module.exports=Tour



// posting data to the DB using postMan
 try{
    const newTour=await Tour.create(req.body); //returns a promise for which we are waiting
  
        res.status(201).json({
          status:"successfully entered the data to the DB",
          data:{
            newTour
          }
          
        })
  }
  catch(err){
     res.status(401).json({
      status:401,
      message:"invalid data sent"
     })
  }


//another method to insert the data without async-await
// // const testTour=new Tour({       //inserting data to the DB
    //   name:"The Sea Surferer",
    //   rating:4.9,
    //   price:600
    // })

    // testTour.save()
    // .then(console.log("successfully saved the document into the Db"))
    // .catch(err=>console.log(err))
