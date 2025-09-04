<?php
class User {
    private $conn;
    private $table_name = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($email, $password) {
        $query = "SELECT id, email, name, role, password FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row && password_verify($password, $row['password'])) {
            unset($row['password']);
            return $row;
        }
        return false;
    }

    public function findById($id) {
        $query = "SELECT id, email, name, role, created_at, updated_at FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table_name . " SET email=:email, name=:name, role=:role, password=:password";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":name", $data['name']);
        $stmt->bindParam(":role", $data['role']);
        $stmt->bindParam(":password", password_hash($data['password'], PASSWORD_DEFAULT));
        
        return $stmt->execute();
    }
}
?>