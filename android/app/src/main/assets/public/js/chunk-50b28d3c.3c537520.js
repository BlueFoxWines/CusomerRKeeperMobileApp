(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50b28d3c"],{"14a1":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),c={class:"bluefox-title title"},a={class:"container"},i={key:0,class:"order"},o={key:0},d=Object(r["j"])("li",null,"1",-1),u=Object(r["j"])("hr",null,null,-1),l={class:"order-total"},s={class:"bluefox-title"},O={class:"bluefox-title"},b={class:"bluefox-title"},j={class:"bluefox-title"},f={key:1,class:"order-pay control"},h={key:2,class:"order-booked"},p={key:3,class:"order-booked"};function m(e,t,n,m,g,y){var I=Object(r["E"])("ion-back-button"),v=Object(r["E"])("ion-buttons"),k=Object(r["E"])("ion-title"),w=Object(r["E"])("ion-toolbar"),P=Object(r["E"])("ion-header"),$=Object(r["E"])("router-link"),C=Object(r["E"])("ion-content"),T=Object(r["E"])("loading"),E=Object(r["E"])("ion-page");return Object(r["w"])(),Object(r["g"])(E,null,{default:Object(r["N"])((function(){return[Object(r["j"])(P,{translucent:""},{default:Object(r["N"])((function(){return[Object(r["j"])(w,null,{default:Object(r["N"])((function(){return[Object(r["j"])(v,{slot:"start"},{default:Object(r["N"])((function(){return[Object(r["j"])(I,{"default-href":"/main/orders"})]})),_:1}),Object(r["j"])(k,null,{default:Object(r["N"])((function(){return[Object(r["j"])("h1",c,Object(r["I"])(e.$t("Interface.Order.TitleSingle")),1)]})),_:1})]})),_:1})]})),_:1}),Object(r["j"])(C,{fullscreen:"",class:"ion-padding"},{default:Object(r["N"])((function(){return[Object(r["j"])("div",a,[g.Order?(Object(r["w"])(),Object(r["g"])("div",i,[Object(r["j"])("p",{class:["order-status",{"is-notpayed":0===g.Order.OrderStatus,"is-payed":2===g.Order.OrderStatus,"is-closed":4===g.Order.OrderStatus}]},Object(r["I"])(e.$t("Interface.Order.Status."+g.Order.OrderStatus)),3),g.Order.ProductItems&&g.Order.ProductItems.length>0?(Object(r["w"])(),Object(r["g"])("ul",o,[d])):Object(r["h"])("",!0),u,Object(r["j"])("div",l,[Object(r["j"])("dl",null,[Object(r["j"])("dt",s,Object(r["I"])(e.$t("Interface.Order.Total")),1),Object(r["j"])("dd",O,Object(r["I"])(g.Order.Price)+" ₽ ",1)]),Object(r["j"])("dl",null,[Object(r["j"])("dt",b,Object(r["I"])(e.$t("Interface.Order.Payed")),1),Object(r["j"])("dd",j,Object(r["I"])(g.Order.Paid)+" ₽ ",1)])]),0===g.Order.OrderStatus||3===g.Order.OrderStatus?(Object(r["w"])(),Object(r["g"])("div",f,[g.Order?(Object(r["w"])(),Object(r["g"])($,{key:0,to:{name:"Pay",params:{id:g.Order.Id},query:{booked:!(g.Order.ProductItems&&g.Order.ProductItems.length>0)}},class:"button is-theme is-fullwidth"},{default:Object(r["N"])((function(){return[Object(r["i"])(Object(r["I"])(e.$t("Interface.Pay.Button")),1)]})),_:1},8,["to"])):Object(r["h"])("",!0)])):Object(r["h"])("",!0),g.Order.ProductItems&&0===g.Order.ProductItems.length&&1===g.Order.OrderStatus?(Object(r["w"])(),Object(r["g"])("p",h,Object(r["I"])(e.$tc("Interface.Order.BookInfoPayed",7,{table:y.getTableCode(g.Order.TableCode),date:y.filterDateTime(g.Order.StartDate)})),1)):(Object(r["w"])(),Object(r["g"])("p",p,Object(r["I"])(e.$tc("Interface.Order.BookInfo",7,{table:y.getTableCode(g.Order.TableCode),date:y.filterDateTime(g.Order.StartDate)})),1))])):Object(r["h"])("",!0)])]})),_:1}),Object(r["j"])(T,{active:e.IsLoading,"is-full-page":!0},null,8,["active"])]})),_:1})}var g=n("d867"),y=n("5da7"),I=n("2658"),v=n("3a5e"),k=n("74f4"),w={name:"Order",components:{IonContent:g["e"],IonPage:g["k"],IonButtons:g["d"],IonBackButton:g["b"],IonHeader:g["g"],IonToolbar:g["s"],IonTitle:g["r"],Loading:v["a"]},mixins:[I["a"]],data:function(){return{Order:null}},mounted:function(){this.getOrder()},methods:{getTableCode:function(e){return e=parseInt(e,10),e<7?e:"VIP "+(e-6)},getOrder:function(){var e=this;this.switchLoading(),this.$store.dispatch(k["g"],this.$route.params.id).then((function(t){e.Order=t.data})).finally((function(){return e.switchLoading()}))},filterDateTime:function(e){return Object(y["a"])(e)}}};w.render=m;t["default"]=w},2658:function(e,t,n){"use strict";t["a"]={data:function(){return{IsLoading:!1}},methods:{switchLoading:function(){this.IsLoading=!this.IsLoading}}}},"3a5e":function(e,t,n){"use strict";var r=n("7a23"),c=Object(r["j"])("div",{class:"loading-icon"},null,-1);function a(e,t,n,a,i,o){return Object(r["w"])(),Object(r["g"])(r["d"],{name:n.animation},{default:Object(r["N"])((function(){return[i.isActive?(Object(r["w"])(),Object(r["g"])("div",{key:0,class:["loading-overlay is-active",{"is-full-page":i.displayInFullPage}]},[Object(r["j"])("div",{class:"loading-background",onClick:t[1]||(t[1]=function(){return o.cancel&&o.cancel.apply(o,arguments)})}),Object(r["D"])(e.$slots,"default",{},(function(){return[c]}))],2)):Object(r["h"])("",!0)]})),_:1},8,["name"])}var i=n("5da7"),o={name:"BLoading",model:{prop:"active",event:"update:active"},props:{active:Boolean,programmatic:Boolean,container:{type:[Object,Function,window.HTMLElement],default:null},isFullPage:{type:Boolean,default:!0},animation:{type:String,default:"fade"},canCancel:{type:Boolean,default:!1},onCancel:{type:Function,default:function(){}}},data:function(){return{isActive:this.active||!1,displayInFullPage:this.isFullPage}},watch:{active:function(e){this.isActive=e},isFullPage:function(e){this.displayInFullPage=e}},created:function(){"undefined"!==typeof window&&document.addEventListener("keyup",this.keyPress)},beforeMount:function(){this.programmatic&&(this.container?(this.displayInFullPage=!1,this.$emit("update:is-full-page",!1),this.container.appendChild(this.$el)):document.body.appendChild(this.$el))},mounted:function(){this.programmatic&&(this.isActive=!0)},beforeUnmount:function(){"undefined"!==typeof window&&document.removeEventListener("keyup",this.keyPress)},methods:{cancel:function(){this.canCancel&&this.isActive&&this.close()},close:function(){var e=this;this.onCancel.apply(null,arguments),this.$emit("close"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout((function(){e.$destroy(),Object(i["b"])(e.$el)}),150))},keyPress:function(e){var t=e.key;"Escape"!==t&&"Esc"!==t||this.cancel()}}};o.render=a;t["a"]=o},"5da7":function(e,t,n){"use strict";function r(e){var t={year:"numeric",month:"numeric",day:"numeric",timezone:"UTC",hour:"numeric",minute:"numeric"};return new Date(e).toLocaleString("ru",t)}function c(e){"undefined"!==typeof e.remove?e.remove():"undefined"!==typeof e.parentNode&&null!==e.parentNode&&e.parentNode.removeChild(e)}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c}))}}]);
//# sourceMappingURL=chunk-50b28d3c.3c537520.js.map