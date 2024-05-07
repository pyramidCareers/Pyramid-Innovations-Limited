# Moodle Payment Gateway SSLCommerz plugin

SSLCOMMERZ is the largest payment gateway aggregator in Bangladesh and a pioneer in the FinTech industry. For more detail about `SSLCOMMERZ` please visit https://www.sslcommerz.com/.

Moodle Enrol Sslcommerz is a Moodle enrollment plugin based on `SSLCOMMERZ` payment gateway that help students to pay with Bangladeshi currency. It supports all Bangladeshi Banks and online mobile transaction.

<p align="center">
<img src="https://i.imgur.com/QH1SUwO.jpg">
</p>

## Features
- Support all Bangladeshi Bank 
- Support All Bangladeshi Mobile Banking
- Easy Integration
- Personalised payment experience
- Secure OTP based access to save cards
- Bi-lingual Support
- Add vat or surcharge

## Configuration

You can install this plugin from [Moodle plugins directory](https://moodle.org/plugins) or can download from [Github](https://github.com/eLearning-BS23/paygw_sslcommerz).

You can download zip file and install or you can put file under enrol as sslcommerz

## Plugin Global Settings
### Go to 
```
  Dashboard->Site Administration->Plugins->Payment Gateways->sslcommerz settings
```
In this page you can add surcharge for the payments. After installing the plugin you'll automatically redirected to this page.

![Surcharge](https://user-images.githubusercontent.com/40598386/153025062-b3e23135-1441-4889-a7c8-e7ae6fdfa5b1.png)

## Configuring the SSLCommerz Gateway:
### Step: 1

```
  Dashboard->Site Administration->Plugins->Payment Gateways->sslcommerz settings
```

![image](https://user-images.githubusercontent.com/40598386/153416845-82e931fd-efdd-4eb5-8e75-d987d0011da9.png)

- Insert the SSLCOMMERZ api v3 url https://sandbox.sslcommerz.com/gwprocess/v3/api.php
- Insert sslcommerz validetion url https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
- Insert the Store id that provided by sslcommerz
- Insert Store Password provided by sslcommerz
- Insert production environment like sandbox or live server 
- Click the "save changes" button to save the information

### Step: 2 
- Go to the Manage Enrolment Plugins section from the site administration
```
  Dashboard->Site Administration->Plugins->Enrolments->Manage Enrol Plugins
```

![enable Enrolment on Payment](https://user-images.githubusercontent.com/97436713/150732364-f39bae07-d654-49fe-a2a1-d3015c707acc.png)
Enable Enrolment on payment by clicking the eye icon.

### Step: 3

Enable SSLCommerz to the payment gateways 

```
  Dashboard->Site Administration->Plugins->Enrolments->Manage Enrol Plugins
```

![enable payment gateway](https://user-images.githubusercontent.com/97436713/150734313-7c564f4a-0cbb-4efc-b29e-3058806a77b1.png)


## Enrolment Settings for Course: 

Now click on the course page and add an enrolment method Enrolment of Payment.

![ss](https://user-images.githubusercontent.com/40598386/153038411-0fa254ff-9578-4d2c-845d-7f25fb8958f3.png)

and fill up this form below to set the amount of money and currency for the course payment

![Screenshot from 2022-02-08 23-01-42](https://user-images.githubusercontent.com/40598386/153038786-be57e754-337e-4ed9-83d1-581c65a32c6b.png)

This is how it looks like from a student's perspective:

![course page](https://user-images.githubusercontent.com/97436713/150734644-1ee7a5c0-1e18-4e94-82a8-904f35b8acc4.png)

Select the Payment Type- SSLCommerz the surcharge is added with the course payment amount

![sslcommerz choose option](https://user-images.githubusercontent.com/97436713/150734426-96c6ae7e-f9b1-410f-a11f-a4453ccd3597.png)

Select any payment method:

![Screenshot from 2022-01-20 21-28-17](https://user-images.githubusercontent.com/97436713/150734465-7192e4e6-583a-4b19-b1b8-541f1a97167c.png)

If you payment is successful then you'll be enrolled in the course

![Screenshot from 2022-01-20 21-29-13](https://user-images.githubusercontent.com/97436713/150734685-5d3f1696-034c-498f-abf6-613f0d1ab4c7.png)

## Author
- [Brain Station 23 Ltd.](https://brainstation-23.com)

## License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see [GNU License](http://www.gnu.org/licenses/).
