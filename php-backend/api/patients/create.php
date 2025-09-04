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

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['first_name']) && !empty($data['last_name'])) {
    $patientId = $patient->create($data);
    
    if ($patientId) {
        $newPatient = $patient->getById($patientId);
        http_response_code(201);
        echo json_encode(array(
            "success" => true,
            "message" => "Patient created successfully",
            "data" => $newPatient
        ));
    } else {
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "message" => "Failed to create patient"
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "First name and last name are required"
    ));
}
?>