var employeeArray = [];

$(document).ready(function(){
    //hide output area on load
    $('#totalOutputArea').hide();
    $('#top-headers').hide();

    //initialize counter for each row to 0
    var intCounter = 0;

    //when form is submitted
    $("#employeeInfo").submit(function(event){
        event.preventDefault();
        
        //set up blank object
        var values = {};

        //increment counter
        intCounter++;

        //add each item to an object
        $.each($("#employeeInfo").serializeArray(), function(i, field){
            values[field.name] = field.value;
        });

        //clear form on submit
        $("#employeeInfo").find("input[type=text]").val("");
        $("#employeeInfo").find("input[type=number]").val("");

        //add items to the array
        employeeArray.push(values);

        var outputForPage = runTotal(employeeArray);

        $('#totalMonthlySalaries').text(outputForPage);
        $('#totalOutputArea').slideDown();
        $('#top-headers').slideDown();

        //add items from line 22 to the DOM
        appendDom(values, intCounter);

    });

    //delete click event
    $('#employeeContainer').on('click', '.deleteRowButton', function(){
             //remove item from DOM   
            $(this).parent().slideUp().remove();
            
            //figure out which item is being deleted
            var itemToDelete = $(this).find('.counter').data('counter');
            
            //remove item from the array
            removeItem(itemToDelete,employeeArray);

            //put results of run toatal in var and display   
            var output = runTotal(employeeArray);
            $('#totalMonthlySalaries').text(output).fadeIn();   
    });
});


function appendDom(employee, i){
    //add each row to the DOM when submitted
    $("#employeeContainer").append("<div class='employee well'></div>");

    var $el = $("#employeeContainer").children().last();
    
    $el.append("<p class='counter' data-counter=' " + i +"  '></p>");
    $el.append("<p class='employeeName'>" + employee.employeeName + "</p>");
    $el.append("<p class='employeeNumber'>" + employee.employeeNumber + "</p>");
    $el.append("<p class='employeeTitle'>" + employee.employeeTitle + "</p>");

    //get employee salary, parse , add commas using .toLocaleString
    var salaryOutput = parseInt(employee.employeeSalary).toLocaleString('en');

    //salary to DOM
    $el.append("<p class='employeeSalary'>$" + salaryOutput + "</p>");
    
    //append delete button
    $el.append("<button class='deleteRowButton btn btn-danger'><span class='glyphicon glyphicon-remove-sign'></span>delete</button>");

}

function runTotal(employeeArray){
    //initialize return variable
    var totalToReturn = 0; 
    for (var i = 0; i < employeeArray.length; i++) {
        // get employee salary from every row, total, put in totalToReturn
        var inputRow = parseInt(employeeArray[i].employeeSalary/12);
        totalToReturn = totalToReturn + inputRow;
    }
    return totalToReturn.toLocaleString('en');
}

//give index and an array and it will be removed
//used with delete button
function removeItem(index, array){
    array.splice(index,1);
}



