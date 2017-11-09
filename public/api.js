 $("document").ready(function() {
   //console.log('success');
   var Output = document.querySelector('#Output');
   var data = document.querySelector('.data')
   var tableTemplate = document.querySelector("#tableTemplate").innerHTML;
   var tableTemplateInst = Handlebars.compile(tableTemplate);
   var sizeFilter = document.querySelector('#sizeFilter')
   var brandFilter = document.querySelector('#brandFilter')
   var sizeButton = document.querySelector('#sizeButton')
   var brandButton = document.querySelector('#brandButton')

function showAllShoes() {

  $.ajax({
    type: 'GET',
    url: '/api/shoes',
    datatype: 'json',
    success:function(shoesData){
      console.log(shoesData);
      data.innerHTML = tableTemplateInst({shoes:shoesData})
    }
  })
}

showAllShoes();


allFilter.addEventListener('click', function(){
  $.ajax({
    type: 'GET',
    url: '/api/shoes',
    datatype: 'json',
    success:function(shoesData){
      console.log(shoesData);
      data.innerHTML = tableTemplateInst({shoes:shoesData})
    }
  })
});
    var new_color = document.getElementById("new_color");
    var new_size = document.getElementById("new_size");
    var new_brand = document.getElementById("new_brand");
    var new_price = document.getElementById("new_price");
    var in_stock = document.getElementById("in_stock");
  addBtn.addEventListener('click', function() {

            var size = new_size.value;
            var stock = in_stock.value;
          var color=  new_color.value;
            var brand= new_brand.value;
            var price = new_price.value
            new_color.value = '';
            new_brand.value ='' ;
            new_size.value ='' ;
            new_price.value ='' ;
            in_stock.value ='' ;

if(size.length == 0 || stock.length == 0 || color.length == 0 || brand.length == 0 || price.length == 0 ){
  alert('Please fill in all the fields')
}
else{
var newData ={
  size:size,
  brand:brand,
  price:price,
  color:color,
  in_stock: stock

}
//addBtn.addEventListener('click', function() {

// })
$.ajax({
  type: 'POST',
  url: '/api/shoes',
  datatype: 'json',
  data: newData,
  success:function(shoesData){
      //console.log(shoesData);
      //data.innerHTML = tableTemplateInst({shoes:shoesData})
      showAllShoes();
    }

})
}
//window.location.reload()

    })
    sizeButton.addEventListener('click', function() {
  var sizes = sizeFilter.value;
      $.ajax({
      type: 'GET',
      url: '/api/shoes/size/'+ sizes,
      datatype: 'json',
      success:function(shoesData){
        console.log(shoesData);
        data.innerHTML = tableTemplateInst({shoes:shoesData})

      }

      })

    })
    brandButton.addEventListener('click', function() {
  var brands = brandFilter.value;
      $.ajax({
      type: 'GET',
      url: '/api/shoes/brand/'+ brands,
      datatype: 'json',
      success:function(shoesData){
        console.log(shoesData);
        data.innerHTML = tableTemplateInst({shoes:shoesData})

      }

      })

})
  });
