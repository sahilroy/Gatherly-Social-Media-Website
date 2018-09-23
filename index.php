<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>fordFanatics</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
	<body>
		<div id="collisiondetect_wrapper" style="position: absolute;"> </div>

		<div class="container ">

            <div class="col-xs-1"></div>
                <div class="col-xs-8 mainLoginWrapper well w3-panel w3-card-4">
                    <div class="row">
                        <div class="col-sm-12">
                            <h1 class="logo">fordFanatics</h1>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 credentialsWrapper">
                            <h3>Sign In</h3>
                            <form method="POST" action="login.php">
                                <div class="invalidField">
                                <?php
                                    if(isset($_GET["status"]))
                                    {
                                        if($_GET["status"]=='Unsuccessful')
                                        {
                                            echo 'Invalid username or password!';
                                        }
                                        else if($_GET["status"]=='notloggedin')
                                        {
                                            echo 'You are not signed in. Please Sign In';
                                        }
                                        else if($_GET["status"]=='nocaptcha')
                                        {
                                            echo 'Please verify captcha. Try again.';
                                        }
                                        else if($_GET["status"]=='signout')
                                        {
                                            session_start();
                                            unset($_SESSION['loggedIn']);
                                            unset($_SESSION['emailid']);
                                            unset($_SESSION['userid']);
                                            session_unset();
                                            session_destroy();
                                        }
                                    }
                                ?>
                                </div>
                                <div class="input-group emailWrapper">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                    <input id="email" type="text" class="form-control" name="email" placeholder="Email" >
                                </div>

                                <div class="input-group passwordWrapper">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                    <input id="password" type="password" class="form-control" name="password" placeholder="Password" >
                                </div>
                                 <div class="forgotPasswordWrapper">
                                    <a href="#">Forgot password?</a>
                                </div>
                                <div class="captchaWrapper">
                                <!-- qav2 -->
                                    <!-- <div class="g-recaptcha" data-sitekey="6LfQVjoUAAAAAD_w1gSuM_bz8zLk97capHidchRN" data-callback="reCaptchad"></div> -->
                                    <!-- docker -->
                                     <div class="g-recaptcha" data-sitekey="6LfjejsUAAAAAAPDW7-tn-daogbbotzZclSiCLSD" data-callback="reCaptchad"></div>
                                </div>
                                <div class="buttonWrapper">
                                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </form>
                        </div>

                        <div class="col-sm-1 lineDivider">
                        </div>

                        <div class="col-sm-5 otherSourcesWrapper">
                            <h3>Login with</h3>
                            <div class="gitHubWrapper">                            
                                <a class="btn btn-primary btn-block" href="*">
                                 <i class="glyphicon fa fa-github"></i>&nbsp;&nbsp; GitHub
                                </a>
                            
                            </div>
                        </div>
                    </div>
                    <div class="row newAccountWrapper">
                        <div class="col-sm-12">
                        Don't have an account yet?&nbsp;<a href="./register.html">Create your account now</a> </div>
                    </div>
                </div>
            <div class="col-xs-1"></div>
		</div>


		<div class="footer row">
			<small >&copy;fordFanatics</small>
		</div>
	</body>
</html>




	</head>