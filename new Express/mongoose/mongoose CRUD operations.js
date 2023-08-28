//get all the tours from the DB
exports.getAllTours =async (req, res) => {
 try{
  const tours= await Tour.find();

 res.status(201).json({
  message:"found tours",
  length:tours.length,
  data:tours
 })
 }catch(err){
  console.log(err)
 }
  
};


//get tour with the id from the DB
exports.getTour = async(req, res) => {

  try{
    
    const id=req.params.id;

    const tour= await Tour.findById(id)
    res.status(201).json({
      message:"Data found",
      DB_ID:id,
      data:tour
    })
  }catch(err){
  res.status(400).json({
    message:"Tour with id not found",
    status:401
  })
  }
res.status(201).json({
    status: "successful",
});
}


//create tour and post to the  DB
exports.createTour = async (req, res) => {
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
};


//update the tour with the ID in DB 

exports.updateTour = async(req, res) => {
try{
 const tour=await Tour.findByIdAndUpdate(req.params.id, req.body, 
  {  new:true,   //will return the updated body
    runValidators:true //will validate the updated document
  })
  res.status(200).json({
    status: "success",
    data: {
      tour: ("<Updated tour here.....>",tour),
    },
  });
}catch(err)
{
  res.status(400).json({
    message:"failed to update the data",
    status:404,
    error:err
  })
}
  
};


//delete tour by id from the DB

exports.deleteTour = async(req, res) => {
 const id=req.params.id
  
  try{
      await Tour.findByIdAndDelete(id)
 res.status(204).json({
   status: "success",
   message:"successfully deleted the data"
 });
 }catch(err)
 { 
res.status(401).json({
  status: "failed to delete the data",
  error:err
});

 }

};
