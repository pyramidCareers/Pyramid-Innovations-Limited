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
 * Various helper methods for interacting with the sslcommerz API
 *
 * @package    paygw_sslcommerz
 * @copyright  2022 Brain station 23 ltd.
 * @author     Brain station 23 ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace paygw_sslcommerz;

use stdClass;

/**
 * The helper class for sslcommerz payment gateway.
 *
 * @copyright  2021 Brain station 23 ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class sslcommerz_helper {
    /**
     * @var string public API key
     */
    private $apiurl;


    /**
     * @var string public business store ID
     */
    private $storeid;

    /**
     * @var string public business store password
     */
    private $storepassword;

    /**
     * @var string public production environment
     */
    private $paymentmodes;

    /**
     * Initialise the sslcommerz API client.
     *
     * @param string $businessstoreid       the business store id
     * @param string $businessstorepassword business store password
     * @param bool   $paymentmodes         whether we are working with the sandbox environment or not
     */
    public function __construct(
        string $apiurl,
        string $businessstoreid,
        string $businessstorepassword,
        bool $paymentmodes
    ) {
        $this->apiurl = $apiurl;
        $this->storeid = $businessstoreid;
        $this->storepassword = $businessstorepassword;
        $this->paymentmodes = $paymentmodes;
    }

    /**
     * Create a payment intent and return with the checkout session id.
     *
     * @return string
     *
     * @throws ApiErrorException
     */
    public function generate_payment(
        string $currency,
        float $cost,
        string $component,
        string $paymentarea,
        string $itemid
    ): void {
        global $CFG, $USER;

        $cusname = $USER->firstname . ' ' . $USER->lastname;
        $cusemail = $USER->email;
        $cuscity = $USER->city;
        $cuscountry = $USER->country;
        $cusphone = $USER->phone1;

        $postdata = [];
        $postdata['store_id'] = $this->storeid;
        $postdata['store_passwd'] = $this->storepassword;
        $postdata['total_amount'] = $cost;
        $postdata['currency'] = $currency;
        $postdata['tran_id'] = 'MD_COURSE_' . uniqid();

        $postdata['success_url'] = $CFG->wwwroot . '/payment/gateway/sslcommerz/ipn.php?component=' . $component .
            '&paymentarea=' . $paymentarea . '&itemid=' . $itemid;
        $postdata['fail_url'] = $CFG->wwwroot . '/payment/gateway/sslcommerz/cancel.php?component=' . $component .
            '&paymentarea=' . $paymentarea . '&itemid=' . $itemid;
        $postdata['cancel_url'] = $CFG->wwwroot . '/payment/gateway/sslcommerz/cancel.php?component=' . $component .
            '&paymentarea=' . $paymentarea . '&itemid=' . $itemid;

        // CUSTOMER INFORMATION.
        $postdata['cus_name'] = $cusname;
        $postdata['cus_email'] = $cusemail;
        $postdata['cus_city'] = $cuscity;
        $postdata['cus_state'] = $cuscity;
        $postdata['cus_country'] = $cuscountry;
        $postdata['cus_phone'] = $cusphone;

        // REQUEST SEND TO SSLCOMMERZ.
        $directapiurl = $this->apiurl;
        if ($this->paymentmodes == 'live') {
            $localpc = true;
        } else {
            $localpc = false;
        }

        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $directapiurl);   // The URL to fetch.
        curl_setopt($handle, CURLOPT_TIMEOUT, 30);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($handle, CURLOPT_POST, 1);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $postdata);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, $localpc); // KEEP IT FALSE IF YOU RUN FROM LOCAL PC.

        $content = curl_exec($handle);
        $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        if ($code == 200 && !(curl_errno($handle))) {
            curl_close($handle);
            $sslcommerzresponse = $content;
        } else {
            curl_close($handle);
            echo 'FAILED TO CONNECT WITH SSLCOMMERZ API';
            exit;
        }

        // PARSE THE JSON RESPONSE.
        $sslcz = json_decode($sslcommerzresponse, true);
        if (isset($sslcz['GatewayPageURL']) && $sslcz['GatewayPageURL'] != '') {
            // THERE ARE MANY WAYS TO REDIRECT - Javascript, Meta Tag or Php Header Redirect or Other.
            echo "<meta http-equiv='refresh' content='0;url=" . $sslcz['GatewayPageURL'] . "'>";
            exit;
        } else {
            echo 'JSON Data parsing error!';
        }
    }
}
