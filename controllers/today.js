const axios=require('axios');
const cheerio=require('cheerio');


const mod_str=require('./main_last');


const today=()=>{

    return new Promise((resolve,reject)=>{

        axios.get('https://takhfifan.com/')
        .then((body)=>{

            let $=cheerio.load(body.data);
            let titles=[];
            $('div.home-page-deal-list').find('img.lazy').map((i,item)=>{

                titles[i]={
                    image:item.attribs['data-src'],
                    title:mod_str(item.parentNode.nextSibling.childNodes[1].children[1].data),
                    salepercent:mod_str(item.parent.nextSibling.childNodes[2].children[0].children[1].childNodes[0].data),
                    newprice:mod_str(item.parent.nextSibling.childNodes[2].children[2].children[0].children[1].childNodes[0].data),
                    lastprice:mod_str(item.parent.nextSibling.childNodes[2].children[2].children[1].childNodes[0].data)    
                }                        
        })

        resolve(titles);     
        })
        .catch((error)=>{

            reject(error.message)
        })
    })
}


const get_today_result=async (req,res)=>{

    try{
        let result=await today();
        res.send({success:true,result});
    }catch(err){
        res.send({success:false,message:err.message})
    }
}

module.exports=get_today_result;