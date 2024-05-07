<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="SSLCommerz">
    <title>Pyramid Payment Gateway</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }

        }

        @media (max-width: 600px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }

            .content {
                display: flex;
                flex-direction: column;
            }

            .content .subcontent {
                width: 100%;
            }

            .content .hTitle {
                font-size: 26px;
            }

            .content .cBtn {
                width: 100%;
            }

        }
    </style>
</head>

<body class="bg-[#f8f4fc]" oncontextmenu="return false;">


    <div class="flex justify-center">
        <div class="container flex flex-col w-[80%] bg-white my-20 shadow-2xl ">
            <div class="sm:flex-col flex md:flex-row justify-between content">

                <div class="py-5 px-10 w-full bg-white pb-16">
                    <h4 class="mb-3 font-bold text-4xl text-center hTitle">Billing Preview</h4>
                    <hr>
                    <form action="{{ url('/pay') }}" method="POST">
                        <input type="hidden" value="{{ csrf_token() }}" name="_token" />

                        <div class="mb-3">
                            <label for="firstName" class="font-bold text-lg">Biller Name</label>
                            <input type="text" name="customer_name"
                                class="w-full border border-gray-300 px-4 py-2 font-semibold pointer-events-none bg-slate-50"
                                id="customer_name" placeholder="" value="{{ $data->firstname . ' ' . $data->lastname }}"
                                required>
                        </div>

                        <div class="mb-3">
                            <label for="mobile" class="font-bold text-lg">Biller Mobile</label>
                            <div class="flex">
                                <span disabled class="border border-gray-300 px-4 py-2 font-semibold">+88</span>
                                <input type="text" name="customer_mobile"
                                    class="w-full border border-gray-300 px-4 py-2 font-semibold pointer-events-none bg-slate-50"
                                    id="mobile" placeholder="Mobile" value="{{ $data->phone }}" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="font-bold text-lg">Email</label>
                            <input type="email" name="customer_email"
                                class="w-full border border-gray-300 px-4 py-2 font-semibold pointer-events-none bg-slate-50"
                                id="email" placeholder="you@example.com" value="{{ $data->email }}" required>
                        </div>

                        <hr class="mb-4">
                        <input type="hidden" name="amount" value="{{ $data->amount }}">
                        @if (isset($data->job_id))
                            <input type="hidden" name="jobid" value="{{ $data->job_id }}">
                        @endif
                        @if (isset($data->webinar_id))
                            <input type="hidden" name="webinar_id" value="{{ $data->webinar_id }}">
                        @endif
                        <input type="hidden" name="userid" value="{{ $data->id }}">
                        <input type="hidden" name="type" value="{{ $data->type }}">

                        <button
                            class="cBtn bg-white my-5 border border-black hover:border-white hover:bg-black py-3 px-2 sm:px-5 hover:text-white w-48 font-bold"
                            type="submit">Checkout</button>
                    </form>

                </div>

                <div class="py-5 px-10 w-[45%] bg-blue-50 subcontent">
                    <h4 class="flex justify-between align-items-center mb-3">
                        <span class="text-lg font-semibold">Your cart</span>
                    </h4>
                    <ul class="mb-3 bg-white">
                        <li class=" flex justify-between border border-gray-200 p-3">
                            <div>
                                <h6 class="my-0 font-bold">{{ ucfirst($data->type) }}</h6>
                                <small class="font-semibold">description</small>
                            </div>
                            <span class="">{{ $data->amount }}</span>
                        </li>

                        <li class="flex justify-between border border-gray-200 p-3">
                            <span class="font-semibold">Total (BDT)</span>
                            <span class="font-semibold ml-0 px-0">{{ $data->amount }} TK</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="p-2 bg-[#a0e4a4]">
                <img src="{{ asset('/logo/PIL.png') }}" alt="" class="w-48">
            </div>
        </div>
    </div>
</body>

</html>
