 $("document").ready(function() {
   console.log('success');
   var dropTemp = document.querySelector("#dropTemp").innerHTML;
   var dropDownTemplateInst = Handlebars.compile(dropTemp);
   var Output = document.querySelector('#Output');
   var data = document.querySelector('.data')
  //  Output.innerHTML = dropDownTemplateInst({
  //       key: shoeData
  //   });

   var tableTemplate = document.querySelector("#tableTemplate").innerHTML;
   var tableTemplateInst = Handlebars.compile(tableTemplate);

$.ajax({
type: 'GET',
url: '/api/shoes',
datatype: 'json',
success:function(shoesData){
  console.log(shoesData);
  data.innerHTML = tableTemplateInst({shoes:shoesData})

}

})

 })
