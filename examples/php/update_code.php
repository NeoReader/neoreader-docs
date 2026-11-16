<?php

// Needs the curl extension. Run: NEOREADER_TOKEN=... php update-code.php

$base = getenv('NEOREADER_API_URL') ?: 'https://neoreader.com/api/v1';
$token = getenv('NEOREADER_TOKEN') ?: exit("Set NEOREADER_TOKEN to your API token\n");
getenv('NEOREADER_SLUG') ?: exit("Set NEOREADER_SLUG to the slug of one of your codes\n");

$ch = curl_init($base.'/codes/'.rawurlencode(getenv('NEOREADER_SLUG')));
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'PATCH',
    CURLOPT_HTTPHEADER => ['Authorization: Bearer '.$token, 'Accept: application/json', 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
        'destination' => 'https://example.com/summer-menu',
        'expires_at' => '2026-12-31T23:59:00Z',
    ]),
]);
$data = json_decode(curl_exec($ch), true);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

echo $status.' '.json_encode($data, JSON_PRETTY_PRINT)."\n";
