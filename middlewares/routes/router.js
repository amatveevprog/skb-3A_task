//aggregating routes and functionality
import pc_data_router from './pc_data_router';
import unionSameVolumes from './functionality';
class PC_Router
{
    //each function in functionality must return a valid json object!
    constructor(url_path,functionality=[]/*array of elements: {route:<>,func:<>,params:[]}*/)
    {
        this.pc_data_router = new pc_data_router(url_path);
    }
    makeRoutes = async()=>
    {
        const array = await this.pc_data_router.get_PC_JSON();
        const hdd = await(this.pc_data_router.get_JSON_atRoute("/hdd"));
        await this.pc_data_router.addRoutesFunctionality("/volumes",unionSameVolumes,hdd.json);
    }
}
let pc_router = new PC_Router('https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json',[]);
export default pc_router;