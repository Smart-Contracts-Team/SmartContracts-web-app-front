import{s as V}from"./index-ChW50SvV.js";import{s as U,a as F}from"./index-CW9BEc_m.js";import{s as P}from"./index-Bw3PGiQj.js";import{s as j,a as A}from"./index-DLoWA6ri.js";import{s as E}from"./index-D-OCTWZ5.js";import{s as M}from"./index-Drds92g8.js";import{j as u,d as R,r as _,o as Y,a as l,h as m,w as y,b as t,c,t as i,k as n,u as D,s as I,e as f}from"./index-tGn4A1jT.js";import{S as q}from"./ServiceService-CNM5YgeI.js";import{U as z}from"./UserService-DX-dhTzX.js";import"./index-Bwkcf4_4.js";import"./index-DbULOkeh.js";import"./index-CoebC6Ed.js";import"./index-C5xJpaZd.js";import"./index-CBPX7evQ.js";import"./index-CQudeSsu.js";import"./index-C86jlxDl.js";import"./index-uqkg05Wy.js";import"./PhotoService-D-6329la.js";const v="/task",G={async getTaskById(o){return(await u.get(`${v}/${o}`)).data},async getTasksByServiceId(o){return(await u.get(`service/${v}/${o}`)).data},async createTask(o){return(await u.post(`${v}`,o)).data},async updateTask(o,r){return(await u.put(`${v}/${o}`,r)).data},async deleteTask(o){return(await u.delete(`${v}/${o}`)).data}},H={class:"flex flex-col md:flex-row gap-8"},J={class:"card flex flex-col md:flex-row gap-8 w-full"},K={class:"flex flex-col gap-4 w-full"},L={class:"flex flex-wrap gap-2 w-full"},O={key:0,id:"name",type:"text",for:"name",class:"font-bold text-2xl mb-8"},Q={class:"flex flex-col gap-4 w-full"},W={class:"flex items-center gap-2"},X={class:"flex flex-wrap gap-2 w-full"},Z={key:0,id:"description",type:"text"},ee={class:"flex flex-wrap gap-2 w-full"},te={key:0,id:"category",type:"text"},se={class:"flex flex-wrap gap-2 w-full"},ae={key:0,id:"price",type:"text"},oe={class:"flex flex-wrap gap-2 w-full align-items-center"},le={class:"flex flex-wrap gap-2 w-full"},re={key:0,id:"startDate",type:"text"},ne={class:"flex flex-wrap gap-2 w-full"},ie={key:0,id:"finalDate",type:"text"},ce={class:"flex flex-wrap gap-2 w-full"},de={class:"flex flex-col gap-8 w-full"},pe={class:"card w-full mt-8"},ue={class:"flex flex-wrap items-center justify-between gap-2"},fe={class:"font-bold"},Ve=R({__name:"ServiceView",props:{serviceId:{}},setup(o){const r=_([]),s=_(null),d=_(null),b=o;Y(async()=>{try{const a=await q.getServiceById(b.serviceId);if(s.value=a,a!=null&&a.userId){const p=await z.getUserById(a.userId);d.value=p}const e=await G.getTasksByServiceId(b.serviceId);r.value=e}catch(a){console.error("Error al obtener los datos:",a)}});const k=a=>{const e=new Date(a),p=e.getDate().toString().padStart(2,"0"),w=(e.getMonth()+1).toString().padStart(2,"0"),x=e.getFullYear();return`${p}/${w}/${x}`},$=a=>{switch(a){case"done":return{severity:"success",label:"Done"};case"active":return{severity:"success",label:"Active"};case"to-do":return{severity:"warn",label:"To-Do"};case"inactive":return{severity:"warn",label:"Inactive"};case"in-process":return{severity:"secondary",label:"In Process"};case"pending":return{severity:"secondary",label:"Pending"};default:return{severity:"secondary",label:"Undefined"}}};return(a,e)=>{const p=M,w=E,x=j,B=A,T=P,h=U,C=F,N=V;return l(),m(N,null,{default:y(()=>{var S;return[t("div",H,[t("div",J,[t("div",K,[t("div",L,[s.value?(l(),c("label",O,i(s.value.name),1)):n("",!0),s.value?(l(),m(p,{key:1,src:`${D(I)}${s.value.photo}`,alt:s.value.name,width:"450"},null,8,["src","alt"])):n("",!0)])]),t("div",Q,[e[10]||(e[10]=t("div",{class:"flex flex-wrap gap-2 w-full mb-8"},null,-1)),t("div",W,[f(w,{image:`${D(I)}`+((S=d.value)==null?void 0:S.photo),shape:"circle",class:"cursor-pointer",onClick:e[0]||(e[0]=g=>a.$router.push("/user-information/"+s.value.userId))},null,8,["image"]),d.value?(l(),c("span",{key:0,id:"influencer",class:"cursor-pointer",type:"text",onClick:e[1]||(e[1]=g=>a.$router.push("/user-information/"+s.value.userId))},i(d.value.firstName)+" "+i(d.value.lastName),1)):n("",!0)]),t("div",X,[e[3]||(e[3]=t("label",{for:"description",class:"font-bold"},"Description:",-1)),s.value?(l(),c("p",Z,i(s.value.description),1)):n("",!0)]),t("div",ee,[e[4]||(e[4]=t("label",{for:"category",class:"font-bold"},"Category:",-1)),s.value?(l(),c("p",te,i(s.value.category),1)):n("",!0)]),t("div",se,[e[5]||(e[5]=t("label",{for:"price",class:"font-bold"},"Price:",-1)),s.value?(l(),c("p",ae,"$"+i(s.value.price),1)):n("",!0)]),t("div",oe,[e[6]||(e[6]=t("label",{for:"stars",class:"font-bold"},"Stars:",-1)),s.value?(l(),m(x,{key:0,modelValue:s.value.stars,"onUpdate:modelValue":e[2]||(e[2]=g=>s.value.stars=g),readonly:""},null,8,["modelValue"])):n("",!0)]),t("div",le,[e[7]||(e[7]=t("label",{for:"startDate",class:"font-bold"},"Start Date:",-1)),s.value?(l(),c("p",re,i(k(s.value.startDate)),1)):n("",!0)]),t("div",ne,[e[8]||(e[8]=t("label",{for:"finalDate",class:"font-bold"},"Final Date:",-1)),s.value?(l(),c("p",ie,i(k(s.value.finalDate)),1)):n("",!0)]),t("div",ce,[e[9]||(e[9]=t("label",{for:"state",class:"font-bold"},"Status:",-1)),s.value?(l(),m(B,{key:0,value:$(s.value.state).label,severity:$(s.value.state).severity},null,8,["value","severity"])):n("",!0)])])])]),t("div",de,[t("div",pe,[f(C,{value:r.value,tableStyle:"min-width: 50rem",stripedRows:""},{header:y(()=>[t("div",ue,[e[11]||(e[11]=t("span",{class:"text-xl font-bold"},"Tasks:",-1)),f(T,{icon:"pi pi-refresh",rounded:"",raised:""})])]),footer:y(()=>[t("span",fe,"In total there are "+i(r.value?r.value.length:0)+" tasks.",1)]),default:y(()=>[f(h,{field:"taskName",header:"Name"}),f(h,{field:"description",header:"Description"})]),_:1},8,["value"])])])]}),_:1})}}});export{Ve as default};