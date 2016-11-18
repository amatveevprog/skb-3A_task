import pc_router from './router';
export default async (req,res,next)=>{
    const url = await trimSlashEnd(req.url);
    if(pc_router.pc_data_router.isInArray(url).result)
    {
        res.statusCode=200;
        let json1 = await pc_router.pc_data_router.get_JSON_atRoute(url);
        res.json(json1.json);
    }
    else
        res.status(404).send("Not Found");
    return next();
}
const trimSlashEnd = (input_str)=>
{
    console.log(input_str);
    if((input_str[input_str.length-1]=='/')&&(input_str.length>1))
    {
        input_str=input_str.substring(0,[input_str.length-1]);
    }
    return input_str;
}