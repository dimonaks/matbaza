var CsvToHtmlTable = CsvToHtmlTable || {};

var cl1_file = '0';
var cl2_file = '0';
function return_cl_var(input){
  //aksenov
      out = cl1_file.concat(' ', cl2_file)
      out = out.concat(cl2_file)
        return out;
}


CsvToHtmlTable = {
    init: function (options) {

      options = options || {};
      var csv_path = options.csv_path || "";
      var el = options.element || "table-container";
      var allow_download = options.allow_download || false;
      var csv_options = options.csv_options || {};
      var datatables_options = options.datatables_options || {};
      var custom_formatting = options.custom_formatting || [];

      $("#" + el).html("<table class='table table-striped table-condensed' id='" + el + "-table'></table>");

      $.when($.get(csv_path)).then(
        function(data){      
          var csv_data = $.csv.toArrays(data, csv_options);
          
          var table_head = "<thead><tr>";

          for (head_id = 0; head_id < csv_data[0].length; head_id++) { 
            table_head += "<th>" + csv_data[0][head_id] + "</th>";
          }

          table_head += "</tr></thead>";
          $('#' + el + '-table').append(table_head);


          var table_foot = "<tfoot><tr>";

          // $('#' + el + '-table').append("<tfoot></tfoot>");


          for (head_id = 0; head_id < csv_data[0].length; head_id++) { 
            table_foot += "<th>" + csv_data[0][head_id] + "</th>";
          }

          table_foot += "</tr></tfoot>";
          $('#' + el + '-table').append(table_foot);





          $('#' + el + '-table').append("<tbody></tbody>");

          for (row_id = 1; row_id < csv_data.length; row_id++) { 
            var row_html = "<tr>";

            //takes in an array of column index and function pairs
            if (custom_formatting != []) {
              $.each(custom_formatting, function(i, v){
                var col_idx = v[0]
                var func = v[1];
                csv_data[row_id][col_idx]= func(csv_data[row_id][col_idx]);
              })
            }

            for (col_id = 0; col_id < csv_data[row_id].length; col_id++) { 
              row_html += "<td>" + csv_data[row_id][col_id] + "</td>";
            }
              
            row_html += "</tr>";
            $('#' + el + '-table tbody').append(row_html);
            console.log('csv: ', $('#' + el + '-table tbody').length)

          }

          //Aksyonov insertion
      $('#' + el + '-table tfoot th').each( function () {
        console.log('scr3');

        var title = $(this).text();
        console.log(title);

        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
      } );


          var events = $('#events');
          var table =  $('#' + el + '-table').DataTable(datatables_options);  // lauch of table 

      // Apply the search
      table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
            that
              .search( this.value )
              .draw();
          }
        } );
      } );





//  show selected on action
//    table
//        .on( 'select', function ( e, dt, type, indexes ) {
//            var rowData = table.rows( indexes ).data().toArray();
//            events.prepend( '<div><b>'+type+' selection</b> - '+JSON.stringify( rowData )+'</div>' );
//        } )
//        .on( 'deselect', function ( e, dt, type, indexes ) {
//            var rowData = table.rows( indexes ).data().toArray();
//            events.prepend( '<div><b>'+type+' <i>de</i>selection</b> - '+JSON.stringify( rowData )+'</div>' );
//        } );

    table
	        .on( 'select', function ( e, dt, type, indexes ) {
	            var rowData = table.rows( indexes ).data().toArray();
            //Aksenov
            // events.prepend( '<div><b>'+type+' selection</b> - '+JSON.stringify( rowData )+'</div>' );
	            cl2_file = cl1_file;
              // alert(rowData[0][5], rowData[0].length);
              i_path = rowData[0].length - 2
	            cl1_file = JSON.stringify( rowData[0][i_path] );
              // alert(cl1_file);
				        } );
















          if (allow_download)
            $("#" + el).append("<p><a class='btn btn-info' href='" + csv_path + "'><i class='glyphicon glyphicon-download'></i> Download as CSV</a></p>");
        });
    }
}
