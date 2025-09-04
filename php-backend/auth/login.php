<?php
include_once '../config/database.php';
include_once '../models/User.php';
include_once '../utils/jwt.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $userData = $user->login($data->email, $data->password);
    
    if ($userData) {
        $payload = array(
            "user_id" => $userData['id'],
            "email" => $userData['email'],
            "role" => $userData['role'],
            "exp" => time() + (24 * 60 * 60) // 24 hours
        );
        
        $jwt = JWT::encode($payload);
        
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "Login successful",
            "token" => $jwt,
            "user" => array(
                "id" => $userData['id'],
                "email" => $userData['email'],
                "name" => $userData['name'],
                "role" => $userData['role']
            )
        ));
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Invalid credentials"
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Email and password required"
    ));
}
?>