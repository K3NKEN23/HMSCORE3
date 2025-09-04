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

$id = isset($_GET['id']) ? $_GET['id'] : '';

if (!empty($id)) {
    $patientData = $patient->getById($id);
    
    if ($patientData) {
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => $patientData
        ));
    } else {
        http_response_code(404);
        echo json_encode(array(
            "success" => false,
            "message" => "Patient not found"
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Patient ID required"
    ));
}
?>