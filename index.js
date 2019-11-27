// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDXl0CyH6CsOsG_3YmnYiVBrddZMA4RuJQ",
  authDomain: "buff-list.firebaseapp.com",
  databaseURL: "https://buff-list.firebaseio.com",
  projectId: "buff-list",
  storageBucket: "buff-list.appspot.com",
  messagingSenderId: "562024677329",
  appId: "1:562024677329:web:5fc43b133b42263a38aaf0",
  measurementId: "G-0LYL9PHLCC"
};

//Firebase references
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
//var storage = firebase.storage();
//Get reference to database service
//var storageRef = storage.ref();
//Create Firestore reference
var db = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();

//login

//saved user logins
var users = ["admin"];
var passwords = ["bufflist"];
var currentUser = "Not Logged in";

//Googl logins
function googleSignin() {
   firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()

   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')
   });
}




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

  //Try for firestore
  db.collection("PostingDataRetrievalTest").doc("PostingData")
  .get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      var post = doc.data();
      var title = post.Title;
      var description = post.Description;
      var price = post.Price;
      var image = post.Image;
      var testPost = addPosting(title, image, description, price);
      document.getElementById('postings').appendChild(testPost);
      console.log(doc.data().Price);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

}

// add a post to the firebase
// function addPost()
// {
//   form.addEventListener('submit', (e) =>{
//     e.preventDefault();
//     db.collection('posts').add({
//
//       Headline: form.headline1.value
//     })
//   })
// }

function submitClick(){
    console.log(db);
    console.log(db.collection('Tester').doc("arJd3lG6nw4Hg4wOfGYj"));
    db.collection('Tester').doc("arJd3lG6nw4Hg4wOfGYj").set({
      Header: document.getElementById('post_headline').value
    })
    .then(function(docRef){
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error){
      console.error("error adding document ", error);
    });
}


function testPostData()
{
  db.collection("cities").doc("new-city-id").set(data);
}
