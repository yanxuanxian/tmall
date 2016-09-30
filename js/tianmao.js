$(function(){ 
    ssk();
  function ssk(){
    var tex=$(".kuang")[0];
    tex.onfocus=function(){//点击这个文本框的时候(表单获得焦点事件)
      if(tex.value=="飘逸雪纺一见倾心"){//如果文本框里边是默认值，就把它清空
        tex.value=""
      }   
    }
    tex.onblur=function(){//点击这个文本框外边的时候(表单失去焦点事件)
      if(tex.value){//如果文本框里边有值，不做操作

      }else{//如果文本框是空的，就恢复默认值
        tex.value="飘逸雪纺一见倾心"
      }
    }
    var tex1=$(".dbinput")[0];
    tex1.onfocus=function(){//
      if(tex1.value=="欢迎来天猫"){
        tex1.value=""
      }   
    }
    tex1.onblur=function(){
      if(tex1.value){
      }else{
        tex1.value="欢迎来天猫"
      }
    }
  }
   // 导航选项卡
   dhxxk(".mytb",".dhxl");
   //跳楼
  function aa(){
    //楼层跳转
    //获取浏览器高度   
      var ch=document.documentElement.clientHeight;
      var box=$(".qzsgbjlc");
      var ycdw=$(".zgdw")[0];
      var lis=$(".zdw2",ycdw);      
      var fhdb=$(".fhdb")[0];
      var dbxh=$(".dbxhbj")[0];       
      var flags=true;
      var flag=true;
      var bgcolor=["#64C333","#F7A945","#19C8A9","#F15453","#F7A945","#EA5F8D","#DD2727"];
      fhdb.onclick=function(){
          animate(document.body,{scrollTop:0})
      }
      var newarr=[];
      for (var i = 0; i < box.length; i++) {
        newarr.push(box[i].offsetTop);      
      }
      //楼层跳
            for (var i = 0; i < lis.length; i++) {      
              lis[i].index=i;
              lis[i].onclick=function(){
                flag=false;
                for (var j = 0; j < lis.length; j++) {
                  lis[j].style.background="#626262";
                }
                lis[this.index].style.background=bgcolor[i];
                animate(document.body,{scrollTop:newarr[this.index]},function(){
                  flag=true;
                });
                animate(document.documentElement,{scrollTop:newarr[this.index]},function(){
                  flag=true;
                });
              }
            }
      //窗口滚动
      window.onscroll=function(){
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        var scrolltop=obj.scrollTop;
        //出现左侧定位
           if (ch+scrolltop>=newarr[0]+300) {
               animate(ycdw,{left:10},200);
               animate(dbxh,{top:0},200);                 
           } else{
               animate(ycdw,{left:-40},200);
               animate(dbxh,{top:-40},200);               
           } 
      //滚动条对应按钮事件
           if(!flag){
             return;
            }
           for (var i = 0; i < lis.length; i++) { 
            if (ch+scrolltop>newarr[i]+300) {
              for (var j = 0; j < lis.length; j++) {
                lis[j].style.background="#626262";                
              }              
              lis[i].style.background=bgcolor[i];
            }
           }
      }
  }
  aa();
  //banner轮播  节点
  function bnlb(){    
    var arr=["#E8E8E8","#E8E8E8","#FFD0D8","#132356"];
    var bjbox=$(".lunbobj")[0];
    var dabox=$(".l_middle")[0];
    var xbox=$(".lu4t")[0];
    var imgs=$("a",xbox);      
    var btn=$("li",$(".btnfu")[0]);
    var leftan=$(".leftan")[0];
    var rightan=$(".rightan")[0];
    var num=0;
    var flag=true;      
    //初始化     
    animate(imgs[0],{opacity:1});
      btn[0].style.background="red";   
      dabox.onmouseover=function(){
          clearInterval(t);
         }
      dabox.onmouseout=function(){
          t=setInterval(moveR,2000);
      }
       rightan.onclick=function(){
          if (flag) {
            moveR();
            flag=false;
          }            
        }
        leftan.onclick=function(){
          if (flag) {
             moveL();
             flag=false;
          }          
        }                
      t=setInterval(moveR,2000);      
      function moveR(){
        num++;
        if(num==imgs.length) {
          num=0;
        } 
        for (var i = 0; i < imgs.length; i++) {
          animate(imgs[i],{opacity:0},500);
          btn[i].style.background="#ccc";
        }        
        animate(bjbox,{background:arr[num]},500)
        animate(imgs[num],{opacity:1},500,function(){
          flag=true;
        });          
        btn[num].style.background="red";
      }
      function moveL(){
         num--;
           if (num<0) {
            num=imgs.length-1;
           } 
           for (var i = 0; i < imgs.length; i++) {
             animate(imgs[i],{opacity:0},500);
             btn[i].style.background="#ccc";
           }
           animate(imgs[num],{opacity:1},500,function(){
              flag=true;
             });
           btn[num].style.background="red";
        animate(bjbox,{background:arr[num]},500)
      }   


       for (var i = 0; i < btn.length; i++) {
        btn[i].index=i;
        btn[i].onmouseover=function(){ 
          for (var j = 0; j < btn.length; j++) {
              animate(imgs[j],{opacity:0},500);
              btn[j].style.background="#ccc";
           }
           animate(imgs[this.index],{opacity:1},500);
           btn[this.index].style.background="red";
           animate(bjbox,{background:arr[this.index]},500)
           num=this.index; 
        }
      }
  }
  bnlb();
  var ydwli=$(".ydwli");
  var ydbox=$(".ydbox");
  for (var i = 0; i < ydwli.length; i++) {
    ydwli[i].index=i;
    ydwli[i].onmouseover=function(){
      for (var j = 0; j < ydwli.length; j++){
        ydbox[j].style.display="none";
        ydbox[j].style.left=-110+"px";
      }       
      ydbox[this.index].style.display="block";
      animate(ydbox[this.index],{left:-90})
    }
    ydwli[i].onmouseout=function(){
      ydbox[this.index].style.display="none";
    }
  }
})