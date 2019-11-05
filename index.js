//login

//saved user logins
var users = ["admin"];
var passwords = ["bufflist"];
var currentUser = "Not Logged in";

//Login to Buff List
function check(form)
{
  for(var i = 0; i < users.length; i++){
    //if the pair is located in the users and passwords arrays
    if(form.userid.value == users[i] && form.pswrd.value == passwords[i]){
      currentUser = users[i];
      alert("Hello, " + currentUser + " welcome back to Buff List.")
      return
    }
  }
    alert("Either your username or password is incorrect")
    return
}
//Log off of Buff List
function logOff(){
currentUser = "Not Logged in";
return

}
//Create an Account
function createAccount(){

}



//Load and add Postings

// Saved postings
var storedCards = [{title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
                {title: "Guitar", image: "assets/example2.jpg", description: "Used Electric Guitar", price: 300},
                {title: "Skis", image: "assets/example3.jpg", description: "Used Skis", price: 190},
              {title: "Skis", image: "assets/example3.jpg", description: "Used Skis", price: 190},
            {title: "Skis", image: "assets/example3.jpg", description: "Used Skis", price: 190},
          {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
        {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
      {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
      {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
    {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
    {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
  {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80},
  {title: "TV", image: "assets/example1.jpg", description: "Used 32 in Plasma tv", price: 80}];

  //Get reference to database service
  var database = firebase.database();

  var ref = firebase.database().ref();

  ref.on("value", function(snapshot) {
     console.log(snapshot.val());
  }, function (error) {
     console.log("Error: " + error.code);
  });


//Add post function
function addPosting(title, image, description, price)
{

  //ADD DROPDOWNMENU WITH CONTACT INFORMATION OF USER WHO POSTED ITEM

  //Create card
  let card = document.createElement("div");
  card.className = 'card';

  //Add card body
  let cardBody = document.createElement('div');
  card.appendChild(cardBody);
  cardBody.className = 'card-header';

  //Add image
  let picture = document.createElement('img');
  let anchor = document.createElement('a');
  anchor.href = image;
  anchor.target = 'popup'
  anchor.class = 'expandImage'
  anchor.setAttribute('onclick', "window.open(" + image + ",'popup','width=600,height=600'); return false;");
  card.appendChild(anchor);
  picture.style = 'height: 25rem; object-fit: cover;'
  picture.className = 'card-img-top';
  picture.src = image;
  anchor.appendChild(picture);

  //Add title and price
  let cardTitle = document.createElement('h5');
  cardTitle.innerHTML = title + ": $" + price;
  cardBody.appendChild(cardTitle);

  //Add description
  let desc = document.createElement('p');
  card.appendChild(desc);
  desc.innerText = description;
  cardBody.appendChild(desc);

  return card;
}

//load posts. Called once page is loaded
function loadPosts()
{
  var i;
  for (i = 0; i < storedCards.length; i++)
  {
    var newPost = addPosting(storedCards[i].title, storedCards[i].image, storedCards[i].description, storedCards[i].price);
    console.log(newPost);
    document.getElementById('postings').appendChild(newPost);
  }
}

//add a post to the firebase
function addPost()
{
  form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('posts').add({

      Headline: form.headline1.value
    })
  })
}
















// //JQuery for popup window
// $(document).ready(function() {
//  $('.expandImage').magnificPopup({type:'image', delegate: 'anchor'});
// });
