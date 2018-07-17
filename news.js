const request=require('request');
var body,articles;
var title=document.getElementById('news_title');
var content=document.getElementById('news_content');
var imageHolder=document.getElementById('image');
const api= require('./assets/apikey.js').apikey;


var setNews=function(country){
    request(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${api}`,(err,res,body)=>{
    if(err){
      return 'Error getting news';
    }
    body=JSON.parse(body);
    articles=body.articles;
    var i=1;

    title.innerHTML='';
    title.innerHTML=articles[0].title;
    if(articles[0].urlToImage!=null)
      imageHolder.src=articles[0].urlToImage;
    else {
      imageHolder.src='';
      imageHolder.alt="Image Not Available"
    }

    if(articles[0].description!=null){
      content.innerHTML='';
      if(articles[0].description.length>180)
        content.className='white-text truncate';
      else {
        content.className='';
        content.className='white-text';
      }
      content.innerHTML=articles[0].description;
    }

    var intrl=setInterval(()=>{

      title.innerHTML='';
      title.innerHTML=articles[i].title;

      if(articles[i].urlToImage!=null){
        imageHolder.src=articles[i].urlToImage;
      }else {
        imageHolder.src='';
        imageHolder.alt="Image Not Available"
      }

      content.innerHTML='';
      if(articles[i].description!=null){
        if(articles[i].description.length>180)
          content.className='white-text truncate';
        else {
          content.className='';
          content.className='white-text';
        }
        content.innerHTML=articles[i].description;
      }

      i++;
      if(i==articles.length)
        clearInterval(intrl);
    },8000);
  });
}
