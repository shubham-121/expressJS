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

app.post("/api/v1/tours", createTour);
