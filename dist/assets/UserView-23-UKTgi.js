import{s as ce}from"./index-e7X01tEO.js";import{B as J,U as H,R as ue,y as pe,a as r,b as d,e as o,S as R,m as b,t as u,g as c,n as fe,j as C,w as $,D as ve,f as x,A as me,a4 as ge,T as he,h as be,l as k,d as xe,p as ye,r as v,i as we,o as _e,C as $e,c as ke,u as P,s as j,F as Se,k as Ie}from"./index-BOLqcSEh.js";import{s as Be}from"./index-uRgZIMb9.js";import{s as Re}from"./index-DDgVDk_4.js";import{s as Q}from"./index-BWVrtxJk.js";import{s as Ce}from"./index-CF06nafu.js";import{a as Ve,s as ze}from"./index-QI8tLig9.js";import{b as Ne}from"./index-B-AtP0Qz.js";import{a as Te,s as Ue}from"./index-CJ-qif5I.js";import{s as Ee}from"./index--PIHlcyz.js";import{s as De}from"./index-BS9PyoXu.js";import{U as W}from"./UserService-DRNCzvA6.js";import{S as Y}from"./ServiceService-CBhGqO04.js";import"./PhotoService-CD1hVyHq.js";import"./index-Nbino4Gd.js";import"./index-De1zXoXx.js";import"./index-Ck9ebPBA.js";var Ae=function(n){var e=n.dt;return`
.p-panel {
    border: 1px solid `.concat(e("panel.border.color"),`;
    border-radius: `).concat(e("panel.border.radius"),`;
    background: `).concat(e("panel.background"),`;
    color: `).concat(e("panel.color"),`;
}

.p-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: `).concat(e("panel.header.padding"),`;
    background: `).concat(e("panel.header.background"),`;
    color: `).concat(e("panel.header.color"),`;
    border-style: solid;
    border-width: `).concat(e("panel.header.border.width"),`;
    border-color: `).concat(e("panel.header.border.color"),`;
    border-radius: `).concat(e("panel.header.border.radius"),`;
}

.p-panel-toggleable .p-panel-header {
    padding: `).concat(e("panel.toggleable.header.padding"),`;
}

.p-panel-title {
    line-height: 1;
    font-weight: `).concat(e("panel.title.font.weight"),`;
}

.p-panel-content {
    padding: `).concat(e("panel.content.padding"),`;
}

.p-panel-footer {
    padding: `).concat(e("panel.footer.padding"),`;
}
`)},Le={root:function(n){var e=n.props;return["p-panel p-component",{"p-panel-toggleable":e.toggleable}]},header:"p-panel-header",title:"p-panel-title",headerActions:"p-panel-header-actions",pcToggleButton:"p-panel-toggle-button",contentContainer:"p-panel-content-container",content:"p-panel-content",footer:"p-panel-footer"},Pe=J.extend({name:"panel",theme:Ae,classes:Le}),je={name:"BasePanel",extends:be,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:Pe,provide:function(){return{$pcPanel:this,$parentInstance:this}}},X={name:"Panel",extends:je,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{id:this.$attrs.id,d_collapsed:this.collapsed}},watch:{"$attrs.id":function(n){this.id=n||H()},collapsed:function(n){this.d_collapsed=n}},mounted:function(){this.id=this.id||H()},methods:{toggle:function(n){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:n,value:this.d_collapsed})},onKeyDown:function(n){(n.code==="Enter"||n.code==="NumpadEnter"||n.code==="Space")&&(this.toggle(n),n.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header}},components:{PlusIcon:Re,MinusIcon:Be,Button:Q},directives:{ripple:ue}},Oe=["id"],Fe=["id","aria-labelledby"];function Me(t,n,e,y,p,m){var E=pe("Button");return r(),d("div",b({class:t.cx("root")},t.ptmi("root")),[o("div",b({class:t.cx("header")},t.ptm("header")),[R(t.$slots,"header",{id:p.id+"_header",class:fe(t.cx("title"))},function(){return[t.header?(r(),d("span",b({key:0,id:p.id+"_header",class:t.cx("title")},t.ptm("title")),u(t.header),17,Oe)):c("",!0)]}),o("div",b({class:t.cx("headerActions")},t.ptm("headerActions")),[R(t.$slots,"icons"),t.toggleable?(r(),C(E,b({key:0,id:p.id+"_header",class:t.cx("pcToggleButton"),"aria-label":m.buttonAriaLabel,"aria-controls":p.id+"_content","aria-expanded":!p.d_collapsed,unstyled:t.unstyled,onClick:m.toggle,onKeydown:m.onKeyDown},t.toggleButtonProps,{pt:t.ptm("pcToggleButton")}),{icon:$(function(V){return[R(t.$slots,t.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:p.d_collapsed},function(){return[(r(),C(ve(p.d_collapsed?"PlusIcon":"MinusIcon"),b({class:V.class},t.ptm("pcToggleButton").icon),null,16,["class"]))]})]}),_:3},16,["id","class","aria-label","aria-controls","aria-expanded","unstyled","onClick","onKeydown","pt"])):c("",!0)],16)],16),x(he,b({name:"p-toggleable-content"},t.ptm("transition")),{default:$(function(){return[me(o("div",b({id:p.id+"_content",class:t.cx("contentContainer"),role:"region","aria-labelledby":p.id+"_header"},t.ptm("contentContainer")),[o("div",b({class:t.cx("content")},t.ptm("content")),[R(t.$slots,"default")],16),t.$slots.footer?(r(),d("div",b({key:0,class:t.cx("footer")},t.ptm("footer")),[R(t.$slots,"footer")],16)):c("",!0)],16,Fe),[[ge,!p.d_collapsed]])]}),_:3},16)],16)}X.render=Me;var Ke=function(n){var e=n.dt;return`
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: `.concat(e("textarea.color"),`;
    background: `).concat(e("textarea.background"),`;
    padding-block: `).concat(e("textarea.padding.y"),`;
    padding-inline: `).concat(e("textarea.padding.x"),`;
    border: 1px solid `).concat(e("textarea.border.color"),`;
    transition: background `).concat(e("textarea.transition.duration"),", color ").concat(e("textarea.transition.duration"),", border-color ").concat(e("textarea.transition.duration"),", outline-color ").concat(e("textarea.transition.duration"),", box-shadow ").concat(e("textarea.transition.duration"),`;
    appearance: none;
    border-radius: `).concat(e("textarea.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(e("textarea.shadow"),`;
}

.p-textarea:enabled:hover {
    border-color: `).concat(e("textarea.hover.border.color"),`;
}

.p-textarea:enabled:focus {
    border-color: `).concat(e("textarea.focus.border.color"),`;
    box-shadow: `).concat(e("textarea.focus.ring.shadow"),`;
    outline: `).concat(e("textarea.focus.ring.width")," ").concat(e("textarea.focus.ring.style")," ").concat(e("textarea.focus.ring.color"),`;
    outline-offset: `).concat(e("textarea.focus.ring.offset"),`;
}

.p-textarea.p-invalid {
    border-color: `).concat(e("textarea.invalid.border.color"),`;
}

.p-textarea.p-variant-filled {
    background: `).concat(e("textarea.filled.background"),`;
}

.p-textarea.p-variant-filled:enabled:focus {
    background: `).concat(e("textarea.filled.focus.background"),`;
}

.p-textarea:disabled {
    opacity: 1;
    background: `).concat(e("textarea.disabled.background"),`;
    color: `).concat(e("textarea.disabled.color"),`;
}

.p-textarea::placeholder {
    color: `).concat(e("textarea.placeholder.color"),`;
}

.p-textarea.p-invalid::placeholder {
    color: `).concat(e("textarea.invalid.placeholder.color"),`;
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}

.p-textarea-sm {
    font-size: `).concat(e("textarea.sm.font.size"),`;
    padding-block: `).concat(e("textarea.sm.padding.y"),`;
    padding-inline: `).concat(e("textarea.sm.padding.x"),`;
}

.p-textarea-lg {
    font-size: `).concat(e("textarea.lg.font.size"),`;
    padding-block: `).concat(e("textarea.lg.padding.y"),`;
    padding-inline: `).concat(e("textarea.lg.padding.x"),`;
}
`)},qe={root:function(n){var e=n.instance,y=n.props;return["p-textarea p-component",{"p-filled":e.$filled,"p-textarea-resizable ":y.autoResize,"p-textarea-sm p-inputfield-sm":y.size==="small","p-textarea-lg p-inputfield-lg":y.size==="large","p-invalid":e.$invalid,"p-variant-filled":e.$variant==="filled","p-textarea-fluid":e.$fluid}]}},He=J.extend({name:"textarea",theme:Ke,classes:qe}),We={name:"BaseTextarea",extends:Ve,props:{autoResize:Boolean},style:He,provide:function(){return{$pcTextarea:this,$parentInstance:this}}},Z={name:"Textarea",extends:We,inheritAttrs:!1,observer:null,mounted:function(){var n=this;this.autoResize&&(this.observer=new ResizeObserver(function(){n.resize()}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){this.$el.offsetParent&&(this.$el.style.height="auto",this.$el.style.height=this.$el.scrollHeight+"px",parseFloat(this.$el.style.height)>=parseFloat(this.$el.style.maxHeight)?(this.$el.style.overflowY="scroll",this.$el.style.height=this.$el.style.maxHeight):this.$el.style.overflow="hidden")},onInput:function(n){this.autoResize&&this.resize(),this.writeValue(n.target.value,n)}},computed:{attrs:function(){return b(this.ptmi("root",{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)}}},Ye=["value","disabled","aria-invalid"];function Ge(t,n,e,y,p,m){return r(),d("textarea",b({class:t.cx("root"),value:t.d_value,disabled:t.disabled,"aria-invalid":t.invalid||void 0,onInput:n[0]||(n[0]=function(){return m.onInput&&m.onInput.apply(m,arguments)})},m.attrs),null,16,Ye)}Z.render=Ge;const S="/review",G={async getReviewById(t){return(await k.get(`${S}/${t}`)).data},async getReviewsByServiceId(t){return(await k.get(`${S}/service/${t}`)).data},async getReviewsByUserId(t){return(await k.get(`${S}/influencer/${t}`)).data},async createReview(t){return(await k.post(`${S}`,t)).data},async updateReview(t,n){return(await k.put(`${S}/${t}`,n)).data},async deleteReview(t){return(await k.delete(`${S}/${t}`)).data}},Je={class:"card grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full"},Qe={class:"flex flex-col items-center justify-center"},Xe={class:"font-bold text-2xl mb-4"},Ze={class:"flex justify-center items-center w-64 h-64 rounded-full overflow-hidden"},et={class:"flex flex-col gap-4"},tt={key:0,class:"flex flex-wrap gap-2 w-full"},at={key:0,id:"firstname",type:"text"},ot={key:1,class:"flex flex-wrap gap-2 w-full"},nt={key:0,id:"lastname",type:"text"},st={class:"flex flex-wrap gap-2 w-full"},rt={for:"username",class:"font-bold"},lt={key:0,id:"username",type:"text"},it={class:"flex flex-wrap gap-2 w-full"},dt={key:0,id:"email",type:"text"},ct={class:"flex flex-wrap gap-2 w-full"},ut={key:0,id:"ruc",type:"text"},pt={key:2,class:"flex flex-wrap gap-2 w-full"},ft={key:0,id:"phone",type:"text"},vt={key:3,class:"flex flex-wrap gap-2 w-full"},mt={key:0,id:"birthdate",type:"text"},gt={class:"flex flex-wrap gap-2 w-full"},ht={key:0,id:"location",type:"text"},bt={key:0,class:"flex flex-col gap-8 w-full"},xt={class:"card w-full"},yt={key:0,class:"border border-surface-200 dark:border-surface-700 rounded m-2 p-4 flex flex-col h-full"},wt={class:"mb-4 flex-grow"},_t={class:"relative mx-auto image-container"},$t=["src","alt"],kt={class:"mb-4 font-bold text-xl"},St={class:"mb-4 font-medium flex-grow"},It={class:"flex justify-between items-center mt-auto"},Bt={class:"mt-0 font-semibold text-xl"},Rt={class:"flex flex-col gap-8 w-full mt-8"},Ct={class:"card w-full"},Vt={key:0,class:"flex mt-8"},zt={class:"card flex flex-col gap-4 w-full"},Nt={class:"flex flex-wrap gap-4 items-center justify-between"},Tt={class:"flex items-center gap-2 w-auto"},Ut={class:"flex items-center gap-2 justify-end w-auto"},Et={class:"flex flex-col md:flex-row gap-4"},Dt={class:"flex flex-wrap gap-2 w-full"},At={class:"flex flex-wrap gap-2 w-full"},Lt={class:"flex flex-wrap"},Pt={key:1},jt={class:"flex items-center pl-2"},Ot=["onClick"],Ft={class:"flex flex-wrap items-center justify-end gap-4"},Mt={class:"text-surface-500 dark:text-surface-400"},Kt={class:"m-0 mb-2 text-surface-500 dark:text-surface-400"},qt={class:"flex items-center mb-4"},Ht={class:"font-bold m-0 mb-2"},Wt={class:"m-0"},Yt={key:2},pa=xe({__name:"UserView",props:{userId:{}},setup(t){const n=ye(),e=v(null),y=v([]),p=v([]),m=v(!1),E=v(!0),V=v(!0),O=v(!0),z=t,i=v({}),I=v(!1),N=v(!1),ee=Number(localStorage.getItem("userId")??0),F=String(localStorage.getItem("typeOfUser")??""),T=v(!1),B={titleError:v(""),descriptionError:v(""),serviceNameError:v(""),starsError:v(0)},te=v([{breakpoint:"1024px",numVisible:3,numScroll:3},{breakpoint:"768px",numVisible:2,numScroll:2},{breakpoint:"560px",numVisible:1,numScroll:1}]);we(()=>z.userId,async l=>{m.value=!1,y.value=[],p.value=[];try{await M(l),await K(l),await A(l)}catch(a){console.error("Error al actualizar datos para el nuevo usuario:",a)}finally{m.value=!0}}),_e(async()=>{await M(z.userId),await K(z.userId),await A(z.userId),ae()});async function M(l){try{const a=await W.getUserById(l);e.value=a,m.value=!0}catch(a){console.error(a.response?"Error al obtener al usuario:":"Token no encontrado en localStorage",a)}finally{E.value=!1}}function ae(){return w.value&&F==="Business"||!w.value&&F==="Influencer"?T.value=!0:T.value=!1}function D(l,a,h){l==null||typeof l=="string"&&l.trim()===""||typeof l=="number"&&isNaN(l)||l instanceof Date&&isNaN(l.getTime())?h.value=a:h.value=""}async function oe(){var l,a,h,g;if(N.value=!0,D(i.value.title,"El título es obligatorio",B.titleError),D(i.value.description,"La descripción es obligatoria",B.descriptionError),D(i.value.stars,"Las estrellas son obligatorias",B.starsError),Object.values(B).some(f=>f.value)){console.log(B);return}i.value.dateCreated=new Date,i.value.influencerId=Number((l=e.value)==null?void 0:l.id),i.value.authorId=ee,i.value.serviceId=Number((a=i.value.aux)==null?void 0:a.id),i.value.serviceName=String((h=i.value.aux)==null?void 0:h.name),delete i.value.aux;try{I.value=!0,await G.createReview(i.value),n.add({severity:"success",summary:"Success",detail:"Review Created",life:3e3}),await A(Number((g=e.value)==null?void 0:g.id))}catch(f){n.add({severity:"error",summary:"Error",detail:f.message,life:3e3})}finally{I.value=!1}}async function K(l){try{const[a,h]=await Promise.all([Y.getServicesByUserId(l),$e.getCategories()]);y.value=a.map(g=>{const f=h.find(_=>_.name===g.category);return{...g,categoryDisplay:f?f.display:"Sin categoría"}})}catch(a){console.error(a.response?"Error al obtener los servicios:":"Token no encontrado en localStorage",a)}finally{V.value=!1}}async function A(l){try{const a=await G.getReviewsByUserId(l),h=await Promise.all(a.map(async g=>{const f=await W.getUserById(g.authorId),_=await Y.getServiceById(g.serviceId);return{...g,authorPhoto:f?f.photo:"",authorName:f?f.user_name:"",serviceName:_?_.name:""}}));h.sort((g,f)=>{const _=new Date(g.dateCreated);return new Date(f.dateCreated).getTime()-_.getTime()}),p.value=h}catch(a){console.error(a.response?"Error al obtener las reseñas:":"Token no encontrado en localStorage",a)}finally{O.value=!1}}const w=ke(()=>e.value&&e.value.typeOfUser==="Influencer");return(l,a)=>{const h=De,g=Te,f=Q,_=Ee,L=Ue,ne=ze,se=Ne,re=Z,le=Ce,ie=X,de=ce;return m.value?(r(),C(de,{key:0},{default:$(()=>{var q;return[o("div",Je,[o("div",Qe,[o("div",Xe,"@"+u((q=e.value)==null?void 0:q.user_name),1),o("div",Ze,[e.value?(r(),C(h,{key:0,src:`${P(j)}${e.value.photo}`,alt:e.value.user_name,width:"250",class:"object-cover"},null,8,["src","alt"])):c("",!0)])]),o("div",et,[w.value?(r(),d("div",tt,[a[4]||(a[4]=o("label",{for:"firstname",class:"font-bold"},"Firstname:",-1)),e.value?(r(),d("p",at,u(e.value.firstName),1)):c("",!0)])):c("",!0),w.value?(r(),d("div",ot,[a[5]||(a[5]=o("label",{for:"lastname",class:"font-bold"},"Lastname:",-1)),e.value?(r(),d("p",nt,u(e.value.lastName),1)):c("",!0)])):c("",!0),o("div",st,[o("label",rt,u(w.value?"Username":"Business Name")+":",1),e.value?(r(),d("p",lt,u(e.value.user_name),1)):c("",!0)]),o("div",it,[a[6]||(a[6]=o("label",{for:"email",class:"font-bold"},"Email:",-1)),e.value?(r(),d("p",dt,u(e.value.email),1)):c("",!0)]),o("div",ct,[a[7]||(a[7]=o("label",{for:"ruc",class:"font-bold"},"RUC:",-1)),e.value?(r(),d("p",ut,u(e.value.ruc),1)):c("",!0)]),w.value?(r(),d("div",pt,[a[8]||(a[8]=o("label",{for:"phone",class:"font-bold"},"Phone:",-1)),e.value?(r(),d("p",ft,u(e.value.phone),1)):c("",!0)])):c("",!0),w.value?(r(),d("div",vt,[a[9]||(a[9]=o("label",{for:"birthdate",class:"font-bold"},"Birthdate:",-1)),e.value?(r(),d("p",mt,u(e.value.birthDate),1)):c("",!0)])):c("",!0),o("div",gt,[a[10]||(a[10]=o("label",{for:"location",class:"font-bold"},"Location:",-1)),e.value?(r(),d("p",ht,u(e.value.location),1)):c("",!0)])])]),w.value?(r(),d("div",bt,[o("div",xt,[a[11]||(a[11]=o("div",{class:"font-bold text-2xl mb-4"},"Services",-1)),x(_,{value:y.value,numVisible:3,numScroll:3,responsiveOptions:te.value},{item:$(s=>[V.value?c("",!0):(r(),d("div",yt,[o("div",wt,[o("div",_t,[o("img",{src:`${P(j)}`+s.data.photo,alt:s.data.name,class:"w-full rounded service-image-size"},null,8,$t),x(g,{value:s.data.categoryDisplay,class:"absolute",style:{left:"5px",top:"5px"}},null,8,["value"])])]),o("div",kt,u(s.data.name),1),o("div",St,u(s.data.description),1),o("div",It,[o("div",Bt,"$"+u(s.data.price),1),o("span",null,[x(f,{icon:"pi pi-plus",label:"View more",class:"ml-2",onClick:U=>l.$router.push(`/tasks/service/${s.data.id}`)},null,8,["onClick"])])])]))]),_:1},8,["value","responsiveOptions"])])])):c("",!0),o("div",Rt,[o("div",Ct,[a[19]||(a[19]=o("div",{class:"font-bold text-2xl mb-4"},"Reviews",-1)),T.value?(r(),d("div",Vt,[o("div",zt,[a[16]||(a[16]=o("div",{class:"font-semibold text-xl"},"Add Review",-1)),o("div",Nt,[o("div",Tt,[a[12]||(a[12]=o("label",{for:"rating"},"Stars: ",-1)),x(L,{name:"rating",modelValue:i.value.stars,"onUpdate:modelValue":a[0]||(a[0]=s=>i.value.stars=s),modelModifiers:{trim:!0},required:"true",invalid:N.value&&!i.value.stars},null,8,["modelValue","invalid"])]),o("div",Ut,[x(f,{icon:"pi pi-check",label:I.value?"Sending...":"Send",loading:I.value,disabled:I.value,onClick:oe},null,8,["label","loading","disabled"])])]),o("div",Et,[o("div",Dt,[a[13]||(a[13]=o("label",{for:"title"},"Title",-1)),x(ne,{id:"title",type:"text",modelValue:i.value.title,"onUpdate:modelValue":a[1]||(a[1]=s=>i.value.title=s),modelModifiers:{trim:!0},required:"true",autofocus:"",invalid:N.value&&!i.value.title},null,8,["modelValue","invalid"])]),o("div",At,[a[14]||(a[14]=o("label",{for:"service"},"Service",-1)),x(se,{modelValue:i.value.aux,"onUpdate:modelValue":a[2]||(a[2]=s=>i.value.aux=s),modelModifiers:{trim:!0},options:y.value,optionLabel:"name",placeholder:"Select a Service",checkmark:"",highlightOnSelect:!1,class:"w-full"},null,8,["modelValue","options"])])]),o("div",Lt,[a[15]||(a[15]=o("label",{for:"description"},"Description",-1)),x(re,{id:"description",rows:"4",modelValue:i.value.description,"onUpdate:modelValue":a[3]||(a[3]=s=>i.value.description=s),modelModifiers:{trim:!0},required:"true",autofocus:"",invalid:N.value&&!i.value.description},null,8,["modelValue","invalid"])])])])):c("",!0),p.value.length>0&&!O.value?(r(),d("div",Pt,[(r(!0),d(Se,null,Ie(p.value,s=>(r(),C(ie,{key:s.id,class:"mb-4"},{header:$(()=>[o("div",jt,[x(le,{image:`${P(j)}${s.authorPhoto}`,shape:"circle",class:"cursor-pointer",onClick:U=>l.$router.push("/user-information/"+s.authorId)},null,8,["image","onClick"]),o("span",{class:"font-bold p-2 cursor-pointer",onClick:U=>l.$router.push("/user-information/"+s.authorId)},u(s.authorName),9,Ot)])]),footer:$(()=>[o("div",Ft,[o("span",Mt,u(s.dateCreated),1)])]),default:$(()=>[o("p",Kt,u(s.serviceName),1),o("div",qt,[a[17]||(a[17]=o("label",{class:"mr-2 font-semibold"},"Rating:",-1)),x(L,{modelValue:s.stars,"onUpdate:modelValue":U=>s.stars=U,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),o("p",Ht,u(s.title),1),o("p",Wt,u(s.description),1)]),_:2},1024))),128))])):(r(),d("div",Yt,a[18]||(a[18]=[o("p",null,"No reviews yet.",-1)])))])])]}),_:1})):c("",!0)}}});export{pa as default};
