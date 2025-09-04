<?php
class Patient {
    private $conn;
    private $table_name = "patients";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($limit = 50, $offset = 0) {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table_name . " SET 
                  first_name=:first_name, last_name=:last_name, email=:email, 
                  phone=:phone, date_of_birth=:date_of_birth, gender=:gender, 
                  address=:address, emergency_contact_name=:emergency_contact_name, 
                  emergency_contact_phone=:emergency_contact_phone, insurance_provider=:insurance_provider, 
                  insurance_number=:insurance_number, medical_history=:medical_history";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":first_name", $data['first_name']);
        $stmt->bindParam(":last_name", $data['last_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":phone", $data['phone']);
        $stmt->bindParam(":date_of_birth", $data['date_of_birth']);
        $stmt->bindParam(":gender", $data['gender']);
        $stmt->bindParam(":address", $data['address']);
        $stmt->bindParam(":emergency_contact_name", $data['emergency_contact_name']);
        $stmt->bindParam(":emergency_contact_phone", $data['emergency_contact_phone']);
        $stmt->bindParam(":insurance_provider", $data['insurance_provider']);
        $stmt->bindParam(":insurance_number", $data['insurance_number']);
        $stmt->bindParam(":medical_history", $data['medical_history']);
        
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function update($id, $data) {
        $query = "UPDATE " . $this->table_name . " SET 
                  first_name=:first_name, last_name=:last_name, email=:email, 
                  phone=:phone, date_of_birth=:date_of_birth, gender=:gender, 
                  address=:address, emergency_contact_name=:emergency_contact_name, 
                  emergency_contact_phone=:emergency_contact_phone, insurance_provider=:insurance_provider, 
                  insurance_number=:insurance_number, medical_history=:medical_history
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":first_name", $data['first_name']);
        $stmt->bindParam(":last_name", $data['last_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":phone", $data['phone']);
        $stmt->bindParam(":date_of_birth", $data['date_of_birth']);
        $stmt->bindParam(":gender", $data['gender']);
        $stmt->bindParam(":address", $data['address']);
        $stmt->bindParam(":emergency_contact_name", $data['emergency_contact_name']);
        $stmt->bindParam(":emergency_contact_phone", $data['emergency_contact_phone']);
        $stmt->bindParam(":insurance_provider", $data['insurance_provider']);
        $stmt->bindParam(":insurance_number", $data['insurance_number']);
        $stmt->bindParam(":medical_history", $data['medical_history']);
        
        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        return $stmt->execute();
    }

    public function search($query) {
        $searchTerm = "%{$query}%";
        $sql = "SELECT * FROM " . $this->table_name . " 
                WHERE first_name LIKE :search OR last_name LIKE :search OR email LIKE :search OR phone LIKE :search
                ORDER BY created_at DESC LIMIT 20";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':search', $searchTerm);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>