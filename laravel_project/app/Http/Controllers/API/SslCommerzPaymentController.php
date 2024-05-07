<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\MentorWebinars;
use App\Models\WebinarPaymentStatus;
use App\Models\WebinarRegisteredUsers;
use DB;
use Illuminate\Http\Request;
use App\Library\SslCommerz\SslCommerzNotification;
use App\Models\User;
use App\Models\PaymentCompletionStatus;
use Illuminate\Support\Facades\Log;

class SslCommerzPaymentController extends BaseController
{

    public function getCompletedTransection(Request $request)
    {
        $data = User::find($request->user_id);
        $data->payments = DB::table('payments')->where('user_id', $request->user_id)->where('job_id', $request->job_id)->where('payment_status', 'Complete')->latest('updated_at')->first();
        if ($data) {
            return $this->sendResponse($data, "Transection Details");
        }
        return $this->sendError('Data Retrive failed!');
    }

    public function getUserData($jobid, $userid, $fee, $type)
    {
        $user_id = $userid;
        $data = User::find($user_id);
        $data->amount = $fee;
        $data->type = $type;
        $data->job_id = $jobid;
        return view('preview', compact('data'));
    }

    public function getUserDataForWebinar($webinar_id, $userid, $fee, $type)
    {
        $user_id = $userid;
        $data = User::find($user_id);
        $data->amount = $fee;
        $data->type = $type;
        $data->webinar_id = $webinar_id;
        return view('preview', compact('data'));
    }

    public function index(Request $request)
    {

        $user_id = $request->userid;
        if ($request->jobid)
            $job_id = $request->jobid;
        if ($request->webinar_id)
            $webinar_id = $request->webinar_id;
        $type = $request->type;

        $data = User::find($user_id);
        if (isset($webinar_id)) {
            $amount = MentorWebinars::find($webinar_id)->registration_fee;
        } else {
            $amount = $request->amount;
        }


        $post_data = array();
        $post_data['total_amount'] = $amount; # You cant not pay less than 10
        $post_data['currency'] = "BDT";
        $post_data['tran_id'] = uniqid(); // tran_id must be unique

        # CUSTOMER INFORMATION
        $post_data['cus_name'] = $request->customer_name;
        $post_data['cus_email'] = $data->email;
        $post_data['cus_add1'] = '';

        $post_data['cus_country'] = "Bangladesh";
        $post_data['cus_phone'] = $request->customer_mobile;

        # SHIPMENT INFORMATION


        $post_data['shipping_method'] = "NO";
        $post_data['product_name'] = "Fee";
        $post_data['product_category'] = "Fee";
        $post_data['product_profile'] = "Online Transaction";

        # OPTIONAL PARAMETERS
        $post_data['value_a'] = $user_id;
        ($type == 'webinar_fee') ? $post_data['value_b'] = $webinar_id : $post_data['value_b'] = $job_id;
        $post_data['value_c'] = $type;


        #Before  going to initiate the payment order status need to insert or update as Pending.
        if ($type == 'webinar_fee') {
            DB::table('webinar_payments')
                ->where('transaction_id', $post_data['tran_id'])
                ->updateOrInsert([
                    'user_id' => $user_id,
                    'webinar_id' => $webinar_id,
                    'payment_type' => $type,
                    'gateway' => 'sslcommerz',
                    'payment_status' => 'Pending',
                    'transaction_id' => $post_data['tran_id'],
                    'amount' => $post_data['total_amount'],
                    'currency' => $post_data['currency'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
        } else {
            DB::table('payments')
                ->where('transaction_id', $post_data['tran_id'])
                ->updateOrInsert([
                    'user_id' => $user_id,
                    'job_id' => $job_id,
                    'payment_type' => $type,
                    'gateway' => 'sslcommerz',
                    'payment_status' => 'Pending',
                    'transaction_id' => $post_data['tran_id'],
                    'amount' => $post_data['total_amount'],
                    'currency' => $post_data['currency'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
        }
        $sslc = new SslCommerzNotification();
        # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
        $payment_options = $sslc->makePayment($post_data, 'hosted');

        if (!is_array($payment_options)) {
            print_r($payment_options);
            $payment_options = array();
        }

    }

    public function success(Request $request)
    {
        //Transaction is Successful";
        $tran_id = $request->input('tran_id');
        $amount = $request->input('amount');
        $currency = $request->input('currency');
        $user_id = $request->value_a; //send user_id in value_a
        $type = $request->value_c; //send type in value_c
        //Checking if payment request type is webinar_fee or not. If yes then get webinar_id else get job_id.
        ($type == 'webinar_fee') ? $webinar_id = $request->value_b : $job_id = $request->value_b;

        $sslc = new SslCommerzNotification();

        if ($type == 'webinar_fee') {
            $payment_details = DB::table('webinar_payments')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'payment_status', 'currency', 'amount')->first();

            if ($payment_details->payment_status == 'Pending') {
                $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

                if ($validation) {
                    //Transaction is successfully Completed";
                    $update_status = DB::table('webinar_payments')
                        ->where('transaction_id', $tran_id)->update(['payment_status' => 'Complete', 'updated_at' => now()]);
                    $paymentStatus = "";

                    $ifExists = WebinarPaymentStatus::where('user_id', $user_id)->where('webinar_id', $webinar_id)->first();
                    if ($update_status && !$ifExists) {
                        $pcs = [];
                        $pcs['user_id'] = $user_id;
                        $pcs['webinar_id'] = $webinar_id;
                        $pcs['amount'] = $amount;
                        $pcs['gateway'] = 'sslcommerz';
                        $pcs['status'] = '1';

                        $paymentStatus = WebinarPaymentStatus::create($pcs);
                        //auto Register after Succesfull payment
                        if ($paymentStatus) {
                            $wr = [];
                            $wr['webinar_id'] = $webinar_id;
                            $wr['user_id'] = $user_id;
                            WebinarRegisteredUsers::create($wr);
                        }
                    }
                    return redirect(env('FRONTEND_LINK') . '/payment-status/webinar/success?webinar_id=' . $webinar_id);
                }

            } else {
                #That means something wrong happened. You can redirect customer to your product page.
                echo "Invalid Transaction";
            }
        } else {
            #Check order status in order tabel against the transaction id or order id.
            $payment_details = DB::table('payments')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'payment_status', 'currency', 'amount')->first();

            if ($payment_details->payment_status == 'Pending') {
                $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

                if ($validation) {
                    //Transaction is successfully Completed";
                    $update_status = DB::table('payments')
                        ->where('transaction_id', $tran_id)->update(['payment_status' => 'Complete', 'updated_at' => now()]);

                    $ifExists = PaymentCompletionStatus::where('user_id', $user_id)->where('job_id', $job_id)->first();
                    if ($update_status && !$ifExists) {
                        $pcs = [];
                        $pcs['user_id'] = $user_id;
                        $pcs['job_id'] = $job_id;
                        $pcs['amount'] = $amount;
                        $pcs['gateway'] = 'sslcommerz';
                        $pcs['status'] = '1';

                        PaymentCompletionStatus::create($pcs);
                    }
                    return redirect(env('FRONTEND_LINK') . '/payment-status/success?job_id=' . $job_id);
                }

            } else {
                #That means something wrong happened. You can redirect customer to your product page.
                echo "Invalid Transaction";
            }
        }
    }

    public function fail(Request $request)
    {
        $type = $request->value_c; //send type in value_c
        //Checking if payment request type is webinar_fee or not. If yes then get webinar_id else get job_id.
        ($type == 'webinar_fee') ? $webinar_id = $request->value_b : $job_id = $request->value_b;
        $tran_id = $request->input('tran_id');

        if ($type == 'webinar_fee') {
            $payment_details = DB::table('webinar_payments')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'payment_status', 'currency', 'amount')->first();

            if ($payment_details->payment_status == 'Pending') {
                $update_status = DB::table('webinar_payments')
                    ->where('transaction_id', $tran_id)->update(['payment_status' => 'Failed', 'updated_at' => now()]);
                //Transaction is Falied";
                return redirect(env('FRONTEND_LINK') . '/payment-status/webinar/failed?webinar_id=' . $webinar_id);

            } else if ($payment_details->payment_status == 'Processing' || $payment_details->payment_status == 'Complete') {
                //Transaction is already Successful";
                return redirect(env('FRONTEND_LINK') . '/payment-status/webinar/failed?webinar_id=' . $webinar_id);
            } else {
                echo "Transaction is Invalid";
            }

        } else {
            $payment_details = DB::table('payments')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'payment_status', 'currency', 'amount')->first();

            if ($payment_details->payment_status == 'Pending') {
                $update_status = DB::table('payments')
                    ->where('transaction_id', $tran_id)->update(['payment_status' => 'Failed', 'updated_at' => now()]);
                //Transaction is Falied";
                return redirect(env('FRONTEND_LINK') . '/payment-status/failed?job_id=' . $job_id);

            } else if ($payment_details->payment_status == 'Processing' || $payment_details->payment_status == 'Complete') {
                //Transaction is already Successful";
                return redirect(env('FRONTEND_LINK') . '/payment-status/failed?job_id=' . $job_id);
            } else {
                echo "Transaction is Invalid";
            }
        }

    }

    public function cancel(Request $request)
    {
        $tran_id = $request->input('tran_id');
        $type = $request->value_c; //send type in value_c
        //Checking if payment request type is webinar_fee or not. If yes then get webinar_id else get job_id.
        ($type == 'webinar_fee') ? $webinar_id = $request->value_b : $job_id = $request->value_b;

        if ($type == 'webinar_fee') {

            $payment_details = DB::table('webinar_payments')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'payment_status', 'currency', 'amount')->first();

            if ($payment_details->payment_status == 'Pending') {
                $update_status = DB::table('webinar_payments')
                    ->where('transaction_id', $tran_id)
                    ->update(['payment_status' => 'Canceled', 'updated_at' => now()]);
                //Transaction is Cancel";
                return redirect(env('FRONTEND_LINK') . '/payment-status/webinar/cancel?webinar_id=' . $webinar_id);

            } else if ($payment_details->payment_status == 'Processing' || $payment_details->payment_status == 'Complete') {
                //Transaction is already Successful";
                return redirect(env('FRONTEND_LINK') . '/payment-status/webinar/cancel?webinar_id=' . $webinar_id);
            } else {
                echo "Transaction is Invalid";
            }
        } else {
            $payment_details = DB::table('payments')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'payment_status', 'currency', 'amount')->first();

            if ($payment_details->payment_status == 'Pending') {
                $update_status = DB::table('payments')
                    ->where('transaction_id', $tran_id)
                    ->update(['payment_status' => 'Canceled', 'updated_at' => now()]);
                //Transaction is Cancel";
                return redirect(env('FRONTEND_LINK') . '/payment-status/cancel?job_id=' . $job_id);

            } else if ($payment_details->payment_status == 'Processing' || $payment_details->payment_status == 'Complete') {
                //Transaction is already Successful";
                return redirect(env('FRONTEND_LINK') . '/payment-status/cancel?job_id=' . $job_id);
            } else {
                echo "Transaction is Invalid";
            }
        }


    }

    public function ipn(Request $request)
    {

        #Received all the payement information from the gateway
        if ($request->input('tran_id')) #Check transation id is posted or not.
        {
            $tran_id = $request->input('tran_id');
            #Check order status in order tabel against the transaction id or order id.
            if ($request->value_c == 'webinar_fee') {
                $payment_details = DB::table('webinar_payments')
                    ->where('transaction_id', $tran_id)->select('transaction_id', 'payment_status', 'currency', 'amount')->first();
                Log::debug('IPN: ' . $payment_details->payment_status);
                if ($payment_details->payment_status == 'Pending') {
                    $sslc = new SslCommerzNotification();
                    $validation = $sslc->orderValidate($request->all(), $tran_id, $payment_details->amount, $payment_details->currency);

                    if ($validation == TRUE) {
                        $update_status = DB::table('webinar_payments')->where('transaction_id', $tran_id)->update(['payment_status' => 'Pending', 'updated_at' => now()]);
                        //Transaction is successfully Completed";
                        Log::debug("Transaction is successfully Completed (IPN payment_status=Pending ) ");
                    }
                } else if ($payment_details->payment_status == 'Processing' || $payment_details->payment_status == 'Complete') {

                    #That means Order status already updated. No need to udate database.
                    //";
                    Log::debug("Transaction is already successfully Completed (IPN)");
                } else {
                    #That means something wrong happened. You can redirect customer to your product page.
                    echo "Invalid Transaction";
                }
            } else {
                $payment_details = DB::table('payments')
                    ->where('transaction_id', $tran_id)->select('transaction_id', 'payment_status', 'currency', 'amount')->first();
                Log::debug('IPN: ' . $payment_details->payment_status);
                if ($payment_details->payment_status == 'Pending') {
                    $sslc = new SslCommerzNotification();
                    $validation = $sslc->orderValidate($request->all(), $tran_id, $payment_details->amount, $payment_details->currency);

                    if ($validation == TRUE) {
                        $update_status = DB::table('payments')->where('transaction_id', $tran_id)->update(['payment_status' => 'Pending', 'updated_at' => now()]);
                        //Transaction is successfully Completed";
                        Log::debug("Transaction is successfully Completed (IPN payment_status=Pending ) ");
                    }
                } else if ($payment_details->payment_status == 'Processing' || $payment_details->payment_status == 'Complete') {

                    #That means Order status already updated. No need to udate database.
                    //";
                    Log::debug("Transaction is already successfully Completed (IPN)");
                } else {
                    #That means something wrong happened. You can redirect customer to your product page.
                    echo "Invalid Transaction";
                }
            }


        } else {
            echo "Invalid Data";
        }
    }

}