<?php

// helper function to prevent XSS
function filter($data) {
	$data = trim(htmlentities(strip_tags($data)));
	if (get_magic_quotes_gpc())
		$data = stripslashes($data);
	return $data;
}

$name = filter($_POST['name']);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Cross-Domain Form Post Demo</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"></script>
</head>
<body>
	<div id="result"><p>Hello, <? echo $name; ?>! Server time is now: <? echo date('l jS \of F Y h:i:s A'); ?></p></div>
	   
	<script  type="text/javascript">
		window.name = $("#result").html();
		try {
			var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);

			if (typeof target != "undefined") {
				target.postMessage($("#result").html(), "*");
			}
		} catch (e) {/**/}
	</script>
    
</body>
</html>