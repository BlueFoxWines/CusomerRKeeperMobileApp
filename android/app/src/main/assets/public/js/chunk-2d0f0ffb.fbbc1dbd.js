(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f0ffb"],{"9f80":function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return i}));var r=n("a655"),a=(n("347a"),n("391c")),i=function(t,e,n,i,c){var o=t.ownerDocument.defaultView,u=function(t){return t.startX<=50&&e()},s=function(t){var e=t.deltaX,n=e/o.innerWidth;i(n)},d=function(t){var e=t.deltaX,n=o.innerWidth,a=e/n,i=t.velocityX,u=n/2,s=i>=0&&(i>.2||t.deltaX>u),d=s?1-a:a,f=d*n,w=0;if(f>5){var h=f/Math.abs(i);w=Math.min(h,540)}c(s,a<=0?.01:Object(r["j"])(0,a,.9999),w)};return Object(a["createGesture"])({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:u,onStart:n,onMove:s,onEnd:d})}}}]);
//# sourceMappingURL=chunk-2d0f0ffb.fbbc1dbd.js.map