<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Ontime</title>
    <link rel="stylesheet" href="../css/default.css">
    <link rel="stylesheet" href="../css/itineraire.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <?php
        include("leaflet.php");
    ?>
  </head>
  <body>
    <div id="bg_image"></div>
    <?php
      include("../php/sidebar.php");
    ?>
    <div id="content">
      <h1 id="titre">Où voulez-vous aller?</h1>
      <div id="mapid"></div>
      <h2 id="infos"></h2>
    </div>
    <?php
      include("bas.php");
    ?>
    <script src="../js/time.js"></script>
    <script src="../js/map_creator.js"></script>
    <script src="../js/picto_adder.js"></script>
    <script src="../js/itineraire.js"></script>
    <script src="../js/request_builder.js"></script>
  </body>
</html>