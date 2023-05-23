<!DOCTYPE html>
<html>
  <head>
    <title>Crowfoot North</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="script.js"></script>
    <script> document.getElementById("demo").innerHTML = sessionStorage.getItem("lastname"); // retrieve from session storage </script>
  </head>
  <header>
    <div class="logo">
      <a href="sample.html">
        <img src="img/logo.png" alt="Logo">
      </a>
    </div>
    <nav>
      <ul>
        <li><a href="sample.html">Home</a></li>
        <li><a href="futureloc.html">Future Locations</a></li>
        <li><a href="aboutus.html">About Us</a></li>
      </ul>
    </nav>
  </header>
<body>
        <h1>Crowfoot Station</h1>
        <?php
                // *******BASIC PHP CODE TO CONNECT TO THE SQL DATABASE*******

                // Connect to the database
                $servername = "localhost";
                $username = "root";
                $password = "P@ssword";
                $dbname = "prm";

                $conn = new mysqli($servername, $username, $password, $dbname);
                if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                }

                // *******QUERY THE LATEST VALUE FROM THE "COUNTER" COLUMN*******
                $sql = "SELECT counter FROM cfn ORDER BY timestamp DESC LIMIT 1";
                $result = $conn->query($sql);

                // Check if there is at least one row in the result
                if ($result->num_rows > 0) {
                        // Output data of the latest record
                        while($row = $result->fetch_assoc()) {
                                $counter = $row["counter"];
                        }
                } else {
                        echo "0 results";
                }

                $conn->close();
        ?>
        <p>There are <?php echo $counter; ?> parking spots left.</p>
        <p>Click <a href="try.php">here</a> to see live updates.</p>
</body>
</html>
