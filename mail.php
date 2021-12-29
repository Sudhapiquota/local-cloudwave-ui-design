<?php
//get data from form  

$name = $_POST['name'];
$email= $_POST['email'];
$number= $_POST['number'];
$message= $_POST['message'];
$to = "sudha@piquota.com";
$subject = "Mail From Cloudwave";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n  Contact Number = " . $number . "\r\n Message =" . $message;
$headers = "From: noreply@cloudwave.com" . "\r\n" .
"CC: menaka@piquota.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
//redirect
header("Location:thankyou.html");
?>