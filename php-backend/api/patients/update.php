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

if (!empty($data['id'])) {
    $updated = $patient->update($data['id'], $data);
    
    if ($updated) {
        $updatedPatient = $patient->getById($data['id']);
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "Patient updated successfully",
            "data" => $updatedPatient
        ));
    } else {
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "message" => "Failed to update patient"
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