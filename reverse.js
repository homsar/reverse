function copy_text() {
    /* Thanks to w3schools https://www.w3schools.com/howto/howto_js_copy_clipboard.asp */
  
    // Get the text field
    var copyText = document.getElementById("to");

    // Select the text field
    copyText.select(); 
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
}

function reverse_text(the_text) {
    return the_text.split('\n').map(line => line.split(' ').reverse().join(' ')).join('\n');
}


window.onload = function() {
    let from_text = document.getElementById('from');
    let to_text = document.getElementById('to');

    from_text.addEventListener(
	'input', function() {
	    to_text.value = reverse_text(from_text.value);
	}
    );
}
