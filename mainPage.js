
$(document).ready(function(){

    function validate(url) {
        //var url = document.getElementById("url").value;
        var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(url)) {
            //alert("Url is valid");
            return true;
        } 
            //alert("Url is not valid!");
            return false;
 
    }




  	var displayMessages = "displayMessages";
    var welcomeMessage = "<h1><center> Welcome to the Global Group!</center> </h1>";

    $('#welcomeMessage').html(welcomeMessage);
   loadMessages(0, 3);


    load_data();

 function load_data(query)
 {
  $.ajax({
   url:"server/searchUsers.php",
   method:"POST",
   data:{query:query},
   success:function(data)
   {

    if(data == "")
    {
        

       $("#result").html("no results");
    }
    else
    {
         
          data = JSON.parse(data);
         
          var str = ""; 
         // = data['searchResults'][0]['FirstName'] + " " + data['searchResults'][0]['LastName'];
          var searchResultsCount = data['searchResults'].length;

          for(var i = 0; i< searchResultsCount; i++)
          {
             str += "<a href = 'profilepage.php?Id=" + data['searchResults'][i]['ID'] + "'";
             str += "<button>" + data['searchResults'][i]['FirstName'] + " " + data['searchResults'][i]['LastName'] + "</button></br>";

             str += "</a>";

          }

          $('#result').html(str);

    }

   }
  });
 }
 
 $('#search_text').keyup(function(){
  var search = $(this).val();
  if(search != '')
  {
   load_data(search);
  }
  else
  {
   load_data();
  }
 });

            
function loadMessages(page, groupId){

  
  $(".allPostsClass").empty();
  $(".groupPostsClass").empty();
  $(".loadMore").show().hide().fadeIn(200);
  
  var isUserMember = 0;

  $.ajax({

    url : 'server/controller.php',
    type : 'POST',
    async: false,
    data : {
        'checkUserMembership'  : 'checkUserMembership',
        'groupId' : groupId

    },
    
    success : function(data) {   
        
      isUserMember = parseInt(data);
    }

  }); 


  if(isUserMember == 0)
  {

    var non = "";
    non+="<h1>You are not part of this group. You must be part of this group to view or edit its content.</h1>";
    $('#allPosts').html(non);
    return;

  }


  var groupStatus = 0;
  

            $.ajax({

              url : 'server/controller.php',
              type : 'POST',
              async: false,
              data : {
                  'getGroupName'  : 'getGroupName',
                  'groupId' : groupId

              },
              
              success : function(data) {   
                  
                var welcomeMessage = "<h1><center> Welcome to " + data + " group! </center> </h1>";

                $('#welcomeMessage').html(welcomeMessage);

              }

        });  


      $.ajax({

      url : 'server/controller.php',
      type : 'POST',
      async: false,
      data : {
          'getGroupInfo' : 'getGroupInfo',
          'groupId' : groupId
      },
      
      success : function(data) {   
       data = JSON.parse(data);   
       groupStatus = data['groupInfo'][0]['status'];
            
      }
  });

        var UserType = 0;

        $.ajax({

                url : 'server/controller.php',
                type : 'POST',
                async: false,
                data : {
                    'getUserType' : 'getUserType'
                },
                
                success : function(data) {   
                     UserType = parseInt(data);
                 

                }
        }); 
    var str = "";
    var strf = "";
    str += "<input id = 'groupIdForPagination' type = 'hidden' value = '" + groupId + "'>"; 


     $.ajax({

           url : 'server/controller.php',
            type : 'POST',
              data : {
           		
           		 'pagination_data' : displayMessages,
               'groupId' : groupId,
               'page' : page 
 
             },
                                 
             success : function(data) {   

                                     
                      if (data == "")
                      {

          strf += "<div class='w3-row-padding'>";
          strf += "<div class='w3-col m12'>";
          strf += "<div class='w3-card w3-round w3-white'>";
          strf += " <div class='w3-container w3-padding'>";
          strf += "<h6 class='w3-opacity'>Share something with the world</h6>";         
          
          
            if(groupStatus == 0)
            {
          
          strf += "<form >";
             strf += "<input type='text' id='groupPostMessage' name='groupPostMessage' placeholder='Whats on your mind' contenteditable='true' class='w3-border w3-padding'>";
             strf += "<input type = 'hidden' id='groupIdPostedTo' class'groupIdPosted' value = '" + groupId + "'>";
             strf += "<button id = 'postButton' name='postTheMessage' type='submit' class='w3-button w3-theme postGroupMessage'><i class='fa fa-pencil'></i>Post</button>";
          strf += "</form>";
           strf += "<form >";
            
          strf += "<form id = 'uploadImage'>";
            strf +="<button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal5'>Upload Image/Document</button>";
          strf += "</form>";

          strf += "<form id = 'uploadCode'>";
            strf +="<button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal1'>Code</button>";

          strf +="</form>";

            strf += "<form id = 'uploadDocument'";
            strf += "<button type='button' class='btn btn-info ' data-toggle='modal' data-target='#myModal5'>Document</button>";
          strf += "</form>";



  //       strf += "<div class='modal fade' id='myModal3' role='dialog'>";
  //   strf += "<div class='modal-dialog'>";
    
  //     strf += "<div class='modal-content'>";
  //     strf += "<div class='modal-header'>";
  //         strf += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
  //         strf += "<h4 class='modal-title'>Share a picture</h4>";
  //       strf += "</div>";
  //          strf += "<div class='modal-body'>";
  //           strf += "<form action = '#' method='POST' enctype='multipart/form-data'>";
  //             strf += "<label><input id = 'file' type='file' name='file' accept='.png, .jpg, .jpeg'/></label>";
              
  //             strf += "<span id='basic-addon1'><i class = 'fa fa-link postingOptionMendu' aria-hidden='true'></i>URL</span><input id='urlToUpload' aria-describedby='basic-addon1' placeholder='Image URL...' type='text'></label></br>";
              

  //             strf += "<input type='hidden' value = '" + groupId + "'>";
  //             strf += "<button name = 'submit' class='btn btn-info uploadImageButton' type='submit'>Submit</button>";

  //             strf += "<button type='button' class='btn btn-info modalClose' data-dismiss='modal'>Close</button>";
  //             strf += "<button style = 'float: right;' name = 'submit' class='btn btn-info uploadImageButtonURL' type='submit'>Submit URL</button>";
  //             strf += "</form>";
  //           strf+="</div>";
  //     strf+="</div>";
  //   strf+="</div>";
  // strf+="</div>";


  strf+="<div class='modal fade' id='myModal1' role='dialog'>";
    strf+="<div class='modal-dialog'>";
        strf+="<div class='modal-content'>";
        strf+="<div class='modal-header'>";
        strf+="<button type='button' class='close modalClose' data-dismiss='modal'>&times;</button>";
        strf+="<h4 class='modal-title'>code posting Area</h4>";
        strf+="</div>";
        strf+="<div class='modal-body'>";
          
          strf+="<form action ='#' id= 'codeForm' method = 'post'>";
          
          strf+="<div class='form-group'>";
          strf+="<label for='message-text' class='form-control-label'>code<i class='fa fa-code postingOptionMenu' aria-hidden='true'></i></label>";
          strf+="<textarea id ='codeToUpload' rows='4' cols='59' ></textarea>";
          strf+="<button type='button' class='btn btn-default modalClose' data-dismiss='modal'>Close</button>";
              strf+="<button type='submit' name='submit' class='btn btn-success codeBtn submitCodeButton'>submit code</button>";
          strf+="</div>";

        strf+="</div>"; 
         strf+="</div>";
        strf+="</div>"; 
         strf+="</div>";




            if(UserType == 1)
            {
               strf += "<button value = '" + groupId + "' id = 'archiveGroup' class='fa fa-unlock arcUnarcGroup' style='float: right; font-size:48px;color:red'></button>"; 
            }
           
           
            }
            else
            {
              if(UserType == 1)
              {
                 strf += "<button value = '" + groupId + "' id = 'archiveGroup' class='fa fa-lock arcUnarcGroup' style='float: right; font-size:48px;color:red'></button>"; 
              }
             
            }

         

          strf += "</div>";  

          strf += "</div>";
           
          strf +=  "</div>";
       
          strf += "</div>";
          $('#groupPostForumOne').html(strf);
          $('#groupPostForumOne').append(str);

                      }
                      else
                      {


                           strf += "<div class='w3-row-padding'>";
          strf += "<div class='w3-col m12'>";
          strf += "<div class='w3-card w3-round w3-white'>";
          strf += " <div class='w3-container w3-padding'>";
          strf += "<h6 class='w3-opacity'>Share something with the world</h6>";         
          
          
            if(groupStatus == 0)
            {
          
          strf += "<form >";
             strf += "<input style='height: 48px;' type='text' id='groupPostMessage' name='groupPostMessage' placeholder='Whats on your mind' contenteditable='true' class='w3-border w3-padding'>";
             strf += "<input type = 'hidden' id='groupIdPostedTo' class'groupIdPosted' value = '" + groupId + "'>&nbsp;&nbsp;";
             strf += "<button style='height: 48px; margin-top: -3px;' id = 'postButton' name='postTheMessage' type='submit' class='w3-button w3-theme postGroupMessage'><i class='fa fa-pencil'></i>Post</button>";
          strf += "</form>";
           strf += "<form >";
            
          strf += "<form id = 'uploadImage'>";
            strf +="&nbsp;<button type='button' style='height: 48px; margin-top: -3px;' class='btn btn-info' data-toggle='modal' data-target='#myModal3'>Image or Document</button>";
          strf += "</form>";
     
          strf += "<form id = 'uploadCode'>";
            strf +="&nbsp;<button type='button' style='height: 48px; margin-top: -3px;' class='btn btn-info' data-toggle='modal' data-target='#myModal1'>Code</button>";

          strf +="</form>";




        strf += "<div class='modal fade' id='myModal3' role='dialog'>";
    strf += "<div class='modal-dialog'>";
    
      strf += "<div class='modal-content'>";
      strf += "<div class='modal-header'>";
          strf += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
          strf += "<h4 class='modal-title'>Share a picture or Document</h4>";
        strf += "</div>";
           strf += "<div class='modal-body'>";
            strf += "<form action = '#' method='POST' enctype='multipart/form-data'>";
              strf += "<label><input id = 'file' type='file' onchange='loadFile(event)' name='file' accept='image/*'/></label>";
              strf += "<img width='20%' height='20%' id='output'/>&nbsp;&nbsp;";

              strf += "<span id='basic-addon1'><i class = 'fa fa-link postingOptionMendu' aria-hidden='true'></i>URL</span><input id='urlToUpload' aria-describedby='basic-addon1' placeholder='Image URL...' type='text'></label></br>";
              

              strf += "<input type='hidden' value = '" + groupId + "'>";
              strf += "<button name = 'submit' class='btn btn-info uploadDocumentButton' type='submit'>Submit</button>";

              strf += "<button type='button' class='btn btn-info modalClose' data-dismiss='modal'>Close</button>";
              strf += "<button style = 'float: right;' name = 'submit' class='btn btn-info uploadImageButtonURL' type='submit'>Submit URL</button>";
              strf += "</form>";
            strf+="</div>";
      strf+="</div>";
    strf+="</div>";
  strf+="</div>";


  strf+="<div class='modal fade' id='myModal1' role='dialog'>";
    strf+="<div class='modal-dialog'>";
        strf+="<div class='modal-content'>";
        strf+="<div class='modal-header'>";
        strf+="<button type='button' class='close modalClose' data-dismiss='modal'>&times;</button>";
        strf+="<h4 class='modal-title'>code posting Area</h4>";
        strf+="</div>";
        strf+="<div class='modal-body'>";
          
          strf+="<form action ='#' id= 'codeForm' method = 'post'>";
          
          strf+="<div class='form-group'>";
          strf+="<label for='message-text' class='form-control-label'>code<i class='fa fa-code postingOptionMenu' aria-hidden='true'></i></label>";
          strf+="<textarea id ='codeToUpload' rows='4' cols='59' ></textarea>";
          strf+="<button type='button' class='btn btn-default modalClose' data-dismiss='modal'>Close</button>";
              strf+="<button type='submit' name='submit' class='btn btn-success codeBtn submitCodeButton'>submit code</button>";
          strf+="</div>";

        strf+="</div>"; 
         strf+="</div>";
        strf+="</div>"; 
         strf+="</div>";




            if(UserType == 1)
            {
               strf += "<button value = '" + groupId + "' id = 'archiveGroup' class='fa fa-unlock arcUnarcGroup' style='float: right; font-size:48px; color:red height: 48px; margin-top: -3px; '></button>"; 
            }
           
           
            }
            else
            {
              if(UserType == 1)
              {
                 strf += "<button value = '" + groupId + "' id = 'archiveGroup' class='fa fa-lock arcUnarcGroup' style='height: 48px; margin-top: -3px; float: right; font-size:48px; color:red'></button>"; 
              }
             
            }

         

          strf += "</div>";  

          strf += "</div>";
           
          strf +=  "</div>";
       
          strf += "</div>";
          $('#groupPostForumOne').html(strf);


                      var obj = JSON.parse(data);
                      var messageLength = obj.length;
                    //  var str ="";
                      var result = null;
                    
                      

                      obj['messages'].forEach(function(e){

                    str+= "<div id = " + e['messageId'] + "globalMessage" + " class='w3-container w3-card w3-white w3-round w3-margin'>";
                
				            	  str+= "<div  >";

 
                    if(e['displayPic'] == '1')
                    {
                        $.ajax({

                            url : 'server/controller.php',
                            type : 'POST',
                            async: false,
                            data : {
                               'getGravatar' : 'getGravatar',
                               'userEmail' : e['Email']
                            },  
                            success : function(data) {   
                              str += "<img src = '" + data + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                            }
                       }); 
                  }
                  else if(e['displayPic'] == '2')
                  {
                      str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                  }
                  else{

                    if( e['ProfilePicture'] == "")
                    {
                      str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                    }
                    else
                    {
                      str += "<img src = '" + e['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                    }

                    
                  }
                      	
							         str+= "<span class='w3-right w3-opacity'>" + e['TimeOfPost'] + "</span>";
	                     str+= "<h4>" + e['FirstName'] + " " + e['LastName'] + "</h4>";

                      if(UserType == 1)
                      {
                            str += "<form id = '" + e['messageId'] + "dButton" + "'>";
                                str += "<button style ='float: right;' type='button' class='btn btn-default btn-sm deleteMessageBtn'>";
                                str += "<input type = 'hidden' value = '" + e['messageId'] + "'>";
                                str += "<span class='glyphicon glyphicon-trash'></span> Trash"; 
                                str += "</button><br>";
                            str += "</form>";
                      }

	                   //  console.log(e['messageId']);
                        if (e['postType'] == "picture")
                        {
                          str+="<img src='upload/" + e['message'] + "' height='150' width='225' class='img-thubnail'/></br>";
                        }
                        else if(e['postType'] == "url")
                        {
                          str += "<img src='" + e['message'] + "' height='150' width='225'></br>";
                        }
                        else if(e['postType'] == "code")
                        {
                           str += "<blockquote ><pre><code>" + e['message'] + "</code></pre></blockquote></br>";
                        }
                        else if (e['postType'] == "document")
                        {

                             var image_extension = e['message'].substr(e['message'].lastIndexOf('.') + 1);

                            if(image_extension.toLowerCase() == "gif" || image_extension.toLowerCase() == "png" ||
                            image_extension.toLowerCase() == "jpg" || image_extension.toLowerCase() =="jpeg")
                            {
                                str += "<img src='upload/" + e['message'] + "' height='150' width='225'></br>";
                                str += "<a href='upload/" + e['message'] + "'>" + e['message'] + "</a></br>";
                            }
                           else
                           {
                              str += "<a href='upload/" + e['message'] + "'>" + e['message'] + "</a></br>";
                           }
                        }
                        else
                        {
                          str +="<p>" + e['message'] + "</p>";
                        }
                        
                           $.ajax({

                                   url : 'server/controller.php',
                                   type : 'POST',
                                   async: false,
                                   data : {
                                     'checkIfUserLiked' : 'checkIfUserLiked', 
                                     'messageId' : e['messageId']
                                   },
                                    
                                   success : function(data) {   
                                      result = data;
                                       var UserLiked = data.split('/');
                                       UserLikedCount = UserLiked[0];
                                       userDislikedCount = UserLiked[1];

                                       if(UserLikedCount == '1')
                                       {
                                          if(groupStatus == 0)
                                          {
                                           str += "<i class='fa fa-thumbs-up like-btn likeOrDislike' data-id= " + e['messageId'] + " ></i>";
                                           str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                           str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + e['messageId'] + " ></i>";
                                          }
                                           //console.log(result);

                                          
                                           str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                           str += "<span class='likes'> Likes:" + e['upVotes'] + " </span>";
                                           str += "<span class='dislikes'>Dislikes: " + e['downVotes'] + " </span>";

                                       }
                                       if(userDislikedCount == '1')
                                       {
                                          if(groupStatus == 0)
                                          {
                                             str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + e['messageId'] + " ></i>";
                                             str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                             str += "<i class='fa fa-thumbs-down dislike-btn likeOrDislike' data-id= " + e['messageId'] + " ></i>";
                                          }

                                          
                                           str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                           str += "<span class='likes'> Likes:" + e['upVotes'] + " </span>";
                                           str += "<span class='dislikes'>Dislikes: " + e['downVotes'] + " </span>";

                                       }
                                       if(UserLikedCount == '' && userDislikedCount == '')
                                       {
                                          if(groupStatus == 0)
                                          {
                                             str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + e['messageId'] + " ></i>";
                                             str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                             str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + e['messageId'] + " ></i>";
                                          }
     
                                           str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                           str += "<span class='likes'> Likes:" + e['upVotes'] + " </span>";
                                           str += "<span class='dislikes'>Dislikes: " + e['downVotes'] + " </span>";

                                       }

 
                                   }
              
                          }); 

                            var messageId = e['messageId'];


                             $.ajax({

                                    url : 'server/controller.php',
                                    type : 'POST',
                                    async: false,
                                    data : {

                                      'getComments' : 'getComments',
                                      'messageId'   : e['messageId']

                                    },
                                    
                                    success : function(data) {   
                                     
                                     str += "<button onclick= myFunction('" + messageId + "') class='w3-button w3-white w3-border w3-border-white'><i class='material-icons'>filter_list</i></button>"; 

                                     if(data.length == 0)
                                     {
                                       str += "<div id = '" + messageId + "' class = 'w3-hide w3-container'>";
                                       str += "<div class='a nocommentclass'>";
                                          str += "<p> no comments </p>";
                                       str += "</div>";

                                       str += "</div>";
                                     }
                                     else
                                     {

                                     // str += "<br/>";
                                     // str += "<br/>";
                                     str += "<div  id = '" + messageId + "' class = 'w3-hide w3-container'>";

                                      var commentsObj = JSON.parse(data);
                                      
                                       var numberOfComments = commentsObj['comments']['length'];
                                       
                                        for (var i = 0; i < numberOfComments; i++)
                                        {
                                        
                                              $.ajax({

                                                    url : 'server/controller.php',
                                                    type : 'POST',
                                                    async: false,
                                                    data : {
                                                  
                                                        'getCommenterDetails' : 'getCommenterDetails', 
                                                        'commenterUserId'     : commentsObj['comments'][i]['commentUserId']
                                               
                                                    },
                                          
                                                     success : function(data) {   
                                                        
                                                           var commenterObj = JSON.parse(data);

                                                        //   console.log(commenterObj);

                                                          if(commenterObj['commenter'][0]["displayPic"] == '1')
                                                          {
                                                              $.ajax({

                                                                  url : 'server/controller.php',
                                                                  type : 'POST',
                                                                  async: false,
                                                                  data : {
                                                                     'getGravatar' : 'getGravatar',
                                                                     'userEmail' : commenterObj['commenter'][0]['Email']
                                                                  },  
                                                                  success : function(data) {   
                                                                    str += "<img src = '" + data + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                                                                  }
                                                             }); 
                                                        }
                                                        else if(commenterObj['commenter'][0]["displayPic"] == '2')
                                                        {
                                                          str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";                               
                                                        }
                                                        else{

                                                          if( commenterObj['commenter'][0]['ProfilePicture'] == "")
                                                          {
                                                            str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                                                          }
                                                          else
                                                          {
                                                            str += "<img src = '" + commenterObj['commenter'][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                                                          }

                                                          
                                                        }
                                                          
                                                          
                                                          str += "<h6>" + commenterObj['commenter'][0]['FirstName'] + " " + commenterObj['commenter'][0]['LastName'] + "</h6>";
                                                          str += "<br/>";
                                                   
                                                            
                                                     }
                    
                                             }); 


                               
                                              str += "<br/>";
                                               str += "<div class='a'>";
                                             
                                                str += "<p class = 'a'>" + commentsObj["comments"][i]['comment'] + "</p>";   
                                             
                                              str += "</div>";
                                              str += "<br/>";

                                        }
                                      

                                     }


                                      
                                    }
                              });


                            
                              str += "<form id =  '" + e['messageId'] + "'  > ";
                                  str += "<aside><input name = '" + e['MessageUserId'] + "' placeholder='Type your comment'> </input>" ;
                                  
                                  if(groupStatus == 0)
                                  {
                                    str +=  "<button class='commentButton' value = '"  + e['messageId'] + "' type = 'submit'>Comment</button> </aside></br>";
                                  }    
                                  
                              
                              str += "</form>";
                              

                            str += "</div>";
                            

                            str += "</div>";
                            str += "</div>";
                                           
                            $('#allPosts').html(str).hide().fadeIn(50);

                      });
                            
                            var adminStr = "";

                            $.ajax({

                              url : 'server/controller.php',
                              type : 'POST',
                              async: false,
                              data : {
                                  'getAllGroups' : 'getAllGroups'
                              },
                              
                              success : function(data) {   
                            
                                  var groups = JSON.parse(data);

                                  console.log(groups);
                                  var numberOfGroups = groups['groups'].length;
                                  console.log("num of groups: " + numberOfGroups);
                                  adminStr += "</br>";
                                  for (var i =0; i<numberOfGroups; i++)
                                  {

                                    adminStr += "<form method = 'post' action = 'modifyGroups.php'>";
                                    adminStr += "<input type='hidden'  id='groupNameAdmin' name='groupNameAdmin' value='" + groups['groups'][i]['groupId'] + "'>";
                                    adminStr += "<button type='submit' class = 'modifyGroupOnClick w3-button w3-block w3-theme-l1 w3-left-align'  >" + groups['groups'][i]['groupName'] + "</button> </br>";
                                    adminStr += "</form>";
                                 
                                  }
                                  


                                  $('#Demo5').append(adminStr).hide().fadeIn(750);

                              }
                            }); 
                         }
        }

	});

// $(".loadMore").show();

}

  var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};


function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}


$(document).on('click', '.submitCodeButton', function(e) {

       e.preventDefault();
       var groupId = document.getElementById("groupIdPostedTo").value;

       var code = escapeHtml($('#codeToUpload').val());



       if(code == "")
       {
        alert("Source code to upload cannot be empty. Please try again.");
       }
       else
       {

          $.ajax({

              url : 'server/controller.php',
              type : 'POST',
              async: false,
              data : {
                  'uploadSourceCode' : 'uploadSourceCode',
                  'groupId' : groupId,
                  'codeToUpload' : code
              },
              
              success : function(data) {   

               var latestPost = JSON.parse(data);
               console.log(latestPost);
              var UserType = 0;
              var str = "";
              
                $.ajax({

                    url : 'server/controller.php',
                    type : 'POST',
                    async: false,
                    data : {
                        'getUserType' : 'getUserType'
                    },
                    
                    success : function(data) {   
                         UserType = parseInt(data);
                        str+= "<div id = '" + latestPost["latestPost"][0]['messageId'] + "globalMessage" + "' class='w3-container w3-card w3-white w3-round w3-margin'>";
                     

                    }
                });             

               var str = "";
             str+= "<div id = '" + latestPost['latestPost'][0]['messageId'] + "globalMessage' class='w3-container w3-card w3-white w3-round w3-margin'>";        
              str+= "<div  >";
              
              if (latestPost['latestPost'][0]['ProfilePicture'] == ""){
                 
                  str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
              else{

                  str += "<img src = '" + latestPost['latestPost'][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
                        
                       str+= "<span class='w3-right w3-opacity'>" + latestPost['latestPost'][0]['TimeOfPost'] + "</span>";
                       str+= "<h4>" + latestPost['latestPost'][0]['FirstName'] + " " + latestPost['latestPost'][0]['LastName'] + "</h4>";
                       
                       if(UserType == 1)
                        {
                            str += "<form id = '" + latestPost["latestPost"][0]['messageId'] + "dButton" + "'>";
                                str += "<button style ='float: right;' type='button' class='btn btn-default btn-sm deleteMessageBtn'>";
                                str += "<input type = 'hidden' value = '" + latestPost["latestPost"][0]['messageId'] + "'>";
                                str += "<span class='glyphicon glyphicon-trash'></span> Trash"; 
                                str += "</button><br>";
                            str += "</form>";
                        }

                       //str+= "<p>" + latestPost['latestPost'][0]['message'] + "</p>";
                       str += "<blockquote><pre><code>" + latestPost['latestPost'][0]['message'] + "</code></pre></blockquote></br>";
                       
                       str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<span class='likes'> Likes:" + latestPost['latestPost'][0]['upVotes'] + " </span>";
                       str += "<span class='dislikes'>Dislikes: " + latestPost['latestPost'][0]['downVotes'] + " </span>";

                       str += "<button onclick= myFunction('" + latestPost['latestPost'][0]['messageId'] + "') class='w3-button w3-white w3-border w3-border-white'><i class='material-icons'>filter_list</i></button>"; 

                        str += "<div id = '" + latestPost['latestPost'][0]['messageId'] + "' class = 'w3-hide w3-container'>";
                             str += "<div class='a nocommentclass'>";
                                str += "<p> no comments </p>";
                             str += "</div>";
                        str += "</div>";

                        str += "<form id =  '" + latestPost['latestPost'][0]['messageId'] + "'  > ";
                            str += "<aside><input name =" + latestPost['latestPost'][0]['ID'] + " placeholder='Type your comment'> </input>" ;
                            str +=  "<button class='commentButton' value = '"  + latestPost['latestPost'][0]['messageId'] + "' type = 'submit'>Comment</button> </aside>";
                        str += "</form>";
                         str += "</div>";
                        str += "</div>";
                        $( "#allPosts" ).prepend(str);

                

              }
          });  


       }





});



$(document).on('click', '.uploadImageButtonURL', function(e) {

  e.preventDefault();

 var groupId = document.getElementById("groupIdPostedTo").value;
 var urlToUpload = document.getElementById("urlToUpload").value;
 
 if(validate(urlToUpload) == false)
 {
    alert("URL is not valid, please try again.");
 }
 else
 {
            $.ajax({

            url : 'server/controller.php',
            type : 'POST',
            async: false,
            data : {
                'writeUrlUpload' : 'writeUrlUpload',
                'groupId' : groupId,
                'urlToUpload': urlToUpload 
            },
            
            success : function(data) {   
                 
                 var latestPost = JSON.parse(data);

              var UserType = 0;
              var str = "";
              
                $.ajax({

                    url : 'server/controller.php',
                    type : 'POST',
                    async: false,
                    data : {
                        'getUserType' : 'getUserType'
                    },
                    
                    success : function(data) {   
                         UserType = parseInt(data);
                        str+= "<div id = '" + latestPost["latestPost"][0]['messageId'] + "globalMessage" + "' class='w3-container w3-card w3-white w3-round w3-margin'>";
                     

                    }
                });             

               var str = "";
             str+= "<div id = '" + latestPost['latestPost'][0]['messageId'] + "globalMessage' class='w3-container w3-card w3-white w3-round w3-margin'>";        
              str+= "<div  >";
              
              if (latestPost['latestPost'][0]['ProfilePicture'] == ""){
                 
                  str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
              else{

                  str += "<img src = '" + latestPost['latestPost'][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
                        
                       str+= "<span class='w3-right w3-opacity'>" + latestPost['latestPost'][0]['TimeOfPost'] + "</span>";
                       str+= "<h4>" + latestPost['latestPost'][0]['FirstName'] + " " + latestPost['latestPost'][0]['LastName'] + "</h4>";
                       
                       if(UserType == 1)
                        {
                            str += "<form id = '" + latestPost["latestPost"][0]['messageId'] + "dButton" + "'>";
                                str += "<button style ='float: right;' type='button' class='btn btn-default btn-sm deleteMessageBtn'>";
                                str += "<input type = 'hidden' value = '" + latestPost["latestPost"][0]['messageId'] + "'>";
                                str += "<span class='glyphicon glyphicon-trash'></span> Trash"; 
                                str += "</button><br>";
                            str += "</form>";
                        }

                       //str+= "<p>" + latestPost['latestPost'][0]['message'] + "</p>";
                       str += "<img src='" + latestPost['latestPost'][0]['message'] + "' height='150' width='225'></br>";
                       str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<span class='likes'> Likes:" + latestPost['latestPost'][0]['upVotes'] + " </span>";
                       str += "<span class='dislikes'>Dislikes: " + latestPost['latestPost'][0]['downVotes'] + " </span>";

                       str += "<button onclick= myFunction('" + latestPost['latestPost'][0]['messageId'] + "') class='w3-button w3-white w3-border w3-border-white'><i class='material-icons'>filter_list</i></button>"; 

                        str += "<div id = '" + latestPost['latestPost'][0]['messageId'] + "' class = 'w3-hide w3-container'>";
                             str += "<div class='a nocommentclass'>";
                                str += "<p> no comments </p>";
                             str += "</div>";
                        str += "</div>";

                        str += "<form id =  '" + latestPost['latestPost'][0]['messageId'] + "'  > ";
                            str += "<aside><input name =" + latestPost['latestPost'][0]['ID'] + " placeholder='Type your comment'> </input>" ;
                            str +=  "<button class='commentButton' value = '"  + latestPost['latestPost'][0]['messageId'] + "' type = 'submit'>Comment</button> </aside>";
                        str += "</form>";
                         str += "</div>";
                        str += "</div>";
                        $( "#allPosts" ).prepend(str);

            }
        }); 
 }



});


$(document).on('click', '.uploadDocumentButton', function(e) {
      e.preventDefault();

      var groupId = document.getElementById("groupIdPostedTo").value;


      var property = document.getElementById("file").files[0];
      var image_name = property.name;
      var image_extension = image_name.split('.').pop().toLowerCase();


      var image_size = property.size;
      if(image_size > 2000000)
      {
        alert("Image File Size is very big");
      }
      else
      {
        var form_data = new FormData();
        form_data.append("file", property);
        form_data.append("groupId", groupId);
        form_data.append("uploadDocument", "uploadDocument");
        form_data.append("documentName", image_name);
        $.ajax({
          url : "server/controller.php",
          method: "POST",
          data:form_data,
          contentType:false,
          cache:false,
          processData:false,
          beforeSend:function(){
            $("#uploaded_image").html("<label class='text-success'>Image Uploading...</label>");
          },
          success:function(data)
          {
           
              var latestPost = JSON.parse(data);

              var UserType = 0;
              var str = "";
              
                $.ajax({

                    url : 'server/controller.php',
                    type : 'POST',
                    async: false,
                    data : {
                        'getUserType' : 'getUserType'
                    },
                    
                    success : function(data) {   
                         UserType = parseInt(data);
                      //   str+= "<div id = '" + latestPost["latestPost"][0]['messageId'] + "globalMessage" + "' class='w3-container w3-card w3-white w3-round w3-margin'>";
                     

                    }
                });             

               var str = "";
             str+= "<div id = '" + latestPost['latestPost'][0]['messageId'] + "globalMessage' class='w3-container w3-card w3-white w3-round w3-margin'>";        
              str+= "<div  >";
              
              if (latestPost['latestPost'][0]['ProfilePicture'] == ""){
                 
                  str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
              else{

                  str += "<img src = '" + latestPost['latestPost'][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
                        
                       str+= "<span class='w3-right w3-opacity'>" + latestPost['latestPost'][0]['TimeOfPost'] + "</span>";
                       str+= "<h4>" + latestPost['latestPost'][0]['FirstName'] + " " + latestPost['latestPost'][0]['LastName'] + "</h4>";
                       

                       if(UserType == 1)
                        {
                            str += "<form id = '" + latestPost["latestPost"][0]['messageId'] + "dButton" + "'>";
                                str += "<button style ='float: right;' type='button' class='btn btn-default btn-sm deleteMessageBtn'>";
                                str += "<input type = 'hidden' value = '" + latestPost["latestPost"][0]['messageId'] + "'>";
                                str += "<span class='glyphicon glyphicon-trash'></span> Trash"; 
                                str += "</button><br>";
                            str += "</form>";
                        }
                      
                        if(image_extension.toLowerCase() == "gif" || image_extension.toLowerCase() == "png" ||
                          image_extension.toLowerCase() == "jpg" || image_extension.toLowerCase() =="jpeg")
                        {
                          str += "<img src='upload/" + latestPost['latestPost'][0]['message'] + "' height='150' width='225'></br>";
                           str += "<a href='upload/" + latestPost['latestPost'][0]['message'] + "'>" + latestPost['latestPost'][0]['message'] + "</a></br>";
                        }
                        else
                        {
                          str += "<a href='upload/" + latestPost['latestPost'][0]['message'] + "'>" + latestPost['latestPost'][0]['message'] + "</a></br>";
                        }

                       str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<span class='likes'> Likes:" + latestPost['latestPost'][0]['upVotes'] + " </span>";
                       str += "<span class='dislikes'>Dislikes: " + latestPost['latestPost'][0]['downVotes'] + " </span>";

                       str += "<button onclick= myFunction('" + latestPost['latestPost'][0]['messageId'] + "') class='w3-button w3-white w3-border w3-border-white'><i class='material-icons'>filter_list</i></button>"; 

                        str += "<div id = '" + latestPost['latestPost'][0]['messageId'] + "' class = 'w3-hide w3-container'>";
                             str += "<div class='a nocommentclass'>";
                                str += "<p> no comments </p>";
                             str += "</div>";
                        str += "</div>";

                        str += "<form id =  '" + latestPost['latestPost'][0]['messageId'] + "'  > ";
                            str += "<aside><input name =" + latestPost['latestPost'][0]['ID'] + " placeholder='Type your comment'> </input>" ;
                            str +=  "<button class='commentButton' value = '"  + latestPost['latestPost'][0]['messageId'] + "' type = 'submit'>Comment</button> </aside>";
                        str += "</form>";
                         str += "</div>";
                        str += "</div>";
                        $( "#allPosts" ).prepend(str);



          }


        });

      }


});






$(document).on('click', '.uploadImageButton', function(e) {
      e.preventDefault();

      var groupId = document.getElementById("groupIdPostedTo").value;


      var property = document.getElementById("file").files[0];
      var image_name = property.name;
      var image_extension = image_name.split('.').pop().toLowerCase();
      if(jQuery.inArray(image_extension, ['gif', 'png', 'jpg', 'jpeg']) == -1)
      {
        alert("Invalid Image File");
      }

      var image_size = property.size;
      if(image_size > 2000000)
      {
        alert("Image File Size is very big");
      }
      else
      {
        var form_data = new FormData();
        form_data.append("file", property);
        form_data.append("groupId", groupId);
        form_data.append("uploadDisk", "uploadDisk");
        $.ajax({
          url : "server/uploadImage.php",
          method: "POST",
          data:form_data,
          contentType:false,
          cache:false,
          processData:false,
          beforeSend:function(){
            $("#uploaded_image").html("<label class='text-success'>Image Uploading...</label>");
          },
          success:function(data)
          {
           
              var latestPost = JSON.parse(data);

              var UserType = 0;
              var str = "";
              
                $.ajax({

                    url : 'server/controller.php',
                    type : 'POST',
                    async: false,
                    data : {
                        'getUserType' : 'getUserType'
                    },
                    
                    success : function(data) {   
                         UserType = parseInt(data);
                      //   str+= "<div id = '" + latestPost["latestPost"][0]['messageId'] + "globalMessage" + "' class='w3-container w3-card w3-white w3-round w3-margin'>";
                     

                    }
                });             

               var str = "";
             str+= "<div id = '" + latestPost['latestPost'][0]['messageId'] + "globalMessage' class='w3-container w3-card w3-white w3-round w3-margin'>";        
              str+= "<div  >";
              
              if (latestPost['latestPost'][0]['ProfilePicture'] == ""){
                 
                  str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
              else{

                  str += "<img src = '" + latestPost['latestPost'][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
              }
                        
                       str+= "<span class='w3-right w3-opacity'>" + latestPost['latestPost'][0]['TimeOfPost'] + "</span>";
                       str+= "<h4>" + latestPost['latestPost'][0]['FirstName'] + " " + latestPost['latestPost'][0]['LastName'] + "</h4>";
                       
                       if(UserType == 1)
                        {
                            str += "<form id = '" + latestPost["latestPost"][0]['messageId'] + "dButton" + "'>";
                                str += "<button style ='float: right;' type='button' class='btn btn-default btn-sm deleteMessageBtn'>";
                                str += "<input type = 'hidden' value = '" + latestPost["latestPost"][0]['messageId'] + "'>";
                                str += "<span class='glyphicon glyphicon-trash'></span> Trash"; 
                                str += "</button><br>";
                            str += "</form>";
                        }

                       //str+= "<p>" + latestPost['latestPost'][0]['message'] + "</p>";
                       str += "<img src='upload/" + latestPost['latestPost'][0]['message'] + "' height='150' width='225'></br>";
                       str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<span class='likes'> Likes:" + latestPost['latestPost'][0]['upVotes'] + " </span>";
                       str += "<span class='dislikes'>Dislikes: " + latestPost['latestPost'][0]['downVotes'] + " </span>";

                       str += "<button onclick= myFunction('" + latestPost['latestPost'][0]['messageId'] + "') class='w3-button w3-white w3-border w3-border-white'><i class='material-icons'>filter_list</i></button>"; 

                        str += "<div id = '" + latestPost['latestPost'][0]['messageId'] + "' class = 'w3-hide w3-container'>";
                             str += "<div class='a nocommentclass'>";
                                str += "<p> no comments </p>";
                             str += "</div>";
                        str += "</div>";

                        str += "<form id =  '" + latestPost['latestPost'][0]['messageId'] + "'  > ";
                            str += "<aside><input name =" + latestPost['latestPost'][0]['ID'] + " placeholder='Type your comment'> </input>" ;
                            str +=  "<button class='commentButton' value = '"  + latestPost['latestPost'][0]['messageId'] + "' type = 'submit'>Comment</button> </aside>";
                        str += "</form>";
                         str += "</div>";
                        str += "</div>";
                        $( "#allPosts" ).prepend(str);


          }


        });

      }


});

$(document).on('click', '.deleteMessageBtn', function(e) {
  
  var messageId = $(this).closest("form").find("input").val();
  
  
  

      $.ajax({

        url : 'server/controller.php',
        type : 'POST',
        data : {
            'deleteMessage'  : 'deleteMessage',
            'messageId' : messageId

        },
        
        success : function(data) {   
         
          $('#' + messageId + 'globalMessage').remove();

        }

  });  
 

});




$(document).on('click', '.commentButton', function(e) {

//  $('.commentButton').on('click', function(e){
       e.preventDefault();  
    
    var userInput = $(this).closest("form").find("input").val();
    var messageIdCommentedAt = $(this).val();
    
    

    var userCommented = "usercommented";

    if (userInput == "")
    {
      alert("comments cannot be empty, please try again.");
    }
    else {
       $(this).closest('form').remove();
     
         $.ajax({

              url : 'likeDislike.php',
              type : 'POST',
              data : {
                'commentInput' : userInput, 
                'messIdComment' : messageIdCommentedAt, 
                'userCommented' : userCommented
              },
              
              success : function(data) {   
                var userInfo = JSON.parse(data);
                //alert(userInfo);
                console.log(userInfo);

                if(userInfo["userInfo"][0]["displayPic"] == '1')
                {
                   $.ajax({

                      url : 'server/controller.php',
                      type : 'POST',
                      async: false,
                      data : {
                         'getGravatar' : 'getGravatar',
                         'userEmail' : userInfo["userInfo"][0]['Email']
                      },  
                      success : function(data) {   
                          $(".nocommentclass").remove();
                          userInput = escapeHtml(userInput);
                          var e = "<img src = '" + data + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                          e += "<h6> " + userInfo["userInfo"][0]['FirstName']  + " " + userInfo["userInfo"][0]["LastName"] +"</h6>";
                          e += " </br>";
                          e += "<div class='a'>";
                          e += " <p>" + userInput + "</p>";
                          e += "</div>"
                          e += "</br>";
                          e += "<form id =  '" + messageIdCommentedAt + "'  > ";
                          e += "<aside><input placeholder='Type your comment'> </input>" ;
                          e += "<button class='commentButton' value = '"  + messageIdCommentedAt + "' type = 'submit'>Comment</button> </aside></br>";
                          e += "</form>";
                          $('#' + messageIdCommentedAt).append(e); 
                      }
                 }); 
                }
                else if(userInfo["userInfo"][0]["displayPic"] == '2')
                {

                          $(".nocommentclass").remove();
                          userInput = escapeHtml(userInput);
                          var e = "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                          e += "<h6> " + userInfo["userInfo"][0]['FirstName']  + " " + userInfo["userInfo"][0]["LastName"] +"</h6>";
                          e += " </br>";
                          e += "<div class='a'>";
                          e += " <p>" + userInput + "</p>";
                          e += "</div>"
                          e += "</br>";
                          e += "<form id =  '" + messageIdCommentedAt + "'  > ";
                          e += "<aside><input placeholder='Type your comment'> </input>" ;
                          e += "<button class='commentButton' value = '"  + messageIdCommentedAt + "' type = 'submit'>Comment</button> </aside></br>";
                          e += "</form>";
                          $('#' + messageIdCommentedAt).append(e); 
                   
                }

                else{

                    if( userInfo["userInfo"][0]['ProfilePicture'] == "")
                    {
                          $(".nocommentclass").remove();
                          userInput = escapeHtml(userInput);
                        
                          var e = "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                          e += "</br>";
                          e += "<h6> " + userInfo["userInfo"][0]['FirstName']  + " " + userInfo["userInfo"][0]["LastName"] +"</h6>";

                          e+=" </br>";
                          e+="<div class='a'>";
                          e+=" <p>" + userInput + "</p>";
                          e+="</div>"
                          e+="</br>";

                          e += "<form id =  '" + messageIdCommentedAt + "'  > ";
                          e += "<aside><input placeholder='Type your comment'> </input>" ;
                          e +=  "<button class='commentButton' value = '"  + messageIdCommentedAt + "' type = 'submit'>Comment</button> </aside></br>";
                          e += "</form>";

                          $('#' + messageIdCommentedAt).append(e); 
                    }
                    else
                    {
                              $(".nocommentclass").remove();
                              userInput = escapeHtml(userInput);
                              var e = "<img src = '" + userInfo["userInfo"][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                              e += "</br>";
                              e += "<h6> " + userInfo["userInfo"][0]['FirstName']  + " " + userInfo["userInfo"][0]["LastName"] +"</h6>";

                              e+=" </br>";
                              e+="<div class='a'>";
                              e+=" <p>" + userInput + "</p>";
                              e+="</div>"
                              e+="</br>";

                              e += "<form id =  '" + messageIdCommentedAt + "'  > ";
                              e += "<aside><input placeholder='Type your comment'> </input>" ;
                              e +=  "<button class='commentButton' value = '"  + messageIdCommentedAt + "' type = 'submit'>Comment</button> </aside></br>";
                              e += "</form>";

                              $('#' + messageIdCommentedAt).append(e); 


                    }

                    
                  }







                
                // if (userInfo[2] == "")
                // {
                //     $(".nocommentclass").remove();
                //     userInput = escapeHtml(userInput);
                //     var e = "<img src='avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'><h6> " + userInfo[0] + " " + userInfo[1] +"</h6>";
                      
                //       e+=" </br>";
                //       e+="<div class='a'>";
                //       e+=" <p>" + userInput + "</p>";
                //       e+="</div>"
                //       e+="</br>";

                //      e += "<form id =  '" + messageIdCommentedAt + "'  > ";
                //          e += "<aside><input placeholder='Type your comment'> </input>" ;
                //          e +=  "<button class='commentButton' value = '"  + messageIdCommentedAt + "' type = 'submit'>Comment</button> </aside></br>";
                //      e += "</form>";

                //     $('#' + messageIdCommentedAt).append(e); 
                
                // }
                // else
                // {
                //     $(".nocommentclass").remove();
                //     userInput = escapeHtml(userInput);
                //      var e = "<img src='" + userInfo[2] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'><h6> " + userInfo[0] + " " + userInfo[1] +"</h6>";
                //          e += " </br>";
                //          e += " <div class='a'>";
                //          e += " <p>" + userInput + "</p>";
                //          e += "</div>";
                //          e += " </br>";
                //      e += "<form id =  '" + messageIdCommentedAt + "'  > ";
                //          e += "<aside><input placeholder='Type your comment'> </input>" ;
                //          e +=  "<button class='commentButton' value = '"  + messageIdCommentedAt + "' type = 'submit'>Comment</button> </aside></br>";
                //      e += "</form>";

                //     $('#' + messageIdCommentedAt).append(e); 
                // } 

               
              }
        });  

    }


  });





$(document).on('click', '.postGroupMessage', function(e) {
     
     e.preventDefault();
   
     var groupId = escapeHtml(document.getElementById('groupIdPostedTo').value);
     var groupMessage = document.getElementById('groupPostMessage').value;
     
  
     $('#groupPostMessage').val('');

     if(groupMessage == "")
     {
      alert("Posts cannot be empty. Please try again.");
     }
     else
     {
          $('h1#nopostsClass').remove();
          $.ajax({

            url : 'server/controller.php',
            type : 'POST',
            async: false,
            data : {
           
              'groupId' : groupId,
              'groupMessagePost' : groupMessage,
              'addGroupMessage' : 'addGroupMessage'
           
            },
            
             success : function(data) {   
               
               var latestPost = JSON.parse(data);

              var UserType = 0;
              var str = "";
              
                $.ajax({

                    url : 'server/controller.php',
                    type : 'POST',
                    async: false,
                    data : {
                        'getUserType' : 'getUserType'
                    },
                    
                    success : function(data) {   
                         UserType = parseInt(data);
                     
                     

                    }
                });             

               var str = "";
             str+= "<div id = '" + latestPost['latestPost'][0]['messageId'] + "globalMessage' class='w3-container w3-card w3-white w3-round w3-margin'>";        
              str+= "<div  >";
              
              if(latestPost['latestPost'][0]['displayPic'] == '1')
              {
                $.ajax({

                    url : 'server/controller.php',
                    type : 'POST',
                    async: false,
                    data : {
                        'getGravatar' : 'getGravatar',
                        'userEmail' : latestPost['latestPost'][0]['Email']
                    },
                    
                    success : function(data) {   
                       str += "<img src = '" + data + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";

                    }
                }); 
              }
              else if(latestPost['latestPost'][0]['displayPic'] == '2')
              {
                  str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";           
              }
              else{

                   if( latestPost['latestPost'][0]['ProfilePicture'] == "")
                    {
                      str += "<img src = 'avatar.jpg' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                    }
                    else
                    {
                      str += "<img src = '" + latestPost['latestPost'][0]['ProfilePicture'] + "' alt='avatar' class='w3-left w3-circle w3-margin-right' style='width:50px'>";
                    }

              }
                        
                       str+= "<span class='w3-right w3-opacity'>" + latestPost['latestPost'][0]['TimeOfPost'] + "</span>";
                       str+= "<h4>" + latestPost['latestPost'][0]['FirstName'] + " " + latestPost['latestPost'][0]['LastName'] + "</h4>";
                       
                       if(UserType == 1)
                        {
                            str += "<form id = '" + latestPost["latestPost"][0]['messageId'] + "dButton" + "'>";
                                str += "<button style ='float: right;' type='button' class='btn btn-default btn-sm deleteMessageBtn'>";
                                str += "<input type = 'hidden' value = '" + latestPost["latestPost"][0]['messageId'] + "'>";
                                str += "<span class='glyphicon glyphicon-trash'></span> Trash"; 
                                str += "</button><br>";
                            str += "</form>";
                        }

                       str+= "<p>" + latestPost['latestPost'][0]['message'] + "</p>";

                       str += "<i class='fa fa-thumbs-o-up like-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<i class='fa fa-thumbs-o-down dislike-btn likeOrDislike' data-id= " + latestPost['latestPost'][0]['messageId'] + " ></i>";
                       str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                       str += "<span class='likes'> Likes:" + latestPost['latestPost'][0]['upVotes'] + " </span>";
                       str += "<span class='dislikes'>Dislikes: " + latestPost['latestPost'][0]['downVotes'] + " </span>";

                       str += "<button onclick= myFunction('" + latestPost['latestPost'][0]['messageId'] + "') class='w3-button w3-white w3-border w3-border-white'><i class='material-icons'>filter_list</i></button>"; 

                        str += "<div id = '" + latestPost['latestPost'][0]['messageId'] + "' class = 'w3-hide w3-container'>";
                             str += "<div class='a nocommentclass'>";
                                str += "<p> no comments </p>";
                             str += "</div>";
                        str += "</div>";

                        str += "<form id =  '" + latestPost['latestPost'][0]['messageId'] + "'  > ";
                            str += "<aside><input name =" + latestPost['latestPost'][0]['ID'] + " placeholder='Type your comment'> </input>" ;
                            str +=  "<button class='commentButton' value = '"  + latestPost['latestPost'][0]['messageId'] + "' type = 'submit'>Comment</button> </aside>";
                        str += "</form>";
                         str += "</div>";
                        str += "</div>";
                        $( "#allPosts" ).prepend(str);
                          //loadMessages(0, groupId);

              }
              
          });




     }

});





$(document).on('click', '.groupsPage', function (e) {
      window.pageTarget = 1
        e.preventDefault();
        pageStartGroup = 1;

        
        var groupId = escapeHtml($(this).closest("form").find("input[id='groupName']").val());
        

        $("#groupIdLoad").attr('value', groupId);
        $("#groupIdPostedTo").attr('value', groupId);

        loadMessages(0, groupId);



});


$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});




$(document).on('click', '.arcUnarcGroup', function () {

  var action = 'empty';
  $clicked_btn = $(this);
  $groupId = $(this).val();

  if($clicked_btn.hasClass('fa-unlock'))
  {
    
          var action = "lockGroup";

          $.ajax({

              url : 'server/controller.php',
              type : 'POST',
              async: false,
              data : {
                  'lockGroup' : 'lockGroup',
                  'groupId' : $groupId
              },
              
              success : function(data) {   
                 loadMessages(0, $groupId);
               

              }
        }); 

  }
  else
  {

          var action = "unlockGroup";

          $.ajax({

              url : 'server/controller.php',
              type : 'POST',
              async: false,
              data : {
                  'unlockGroup' : 'unlockGroup',
                  'groupId' : $groupId
              },
              
              success : function(data) {   
                loadMessages(0,$groupId);
               

              }
        }); 

  }




});


// jQuery(document).ready( function(){
//     jQuery('#groupPostForumOne').fadeIn(1000);
//     $(".loadMore").show();
// } );

// jQuery(document).ready( function(){
//     jQuery('#pagination_data').fadeIn(1000);
//     $(".loadMore").show();
// } );

// jQuery(document).ready( function(){
//     jQuery('#allPosts').fadeIn(1000);
//     $(".loadMore").show();
// } );

// jQuery(document).ready( function(){
//     jQuery('#groupPosts').fadeIn(1000);
//     $(".loadMore").show();
// } );

// jQuery(document).ready( function(){
//     jQuery('#groupPosts').fadeIn(1000);
//     $(".loadMore").show();
// } );


$(document).on('click', '.likeOrDislike', function () {
    
 var post_id = $(this).data('id');
      
    
     var action = 'empty';

     $clicked_btn = $(this);

     if($clicked_btn.hasClass('fa-thumbs-o-up'))
     {
      action = 'like';

     }

     else if($clicked_btn.hasClass('fa-thumbs-up'))
     {
      action = 'unlike';
     }

     else if ($clicked_btn.hasClass('fa-thumbs-o-down')){
    
       action = 'dislike';
    
   } else if ($clicked_btn.hasClass('fa-thumbs-down'))
     
     {
       action = 'undislike';
     }

				  $.ajax({

				         url: 'likeDislike.php',
				         type: 'post',
				         data: {
				           'action': action,
				           'post_id': post_id
				         },
				         success: function(data){
				          // res = JSON.parse(data);

				           if(action == 'like')
				           {
				             $clicked_btn.removeClass('fa-thumbs-o-up');
				             $clicked_btn.addClass('fa-thumbs-up');
				           

				           } else if (action == 'unlike')
				           {
				             $clicked_btn.removeClass('fa-thumbs-up');
				             $clicked_btn.addClass('fa-thumbs-o-up');
				           }
				           
				          else if(action == 'dislike')
				           {

				             $clicked_btn.removeClass('fa-thumbs-o-down');
				             $clicked_btn.addClass('fa-thumbs-down');



				           } else if (action == 'undislike')
				           {
				             $clicked_btn.removeClass('fa-thumbs-down');
				             $clicked_btn.addClass('fa-thumbs-o-down');
				           }
				        else if (action == 'unlike')
				           {
				            $clicked_btn.removeClass('fa-thumbs-up');
				            $clicked_btn.addClass('fa-thumbs-o-up');
				           }

				           var likesDislikes = data.split("/");

				          var likeCount = parseInt(likesDislikes[0]);
				          var dislikeCount = parseInt(likesDislikes[1]);
				 
				           $clicked_btn.siblings('span.likes').text("Likes: " + likeCount);
				           $clicked_btn.siblings('span.dislikes').text(" Dislikes: " + dislikeCount);
				           $clicked_btn.siblings('i.fa-thumbs-down').removeClass('fa-thumbs-down').addClass('fa-thumbs-o-down');

				           $clicked_btn.siblings('i.fa-thumbs-up').removeClass('fa-thumbs-up').addClass('fa-thumbs-o-up');
				         }
				   })

   });


});