<?php
include_once '../config/database.php';

http_response_code(200);
echo json_encode(array(
    "success" => true,
    "message" => "Logout successful"
));
?>