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
 * Redirects to the sslcommerz checkout for payment
 *
 * @package    paygw_sslcommerz
 * @copyright  2022 Brain station 23 ltd.
 * @author     Brain station 23 ltd.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use core_payment\helper;
use paygw_sslcommerz\sslcommerz_helper;

require_once(__DIR__ . '/../../../config.php');

require_login();
global $DB;

$component   = required_param('component', PARAM_ALPHANUMEXT);
$paymentarea = required_param('paymentarea', PARAM_ALPHANUMEXT);
$itemid      = required_param('itemid', PARAM_INT);
$description = required_param('description', PARAM_TEXT);

$config     = (object) helper::get_gateway_configuration($component, $paymentarea, $itemid, 'sslcommerz');
$payable    = helper::get_payable($component, $paymentarea, $itemid);
$surcharge  = helper::get_gateway_surcharge('sslcommerz');
$cost       = helper::get_rounded_cost($payable->get_amount(), $payable->get_currency(), $surcharge);

$sslcommerzhelper = new sslcommerz_helper(
    $config->apiurl,
    $config->storeid,
    $config->storepassword,
    $config->paymentmodes
);
$sslcommerzhelper->generate_payment(
    $payable->get_currency(),
    $cost,
    $component,
    $paymentarea,
    $itemid
);
