import fetch from 'isomorphic-fetch';
import _ from 'lodash';
require('es6-promise').polyfill();

const makePathsFromJson = async (json_object)=>
{
    let arr=[];
    let getPathData=(current_object,current_path='')=>
    {
        for(var key in current_object)
        {
            if(typeof(current_object[key])!=='object')
            {
                arr.push({url:`${current_path}/${key}`,json:current_object[key]});
            }
            else
            {
                if(current_object[key]!=null)
                {
                    arr.push({url:`${current_path}/${key}`,json:/*JSON.stringify(*/current_object[key]/*)*/});
                    //making json for every object
                    getPathData(current_object[key],current_path+`/${key}`);
                }
                else
                {
                    arr.push({url:current_path+`/${key}`,json:null});
                }
            }
        }
    };
    await getPathData(json_object);
    arr.push({url:'/',json:json_object});
    return arr;
};

export default class pc_data_router{
    constructor(url)
    {
        this.pathArray=[];
        this.url = url;
    }
    get_PC_JSON=async()=>
    {
        const responce = await fetch(this.url);
        const result_tmp = await responce.json();
        this.pathArray = await makePathsFromJson(result_tmp);
        return this.pathArray;
    }
    //узнает, есть ли указанный роут в массиве...
    isInArray = (route)=>{
        for(let key in this.pathArray)
        {
            if(this.pathArray[key].url===route)
            {
                return {key:key,result:true};
            }
        }
        return {key:null,result:false};
    };
    //routeFunction MUST return a valid json object!!!!
    addRoutesFunctionality = async (route, routeFunction, ...params)=>
    {

        try {
            let result = await this.isInArray(route);
            if (result.result) {
                this.pathArray[result.key].json = await routeFunction(params);
            }
            else if (result.result == false) {
                this.pathArray.push({url:route,json:await routeFunction(params)});
            }
            return true;
        }
        catch(error) {
            return false;
        }
    };
    get_JSON_atRoute=async(route)=>
    {
        let found=await _.find(this.pathArray,function (elt){return elt.url==route});
        return found == undefined ? null : found;
    }
}
