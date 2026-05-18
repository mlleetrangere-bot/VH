<?php
// golf-proxy.php
// Postavi ovaj fajl na isti server kao golf-caddie.html

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$query = urlencode($_GET['q'] ?? '');
if (!$query) { echo '{"error":"no query"}'; exit; }

$url = "https://api.golfcourseapi.com/v1/search?search_query={$query}";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Key 4DTM7WM5HDWDZ26B7VVYUSP75A'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$result = curl_exec($ch);
curl_close($ch);

echo $result ?: '{"data":[]}';
