// const ratelimitwindow = 60 * 1000
// const max = 5
// const rateLimits = {}
// const ratelimiter = (req, res, next)=>{
//     console.log("ratelimmiter hitted")
//     const ip = req.ip;
//     const now = Date()
//     if(!rateLimits[ip]){
//         rateLimits[ip] = {count:1 , windowStart : now}
//         return next()
//     }
//     const entry = rateLimits[ip];
//      if(now - entry.windowStart > ratelimitwindow){
//         entry.count = 1;
//         entry.windowStart = now
//         return next()
//     }
//     else if( entry.count <max ){
//         entry.count+=1;
//         return next();
//     }
//     console.log("Api limit exceed try again after sometime")
//     res.status(429).json({msg: "Api limit exceed try again after sometime"})
// next()

// }
// module.exports = ratelimiter


const maxratelimit = 5
const ratelimitwindow = 60 * 1000
const ratelimits = {}
const ratelimiter = (req, res , next)=>{
    const ip = req.ip;
    const now = new Date()
    if(!ratelimits[ip]){
        ratelimits[ip] = {count : 1 , window: now}
        return next()
    }
    const entry = ratelimits[ip]
    if(now - entry.window > ratelimitwindow){
        entry.count = 1;
        entry.window = now;
        return next();
    }
    else if(entry.count < maxratelimit){
        entry.count +=1
        return next()
    }
    console.log("Api limit reached")
    
    res.status(429).json({msg: "Api limit reached pls try sfter some time "})
    next();
}

module.exports = ratelimiter