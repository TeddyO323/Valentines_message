$(document).ready(function () {
    // Extract name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const recipientName = urlParams.get('name');

    if (recipientName) {
        $('#nameDisplay').text(decodeURIComponent(recipientName)); // Display name from link
        $('.name-input').hide(); // Hide input fields
        $('#sendBackContainer').show(); // Show the "Send Your Love Back" button
    }

    // Card hover effect
    $('.container').mouseenter(function () {
        $('.card').stop().animate({ top: '-150px' }, 'slow');
    }).mouseleave(function () {
        $('.card').stop().animate({ top: '0px' }, 'slow');
    });

    // Update name and generate link
    $('#updateName').click(function () {
        let enteredName = $('#nameInput').val().trim();

        if (enteredName !== "") {
            $('#nameDisplay').text(enteredName); // Update card text
            let encodedName = encodeURIComponent(enteredName);
            let shareableLink = `${window.location.origin}${window.location.pathname}?name=${encodedName}`;

            $('#generatedLink').val(shareableLink);
            $('#linkContainer').show(); // Show the link container
        } else {
            $('#nameDisplay').text("Dear"); // Default if empty
            $('#linkContainer').hide(); // Hide link container if empty
        }
    });

    // Copy link to clipboard
    $('#copyLink').click(function () {
        let linkInput = $('#generatedLink');
        linkInput.select();
        document.execCommand("copy");
        alert("Link copied! Share it with your Valentine ❤️");
    });

    // Allow recipient to send love back
    $('#sendBack').click(function () {
        $('.name-input').show(); // Show the name input section
        $('#sendBackContainer').hide(); // Hide the "Send Your Love Back" button
    });
});
