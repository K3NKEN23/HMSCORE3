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

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$patients = $patient->getAll($limit, $offset);

http_response_code(200);
echo json_encode(array(
    "success" => true,
    "data" => $patients
));
?>