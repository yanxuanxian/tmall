//选项卡
 function dhxxk(fu1,fu2){
      var mytb=$(fu1);
       var dhxl=$(fu2);
       for (var i = 0; i < mytb.length; i++) {
         mytb[i].index=i;
         mytb[i].onmouseover=function(){
           for (var i = 0; i < mytb.length; i++) {
            dhxl[i].style.display="none"
           }
           dhxl[this.index].style.display="block";
         }
          mytb[i].onmouseout=function(){  
           dhxl[this.index].style.display="none";
         }  
       }
   }
 //字符串去空格函数
         function trim(str,type){
          var type=type||"both";
          if (type=="left") {
            var reg=/^\s*/g;
            return str.replace(reg,"");
          } else if(type=="right"){
            var reg=/\s*$/g;
            return str.replace(reg,"");
          } else if(type=="both"){
            var reg=/^\s*|\s*$/g;
            return str.replace(reg,"");
          } else if(type=="all"){
            var reg=/\s*/g;
            return str.replace(reg,"");
          }
         }
//一:getClass("select")
//获取具有指定class元素的集合
//select 指定的className
//[context] 指定的范围  不传的话就是document里找
 // context 初始化
//思路:第一步:判断浏览器  document.getElementsByClassName
//第二步:true

       function getClass(select,context){
           var context=context?context:document;
           if (typeof select=="string") {
               //select=select.replace(/^\s+|\s+$/g,"");
               select=trim(select);
               if (document.getElementsByClassName) {
                  return context.getElementsByClassName(select)
               } else {
                  var all=context.getElementsByTagName('*');
                  var arr=[];
                  for (var i = 0; i < all.length; i++) {
                    //one two three four 
                    //每一个对象的classname是否包含指定的select
                      if (checkClass(all[i].className,select)) {
                          arr.push(all[i]);
                      }
                  }
                  return arr;
               }
           } else {

           }
          
       }
// 查看classname里面是否包含有select
//classname 形参 select 形参2
    function checkClass(classname,select){
       	 var arr=classname.split(" ");
       	 for (var i = 0; i < arr.length; i++) {
       	 	if (arr[i]==select) {
       	 		return true;
       	 	}      	 	
       	 }
       	 return false;
      }

  //二:设置文本内容
   function setContent(obj,val){
   	 if (val==undefined) {
   	 	if (obj.innerText) {
        	return obj.innerText
        } else {
        	return obj.innerContext
        }
   	 } else {
   	 	if (obj.innerText||obj.innerText==""){//IE8,当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
   	 		obj.innerText=val;
   	 	} else {
   	 		obj.innerContext=val;
   	 	}
   	 }       
   }
//三: 获取元素样式
//obj 对象  attr  属性
 //obj.style.attr 只能获取行内样式,不能获取其他的
     function getStyle(obj,attr){
     	if (obj.currentStyle) {
     		return obj.currentStyle[attr];//ie方式
     	} else {
     		return getComputedStyle(obj,null)[attr];//w3c
     	}
     }
 //四.获取元素的函数$()
 //$(string) 获取页面中的元素
  //".one" 获取指定类名的元素的集合
  //"#one" 获取指定id的第一个元素
  // "div" 获取指定标签的元素集合
  //思路: 判断字符串的首字母 
   // .  getClass()
   // #   document.getElementById();
   // 标签  document.getElementsByTagName('')

   function $(selector,context){
   	 if (typeof selector=="string") {
   	 	var context=context||document;
         if (selector.charAt(0)==".") {
         	return getClass(selector.slice(1),context);
         } else if(selector.charAt(0)=="#"){
         	return context.getElementById(selector.slice(1));
         } else if (/^[a-z][a-z1-6]{0,10}$/g.test(selector)) {
         	 return context.getElementsByTagName(selector);
         } else if(/^<[a-z][a-z1-6]{0,10}>$/g.test(selector)){
            return document.createElement(selector.slice(1,-1));
         }
   	 } else if(typeof selector=="function"){
         addEvent(window,"load",selector);         
     }
   	 
   }


/**********************************************/
/*
5.getChilds(parent,type);
// 功能 获取某一个指定元素的子元素
 "a": 获取元素子节点的兼容函数
 "b": 获取元素+文本节点
parent 指定的对象   type 获取子节点的类型
  原理:先获取所有的儿子，然后根据节点的类型判断，如果为1，表示是元素节点，保存到数组里。*/
 //第一步:先获取所有的子节点
    //第二部:声明一个空数组
    //遍历子节点
    //返回  return
function getChilds(parent,type){
    var childs=parent.childNodes;
    var type=type==undefined?true:type;
    var arr=[];
    for (var i = 0; i < childs.length; i++) {
      if (type==true) {
          if (childs[i].nodeType==1) {
              arr.push(childs[i]);
          }            
      } else{
          if(childs[i].nodeType==1||(childs[i].nodeType==3&&!(/^\s+$/.test(childs[i].nodeValue)))){
              arr.push(childs[i]);
          }
         
      }      
    }
    return arr;
}

//获得第一个子节点
function getFirst(obj,type){
     return getChilds(obj,type)[0];
}
//获得最后一个子节点
 function getLast(obj,type){
     return getChilds(obj,type)[getChilds(obj).length-1];
 }
 //获取随机的一个子节点
 function getNum(obj,num){
    return getChilds(obj)[num];
 }

 //获取下一个兄弟节点 只获取元素节点
  function getNext1(obj){
     var next=obj.nextSibling;
     if (next==null) {
      return false;
     }
     while(next.nodeType==3||next.nodeType==8){
       if (next==null) {
        return false;
       }
       next=next.nextSibling
     }
     return next;
  }

 //获取下一个兄弟节点 元素与文本节点都获取
  function getNext2(obj){
     var next=obj.nextSibling;
     if (next==null) {
      return false;
     }

     while(next.nodeType==8||(next.nodeType==3&&/^\s+$/.test(next.nodeValue))){      
       next=next.nextSibling;

        if (next==null) {
        return false;
       }
     }
     return next;
  }

  function getNext(obj,type){
      if (type) {
        return getNext1(obj);
      } else {
        return getNext2(obj);
      }
  }
/************************************************************/
/* insertAfter(obj,obj1)
将*/

//获得上一个兄弟节点 previousSibling 
 function getShang1(obj){
     var next=obj.previousSibling;
     if (next==null) {
      return false;
     }
     while(next.nodeType==3||next.nodeType==8){
       if (next==null) {
        return false;
       }
       next=next.previousSibling;
     }
     return next;
  }

  function getShang2(obj){
     var next=obj.previousSibling;
     if (next==null) {
      return false;
     }
     while(next.nodeType==8||(next.nodeType==3&&/^\s+$/.test(next.nodeValue))){
       if (next==null) {
        return false;
       }
       next=next.previousSibling;
     }
     return next;
  }

  function getPrevious(obj,type){
       if (type) {
        return getShang1(obj);
      } else {
        return getShang2(obj);
      }
  }

/***************************************/
//插入到某个对象之后
 function insertAfter(obj,obj1){
   var parent=obj1.parentNode;
   var next=getNext(obj1);
   if (next) {
    parent.insertBefore(obj,next);
   } else {
    parent.appendChild(obj);
   }
 }

//将obj插入到obj1对象之前
function insertBefore(obj,obj1){
  var parent=obj1.parentNode;
  parent.insertBefore(obj,obj1);
}
/*
    appendBefore(obj,objs)   objs是父元素
    将obj插入到父元素objs的最前面
    思路：
       1.找到objs的第一个子元素
       2.判断是否有子元素
       true   objs.insertBefore(子元素第一个)
       false  objs.appendChild(obj)
*/
function appendBefore(obj,objs){
  var child=getFirst(objs);
  if(child){
    objs.insertBefore(obj,child);
  }else{
    objs.appendChild(obj);
  }
}
 

/*
 addEvent(one,"click",aa)
*/ //绑定多个事件
function addEvent(obj,type,fn){
   if (obj.attachEvent) {
      obj.attachEvent("on"+type,fn);
   } else {
       obj.addEventListener(type,fn,false);
   }
}

//删除多个事件
function removeEvent(obj,type,fn){
  if (obj.addEventListener) {
    obj.removeEventListener(type,fn,false);
  } else {
    obj.detachEvent("on"+type,fn);
  }
}

//offset()
//用来获取obj距离浏览器的距离 {left:,top:,}
//思路
/*
第一步:获取所有具有定位属性的父元素
*/
function offset(obj){
  var result={top:0,left:0};
  var arr=[];
  arr.push(obj); 
 
  var parent=obj.parentNode;

   
   while(parent.nodeName!="BODY"){
      if (getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute") {
        arr.push(parent);
      } 
      parent=parent.parentNode;

   }   
      for (var i = 0; i < arr.length; i++) {
        lefts=arr[i].offsetLeft;
        tops=arr[i].offsetTop;        
        borderLeft=getStyle(arr[i],"borderLeft")?parseInt(getStyle(arr[i],"borderLeft")):0; 
        borderTop=getStyle(arr[i],"borderTop")?parseInt(getStyle(arr[i],"borderTop")):0 ; 

        if (i==0) {
          borderLeft=0;
          borderTop=0;
        } 
        result.left+=(lefts+borderLeft);
        result.top+=(tops+borderTop);
       
      }
   return result;
   // console.log(result.left);
  // console.log(result.top);
   
}


//滚轮获取
function mouseWheel(obj,downFn,upFn){
  if(document.attachEvent){
    document.attachEvent("onmousewheel",scrollFn); //IE、 opera
  }else if(document.addEventListener){
     document.addEventListener("mousewheel",scrollFn,false);
  //chrome,safari -webkit-
     document.addEventListener("DOMMouseScroll",scrollFn,false);
  //firefox -moz-
  }
    function scrollFn(e){
      var ev=e||window.event;
      var dir=ev.wheelDelta||ev.detail;
      //事件对象阻止浏览器默认行为
      /* if (ev.preventDefault)
       ev.preventDefault(); //阻止默认浏览器动作(W3C)
       else ev.returnValue = false;
       //IE中阻止函数器默认动作的方式 */
      if (dir==120||dir==-3) {
          upFn();
      } else if(dir==-120||dir==3){
        downFn();
      }
    }
}


  //15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/



























 /***************************************************************/
 //101.行列表格
   function hl(hang,lie,color1,color2){
   	document.write("<table border=1 cellspacing=0 align='center'>"); 
      	for (var i = 0; i < hang; i++) {
      		if (i%2==0) {
      			document.write("<tr bgcolor="+color1+">");
      		for (var j = 0; j < lie; j++) {
      			document.write("<td>");
      			 document.write("我想静静");
      			document.write("</td>");
      		}
      		document.write("</tr>")
      		
      		} else {
      			document.write("<tr bgcolor="+color2+">");
      		for (var j = 0; j < lie; j++) {
      			document.write("<td>");
      			 document.write("我想静静");
      			document.write("</td>");
      		}
      		document.write("</tr>")
      	}     		     		
      	}
      	document.write("</table>");
    }
    /*bb(5,5,"blue","red");*/
/****************************************************************/
//102:数组去重函数
    function norepeat(arr){
    //创建一个新空数组
    var newarr=[];
    //遍历原来数组
     for (var i = 0; i < arr.length; i++) {
      //开关思想 flag:true false
        var flag=true;
        //当前元素是否已经存于newarr
        for (var j = 0; j < newarr.length; j++) {
          if (newarr[j]==arr[i]) {
            flag=false;
            break;
          } 
        }
         //当前元素push到newarr
        if (flag) {
          newarr.push(arr[i]);
        } 
     }
     return newarr;
    }   
    
/*******************************************************/

 //103: 数组去空
      function delnull(arr){
        var newarr=[];
    for (var i = 0; i < arr.length; i++) {
      console.log(typeof arr[i]);
      if (arr[i]==undefined){
               continue;
      } else {
               newarr.push(arr[i]);
      } 
    }
    return newarr;
     }
     

 //104: 查看数组中的n个随机元素

   //arr为数组,  num为查看的随机个数
   function randomArr(arr,num){
         var newarr=[];
              for (var i = 0; i < num; i++) {
                var num1=Math.floor(Math.random()*arr.length);
                while((function check(num2,Arr){
              for (var i = 0; i < Arr.length; i++) {
                if (num2==Arr[i]) {
                  return true;
                } 
              }
              return false;
             })(arr[num1],newarr)){
                  num1=Math.floor(Math.random()*arr.length);
                }
                newarr.push(arr[num1]);
              }
              return newarr;
       }

  //105:  计算器
    function jsq(num1,num2,ysf){
			var num1=parseInt(prompt("请输入第一个数",""));
		    var num2=parseInt(prompt("请输入第二个数",""));
		    var ysf=prompt("运算符","");
		    switch(ysf){
			  case "+":alert(num1+num2);break;
			  case "-":alert(num1-num2);break;
			  case "*":alert(num1*num2);break;
			  case "/":{
                if (num2==0) {
                    alert("除数不能为0");break;
                  } else {
                    alert(num1/num2);break;
                  }
                }
			    default:alert("输入错误");
		     }
        }

        