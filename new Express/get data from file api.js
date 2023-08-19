
const getAllTours = (req, res) => {       //get all the data from the file and then send to user from server
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
app.get("/api/v1/tours",getAllTours );

/*********************/

const getTour = (req, res) => {            //get data with specified parameter
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
  

 app.get("/api/v1/tours/:id/:x?",getTour );
