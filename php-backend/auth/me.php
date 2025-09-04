<?php
include_once '../config/database.php';
include_once '../models/User.php';
include_once '../utils/jwt.php';

$decoded = JWT::validateToken();

if ($decoded) {
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    $userData = $user->findById($decoded['user_id']);
    
    if ($userData) {
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "user" => $userData
        ));
    } else {
        http_response_code(404);
        echo json_encode(array(
            "success" => false,
            "message" => "User not found"
        ));
    }
} else {
    http_response_code(401);
    echo json_encode(array(
        "success" => false,
        "message" => "Unauthorized"
    ));
}
?>