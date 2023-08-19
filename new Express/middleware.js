const morgan = require('morgan');       ////get info about the request trigerred for e.g time, route,etc


app.use((req, res, next) => {        //user defined middleware
  console.log("first");
  next();
});

var time=null
app.use((req,res,next)=>{
   time=new Date().toString()
  next()
})

app.use(morgan("dev"))         //predefined middleware.   used to get info about the request trigerred for e.g time, route,etc
