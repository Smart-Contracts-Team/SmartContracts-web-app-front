import{a2 as o,a as n,c as i,b as c,q as p,h as a,C as d}from"./index-o2anLdNF.js";import{P as g}from"./PhotoService-Cjq5erfy.js";var l={name:"ChevronDownIcon",extends:o};function C(e,t,s,u,y,$){return n(),i("svg",p({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[c("path",{d:"M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z",fill:"currentColor"},null,-1)]),16)}l.render=C;const r="/service",f={async getServiceById(e){return(await a.get(`${r}/${e}`)).data},async getServicesByUserId(e){return(await a.get(`${r}/user/${e}`)).data},async getServicesByCategoryName(e){return(await a.get(`${r}/category/${e}`)).data.filter(s=>s.category===e)},async createService(e,t){return e.stars===void 0&&(e.stars=1),e.photo===void 0&&(e.photo="default%2Fimage-default.jpg?alt=media&token=14a980fd-ef8e-4917-a243-65d90839ee44"),e.userId=t,e.category=await d.getCategoryName(e.category||"")||"",(await a.post(`${r}`,e)).data},async updateService(e,t){return(await a.put(`${r}/${e}`,t)).data},async deleteService(e){const t=await this.getServiceById(e);return g.deletePhoto(t),(await a.delete(`${r}/${e}`)).data}};export{f as S,l as s};