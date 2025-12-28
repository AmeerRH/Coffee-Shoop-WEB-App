function submitorder() {

    var name = document.getElementById('Firstname').value;
    var lastName = document.getElementById('Lastname').value;
    var phone = document.getElementById('phoneNumber').value;
    var israa = document.getElementById('israa').checked;
    var master = document.getElementById('master').checked;
    var visa = document.getElementById('visa').checked;
    var cardNumber = document.getElementById('Cardnumber').value;
    var expiryDate = document.getElementById('expirydate').value;
    var cvv = document.getElementById('CVV').value;

    var card = israa ? "israaCard" : (master ? "MasterCard" : (visa ? "visa" : "None"));


    var alertMsg = "";
    // Validation checks
    if (name.trim() === '') {
        alertMsg += "Please enter your first name.\n";
    }
    if (lastName.trim() === '') {
        alertMsg += "Please enter your last name.\n";
    }

    if(trim(phone).length != 10) {
		alertMsg = alertMsg + "Please enter number with 10 digits.\n";
	}
    if (!(israa || master || visa)) {
        alertMsg += "Please select a payment card.\n";
    }
    if (cardNumber.trim() === '') {
        alertMsg += "Please enter your card number.\n";
    }
    if (expiryDate.trim() === '') {
        alertMsg += "Please enter the expiry date.\n";
    }
    if (cvv.trim() === '') {
        alertMsg += "Please enter your CVV.\n";
    }
    if (alertMsg === '') {
        var textForDisplay = "Hello " + name + ' ' + lastName + "!<br/>";
        textForDisplay += "Your phone-number is: " + phone + "<br/>";
        textForDisplay += "You have chosen: " + card + " as your payment card.<br/>";
        textForDisplay += "Thank you for your order!";
        document.getElementById('res').innerHTML = textForDisplay;
        processInfo(name, lastName, phone, card);
    } else {
        // If any required field is missing, alert the user
        alert(alertMsg);
    }
}
function trim (str)
{
     return str.replace (/^\s+|\s+$/g, '');
}
function clearinformation(){
	document.getElementById('Firstname').value = '';
	document.getElementById('Lastname').value = '';
	document.getElementById('phoneNumber').value = '';
	document.getElementById('Cardnumber').value = '';
    document.getElementById('expirydate').value = '';
    document.getElementById('CVV').value = '';
	document.getElementById('res').innerHTML = '';	
}

function getAllOrders() {
    const customertable = getAllOrdersDb();
    let textPrint = '';
    for (const customer of customertable) {
        const [name, lastName, phone, card] = customer;
        textPrint += `Name: ${name} ${lastName}, Phone: ${phone}, Payment: ${card}<br/>`;
    }
    document.getElementById('res').innerHTML = textPrint;
}

function removeNameFunc() {
    // Get the value from the input field
    const name = document.getElementById('removeId').value.trim();

    // Check if the name is not empty
    if (name === '') {
        console.error('The provided name is empty.');
        return;
    }

    // Check if the item exists in localStorage
    if (localStorage.getItem(name)) {
        // Remove the item from localStorage
        localStorage.removeItem(name);
        console.log(`Item with name "${name}" has been removed.`);
        alert(`Item with name "${name}" has been removed.`);
    } else {
        console.warn(`No item found with the name "${name}".`);
        alert(`No item found with the name "${name}".`);
    }
}

function RemoveAllFunc() {
   
        localStorage.clear();


    }