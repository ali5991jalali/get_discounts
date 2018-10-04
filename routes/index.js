const express=require('express');
const router=express.Router();

//controller
const get_today_result=require('./../controllers/today');
const get_hotels_result=require('./../controllers/hotels');
//end 

router.get('/',get_today_result);
router.get('/hotels',get_hotels_result);



module.exports=router;