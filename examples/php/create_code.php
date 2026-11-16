<?php

// Needs the curl extension. Run: NEOREADER_TOKEN=... php create-code.php

$base = getenv('NEOREADER_API_URL') ?: 'https://neoreader.com/api/v1';
$token = getenv('NEOREADER_TOKEN') ?: exit("Set NEOREADER_TOKEN to your API token\n");

$ch = curl_init($base.'/codes');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_HTTPHEADER => ['Authorization: Bearer '.$token, 'Accept: application/json', 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
        'title' => 'Spring menu',
        'destination' => 'https://example.com/menu',
        'folder' => 'Restaurant',
        'utm' => [
            'utm_source' => 'qr',
            'utm_medium' => 'print',
        ],
    ]),
]);
$data = json_decode(curl_exec($ch), true);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

echo $status.' '.json_encode($data, JSON_PRETTY_PRINT)."\n";
