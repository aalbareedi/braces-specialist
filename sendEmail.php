<?php
// GET array is automatically defined for you with the key/values from the query string
// calling mail function in PHP (target address, subject, body)
$body = "Name: " . $_GET["name"] . 
"\n" . "Email: " . $_GET["email"] . 
"\n" . "Phone: " . $_GET["phone"] . 
"\n" . "Message: " . $_GET["msg"];

mail("aalbareedi@yahoo.com", "Message from Braces Specialist", $body);
?>

