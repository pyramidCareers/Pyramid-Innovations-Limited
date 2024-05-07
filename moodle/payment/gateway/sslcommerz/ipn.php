<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * sslcommerz instant payments notifications page
 *
 * @package    paygw_sslcommerz
 * @copyright  2022 Brain station 23 ltd.
 * @author     Brain station 23 ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use core_payment\helper;

require_once(__DIR__ . '/../../../config.php');
global $DB, $CFG, $USER;

require_login();

$component = required_param('component', PARAM_ALPHANUMEXT);
$paymentarea = required_param('paymentarea', PARAM_ALPHANUMEXT);
$itemid = required_param('itemid', PARAM_INT);
$valid = urlencode($_POST['val_id']);

$config     = (object) helper::get_gateway_configuration($component, $paymentarea, $itemid, 'sslcommerz');

$storeid = urlencode($config->storeid);
$storepasswd = urlencode($config->storepassword);
if ($config->paymentmodes == 'live') {
    $localpc = true;
    $requestedurl = "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?val_id=" .
        $valid . "&store_id=" . $storeid . "&store_passwd=" . $storepasswd . "&v=1&format=json";
} else {
    $localpc = false;
    $requestedurl = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=" .
        $valid . "&store_id=" . $storeid . "&store_passwd=" . $storepasswd . "&v=1&format=json";
}


$handle = curl_init();
curl_setopt($handle, CURLOPT_URL, $requestedurl);
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, $localpc); // IF YOU RUN FROM LOCAL PC.
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, $localpc); // IF YOU RUN FROM LOCAL PC.

$result = curl_exec($handle);

$code = curl_getinfo($handle, CURLINFO_HTTP_CODE);

if ($code == 200 && !(curl_errno($handle))) {
    // TO CONVERT AS OBJECT.
    $result = json_decode($result);

    // TRANSACTION INFO.
    $status = $result->status;
    $trandate = $result->tran_date;
    $tranid = $result->tran_id;
    $valid = $result->val_id;
    $amount = $result->amount;
    $storeamount = $result->store_amount;
    $banktranid = $result->bank_tran_id;
    $cardtype = $result->card_type;

    // Databaseinfo.
    $data = new stdClass();
    $data->userid = $USER->id;
    $data->itemid = $itemid;
    $data->currency = $result->currency;
    $data->amount = $amount;
    $data->payment_status = $status;
    $data->txn_id = $tranid;
    $data->timeupdated = time();

    $DB->insert_record('paygw_sslcommerz', $data);

    // Course enrollment.
    if ($status == "VALID") {
        redirect($CFG->wwwroot .
            '/payment/gateway/sslcommerz/success.php?component=' . $component . '&paymentarea=' . $paymentarea .
            '&itemid=' . $itemid);
        exit();
    } else {
        redirect($CFG->wwwroot .
            '/payment/gateway/sslcommerz/cancel.php?component=' . $component . '&paymentarea=' . $paymentarea .
            '&itemid=' . $itemid);
        exit();
    }
} else {
    echo "Failed to connect with SSLCOMMERZ";
}
