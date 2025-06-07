<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>KTA</title>
    <style>
        @page {
            margin: 0;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        .page {
            width: 100%;
            height: 100vh;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
        }

        .page-break {
            page-break-after: always;
        }

        #page-1 {
            background-image: url("{{ public_path('bg-kta.png') }}");
        }

        #page-2 {
            background-image: url("{{ public_path('bg-kta-1.png') }}");
        }

        .content {
            position: relative;
            z-index: 2;
            padding: 60px;
            color: #000;
            min-height: 673px
        }

        .content-profile {
            position: absolute;
            bottom: 15%;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
        }

        .nia {
            font-size: 40px;
            color: white;
            font-weight: bold;
            width: 100%;


        }
    </style>
</head>

<body>
    <div class="page page-break" id="page-1">
        <div class="content">
            <div class="content-profile">
                <img src="{{public_path($user->profile->photo)}}" alt="" srcset="" style="width: 300px; height:330px; margin-bottom: 10px;object-fit: cover;border-radius: 30px;border: 4px solid #00FF1B;">
                <p style="font-size: 30px;color:white; padding: 0px; margin:0px; font-weight: bold; color:#00FF1B">{{$user->name}}</p>
                <p style="font-size: 30px;color:white; padding: 0px; margin:0px; font-weight: bold; color:#00FF1B">{{$user->nia}}</p>
            </div>
        </div>
    </div>

    <div class="page" id="page-2">
        <div class="content">
        </div>
    </div>
</body>

</html>
