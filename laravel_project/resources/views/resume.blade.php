<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <style>
        @page {
            margin: 0px;
        }

        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
        }

        .container {
            width: 750px;

        }

        .profile {
            width: 28%;
            background-color: #303c4c;
            height: 1100px;
            color: white;
            padding: 10px;
            margin: 0;
            box-sizing: border-box;
            float: left;


        }

        .pic {
            display: block;
            text-align: center
        }

        .pic img {
            width: 150px;
            border-radius: 15px;
        }


        .details {
            width: 70%;
            padding: 15px;
            float: left;
            text-align: justify;
            box-sizing: border-box;
            word-wrap: break-word;

        }

        h3 {
            margin: 0;
        }

        h5,
        h2,
        h4 {
            margin: 0;

        }


        span {
            color: rgb(219, 219, 219)
        }

        .name {
            margin-bottom: 2%;
            text-align: center;
            display: block;

        }

        .name p {
            margin-top: 5px;
            color: white;
            text-transform: capitalize;
            margin: 0;
            background-color: rgba(255, 255, 255, 0.158);
            padding: 2px;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.147);

        }

        .name .c_profession {
            margin-top: 10px;
        }

        .experience {
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
            padding: 5px;

        }

        .experience .data {
            margin-top: 2px;
            border: .5px solid rgba(128, 128, 128, 0.092);
            padding: 2px;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);


        }

        .experience p {
            background-color: rgba(250, 250, 250, .2);
            border-radius: 5px;
            font-size: 9px;
            padding: 5px;
            margin: 1px;

        }

        .experience span {
            font-size: 11px;
            color: black;
        }

        .experience h4 {
            color: rgb(0, 116, 232)
        }

        .experience h5 {
            color: rgb(0, 91, 181);
            font-weight: 500;
        }

        .head {
            margin-top: 20px;
        }

        .contact span {
            font-size: 12px;
        }

        .skill {
            margin-top: 25px;
        }

        .skill h6 {
            margin: 0;
            padding: 2px;
        }

        .skill h6::before {
            content: " ";
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 8px;
            background-color: white;
        }
        .extra-info{
            margin: 0;
            text-align: center;
            margin-bottom: 15%;
            font-size: 11px;
        }



        .table-wrapper {

            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
        }

        .fl-table {
            border-radius: 5px;
            font-size: 12px;
            font-weight: normal;
            border: none;
            border-collapse: collapse;
            width: 100%;
            max-width: 100%;
            white-space: nowrap;
            background-color: white;
        }

        .fl-table td,
        .fl-table th {
            text-align: center;
            padding: 8px;
        }

        .fl-table td {
            border-right: 1px solid #f8f8f8;
            font-size: 12px;
        }

        .fl-table thead th {
            color: #ffffff;
            background: #3249607a;
        }


        .fl-table thead th:nth-child(odd) {
            color: #ffffff;

        }

        .fl-table tr:nth-child(even) {
            background: #F8F8F8;
        }

        /* Responsive */

        @media (max-width: 767px) {
            .fl-table {
                display: block;
                width: 100%;
            }

            .table-wrapper:before {
                content: "Scroll horizontally >";
                display: block;
                text-align: right;
                font-size: 11px;
                color: white;
                padding: 0 0 10px;
            }

            .fl-table thead,
            .fl-table tbody,
            .fl-table thead th {
                display: block;
            }

            .fl-table thead th:last-child {
                border-bottom: none;
            }

            .fl-table thead {
                float: left;
            }

            .fl-table tbody {
                width: auto;
                position: relative;
                overflow-x: auto;
            }

            .fl-table td,
            .fl-table th {
                padding: 20px .625em .625em .625em;
                height: 60px;
                vertical-align: middle;
                box-sizing: border-box;
                overflow-x: hidden;
                overflow-y: auto;
                width: 120px;
                font-size: 13px;
                text-overflow: ellipsis;
            }

            .fl-table thead th {
                text-align: left;
                border-bottom: 1px solid #f7f7f9;
            }

            .fl-table tbody tr {
                display: table-cell;
            }

            .fl-table tbody tr:nth-child(odd) {
                background: none;
            }

            .fl-table tr:nth-child(even) {
                background: transparent;
            }

            .fl-table tr td:nth-child(odd) {
                background: #F8F8F8;
                border-right: 1px solid #E6E4E4;
            }

            .fl-table tr td:nth-child(even) {
                border-right: 1px solid #E6E4E4;
            }

            .fl-table tbody td {
                display: block;
                text-align: center;
            }
        }
    </style>
</head>

<body class="antialiased">


    <div class="container">
        <div class="profile">
            <div class="pic">

                @if ($data->profile_pic != null)
                    <img src="{{ $data->profile_pic }}" alt="">
                @endif

            </div>
            <div class="name">
                <h3> {{ $data->firstname . ' ' . $data->lastname }}</h3>
                <p class="c_profession">{{ $data->jobseeker->current_profession }}</p>


            </div>
            <p class="extra-info">{{ $data->jobseeker->industry." | ". $data->jobseeker->speciality }}</p>


            <div class="contact">
                <h5>Contact</h5>
                <hr>
                <span><b>Phone</b> : {{ $data->phone }}</span> <br>
                <span> <strong>Email</strong> : {{ $data->email }}</span>
            </div>
            <div class="skill">
                <h5>Skills</h5>
                <hr>
                <div class="skills">
                    @foreach ($data->usersskills as $skill)
                        <div class="skill-name">
                            <div></div>
                            <h6>{{ $skill->title }}</h6>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>


        <div class="details">
            @if (count($data->experience) != 0)
                <h3>EXPERIENCE</h3>
                <hr>
                <div class="experience">
                    @foreach ($data->experience as $item)
                        <div class="data">
                            <h4>{{ $item->organization }}</h4>
                            <h5>{{ $item->title }}</h5>
                            <span>Responsibility</span>
                            <p>{{ $item->job_description }}</p>
                        </div>
                    @endforeach
                </div>
            @endif


            @if (count($data->educations) != 0)
                <div class="head">
                    <h3>EDUCATION</h3>
                    <hr>
                </div>

                <div class="table-wrapper">
                    <table class="fl-table">
                        <thead>
                            <tr>
                                <th>DEGREE</th>
                                <th>INSTITUTION</th>
                                <th>YEAR</th>
                                <th>CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data->educations as $item)
                                <tr>
                                    <td>{{ $item->title }}</td>
                                    <td>{{ $item->institution }}</td>
                                    <td>{{ $item->year }}</td>
                                    <td>{{ $item->result }}</td>
                                </tr>
                            @endforeach
                        <tbody>
                    </table>
                </div>
            @endif

            @if (count($data->certifications) != 0)
                <div class="head">
                    <h3>CERTIFICATIONS</h3>
                    <hr>
                </div>
                <div class="table-wrapper">
                    <table class="fl-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>ISSUING ORGANIZATION</th>
                                <th>EXPIRE</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data->certifications as $item)
                                <tr>
                                    <td>{{ $item->certificate_name }}</td>
                                    <td>{{ $item->issuing_organization }}</td>
                                    <td>{{ date('d-m-Y', strtotime($item->expiration_date)) }}</td>
                                </tr>
                            @endforeach
                        <tbody>
                    </table>
                </div>
            @endif



            @if (count($data->extracurriculars) != 0)
                <div class="head">
                    <h3>EXTRA-CURRICULARS</h3>
                    <hr>
                </div>
                <div class="table-wrapper">
                    <table class="fl-table">
                        <thead>
                            <tr>
                                <th>ROLE</th>
                                <th>ORGANIZATION NAME</th>
                                <th>RESPONSIBILITY</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data->extracurriculars as $item)
                                <tr>
                                    <td>{{ $item->role }}</td>
                                    <td>{{ $item->organization_name }}</td>
                                    <td>{{ $item->description }}</td>
                                </tr>
                            @endforeach
                        <tbody>
                    </table>
                </div>
            @endif
        </div>

    </div>
    </div>
</body>

</html>
