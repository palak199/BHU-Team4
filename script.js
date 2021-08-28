var str;
  function grab() {
        /* Promise to make sure data loads */
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "data.json",
                method: "GET",
                dataType: 'JSON',
                success: function(data) {
                    resolve(data)
                },
                error: function(error) {
                    reject(error);
                }
            })
        })
    }
    let history = [];
    $(document).ready(function(){
    // Get value on button click and show alert
    $("#myBtn2").click(function() {
      $("#result").empty();
      $.each(history, function(index, value){
            $("#result").append(index + ": " + value + '<br>');
        });
    });
    $("#myBtn").click(function(){
        str = $("#myInput").val();
        history.push(str);
        
        grab().then((data) => {
            console.log('Recieved our data', data);
            let regions = [];
            let value = [];

            try {
                data.forEach((item) => {
                  if(item.symbol === str) {
                    regions.push(item.date);
                    value.push(item.volume);
                  }
                });

                let chartdata = {
                    labels: [...regions],
                    datasets: [{
                        label: str,
                        backgroundColor: 'rgba(200, 200, 200, 0.75)',
                        borderColor: 'rgba(200, 200, 200, 0.75)',
                        hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                        hoverBorderColor: 'rgba(200, 200, 200, 1)',
                        data: [...value]
                    }]
                };

                let ctx = $("#myChart");

                let barGraph = new Chart(ctx, {
                    type: 'bar',
                    data: chartdata
                });

            } catch (error) {
                console.log('Error parsing JSON data', error)
            }

        }).catch((error) => {
            console.log(error);
        })
    });

    // $(document).ready(function(){
    //     $.each(history, function(index, value){
    //         $("#result").append(index + ": " + value + '<br>');
    //     });
    // });

});
    