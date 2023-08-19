//update the data
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

app.patch("/api/v1/tours/:id/:x?",updateTour);

/*****************/

//delete the data
const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({ status: "failed to get data", data: "NULL" });
  }

  res.status(204).json({
    status: "success",
    data: "NULL",
  });
};

app.delete("/api/v1/tours/:id/:x?", deleteTour);
