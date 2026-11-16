<?php

// Needs the curl extension. Run: NEOREADER_TOKEN=... php list-codes.php

$base = getenv('NEOREADER_API_URL') ?: 'https://neoreader.com/api/v1';
$token = getenv('NEOREADER_TOKEN') ?: exit("Set NEOREADER_TOKEN to your API token\n");

$ch = curl_init($base.'/codes?status=active&per_page=10');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => ['Authorization: Bearer '.$token, 'Accept: application/json'],
]);
$data = json_decode(curl_exec($ch), true);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

echo $status.' '.json_encode($data, JSON_PRETTY_PRINT)."\n";
