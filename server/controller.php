<?php
 
 include_once "loginService.php";
 include_once "loginSQL.php";
    
 function clean_input($data) {
    
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
  
 }




 if(isset($_POST['displayMessages']))
 {
 	 if(!isset($_SESSION))
       {
           session_start();
       }

      $userId = $_SESSION['UserId'];

      $loginWebService = new LoginWebService();

      $login = $loginWebService -> getAllGlobalPosts();

      echo $login;

 }

 if(isset($_POST['sendDirectMessage']))
 {
    if(!isset($_SESSION))
    {
      session_start();
    }
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();
    $loginWebService = new LoginWebService();

    $messageFrom = mysqli_real_escape_string($conn, $_POST["directMessageFrom"]);
    $messageTo = mysqli_real_escape_string($conn, $_POST["directMessageTo"]);
    $directMessage = mysqli_real_escape_string($conn, $_POST["directMessage"]);
    $loginWebService -> sendDirectMessage($messageFrom, $messageTo, $directMessage);
    echo "it made it here";

 }

 if(isset($_POST['useGravatar']))
 {

     if(!isset($_SESSION))
       {
           session_start();
       }
    
     $userId = $_SESSION['UserId'];
     $userEmail =  $_SESSION['Email'];
     $size = 40;
     $loginWebService = new LoginWebService();

     $url = $loginWebService -> get_gravatar($userEmail);
     $loginWebService -> updateDisplayPic($userId, 1);
     $_SESSION['ProfilePicture'] = $url;
    

 }

 if(isset($_POST['useProfilePicture']))
 {
      if(!isset($_SESSION))
      {
        session_start();
      }

      $userId = $_SESSION['UserId'];
      $loginWebService = new LoginWebService();
      $loginWebService -> updateDisplayPic($userId, 0);

 }



 if(isset($_POST['lockGroup']))
 {
    $groupId = $_POST['groupId'];
    $loginWebService = new LoginWebService();
    
    $loginWebService -> lockGroup($groupId);



 }


 if(isset($_POST['uploadDocument']))
 {
     if(!isset($_SESSION))
       {
           session_start();
       }

    if($_FILES["file"]["name"] != '')
    {
        $test = explode(".", $_FILES["file"]["name"]);
        $extension = end($test);
        $name = $test[0] . '.' . $extension;
        $location = '../upload/' . $name;
        move_uploaded_file($_FILES["file"]["tmp_name"], $location);
        //echo "<img src='" . $location . "' height='150' width='225' class='img-thubnail'/>";

        $groupId = $_POST['groupId'];
        $userId = $_SESSION['UserId'];

        $loginWebService = new LoginWebService();

        $loginWebService -> writeUploadToDB($userId, $groupId, "document", $name);
        $latestPost = $loginWebService ->  getLatestPost($userId, $groupId);

        echo $latestPost;

    }




 }


 if(isset($_POST['unlockGroup']))
 {
    $groupId = $_POST['groupId'];
    $loginWebService = new LoginWebService();

    $loginWebService -> unlockGroup($groupId);

 }


 if(isset($_POST['checkUserMembership']))
 {

    if(!isset($_SESSION))
    {
      session_start();
    }

  $groupId = $_POST['groupId'];
  $loginWebService = new LoginWebService();
  $userId = $_SESSION['UserId'];

  $UserIsMember = $loginWebService->checkMembership($userId, $groupId);

  if($UserIsMember >= 1)
  {
    echo 1;
  }
  else
  {
    echo 0;
  }



 }




 if(isset($_POST['deleteMessage']))
 {

    if(!isset($_SESSION))
    {
      session_start();
    }

    $messageId = $_POST['messageId'];
    $loginWebService = new LoginWebService();

    $loginWebService -> deleteMessage($messageId);
    $loginWebService -> deleteLikesAssociated($messageId);
    $loginWebService -> deleteCommentsAssociated($messageId);
  
  }


if(isset($_POST['getAllGroups']))
{
     $loginWebService = new LoginWebService();

     $allGroups = $loginWebService ->getAllExistingGroups();

     echo $allGroups;

}



 if(isset($_POST['getUserType']))
 {

    if(!isset($_SESSION))
    {
      session_start();
    }

    echo $_SESSION['userType'];

 }

 if(isset($_POST['addGroupMessage']))
 {
    if(!isset($_SESSION))
    {
       session_start();
    }

    $userId = $_SESSION['UserId'];


    $loginWebService = new LoginWebService();
    
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $message = clean_input($_POST['groupMessagePost']);
    $message = mysqli_real_escape_string($conn, $message);

    $groupId = $_POST['groupId'];


    $loginWebService -> writeGroupPostToDB($userId, $message, $groupId);

    $latestPost = $loginWebService -> getLatestPost($userId, $groupId);

    $conn->close();
    
    echo $latestPost;




 }

 if(isset($_POST['getGravatar']))
 {
   $loginWebService = new LoginWebService();

    $userEmail = $_POST['userEmail'];
   
    $url = $loginWebService -> get_gravatar($userEmail);

    echo $url;
 }

 if(isset($_POST['useDefaultPicture']))
 {

      $loginWebService = new LoginWebService();

      if(!isset($_SESSION))
      {
           session_start();
      }

      $userId = $_SESSION['UserId'];
      $loginWebService->updateDisplayPic($userId, 2);


 }


 if(isset($_POST['pagination_data']))
 {

    $recordPerPage = 5;
    $page = "";
    $output = "";

    if(isset($_POST['page']))
    {
      $page = $_POST['page'];
    }
    else
    {
      $page = 1;
    }

    $groupId = $_POST['groupId'];

    $page = $page + 1;
    $startFrom = ($page - 1) * $recordPerPage;
   
    $loginWebService = new LoginWebService();
    
    $pageData = $loginWebService -> paginationData($startFrom, $recordPerPage, $groupId);

    //$totalRecords = $loginWebService -> getNumberOfPosts(3);

    //$totalPages = ceil($totalRecords/$recordPerPage);
    echo $pageData;

    //echo "page : " . $page . "data: " . $pageData;

 }



 if(isset($_POST['getPosterDetails']))
 {
 	  if(!isset($_SESSION))
       {
           session_start();
       }
 	 
 	 //$userId = $_SESSION['UserId'];
 	 $posterUserId = $_POST['posterUserId'];
 	 $loginWebService = new LoginWebService();

      $posterDetails = $loginWebService -> getPosterDetails($posterUserId);

      echo $posterDetails;

 }

 if(isset($_POST['writeUrlUpload']))
 {

  $loginWebService = new LoginWebService();
  $groupId = $_POST['groupId'];
  $urlToWrite = $_POST['urlToUpload'];
 
  if(!isset($_SESSION))
  {
    session_start();
  }

  $userId = $_SESSION['UserId'];
  
  $loginWebService -> writeUploadToDB($userId, $groupId, "url", $urlToWrite);
  $latestPost = $loginWebService ->  getLatestPost($userId, $groupId);

  echo $latestPost;




 }

 if(isset($_POST['uploadSourceCode']))
 {

  $loginWebService = new LoginWebService();
  $groupId = $_POST['groupId'];
  $database_connection = new DatabaseConnection();

  $conn = $database_connection->getConnection();
  
  $codeToUpload = mysqli_real_escape_string($conn, $_POST['codeToUpload']);
  


  if(!isset($_SESSION))
  {
    session_start();
  }

  $userId = $_SESSION['UserId'];
  
  $loginWebService -> writeUploadToDB($userId, $groupId, "code", $codeToUpload);
  $latestPost = $loginWebService->getLatestPost($userId, $groupId);

  echo $latestPost;


}


 if(isset($_POST['getNumGlobalPosts']))
 {

     $loginWebService = new LoginWebService();
    
     $totalRecords = $loginWebService -> getNumberOfPosts(3);

     $totalPages = ceil($totalRecords/5);

     echo $totalPages;
 }


 if(isset($_POST['checkIfUserLiked']))
 {
       	$loginWebService = new LoginWebService();

       	$messageId = $_POST['messageId'];

      	if(!isset($_SESSION))
       	{
       		session_start();
       	}

       	$userId = $_SESSION['UserId'];

      	$userLiked = $loginWebService->checkUserLiked($messageId, $userId);
      	$userDisliked = $loginWebService->checkUserDisliked($messageId, $userId);


      	echo $userLiked . "/" . $userDisliked;


 }

   if(isset($_POST['getComments']))
   {
   
      $loginWebService = new LoginWebService();

      $messageId = $_POST['messageId'];

      $comments = $loginWebService->getComments($messageId);

      echo $comments;


   }


 if(isset($_POST['getLikeDislike']))
{
    	$messageId = $_POST['messageId'];

    	echo $messageId;
}


if(isset($_POST['getCommenterDetails']))
 {

       $loginWebService = new LoginWebService();

       $commenterUserId = $_POST['commenterUserId'];

       $getCommenterDetails = $loginWebService -> getPosterDetails($commenterUserId);

       echo $getCommenterDetails;

}



if(isset($_POST['postMessage']))
{ 

      if(!session_start())
      {
        session_start();
      }

      if(isset($_SESSION['UserId']))
      {
          $loginWebService = new LoginWebService();
          $database_connection = new DatabaseConnection();
          $conn = $database_connection->getConnection();
          $userId = $_SESSION['UserId'];
          $groupId = '3';    
          $uncleanedMessage = clean_input($_POST['postMessage']);           
          $uncleanedMessage =  mysqli_real_escape_string($conn, $uncleanedMessage);
          $login = $loginWebService -> writePostToDB($userId, $uncleanedMessage);
          
          $latestPost = $loginWebService -> getLatestPost($userId, $groupId);

          echo $latestPost; 
      }

 }
  

if(isset($_POST['displayGroupMessages']))
{

   $loginWebService = new LoginWebService();
   $database_connection = new DatabaseConnection();
   $conn = $database_connection->getConnection();

   $groupId = $_POST['groupId'];

   $groupMessages = $loginWebService -> getGroupPosts($groupId);

   echo $groupMessages;


}

if(isset($_POST['getGroupInfo']))
{
   $loginWebService = new LoginWebService();

   $groupId = $_POST['groupId'];

   $groupInfo = $loginWebService -> getGroupInfo($groupId);

   echo $groupInfo;
}


if(isset($_POST['getGroupName']))
{

  $loginWebService = new LoginWebService();
  $database_connection = new DatabaseConnection();

  $groupId = $_POST['groupId'];

  $groupInfo = $loginWebService -> getGroupName($groupId);

  echo $groupInfo;




}   





	
?>