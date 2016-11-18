
//input params: json object for union
let unionSameVolumes = async (arr_arr) =>
{
    const arr = arr_arr[0];
    //узнает,  есть ли указанные буквы томов...
    const isInArray = (arr,VolLetter)=>{
        for(let key in arr)
        {
            if(arr[key].volume===VolLetter)
            {
                return {key:key,result:true};
                //console.log(`is in array check: `)
            }
        }
        return {key:null,result:false};
    };
    var composed_array=[];
    for(let key in arr)
    {
        //console.log(arr[key]);
        let i_key = isInArray(composed_array,arr[key].volume);
        if(i_key.result == true)
        {
            //cуммируем.
            composed_array[i_key.key].size+=arr[key].size;
        }
        else
        {
            composed_array.push({volume:arr[key].volume,size:arr[key].size});
        }
    }
    return await makeAppropriateJSON(JSON.parse(JSON.stringify(composed_array)));
};


let makeAppropriateJSON = async (json_data)=>
{
    let result={};
    //result[]
    for(let key in json_data)
    {
        if(json_data[key].volume!='')
        {
            result[json_data[key].volume]=json_data[key].size+'B';
        }
    }
    return result;
};
export default unionSameVolumes;
