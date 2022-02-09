<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Prochains trains</title>
    <link rel="stylesheet" href="../css/default.css">
    <link rel="stylesheet" href="../css/terminus_schedules.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="../css/auto_completion.css">
  </head>
  <body id="body">
    <div id="bg_image"></div>
    <?php
      include("sidebar.php");
    ?>
    <div id="content">
      <h1>Prochains trains:</h1>
      <div id="background">
        <form id="auto-suggest" action="#" method="post">
          <input type="time" name="time" id="time" required>
          <input type="station" name="station" id="station" value="Rechercher..." onfocus="if(this.value=='Rechercher...')this.value=''" required>
          <input type="button" id="button" value="info train" onclick="getInfos('../js/terminus_schedules2.js')"><!--getInfos() se trouve dans index.js-->
        </form>
        <h2 id="infos"></h2>
      </div>
    </div>
    <?php
      include("bas.php");
    ?>
    
    <script src="../js/picto_adder.js"></script>
    <script src="../js/request_builder.js"></script>
    <script src="../js/auto_completion.js"></script>
    <script src="../js/time.js"></script>
    <script src="../js/stop_areas.js"></script>
    <script src="../js/index.js"></script>
  </body>
</html>