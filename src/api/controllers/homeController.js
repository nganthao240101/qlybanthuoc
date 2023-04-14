

import db from "../models/index";
import CRUDservices from "../services/CRUDservices";

let getHomePage = async(req, res) => {
    let data= await db.User.findAll();
    console.log(data);
    return res.render('homepage.ejs',{
        data: JSON.stringify(data),
    });
}
let getAboutPage=(req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD=(req,res)=>{
    return res.render('crud.ejs');


}
let postCRUD=async(req,res)=>{
    let message =await CRUDservices.createNewUser(req.body);
    console.log(message);
    return res.send('postCRUD ')

}
let displayGetCRUD= async(req,res)=>{
   
        let data=await CRUDservices.getAllUsers();
        console.log(data);
        return res.send('displayGetCRUD ');
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD
}
