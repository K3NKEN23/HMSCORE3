<?php
include_once '../../config/database.php';
include_once '../../models/Patient.php';
include_once '../../utils/jwt.php';

$decoded = JWT::validateToken();
if (!$decoded) {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Unauthorized"));
    exit();
}

$database = new Database();
$db = $database->getConnection();
$patient = new Patient($db);

$query = isset($_GET['q']) ? $_GET['q'] : '';

if (!empty($query)) {
    $results = $patient->search($query);
    
    http_response_code(200);
    echo json_encode(array(
        "success" => true,
        "data" => $results
    ));
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Search query required"
    ));
}
?>