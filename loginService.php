<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
include_once "connect.php";
include_once "loginSQL.php";
class LoginWebService{

  public function checkLogingetUserDetails($email_id, $password, $conn)
  {
    // $database_connection = new DatabaseConnection();
    // $conn = $database_connection->getConnection();
    // echo "Hello";
    $sql_service = new LoginSqlService();
    $getUserDetails = $sql_service->getUserDetails($email_id, $password);
    // echo $getUserDetails;
    $result = $conn->query($getUserDetails);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
              if(!isset($_SESSION))
              {
                  session_start();
              }

              $_SESSION['UserName']=$row['UserName'];
              $_SESSION['FirstName'] = $row['FirstName'];
              $_SESSION['LastName'] = $row['LastName'];
              $_SESSION['Email'] = $row['Email'];
              $_SESSION['Status'] = $row['Status'];
              $_SESSION['ProfilePicture'] = $row['ProfilePicture'];
              $_SESSION['Password'] = $row['Password'];
              $_SESSION['UserId'] = $row['ID'];
              $array[]= $_SESSION;

        }

    } else {
        $_SESSION['status']='notloggedIn';
        return 'fail';
    }
    $conn->close();
    return json_encode($array);

  }


  function checkUserLiked($messageId, $userId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();

    $checkUserLikedQuery = "SELECT * FROM userLikes WHERE message_id = '$messageId' AND userId = '$userId' AND reactionId= 1";

    $checkUserLiked_res = $conn->query($checkUserLikedQuery);

    if($checkUserLiked_res->num_rows == 0)
    {
      return false;
    }
    else if ($checkUserLiked_res->num_rows > 0)
    {
      return true;
    }

  }

  function checkUserDisliked($messageId, $userId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();

    $checkUserLikedQuery = "SELECT * FROM userLikes WHERE message_id = '$messageId' AND userId = '$userId' AND reactionId= 0";

    $checkUserLiked_res = $conn->query($checkUserLikedQuery);

    if($checkUserLiked_res->num_rows == 0)
    {
      return false;
    }
    else if ($checkUserLiked_res->num_rows > 0)
    {
      return true;
    }




  }

  function getRatingCount ($messageId)
  {

    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();

    $likes_Query = "SELECT * FROM userLikes WHERE message_id = '$messageId' AND reactionId = '1'";

    $dislikes_Query = "SELECT * FROM userLikes WHERE message_id = '$messageId' AND reactionId = '0'";
    $likes = "empty";
    $dislikes = "empty";

    $likes_rs = $conn->query($likes_Query);
    $dislikes_rs = $conn->query($dislikes_Query);

    $likes = $likes_rs->num_rows;
    $dislikes = $dislikes_rs->num_rows;

    $rating = $likes . "/" . $dislikes;
    return $rating;
}


  public function recordDislike($messageId, $userId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $reactionId = "empty";

    $sql_service = new LoginSqlService();
    $recordDislikeSql = $sql_service->recordDislikeSql($messageId, $userId);

    $result = $conn->query($recordDislikeSql);
    $conn->close();

  }

  public function deleteLike($messageId, $userId)
  {
     $database_connection = new DatabaseConnection();
     $conn = $database_connection->getConnection();

     $sql_service = new LoginSqlService();
     $deleteLikeSql = $sql_service->unlikePost($userId,$messageId);

     $result = $conn->query($deleteLikeSql);
     $conn->close();
  }

  public function recordLikes($messageId, $userId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();
    $reactionId = "empty";

    $sql_service = new LoginSqlService();
    $recordLikesSql = $sql_service->recordLikesSql($messageId, $userId);

    $result = $conn->query($recordLikesSql);
    $conn->close();

  }

  public function insertNewUser($username, $email, $password)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $InsertNewUserSql = $sql_service->insertNewUserSql($username, $email, $password);

    $result = $conn->query($InsertNewUserSql);
    
    
  }


  public function getLikes($messageId, $userId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();
    $reactionId = 'empty';

    $sql_service = new LoginSqlService();
    $getLikesSql = $sql_service->getLikesSql($messageId, $userId);

     $result = $conn->query($getLikesSql);

    while($row = $result->fetch_assoc()) {

      $reactionId = $row['reactionId'];


    }

    $conn->close();
    return $reactionId;

  }

  public function getGroupPosts($groupId)
  {
   
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $getAllPosts = $sql_service->getPostByGroup($groupId);

    $result = $conn->query($getAllPosts);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
              if(!isset($_SESSION))
              {
                  session_start();
              }

              $_SESSION['groupMessageId']=$row['messageId'];
              $_SESSION['groupMessage'] = $row['message'];
              $_SESSION['groupMessageUserId'] = $row['UserId'];
              $_SESSION['groupTimeOfPost'] = $row['TimeOfPost'];
               $_SESSION['groupLikeCount'] = $row['likeCount'];
              $array[]= $_SESSION;

        }

       
        return $array;

    }

  }


  public function getComments($messageId)
  {
        $database_connection = new DatabaseConnection();
        $conn = $database_connection->getConnection();

        $sql_service = new LoginSqlService();
        $messageIdSql = $sql_service->getComments($messageId);

        $result = $conn->query($messageIdSql);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
              if(!isset($_SESSION))
              {
                  session_start();
              }

              $_SESSION['commentId']=$row['commentId'];
              $_SESSION['comment'] = $row['comment'];
              $_SESSION['commentUserId'] = $row['commentUserId'];
              $_SESSION['timeOfComment'] = $row['timeOfComent'];
              $_SESSION['parentMessageId'] = $row['parent_messageId'];
              
              $array[]= $_SESSION;

        }

       
        return $array;

    }


  }

  public function addCommentToDB($commentInput, $userId, $parentMessageId, $conn)
  {
    $sql_service = new LoginSqlService();

    $addCommentsSQL = $sql_service->addCommentsSQL($commentInput, $userId, $parentMessageId);

    $result = $conn->query($addCommentsSQL);

    $conn->close();

  }




  public function incrementLike($messageId, $userId, $conn)
  {

    $sql_service = new LoginSqlService();

    $IncrementLikeSql = $sql_service->incrementLikeSql($messageId);

    $result = $conn->query($IncrementLikeSql);
    $conn->close();

  }

  public function decrementLike($messageId, $userId, $conn)
  {

    $sql_service = new LoginSqlService();

    $decrementLikeSql = $sql_service->decrementLikeSql($messageId);

    $result = $conn->query($decrementLikeSql);

    $conn ->close();

  }




  public function getUserGroups($userId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();
    $sql_service = new LoginSqlService();
    $userGroupsSql = $sql_service->getGroupsForUser($userId);
    $result = $conn->query($userGroupsSql);
    
     while($row = $result->fetch_assoc()){

      // $_SESSION['GroupId'] = $row['groupId']; 
       $array[] = $row['groupId'];
     }
     $conn->close();
     return $array;
  }



  public function getGroupName($groupId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $groupNameSql = $sql_service->getGroupNamesSQL($groupId);

    $result = $conn->query($groupNameSql);

    while($row = $result->fetch_assoc()){

      $groupName = $row['groupName'];

    }
    
    $conn->close();
    return $groupName;


  }

  public function writePostToDB($userId, $message)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $writeToDB = $sql_service->postToDB($userId, $message);

    $result = $conn->query($writeToDB);

    $conn->close();
    return "write to db called";

  }

  public function writeGroupPostToDB($userId, $message, $groupId)
  {

    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $writeGroupPostToDB = $sql_service->groupPostToDbSQL($userId, $message, $groupId);

    $result = $conn->query($writeGroupPostToDB);

    $conn->close();

  }

  public function getPosterDetails($userId){

    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $getPoster = $sql_service->matchPostWithUser($userId);

    $result = $conn->query($getPoster);

     if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
             
             if(!isset($_SESSION)){

                session_start();
              }
              
              $_SESSION['PostFirstName']=$row['FirstName'];
              $_SESSION['PostLastName'] = $row['LastName'];
              $_SESSION['EachMessageUserId'] = $row['ID'];
              //$_SESSION['TimeOfPost'] = $row['TimeOfPost'];
             

              $array[]= $_SESSION; 


        }

        $conn->close();
        return $array;


     }


  }



  public function getLikeCountFromUserLikesTable($messageId)
  {
    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $getLikeCountFrmLikeTable = $sql_service->getLikeCountFrmLikeTableSql($messageId); 

    $result = $conn->query($getLikeCountFrmLikeTable);

    if($result->num_rows > 0)
    {
      $likes = $result->num_rows;
      return $likes;
    }
    else
    {
      return '0';
    }

    $conn->close();
    return $likes;


  }

  public function getLikeCountFromMes($messageId){

    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $getLikeCountForMesSql = $sql_service->getLikeCountForMes($messageId);
   
    $result = $conn->query($getLikeCountForMesSql)->fetch_object()->likeCount;

    

       
      

    
    $conn->close();
    return $result;

  }

  public function getAllGlobalPosts(){

    $database_connection = new DatabaseConnection();
    $conn = $database_connection->getConnection();

    $sql_service = new LoginSqlService();
    $getAllPosts = $sql_service->getGlobalPostsSQL();

    $result = $conn->query($getAllPosts);

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
              if(!isset($_SESSION))
              {
                  session_start();
              }

              $_SESSION['messageId']=$row['messageId'];
              $_SESSION['message'] = $row['message'];
              $_SESSION['MessageUserId'] = $row['UserId'];
              $_SESSION['TimeOfPost'] = $row['TimeOfPost'];
              $_SESSION['likeCount'] = $row['likeCount'];
              $array[]= $_SESSION;

        }

        $conn->close();
        return $array;

    }

  }

}






?>