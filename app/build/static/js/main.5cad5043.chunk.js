(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{14:function(e,a,t){e.exports=t.p+"static/media/link.0ef6006d.svg"},15:function(e,a,t){e.exports=t.p+"static/media/refresh.a297dbf4.svg"},18:function(e,a,t){e.exports=t(45)},23:function(e,a,t){},24:function(e,a,t){},25:function(e,a,t){},26:function(e,a,t){},27:function(e,a,t){},3:function(e,a,t){},45:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(13),r=t.n(l),i=(t(23),t(2)),s=(t(24),t(3),t(25),t(14)),m=t.n(s),o=function(e){return c.a.createElement("div",{className:"rocket"},c.a.createElement("div",{className:"small"},c.a.createElement("img",{alt:"Badge",src:String(e.badge),className:"badge"})),c.a.createElement("div",{className:"medium"},e.name),c.a.createElement("div",{className:"medium"},e.type),c.a.createElement("div",{className:"medium"},new Date(e.launchDate).toLocaleDateString()),c.a.createElement("div",{className:"large"},e.details),c.a.createElement("div",{className:"small"},e.id),c.a.createElement("div",{className:"small"},c.a.createElement("a",{href:String(e.article)},c.a.createElement("svg",{width:"15",height:"15"},c.a.createElement("image",{xlinkHref:m.a,height:"15",width:"15"})))))},u=(t(26),t(15)),d=t.n(u),f=function(e){var a=e.refresh,t=e.filters,n=e.setFilters,l=e.fetching,r=function(e){var a=Object.assign({},t);a[e]=!a[e],n(a)};return c.a.createElement("div",{className:"filter"},c.a.createElement("img",{src:d.a,className:l?"fetching":"",onClick:function(){return a()},alt:"Refresh"}),c.a.createElement("div",{className:"filler"}),c.a.createElement("label",null,"Land Success",c.a.createElement("input",{type:"checkbox",onClick:function(){return r("landSuccess")}}),c.a.createElement("span",{className:"checkmark"})),c.a.createElement("label",null,"Reused",c.a.createElement("input",{type:"checkbox",onClick:function(){return r("reused")}}),c.a.createElement("span",{className:"checkmark"})),c.a.createElement("label",null,"With Reddit",c.a.createElement("input",{type:"checkbox",onClick:function(){return r("withReddit")}}),c.a.createElement("span",{className:"checkmark"})))},h=t(16),E=function e(){Object(h.a)(this,e),this.landSuccess=!1,this.reused=!1,this.withReddit=!1},p=(t(27),function(){return c.a.createElement("div",{className:"header"},c.a.createElement("div",{className:"small"},"Badge"),c.a.createElement("div",{className:"medium"},"Rocket Name"),c.a.createElement("div",{className:"medium"},"Rocket Type"),c.a.createElement("div",{className:"medium"},"Launch Date"),c.a.createElement("div",{className:"large"},"Details"),c.a.createElement("div",{className:"small"},"ID"),c.a.createElement("div",{className:"small"},"Article"))}),v=function(){return c.a.createElement("h1",null,"Failed To Fetch Rocket Data",c.a.createElement("span",{role:"img","aria-label":"Dissapointed Face"},"\ud83d\ude1e"))},g=t(17),k=t.n(g),N=function(){var e=Object(n.useState)([]),a=Object(i.a)(e,2),t=a[0],l=a[1],r=Object(n.useState)(!1),s=Object(i.a)(r,2),m=s[0],u=s[1],d=Object(n.useState)(new E),h=Object(i.a)(d,2),g=h[0],N=h[1];Object(n.useEffect)((function(){w()}),[]);var b=function(){var e=Object.keys(g).filter((function(e){return!0===g[e]})),a={};return e.forEach((function(e){a[e]=e})),a},w=function(){j(),k.a.get("".concat("https://robots-n-pencils.herokuapp.com","/api/rap"),{params:b()}).then((function(e){e.data.sort((function(e,a){return e.id-a.id})),l(e.data)})).catch((function(e){return u(!0)}))},j=function(){l([]),u(!1)};return c.a.createElement("div",{className:"App"},c.a.createElement("h1",null,"SpaceX Launches"),c.a.createElement("div",{className:"container"},c.a.createElement(f,{fetching:!t.length&&!m,refresh:w,setFilters:N,filters:g}),t.length&&c.a.createElement(p,null),m&&c.a.createElement(v,null),!m&&t.map((function(e,a){return c.a.createElement(o,Object.assign({key:a},e))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.5cad5043.chunk.js.map