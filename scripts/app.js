
var memory_elements = "A A B B C C D D E E F F G G H H".split(" ");
var rows =4;
var size = memory_elements.length;
var memory_buffer_obj = [];
var memory_buffer_val = [];
var game_count = 0;
var click_count = 0;
var flip_count = 0;
var temp_buffer_object1,temp_buffer_object1;
function UnflippedTile(block)
{
  if(block.innerHTML=== "" && memory_buffer_val.length<2)
  {return 1;}else{return 0;}
}
function FlipIncrease(){flip_count+=2;}
function GetFlipCount(){return flip_count;}
function First()
{if(memory_buffer_val.length === 0)
  {
    return 1;
  }
  else  {
    return 0;
}}
function ClickIncrease()
{click_count+=1;
  if(click_count <= 10)
  {$(".score").html("Veteran");}
  else if(click_count > 10 && click_count < 20)
  {
    $(".score").html("Experienced");
  }else if(click_count >= 20){$(".score").html("Noob");}
  $(".moves").html(click_count);
}
function Second()
{if(memory_buffer_val.length === 1)
  {
    return 1;
  }
  else  {
    return 0;
}}
function AddToBuffer(data,val)
{
  memory_buffer_obj.push(data);
  memory_buffer_val.push(val);
}
function Matched()
{
  if(memory_buffer_val[0]===memory_buffer_val[1])
  {
    temp_buffer_object1 = memory_buffer_obj[0];
    temp_buffer_object2 = memory_buffer_obj[1];
    temp_buffer_object1.style.backgroundColor = "gold";
    temp_buffer_object2.style.backgroundColor = "gold";
    setTimeout(()=>{
    temp_buffer_object1.style.backgroundColor = "#fcfefa";
    temp_buffer_object2.style.backgroundColor = "#fcfefa";
  },666);
    return 1;
  }else{
    return 0;
}}

function HideBufferElements()
{
  temp_buffer_object1 = memory_buffer_obj[0];
  temp_buffer_object2 = memory_buffer_obj[1];
  temp_buffer_object1.style.backgroundColor = "#ff7b7b";
  temp_buffer_object2.style.backgroundColor = "#ff7b7b";
  setTimeout(()=>{temp_buffer_object1.innerHTML="";
  temp_buffer_object2.innerHTML="";
  temp_buffer_object1.style.backgroundColor = "#fcfefa";
  temp_buffer_object2.style.backgroundColor = "#fcfefa";
},666);
}
function ClearBuffer() {
memory_buffer_obj = [];
memory_buffer_val = [];
}
function Randomize(arr)
{
  var temp,j,it;
  for(var i=0;i<arr.length;i++)
  {
    j = Math.floor(Math.random()*arr.length);
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
function Reset_Click()
{
  game_count = 0;
  click_count = 0;
  ClearBuffer();
  $(".moves").html(click_count);
  Reset();
}

function Reset()
{var arr = Randomize(memory_elements);
var res="";
flip_count = 0;
click_count = 0;
$(".moves").html(click_count);
$(".score").html("Veteran");
var bleh=1,x,y;
for(var i=1;i<=rows;i++){

      for(var j=bleh;j<=rows*i;j++){
  		res += '<div class="col-xs-3 jumbotron box" onclick="flip(this,\''+memory_elements[j-1]+'\')"></div>'
    }
  $(".iterator:eq("+(i-1)+")").html(res);
  res = ""
  bleh+=rows;
  }
  if(game_count>0)
  {
    alert("Well done mate! Starting over!");
  }

}
function flip(obj,val)
{
  if(UnflippedTile(obj)){
  obj.innerHTML="<span class='text'>"+val+"</span>";
  if(First())
  {
    AddToBuffer(obj,val);
  }else if(Second())
  {
    ClickIncrease()
    AddToBuffer(obj,val);
    if(Matched())
    {
      ClearBuffer();
      FlipIncrease();
    }
    else {
      HideBufferElements();
      ClearBuffer();
    }
  }
  console.log(memory_buffer_val);
  var count = GetFlipCount()
  if(count>= 16)
  {
    game_count+=1;
    Reset();
  }
}
}



Reset();
