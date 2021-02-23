
      var requestfile = 'Cases.json';
      var req=new XMLHttpRequest();
      req.open('GET',requestfile);
      req.responseType='json';
      req.send();

      req.onload=function(){
          var diunim=req.response;
          maketable(diunim); 
        }

      function maketable(jsonObj){
        
        var keys=Object.keys(jsonObj[0]);
        var table=document.createElement("table");
        var tfoot=document.createElement("tfoot"); 
        var thead=document.createElement("thead");
        var tbody=document.createElement("tbody");
        
        
        table.id="tableid";
        table.className ="display";
        
        var tr = table.insertRow(-1);
        //Tead
        for(var i=0 ;i<keys.length;i++){
          var th=document.createElement("th");
          th.innerHTML=keys[i];
          tr.appendChild(th);
        }
          
        //Tbody
        for(var j=0 ; j<jsonObj.length ; j++){
          var tr1 = table.insertRow(-1);
          for(var n=0 ; n<keys.length ; n++){
            var tCell = tr1.insertCell(-1);
            tCell.innerHTML = jsonObj[j][keys[n]];
          }
            
        
          thead.appendChild(tr);

          
        }
        
        table.appendChild(thead);

        var tr2=document.createElement("tr");
        for(var p=0 ; p<keys.length ;p++){
          var th=document.createElement("th");
          th.innerHTML=keys[p];
          tr2.appendChild(th);
        }
        tfoot.appendChild(tr2); 
        table.appendChild(tfoot);   
        var divContainer = document.getElementById("demo");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        
      };
      $(document).ready(function() {      
        $('#tableid').DataTable( {
             initComplete: function () {
                 this.api().columns().every( function () {
                     var column = this;
                     var select = $('<select><option value=""></option></select>')
                         .appendTo( $(column.footer()).empty() )
                         .on( 'change', function () {
                             var val = $.fn.dataTable.util.escapeRegex(
                                 $(this).val()
                             );
      
                             column
                                 .search( val ? '^'+val+'$' : '', true, false )
                                 .draw();
                         } );
      
                     column.data().unique().sort().each( function ( d, j ) {
                         select.append( '<option value="'+d+'">'+d+'</option>' )
                     } );
                 } );
             }
         } );
     } );