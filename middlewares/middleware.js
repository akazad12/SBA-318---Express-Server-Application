export function logReq(req,res,next){

    if(req.body){
        console.log(`req Date:`, req.body)
    }
    next()
}