<?php
// Database connection
$mysqli = new mysqli($localhost, 2306718, r4zfav, db2306718);

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// Login authentication
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    $username = $mysqli->real_escape_string($_POST["username"]);

    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row["password"];

        if (password_verify($_POST["password"], $hashedPassword)) {
            // Login successful
            session_start();
            $_SESSION["username"] = $username;
            echo "Login successful";

            // Remove "Login" link from navigation bar
            echo "<script>
                    var loginLink = document.getElementById('login-link');
                    loginLink.style.display = 'none';
                  </script>";

            // Appointment booking code
            if (isset($_POST["book_appointment"])) {
                $service = $mysqli->real_escape_string($_POST["service"]);
                $date = $mysqli->real_escape_string($_POST["date"]);
                $time = $mysqli->real_escape_string($_POST["time"]);

                $sql = "SELECT doctor FROM doctor_availability WHERE service = ? AND date = ?";
                $stmt = $mysqli->prepare($sql);
                $stmt->bind_param("ss", $service, $date);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $doctor = $row["doctor"];

                    // Check if the doctor is available for the selected time
                    $sql = "SELECT * FROM doctor_schedule WHERE doctor = ? AND date = ? AND time_slot LIKE ?";
                    $stmt = $mysqli->prepare($sql);
                    $timeSlot = "%$time%";
                    $stmt->bind_param("sss", $doctor, $date, $timeSlot);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    if ($result->num_rows > 0) {
                        echo "Appointment booked with $doctor for $service on $date at $time";
                    } else {
                        echo "No doctor available for the selected time slot";
                    }
                } else {
                    echo "No doctor available for the selected service and date";
                }

                $stmt->close();
            }
        } else {
            echo "Invalid username or password";
        }
    } else {
        echo "Invalid username or password";
    }

    $stmt->close();
}

// Sign-up authentication
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["signup"])) {
    $fullname = $mysqli->real_escape_string($_POST["fullname"]);
    $email = $mysqli->real_escape_string($_POST["email"]);
    $username = $mysqli->real_escape_string($_POST["username"]);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ssss", $fullname, $email, $username, $password);

    if ($stmt->execute()) {
        echo "You have created a new account successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$mysqli->close();
?>