document.addEventListener("DOMContentLoaded", function(event) {
  /*
    Coverts a 6 hex color digit to a possible 3 color digit 
  */

  //prompt for getting the code

  document.getElementById("iets2").onclick = function(){
    
    var color = document.getElementById("iets").value;
    // Check if there is a # sign at the beginning, if not i add one
    if(color[0] != "#")
    {
       color = "#" + color;
    }

    //check if the color code has its 7 needed characters
    if(color.length == 7)
    {
      //getting the list from the document
      var list = document.getElementById('colors');
      //settings the original color as background
      document.body.style.background = color;

      //vars needed for generating a list of colors
      var list_html = '';
      var parts = Array();
      parts[0] = Array(); //#{0}00000
      parts[1] = Array(); //#00{0}000
      parts[2] = Array(); //#0000{0}0

      //loop trough the color parts
      var j = 0;
      for(var i = 1; i < 6; i+=2)
      {
        //fetches the color parts and convert the hex to ints
        var part = color[i];
        var part_int = parseInt(part, 16);
        
        if(part_int == 15)
        {
          //if the the part is F (15) than look for surrounding numbers but there is no higher number
          parts[j].push(part_int.toString(16));
          parts[j].push(part_int.toString(16));
          var temp = part_int-1;
          parts[j].push(temp.toString(16));
        }
        else if(part_int == 0)
        {
          //if the the part is 0 (0) than look for surrounding numbers but there is no lower number
          parts[j].push(part_int.toString(16));
          parts[j].push(part_int.toString(16));
          var temp = part_int+1;
          parts[j].push(temp.toString(16));
        }
        else
        {
          //if the number has normal surrounding numbers.
          var temp = part_int-1;
          parts[j].push(temp.toString(16));
          var temp = part_int;
          parts[j].push(temp.toString(16));
          var temp = part_int+1;
          parts[j].push(temp.toString(16));
        }
        j++;
      }
      
      //array for all the combinations possible
      var colors = Array();
      
      //looping trough all found color codes found surrounding the original code
      //Ignores all doubles
      //sets all the possibilities
      for(var k = 0; k < 3; k++)
      {
        for(var k2 = 0; k2 < 3; k2++)
        {
          if (colors.indexOf(parts[0][k]+parts[1][k2]+parts[2][0]) == -1){
            colors.push(parts[0][k]+parts[1][k2]+parts[2][0]);
          }
          if (colors.indexOf(parts[0][k]+parts[1][k2]+parts[2][1]) == -1){
            colors.push(parts[0][k]+parts[1][k2]+parts[2][1]);
          }
          if (colors.indexOf(parts[0][k]+parts[1][k2]+parts[2][2]) == -1){
            colors.push(parts[0][k]+parts[1][k2]+parts[2][2]);
          }
        }
      }
      
      //checks if the color of the text should be white or black
      var total = parseInt(color[1], 16)+parseInt(color[3], 16)+parseInt(color[5], 16);
      var textColor = '#f2f2f2';
      if(total > 17)
      {
         var textColor = '#252525';
      }

      //Looping trough all the codes and make html (li) items
      colors.forEach(function(entry) {
        list_html = list_html+'<li style="color: ' + textColor + ';background: #' + entry + '">#' + entry.toUpperCase() + '</li>';
      });
      
      //settings the html in the list object
      list.innerHTML = list_html;
    }
    else
    {
      //if the code was too short give alert
       alert("color must have 7 characters"); 
    }
  };
});