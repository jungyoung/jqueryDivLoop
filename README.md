# jqueryDivLoop
jquery 기반 html 반복출력

데이터를 html에 반복적으로 출력할때 사용한다. <br>
vue 나 react 사용하지 않는 레거시 사이트에서 사용함.

```html
 <div id="list-area">
   <dl data-clone-grid>
      <dt data-grid="title" ></dt>
      <dd data-grid="content" data-grid-class="color"></dd>
   </dl>
 </div>
```
<pre>
<code>  
$(function () {
  let list = [
      {title : '제목1', content : '내용1', color : 'red'},
      {title : '제목2', content : '내용2', color : 'blue'},
      {title : '제목3', content : '내용3', color : 'black'},
  ];

  $('#list-area').programGrid(list);
});
 </code>
 </pre>
