export  default (err,req,res,next) =>{
    res.status(err.status || 500).json({error:`❌ Error: ${err.message}`})
};