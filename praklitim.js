var requestfile = 'Attorney.json';
        var req=new XMLHttpRequest();
        req.open('GET',requestfile);
        req.responseType='json';
        req.send();
        req.onload=function(){
          var praklitim=req.response;
          DiunimReq (praklitim); 
            
        }
    

        function DiunimReq(praklitim){
          var praklits =praklitim;     
          var requestfiletwo = 'Diunim.json';
          var reqtwo = new XMLHttpRequest();
          reqtwo.open('GET', requestfiletwo);
          reqtwo.responseType = 'json';
          reqtwo.send();

          reqtwo.onload = function(){
            var diunim = reqtwo.response;
            maketable(praklits,diunim);
          } 
      
        }

      
        function maketable(jsonObj,diunimObj){
       
          InsertDiunim(jsonObj,diunimObj);
          overload(jsonObj,diunimObj);
          FilterTable();
        
          var keys=Object.keys(jsonObj[0]);
          var table=document.createElement("table");
          var tfoot=document.createElement("tfoot"); 
          var thead=document.createElement("thead");
          var tbody=document.createElement("tbody");
        
        
          table.id='tableid';
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
          var divContainer = document.getElementById("showData");
          divContainer.innerHTML = "";
          divContainer.appendChild(table);
        }


        function InsertDiunim(prakO,diunO){
          counter=0;
          for(var j = 0 ; j<prakO.length; j++){
            for(var k =0 ; k<diunO.length; k++){
              if(prakO[j]['שם']==diunO[k]['פרקליט']){
                counter++;
              }
              prakO[j]['מספר דיונים']=counter;
            }
            counter=0;              
          }
        }

        function overload(praklit,diun){
          var keys=Object.keys(praklit[0]);
          var Names=[];
          var intership=[];
          var numofdiun=[];
          var numofcass=[];
          var mahoz=[];
          var overload=[];
          var overloadweight=[];
        
          for(var k=0;k<praklit.length;k++){
            Names.push(praklit[k]['שם']);
            intership.push(praklit[k]['התמחות'])
            numofdiun.push(praklit[k]['מספר דיונים']);
            numofcass.push(praklit[k]['מספר תיקים']);
            mahoz.push(praklit[k]['מחוז']);
            overload.push(praklit[k]['עומס']);
            overloadweight.push(praklit[k]['משקל עומס']);

          }

        
          for(var j=0;j<praklit.length;j++){  
            NumOFdiiunim=praklit[j]['מספר דיונים'];
            NameOfPraklit=praklit[j]['שם'];
            timOFdiun=CalculateTimeOfDiun(diun,NameOfPraklit);
            totaltimeOFdiunim=CalculateTotalTime(diun);
            sum=colculate(NumOFdiiunim,timOFdiun,totaltimeOFdiunim);
            praklit[j].עומס=sum;
            if(praklit[j].עומס<=0.1 && praklit[j].עומס>=0){
              praklit[j]['משקל עומס']= 1;
            } else if(praklit[j].עומס<=0.2 && praklit[j].עומס>=0.1){
              praklit[j]['משקל עומס']= 2;
            }else if(praklit[j].עומס<=0.3 && praklit[j].עומס>=0.2){
              praklit[j]['משקל עומס']= 3;
            }else if(praklit[j].עומס<=0.4 && praklit[j].עומס>=0.3){
              praklit[j]['משקל עומס']= 4;
            }else{
              praklit[j]['משקל עומס']= 5;
            }      
          }
        }
        function colculate(numofdiun,timeofdiun,totaltimeofdiunim){
          sum= (numofdiun*timeofdiun)/(totaltimeofdiunim);
          return(sum);
        }
        function CalculateTimeOfDiun(Diun,nameOfPraklit){
          var time =0;
          for(var j=0; j<Diun.length; j++){
              if(Diun[j]['פרקליט']==nameOfPraklit){
              time=Diun[j]['זמן צפוי'];
            }
          }
          return time ;
        }
        function CalculateTotalTime(Diun){
          var sum = 0;
          for(var j =0; j<Diun.length; j++){
            sum+=Diun[j]['זמן צפוי'];
          }
          return sum;
        }
        function FilterTable(){
            $(document).ready(function() {      
              
              $('#tableid').DataTable( {
              
                initComplete: function () {
               
                  this.api().columns().every( function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex($(this).val());
                      column.search( val ? '^'+val+'$' : '', true, false ).draw();
                    });
      
                    column.data().unique().sort().each( function ( d, j ) {
                      select.append( '<option value="'+d+'">'+d+'</option>' )
                    });
                  });
                }
              });
            });
            }