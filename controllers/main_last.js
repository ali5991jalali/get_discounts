const check_str=(str)=>{

    let last_str=str.replace(/(\n|\t|\r)/,"");
    last_str=last_str.trim();
    return last_str;

}

module.exports=check_str;