const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require('morgan');

app.use(express.json()); // to get access to the requestbody. middleware -used for posting data(creating data)      //predefined middleware

/*user defined middleware below*/
app.use((req, res, next) => {
  console.log("first");
  next();
});

var time=null
app.use((req,res,next)=>{
   time=new Date().toString()
  next()
})

app.use(morgan("dev"))      //get info about the request trigerred for e.g time, route,etc

//Read data from the API
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    (err, data) => {
      console.log(err);
    }
  )
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  // optional parameter-> /:x?
  // http://localhost:3000/api/v1/tours/5/6

  console.log(req.params);

  const id = req.params.id * 1; //convert id(string) to int

  if (id > tours.length) {
    return res.status(404).json({ status: "failed to get data", data: "NULL" });
  }

  const tour = tours.find((el) => el.id === id); //finding the data with id=5
  
  console.log(time)
  res.status(201).json({
    status: "successful",
    requestedAt:time,
    data: { highlights: tour.summary, price: tour.price, data: tour },
    
  });
  // res.status(200).json({
  //   status: "success",
  //   results: tours.length,
  //   data: {
  //     tours: tours,
  //   },
  //});
};
const createTour = (req, res) => {
  console.log(req.body); //print body of the request posted
  //res.send("done");
  const newId = tours[tours.length - 1].id + 1; //prints message on the postman app
  const newTour = Object.assign({ id: newId }, req.body); //joins  new obj with the exsisting objects in the array
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({ status: "failed to get data", data: "NULL" });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here.....>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({ status: "failed to get data", data: "NULL" });
  }

  res.status(204).json({
    status: "success",
    data: "NULL",
  });
};

// app.get("/api/v1/tours",getAllTours );
// app.get("/api/v1/tours/:id/:x?",getTour );
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id/:x?",updateTour);
// app.delete("/api/v1/tours/:id/:x?", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id/:x?")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});
