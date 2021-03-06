<?php
//enables error reporting
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
include_once "connect.php";
//this class will contain all sql procedures that deal with user logging in
class LoginSqlService{
  //function to check if the user with the credentials provided exist in the database
  public function getUserDetails($username, $password) {
      $sql = "SELECT * FROM fordFanatics.user WHERE UserName = '$username' AND Password = '$password'";
      return $sql;
    }

  public function getUserById($userId){

    $sql = "SELECT * FROM fordFanatics.user WHERE ID = '$userId'";
    return $sql;
  }

  public function getGroupInfoSql($groupId){

    $sql = "SELECT * FROM fordFanatics.groups WHERE groupId = $groupId";
    return $sql;

  }

  public function getDirectMessagesSql($fromUser, $toUser){

    $sql = "SELECT * FROM fordFanatics.directMessages WHERE (fromUserId = $fromUser AND toUserId = $toUser) OR (fromUserId = $toUser AND toUserId = $fromUser)";
    return $sql;

  }

  public function getAllLikesByUserSql($UserId){

    $sql = "SELECT * FROM userLikes WHERE userId = $UserId";
    return $sql;

  }

  public function lockGroupSql($groupId){

    $sql = "UPDATE fordFanatics.groups SET status = 1 WHERE groupId = $groupId";
    return $sql;
  }

  public function sendDirectMessageSql($messageFrom, $messageTo, $directMessage)
  {
    $sql = "INSERT INTO fordFanatics.directMessages (fromUserId, toUserId, message) VALUES ($messageFrom, $messageTo, '$directMessage')";
    return $sql;
  }

  public function unlockGroupSql($groupId){

     $sql = "UPDATE fordFanatics.groups SET status = 0 WHERE groupId = $groupId";
    return $sql;
  }

  public function removeUserFromGroupSql($groupId, $userId) {

    $sql = "DELETE FROM userGroup WHERE groupId = $groupId AND groupUserId = $userId";

    return $sql;

  }

  public function getAllExistingGroupsSql(){

    $sql = "SELECT * FROM fordFanatics.groups";
    return $sql;

  }

  public function deleteMessageSql($messageId)
  {
    $sql = "DELETE FROM posts WHERE messageId = $messageId";
    return $sql;
  }

  public function getLatestPostSql($userId, $groupId)
  {
    $sql = "SELECT * FROM posts,user WHERE posts.UserId = '$userId' AND posts.groupId = '$groupId' AND user.ID = '$userId' ORDER BY posts.TimeOfPost DESC LIMIT 1";
    return $sql;
  }

  public function uploadProfilePictureSql($userId, $filePath){

    $sql = "UPDATE fordFanatics.user SET ProfilePicture = '$filePath' WHERE ID = '$userId'";

    return $sql;
  }

  public function getComments($messageId)
  {
    $sql = "SELECT * FROM fordFanatics.comments WHERE parent_messageId = '$messageId'";
    return $sql;
  }

  public function getInvitesSql($userId){

    $sql = "SELECT * FROM fordFanatics.groupInvite WHERE userIdInvited = '$userId'";
    return $sql;
  
  }

  public function sendInvitationSql($groupId, $userIdInvited)
  {
    $sql = "INSERT INTO fordFanatics.groupInvite (groupId, userIdInvited) VALUES ('$groupId', '$userIdInvited')";
    return $sql;
  }

  public function checkIfUserHasBeenInvitedSql($userIdInvited, $groupIdTobeInvitedTo)
  {
    $sql = "SELECT * FROM fordFanatics.groupInvite WHERE userIdInvited = '$userIdInvited' AND groupId = '$groupIdTobeInvitedTo'";
    return $sql;
  }

  public function getAllPublicGroupsSql()
  {
    $sql = "SELECT * FROM fordFanatics.groups WHERE type = 'public'";
    return $sql;
  }

  public function getAllUserIdSqls()
  {
    $sql = "SELECT * FROM fordFanatics.user";
    return $sql;
  }

  public function writeUploadToDBSql($userId, $groupId, $type, $message)
  {
    $sql = "INSERT INTO fordFanatics.posts (message, postType, groupId, UserId) VALUES ('$message', '$type', '$groupId', '$userId')";
    return $sql;
  }

  public function checkIfGroupExistsSql($groupName)
  {
    $sql = "SELECT * FROM fordFanatics.groups WHERE groupName = '$groupName'";
    return $sql;
  }


  public function addCommentsSQL($commentInput, $userId, $parentMessageId)
  {
    $sql = "INSERT INTO fordFanatics.comments (parent_messageId, comment, commentUserId)  VALUES ('$parentMessageId', '$commentInput', '$userId')";
    return $sql;
  }

  public function createNewGroupSQL($groupName, $type, $groupOwnerId){

    $sql = "INSERT INTO fordFanatics.groups (groupName, ownerUserId, type) VALUES ('$groupName', '$groupOwnerId', '$type')";

    return $sql;
  
  }

  public function paginationSql($startFrom, $postPerPage, $groupId)
  {
    $sql = "SELECT * FROM posts,user WHERE posts.groupId = $groupId and posts.UserId = user.ID ORDER by TimeOfPost DESC LIMIT $startFrom, $postPerPage";

    return $sql;
  }

  public function deleteGroupInvitationSql($groupId, $userId)
  {
    $sql = "DELETE FROM fordFanatics.groupInvite WHERE groupId = '$groupId' AND userIdInvited = '$userId'";

    return $sql;
  }

  public function updateUpAndDownVotesSql($messageId, $likeCount, $dislikeCount ){

    //$sql = "UPDATE posts SET upVotes = '$likeCount' AND downVotes = '$dislikeCount' WHERE messageId = $messageId";
      $sql = "UPDATE posts SET downVotes = '$dislikeCount', upVotes = '$likeCount' WHERE messageId = '$messageId'";

    return $sql;

  }

  public function incrementDislikeSql($messageId){

    $sql = "UPDATE posts SET downVotes = downVotes + 1 WHERE messageId = $messageId";

    return $sql;

  }

  public function decrementDislikeSql($messageId){

    $sql = "UPDATE posts SET downVotes = downVotes - 1 WHERE messageId = $messageId";

    return $sql;
  }

  public function getLikeCountFrmLikeTableSql($messageId){

    $sql = "SELECT * FROM userLikes WHERE message_id = $messageId AND reactionId = '1'";
    return $sql;

  }

  public function addUserToGroupSql($groupId, $userId)
  {
    $sql = "INSERT INTO fordFanatics.userGroup (groupUserId, groupId) VALUES ('$userId', '$groupId')";
    return $sql;
  }

  public function insertNewUserSql($FirstName, $LastName, $username, $email, $password, $profilePic){

    $sql = "INSERT INTO fordFanatics.user (FirstName, LastName, UserName, Email, Password, ProfilePicture) VALUES ('$FirstName', '$LastName', '$username', '$email', '$password', '$profilePic')";

    return $sql;
  }

  public function checkIfUserExistsSql($email){

        $sql = "SELECT * FROM fordFanatics.user WHERE Email = '$email'";
        return $sql;
}

  public function getDislikeCountFrmLikeTable($messageId){

    $sql = "SELECT * FROM userLikes WHERE message_id = $messageId AND reactionId = '0'";
    return $sql;

  }


  public function decrementLikeSql($messageId){

    $sql = "UPDATE posts SET upVotes = upVotes - 1 WHERE messageId = $messageId";
    return $sql;

  }

  public function getOwnedGroupsSql($userId)
  {
    $sql = "SELECT * FROM groups WHERE ownerUserId = '$userId'";
    return $sql;
  }

  public function recordDislikeSql($messageId, $userId)
  {

    $sql = "INSERT INTO fordFanatics.userLikes (message_id, userId, reactionId) VALUES ('$messageId', '$userId', '0') ON DUPLICATE KEY UPDATE reactionId=0";
    return $sql;

  }

  public function recordLikesSql($messageId, $userId)
  {
    $sql = "INSERT INTO fordFanatics.userLikes (message_id, userId, reactionId) VALUES ('$messageId', '$userId', '1') ON DUPLICATE KEY UPDATE reactionId=1";
    return $sql;
  }

  public function getLikesSql($messageId, $userId){

    $sql = "SELECT * FROM fordFanatics.userLikes WHERE message_id = '$messageId' AND userId = '$userId'";
    return $sql;

  }

  public function getLikeCountForMes($messageId)
  {
    $sql = "SELECT likeCount FROM fordFanatics.posts WHERE messageId = '$messageId'";
    return $sql;
  }

  public function getPostCountByUserSql($userId)
  {
    $sql = "SELECT * FROM fordFanatics.posts WHERE UserId = $userId";
    return $sql;
  }

  public function checkMembershipSql($userId, $groupId)
  {

    $sql = "SELECT * FROM fordFanatics.userGroup WHERE groupUserId = $userId AND groupId = $groupId";
    return $sql;
  }

  public function deleteLikesAssociatedSql($messageId)
  {

    $sql = "DELETE FROM fordFanatics.userLikes WHERE message_id = $messageId";
    return $sql;

  }

  public function deleteAssociatedCommSql($messageId)
  {
    $sql = "DELETE FROM fordFanatics.comments WHERE parent_messageId = $messageId";
    return $sql;

  }

  public function getGroupCountbyUserSql($userId)
  {
    $sql = "SELECT * FROM fordFanatics.userGroup WHERE groupUserId = $userId";
    return $sql;
  }

  public function getGroupIdFromNameSql($groupName)
  {
    $sql = "SELECT groupId FROM fordFanatics.groups WHERE groupName = '$groupName'";
    return $sql;
  }

    public function postToDB($userId, $message){

    $sql = "INSERT INTO fordFanatics.posts (message, UserId, groupId) VALUES ('$message', '$userId', '3')";
    return $sql;

  }

  public function unlikePost($userId, $messageId)
  {
    $sql = "DELETE FROM fordFanatics.userLikes WHERE userId='$userId' AND message_id='$messageId'";
    return $sql;
  }

  public function groupPostToDbSQL($userId, $message, $groupId)
  {
    $sql = "INSERT INTO fordFanatics.posts (message, userId, groupId) VALUES ('$message', '$userId', '$groupId')";
    return $sql;
  }


  //sql to get all of the posts
  public function getGlobalPostsSQL()
  {
  	 $sql = "SELECT * FROM fordFanatics.posts,user WHERE groupId='3' and posts.UserId = user.ID ORDER by posts.TimeOfPost DESC";
    //$sql = "SELECT * FROM fordFanatics.posts WHERE groupId='3' ORDER by posts.TimeOfPost DESC";
  	return $sql;
  }

  public function getGroupNamesSQL($groupId)
  {
    $sql = "SELECT * FROM fordFanatics.groups WHERE groupId = '$groupId'";

    return $sql;
  }


  public function matchPostWithUser($userId)
  {
  	$sql = "SELECT * FROM fordFanatics.user WHERE ID='$userId'";
  	return $sql;
  }

  public function getPostByGroup($groupId)
  {

    $sql = "SELECT * FROM fordFanatics.posts,user WHERE groupId='$groupId' and posts.UserId = user.ID ORDER by posts.TimeOfPost DESC";
    //$sql = "SELECT * FROM fordFanatics.posts WHERE groupId='$groupId' ORDER by TimeOfPost DESC ";
    return $sql;
  }

  public function getPostCount($groupId)
  {
    $sql = "SELECT * FROM fordFanatics.posts WHERE groupId = '$groupId'";
    return $sql;
  }

  public function updateDisplayPicSql($userId, $displayId)
  {
    $sql = "UPDATE user SET displayPic = '$displayId' WHERE ID = '$userId'";
    return $sql;
  }

  public function getGroupsForUser($userId)
  {
  	$sql = "SELECT * FROM userGroup WHERE groupUserId = '$userId'";
  	return $sql;
  }

  public function searchUsersSql($search)
  {
    $sql = "SELECT * FROM user WHERE FirstName LIKE '$search%' OR LastName LIKE '$search%' OR Email LIKE '$search%' OR UserName LIKE '$search%'";
    return $sql;
  }


}
  



?>
