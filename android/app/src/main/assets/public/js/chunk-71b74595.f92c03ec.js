(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71b74595"],{"14a1":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),c=Object(r["Q"])("data-v-b2128abe");Object(r["A"])("data-v-b2128abe");var a={class:"bluefox-title title"},i={class:"container"},o={key:0,class:"order"},d={key:0,class:"order-products"},s=Object(r["j"])("div",{class:"order-product-image column"},[Object(r["j"])("div",{class:"order-product-image-bg"}),Object(r["j"])("figure",{class:"order-product-image-pic"},[Object(r["j"])("img",{src:"assets/domini.png"})])],-1),u={class:"order-product-title column"},l={class:"order-product-title-name"},b=Object(r["j"])("p",{class:"order-product-title-desc"}," 0.75 л, Франция ",-1),O=Object(r["j"])("p",{class:"order-product-title-desc"}," Cabernet sovingion ",-1),j={class:"order-product-total column is-2"},f={class:"order-product-amount"},p={class:"order-product-price"},m=Object(r["j"])("hr",null,null,-1),h={class:"order-total"},g={class:"bluefox-title"},v={class:"bluefox-title"},y={class:"bluefox-title"},I={class:"bluefox-title"},k={key:1,class:"order-pay control"},P={key:2,class:"order-booked"},F={key:3,class:"order-booked"};Object(r["y"])();var x=c((function(e,t,n,x,w,C){var $=Object(r["F"])("ion-back-button"),T=Object(r["F"])("ion-buttons"),J=Object(r["F"])("ion-title"),L=Object(r["F"])("ion-toolbar"),S=Object(r["F"])("ion-header"),B=Object(r["F"])("ion-refresher-content"),_=Object(r["F"])("ion-refresher"),A=Object(r["F"])("router-link"),D=Object(r["F"])("ion-content"),E=Object(r["F"])("loading"),N=Object(r["F"])("ion-page");return Object(r["x"])(),Object(r["g"])(N,null,{default:c((function(){return[Object(r["j"])(S,{translucent:""},{default:c((function(){return[Object(r["j"])(L,null,{default:c((function(){return[Object(r["j"])(T,{slot:"start"},{default:c((function(){return[Object(r["j"])($,{"default-href":"/main/orders"})]})),_:1}),Object(r["j"])(J,null,{default:c((function(){return[Object(r["j"])("h1",a,Object(r["J"])(e.$t("Interface.Order.TitleSingle")),1)]})),_:1})]})),_:1})]})),_:1}),Object(r["j"])(D,{fullscreen:"",class:"ion-padding"},{default:c((function(){return[Object(r["j"])(_,{slot:"fixed",onIonRefresh:t[1]||(t[1]=function(e){return C.getOrder(e)})},{default:c((function(){return[Object(r["j"])(B)]})),_:1}),Object(r["j"])("div",i,[w.Order?(Object(r["x"])(),Object(r["g"])("div",o,[Object(r["j"])("p",{class:["order-status",{"is-notpayed":0===w.Order.OrderStatus,"is-payed":2===w.Order.OrderStatus,"is-closed":4===w.Order.OrderStatus}]},Object(r["J"])(e.$t("Interface.Order.Status."+w.Order.OrderStatus)),3),w.Order.ProductItems&&w.Order.ProductItems.length>0?(Object(r["x"])(),Object(r["g"])("ul",d,[(Object(r["x"])(!0),Object(r["g"])(r["a"],null,Object(r["D"])(w.Order.ProductItems,(function(e){return Object(r["x"])(),Object(r["g"])("li",{key:e.Id,class:"order-product columns is-gapless is-mobile"},[s,Object(r["j"])("div",u,[Object(r["j"])("p",l,Object(r["J"])(e.Name),1),b,O]),Object(r["j"])("div",j,[Object(r["j"])("p",f,"x"+Object(r["J"])(e.Quantity),1),Object(r["j"])("p",p,Object(r["J"])(e.Price)+" ₽",1)])])})),128))])):Object(r["h"])("",!0),m,Object(r["j"])("div",h,[Object(r["j"])("dl",null,[Object(r["j"])("dt",g,Object(r["J"])(e.$t("Interface.Order.Total")),1),Object(r["j"])("dd",v,Object(r["J"])(w.Order.Price)+" ₽ ",1)]),Object(r["j"])("dl",null,[Object(r["j"])("dt",y,Object(r["J"])(e.$t("Interface.Order.Payed")),1),Object(r["j"])("dd",I,Object(r["J"])(w.Order.Paid)+" ₽ ",1)])]),0===w.Order.OrderStatus||3===w.Order.OrderStatus?(Object(r["x"])(),Object(r["g"])("div",k,[w.Order?(Object(r["x"])(),Object(r["g"])(A,{key:0,to:{name:"Pay",params:{id:w.Order.Id},query:{booked:!(w.Order.ProductItems&&w.Order.ProductItems.length>0)}},class:"button is-theme is-fullwidth"},{default:c((function(){return[Object(r["i"])(Object(r["J"])(e.$t("Interface.Pay.Button")),1)]})),_:1},8,["to"])):Object(r["h"])("",!0)])):Object(r["h"])("",!0),1===w.Order.OrderStatus?(Object(r["x"])(),Object(r["g"])("p",P,Object(r["J"])(e.$tc("Interface.Order.BookInfoPayed",7,{table:C.getTableCode(w.Order.TableCode),date:C.filterDateTime(w.Order.StartDate)})),1)):(Object(r["x"])(),Object(r["g"])("p",F,Object(r["J"])(e.$tc("Interface.Order.BookInfo",7,{table:C.getTableCode(w.Order.TableCode),date:C.filterDateTime(w.Order.StartDate)})),1))])):Object(r["h"])("",!0)])]})),_:1}),Object(r["j"])(E,{active:e.IsLoading,"is-full-page":!0},null,8,["active"])]})),_:1})})),w=n("d867"),C=n("5da7"),$=n("2658"),T=n("3a5e"),J=n("74f4"),L={name:"Order",components:{IonContent:w["e"],IonPage:w["k"],IonButtons:w["d"],IonBackButton:w["b"],IonHeader:w["g"],IonToolbar:w["s"],IonTitle:w["r"],IonRefresher:w["l"],IonRefresherContent:w["m"],Loading:T["a"]},mixins:[$["a"]],data:function(){return{Order:null}},mounted:function(){this.getOrder()},methods:{getTableCode:function(e){return e=parseInt(e,10),e<7?e:"VIP "+(e-6)},getOrder:function(e){var t=this;this.switchLoading(),this.$store.dispatch(J["g"],this.$route.params.id).then((function(n){t.Order=n.data,e&&e.target.complete()})).finally((function(){return t.switchLoading()}))},filterDateTime:function(e){return Object(C["a"])(e)}}};n("ae41");L.render=x,L.__scopeId="data-v-b2128abe";t["default"]=L},2658:function(e,t,n){"use strict";t["a"]={data:function(){return{IsLoading:!1}},methods:{switchLoading:function(){this.IsLoading=!this.IsLoading}}}},"3a5e":function(e,t,n){"use strict";var r=n("7a23"),c=Object(r["j"])("div",{class:"loading-icon"},null,-1);function a(e,t,n,a,i,o){return Object(r["x"])(),Object(r["g"])(r["d"],{name:n.animation},{default:Object(r["O"])((function(){return[i.isActive?(Object(r["x"])(),Object(r["g"])("div",{key:0,class:["loading-overlay is-active",{"is-full-page":i.displayInFullPage}]},[Object(r["j"])("div",{class:"loading-background",onClick:t[1]||(t[1]=function(){return o.cancel&&o.cancel.apply(o,arguments)})}),Object(r["E"])(e.$slots,"default",{},(function(){return[c]}))],2)):Object(r["h"])("",!0)]})),_:1},8,["name"])}var i=n("5da7"),o={name:"BLoading",model:{prop:"active",event:"update:active"},props:{active:Boolean,programmatic:Boolean,container:{type:[Object,Function,window.HTMLElement],default:null},isFullPage:{type:Boolean,default:!0},animation:{type:String,default:"fade"},canCancel:{type:Boolean,default:!1},onCancel:{type:Function,default:function(){}}},data:function(){return{isActive:this.active||!1,displayInFullPage:this.isFullPage}},watch:{active:function(e){this.isActive=e},isFullPage:function(e){this.displayInFullPage=e}},created:function(){"undefined"!==typeof window&&document.addEventListener("keyup",this.keyPress)},beforeMount:function(){this.programmatic&&(this.container?(this.displayInFullPage=!1,this.$emit("update:is-full-page",!1),this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted:function(){this.programmatic&&(this.isActive=!0)},beforeUnmount:function(){"undefined"!==typeof window&&document.removeEventListener("keyup",this.keyPress)},methods:{cancel:function(){this.canCancel&&this.isActive&&this.close()},close:function(){var e=this;this.onCancel.apply(null,arguments),this.$emit("close"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout((function(){e.$destroy(),Object(i["b"])(e.$el)}),150))},keyPress:function(e){var t=e.key;"Escape"!==t&&"Esc"!==t||this.cancel()}}};o.render=a;t["a"]=o},"5da7":function(e,t,n){"use strict";function r(e){var t={year:"numeric",month:"numeric",day:"numeric",timezone:"UTC",hour:"numeric",minute:"numeric"};return new Date(e).toLocaleString("ru",t)}function c(e){"undefined"!==typeof e.remove?e.remove():"undefined"!==typeof e.parentNode&&null!==e.parentNode&&e.parentNode.removeChild(e)}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c}))},"9ab7":function(e,t,n){},ae41:function(e,t,n){"use strict";n("9ab7")}}]);
//# sourceMappingURL=chunk-71b74595.f92c03ec.js.map