export function logReq(req,res,next){

    if(req.body){
        console.log(`req Date:`, req.body)
    }
    next()
}

export function activityLog(req, res, next) {

  const time = new Date();

  let partialString = `---------------------------
${req.method}:${req.url}`
  if (req.method != "GET") {
        partialString += `by user at ${time.toLocaleTimeString()} `;
    }
   console.log(partialString)
  next();
}
