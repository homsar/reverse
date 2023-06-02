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


function reverse_single_name(name) {
    var split_name = name.split(' ');
    if (split_name.length == 2) {
	return split_name.reverse().join(' ');
    } else {
	return name;
    }
}


function reverse_line(the_line) {
    var output_line = "";
    var current_name = "";

    for (var char_idx = 0; char_idx < the_line.length; char_idx++) {
	var current_char = the_line[char_idx];

	if ((char_idx == the_line.length - 1) && (current_char != ")")) {
	    current_name = current_name + current_char;
	    output_line = output_line + reverse_single_name(current_name);

	} else if ('),:'.includes(current_char)) {
	    output_line = output_line + reverse_single_name(current_name) + current_char;
	    current_name = "";

	} else if ('('.includes(current_char)) {
	    if (current_name.substring(current_name.length - 1) == " ") {
		current_char = " " + current_char;
		current_name = current_name.substring(0, current_name.length - 1);
	    }

	    output_line = output_line + reverse_single_name(current_name) + current_char;
	    current_name = "";

	} else {
	    current_name = current_name + current_char;
	    if (current_name.substring(current_name.length - 5) == " and ") {
		output_line = output_line + reverse_single_name(current_name.substring(0, current_name.length - 5)) + " and ";
		current_name = "";

	    } else if ((current_name == " ") || (current_name == "and ")) {
		output_line = output_line + current_name;
		current_name = "";
	    }
	}
    }
    return output_line;
}

function reverse_all(the_text) {
    return the_text.split('\n').map(reverse_line).join('\n');
}


window.onload = function() {
    let from_text = document.getElementById('from');
    let to_text = document.getElementById('to');

    from_text.addEventListener(
	'input', function() {
	    to_text.value = reverse_all(from_text.value);
	}
    );
}
