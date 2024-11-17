import{s as F}from"./index-B3CGB_Qf.js";import{s as M}from"./index-Bw3PGiQj.js";import{s as U}from"./index-Dwxam53z.js";import{B as W,a,c as l,m as y,b as s,f as z,d as A,r as d,o as I,C as L,g as q,t as o,e as m,h as G,w as g,n as B,F as C,i as j,u as V,s as D}from"./index-tGn4A1jT.js";import{S as H}from"./ServiceService-CNM5YgeI.js";import"./index-Bwkcf4_4.js";import"./index-DbULOkeh.js";import"./index-CoebC6Ed.js";import"./PhotoService-D-6329la.js";var J=function(f){var n=f.dt;return`
.p-progressspinner {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: inline-block;
}

.p-progressspinner::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.p-progressspinner-spin {
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    animation: p-progressspinner-rotate 2s linear infinite;
}

.p-progressspinner-circle {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: 0;
    stroke: `.concat(n("progressspinner.color.1"),`;
    animation: p-progressspinner-dash 1.5s ease-in-out infinite, p-progressspinner-color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes p-progressspinner-rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes p-progressspinner-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
@keyframes p-progressspinner-color {
    100%,
    0% {
        stroke: `).concat(n("progressspinner.color.1"),`;
    }
    40% {
        stroke: `).concat(n("progressspinner.color.2"),`;
    }
    66% {
        stroke: `).concat(n("progressspinner.color.3"),`;
    }
    80%,
    90% {
        stroke: `).concat(n("progressspinner.color.4"),`;
    }
}
`)},K={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},O=W.extend({name:"progressspinner",theme:J,classes:K}),Q={name:"BaseProgressSpinner",extends:z,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:O,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},P={name:"ProgressSpinner",extends:Q,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},R=["fill","stroke-width"];function T(t,f,n,k,w,x){return a(),l("div",y({class:t.cx("root"),role:"progressbar"},t.ptmi("root")),[(a(),l("svg",y({class:t.cx("spin"),viewBox:"25 25 50 50",style:x.svgStyle},t.ptm("spin")),[s("circle",y({class:t.cx("circle"),cx:"50",cy:"50",r:"20",fill:t.fill,"stroke-width":t.strokeWidth,strokeMiterlimit:"10"},t.ptm("circle")),null,16,R)],16))],16)}P.render=T;const X={class:"flex flex-col"},Y={class:"card"},Z={class:"font-semibold text-xl"},ss={key:0,class:"card flex justify-center"},es={class:"flex justify-end"},ts={class:"flex flex-col"},ns={class:"md:w-40 relative"},rs=["src","alt"],os={class:"flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"},as={class:"flex flex-row md:flex-col justify-between items-start gap-2"},is={class:"font-medium text-surface-500 dark:text-surface-400 text-sm"},ls={class:"text-lg font-medium mt-2"},cs={class:"bg-surface-100 p-1",style:{"border-radius":"30px"}},ps={class:"bg-surface-0 flex items-center gap-2 justify-center py-1 px-2",style:{"border-radius":"30px","box-shadow":`0px 1px 2px 0px rgba(0, 0, 0, 0.04),\r
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06)`}},ds={class:"text-surface-900 font-medium text-sm"},fs={class:"flex flex-col md:items-end gap-8"},us={class:"text-xl font-semibold"},ms={class:"flex flex-row-reverse md:flex-row gap-2"},gs={class:"grid grid-cols-12 gap-4"},xs={class:"p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col h-full",style:{"min-height":"400px"}},hs={class:"bg-surface-50 flex justify-center rounded p-4 flex-grow"},vs={class:"relative mx-auto"},_s=["src","alt"],ys={class:"pt-6 flex flex-col flex-grow"},ks={class:"flex flex-row justify-between items-start gap-2"},ws={class:"font-medium text-surface-500 dark:text-surface-400 text-sm"},bs={class:"text-lg font-medium mt-1"},Ss={class:"bg-surface-100 p-1",style:{"border-radius":"30px"}},$s={class:"bg-surface-0 flex items-center gap-2 justify-center py-1 px-2 rounded-full shadow-sm"},Bs={class:"text-surface-900 font-medium text-sm"},Cs={class:"flex flex-col gap-6 mt-6"},js={class:"flex justify-between items-center"},Vs={class:"text-2xl font-semibold"},As=A({__name:"CategoryView",props:{categoryName:{}},setup(t){const f=d([]),n=t,k=d([[],[]]),w=d([]),x=d(["grid","list"]),h=d("grid"),b=d(""),v=d(!0);I(()=>S(n.categoryName));const S=async i=>{var r;v.value=!0;try{b.value=((r=(await L.getCategories()).find(_=>_.name===i))==null?void 0:r.display)||i;const c=await H.getServicesByCategoryName(i);f.value=c,k.value=[c,[]],w.value=c}catch(c){console.error("Error fetching services or category display name:",c)}finally{v.value=!1}};return q(()=>n.categoryName,i=>{S(i)}),(i,r)=>{const c=P,_=U,$=M,N=F;return a(),l("div",X,[s("div",Y,[s("div",Z,"Servicios en la categoría: "+o(b.value),1),v.value?(a(),l("div",ss,[m(c)])):(a(),G(N,{key:1,value:f.value,layout:h.value},{header:g(()=>[s("div",es,[m(_,{modelValue:h.value,"onUpdate:modelValue":r[0]||(r[0]=p=>h.value=p),options:x.value,allowEmpty:!1},{option:g(({option:p})=>[s("i",{class:B([p==="list"?"pi pi-bars":"pi pi-table"])},null,2)]),_:1},8,["modelValue","options"])])]),list:g(p=>[s("div",ts,[(a(!0),l(C,null,j(p.items,(e,u)=>(a(),l("div",{key:u},[s("div",{class:B(["flex flex-col sm:flex-row sm:items-center p-6 gap-4",{"border-t border-surface":u!==0}])},[s("div",ns,[s("img",{class:"block xl:block mx-auto rounded w-full",src:`${V(D)}`+e.photo,alt:e.name},null,8,rs)]),s("div",os,[s("div",as,[s("div",null,[s("span",is,o(e.name),1),s("div",ls,o(e.description),1)]),s("div",cs,[s("div",ps,[s("span",ds,o(e.stars),1),r[1]||(r[1]=s("i",{class:"pi pi-star-fill text-yellow-500"},null,-1))])])]),s("div",fs,[s("span",us,"$"+o(e.price),1),s("div",ms,[m($,{icon:"pi pi-plus",label:"View more",class:"flex-auto md:flex-initial whitespace-nowrap",onClick:E=>i.$router.push(`/tasks/service/${e.id}`)},null,8,["onClick"])])])])],2)]))),128))])]),grid:g(p=>[s("div",gs,[(a(!0),l(C,null,j(p.items,(e,u)=>(a(),l("div",{key:u,class:"col-span-12 sm:col-span-6 lg:col-span-4 p-2"},[s("div",xs,[s("div",hs,[s("div",vs,[s("img",{class:"rounded w-full",src:`${V(D)}`+e.photo,alt:e.name,style:{"max-width":"300px"}},null,8,_s)])]),s("div",ys,[s("div",ks,[s("div",null,[s("span",ws,o(e.name),1),s("div",bs,o(e.description),1)]),s("div",Ss,[s("div",$s,[s("span",Bs,o(e.stars),1),r[2]||(r[2]=s("i",{class:"pi pi-star-fill text-yellow-500"},null,-1))])])]),s("div",Cs,[s("div",js,[s("span",Vs,"$"+o(e.price),1),s("span",null,[m($,{icon:"pi pi-plus",label:"View more",class:"flex-auto whitespace-nowrap ml-2",onClick:E=>i.$router.push(`/tasks/service/${e.id}`)},null,8,["onClick"])])])])])])]))),128))])]),_:1},8,["value","layout"]))])])}}});export{As as default};
