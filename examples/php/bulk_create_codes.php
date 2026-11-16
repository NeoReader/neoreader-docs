<?php

// Makes one dynamic QR code for each row of a CSV file (title,destination,folder) and prints the short URLs.
// Needs the curl extension. Run: NEOREADER_TOKEN=... php bulk_create_codes.php ../bulk/codes.csv

$base = getenv('NEOREADER_API_URL') ?: 'https://neoreader.com/api/v1';
$token = getenv('NEOREADER_TOKEN') ?: exit("Set NEOREADER_TOKEN to your API token\n");

$handle = fopen($argv[1] ?? '../bulk/codes.csv', 'r');
fgetcsv($handle, 0, ',', '"', ''); // header row

while (($row = fgetcsv($handle, 0, ',', '"', '')) !== false) {
    [$title, $destination, $folder] = array_pad($row, 3, '');
    $payload = ['title' => $title, 'destination' => $destination] + ($folder !== '' ? ['folder' => $folder] : []);

    $ch = curl_init($base.'/codes');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer '.$token, 'Accept: application/json', 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HEADER => true,
    ]);
    $raw = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $headers = substr($raw, 0, curl_getinfo($ch, CURLINFO_HEADER_SIZE));
    $data = json_decode(substr($raw, strlen($headers)), true);

    echo $status === 201 ? $data['data']['short_url'] : "$title: ".($data['message'] ?? 'Request failed'), "\n";

    // Over the rate limit: wait as long as the server says. Otherwise stay under 120 requests a minute.
    $wait = $status === 429 && preg_match('/^Retry-After:\s*(\d+)/mi', $headers, $m) ? (int) $m[1] : 0;
    $wait > 0 ? sleep($wait) : usleep(600000);
}
fclose($handle);
