(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{15:function(e,t,s){},9:function(e,t,s){"use strict";s.r(t);var r=s(0),a=s(3),n=s(4),i=s(6),c=s(5),u=s(8),l=s(1),h=s.n(l),o=s(7),d=s.n(o);s(15);function j(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<t.length;s++){var r=Object(u.a)(t[s],3),a=r[0],n=r[1],i=r[2];if(e[a]&&e[a]===e[n]&&e[a]===e[i])return e[a]}return null}function b(e){return Object(r.jsx)("button",{className:"square",onClick:e.onClick,children:e.value})}var x=function(e){Object(i.a)(s,e);var t=Object(c.a)(s);function s(e){var r;return Object(a.a)(this,s),(r=t.call(this,e)).state={squares:Array(9).fill(null),xIsNext:!0,status:"Next player: X"},r}return Object(n.a)(s,[{key:"handleClick",value:function(e){var t=this.state.squares.slice(),s=j(t);if(null==s){if(null!=t[e])return setTimeout((function(e,t){e.setState({status:t})}),1500,this,this.state.status),void this.setState({status:"You may not play there!"});t[e]=this.state.xIsNext?"X":"O",this.setState({status:"Next player: "+(this.state.xIsNext?"O":"X"),xIsNext:!this.state.xIsNext,squares:t}),null!=(s=j(t))&&this.setState({status:"Winner: "+s})}}},{key:"renderSquare",value:function(e){var t=this;return Object(r.jsx)(b,{value:this.state.squares[e],onClick:function(){return t.handleClick(e)}})}},{key:"render",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"status",children:this.state.status}),Object(r.jsx)("br",{}),Object(r.jsxs)("div",{className:"board-row",children:[this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)]}),Object(r.jsxs)("div",{className:"board-row",children:[this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)]}),Object(r.jsxs)("div",{className:"board-row",children:[this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})]})}}]),s}(h.a.Component),O=function(e){Object(i.a)(s,e);var t=Object(c.a)(s);function s(){return Object(a.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(r.jsxs)("div",{className:"game",children:[Object(r.jsx)("div",{className:"game-board",children:Object(r.jsx)(x,{})}),Object(r.jsxs)("div",{className:"game-info",children:[Object(r.jsx)("div",{}),Object(r.jsx)("ol",{})]})]})}}]),s}(h.a.Component);d.a.render(Object(r.jsx)(O,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.e6af6d52.chunk.js.map