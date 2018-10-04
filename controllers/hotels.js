const axios=require('axios');
const cheerio=require('cheerio');

const mod_str=require('./main_last');

const hotels=()=>{

    
    return new Promise((resolve,reject)=>{

        axios.get('https://takhfifan.com/global/%D8%AA%D8%AE%D9%81%DB%8C%D9%81%D8%A7%D9%86%20%D9%87%D8%A7%DB%8C%20%D9%85%D8%B3%D8%A7%D9%81%D8%B1%D8%AA%DB%8C/%D9%87%D8%AA%D9%84')
        .then((body)=>{

            let $=cheerio.load(body.data);
            let titles=[];
            $('div.tkh-travel-search__main').find('img.lazy').map((i,item)=>{

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



const get_hotels_result=async (req,res)=>{

    try{
        let result=await hotels();
        res.send({success:true,result});
    }catch(err){
        res.send({success:false,message:err.message})
    }
}

module.exports=get_hotels_result;