import{h as s}from"./index-o2anLdNF.js";const t="/user",o={async getAllUsers(){return(await s.get(`${t}`)).data},async getUserById(e){return(await s.get(`${t}/${e}`)).data},async getUserByType(e){return(await s.get(`${t}`)).data.filter(a=>a.typeOfUser===e)},async updateUser(e){return(await s.put(`${t}/${e.id}`,e)).data}};export{o as U};
